// Google Sheets integration for Sparkit Knits Pvt. Ltd.
// Admin can manage products directly from a Google Sheet.

// ─── Configuration ───────────────────────────────────────────
// Using the Visualization API (gviz/tq) for near-instant updates
const SHEET_ID = '1j3RrXXU_RFW7RDaMZkFw4xEM0XAIcVkLgYjM5Hi8hx0';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

// Cache duration in milliseconds (30 seconds for faster testing)
const CACHE_DURATION = 30 * 1000;
const CACHE_KEY = 'sparkit_products_cache';
const CACHE_TIMESTAMP_KEY = 'sparkit_products_timestamp';

// ─── CSV Parser ──────────────────────────────────────────────
function parseCSV(csvText) {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return []; // Need at least header + 1 row

    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());

    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.every(v => v.trim() === '')) continue; // Skip empty rows

        const row = {};
        headers.forEach((header, index) => {
            row[header] = (values[index] || '').trim();
        });
        rows.push(row);
    }
    return rows;
}

// Handles quoted fields with commas and escaped quotes
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (inQuotes) {
            if (char === '"') {
                if (i + 1 < line.length && line[i + 1] === '"') {
                    current += '"';
                    i++; // skip escaped quote
                } else {
                    inQuotes = false;
                }
            } else {
                current += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
    }
    result.push(current);
    return result;
}

// ─── Image URL Converter ─────────────────────────────────────
// Converts various Google Drive share URLs to direct image URLs
function convertImageUrl(url) {
    if (!url) return '';

    // Google Drive share link: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) {
        return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
    }

    // Google Drive open link: https://drive.google.com/open?id=FILE_ID
    const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
    if (openMatch) {
        return `https://lh3.googleusercontent.com/d/${openMatch[1]}`;
    }

    // Google Drive direct download: https://drive.google.com/uc?id=FILE_ID
    const ucMatch = url.match(/drive\.google\.com\/uc\?.*id=([^&]+)/);
    if (ucMatch) {
        return `https://lh3.googleusercontent.com/d/${ucMatch[1]}`;
    }

    // Already a direct URL — return as-is
    return url;
}

// ─── Row to Product Mapper ───────────────────────────────────
function rowToProduct(row) {
    // Skip rows without a name
    if (!row.name) return null;

    const convertedImage = convertImageUrl(row.image || row.image_url || '');
    console.log(`[Sheets] Mapping product: ${row.name} | Image: ${convertedImage}`);

    const product = {
        id: row.id || row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: row.name,
        category: row.category || 'Fabric',
        image: convertedImage
    };

    // Add optional specs
    if (row.gsm) {
        product.specs = { gsm: row.gsm };
    }

    return product;
}

// ─── Caching ─────────────────────────────────────────────────
function getCachedProducts() {
    try {
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        if (!timestamp) return null;

        const age = Date.now() - parseInt(timestamp, 10);
        if (age > CACHE_DURATION) return null;

        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : null;
    } catch {
        return null;
    }
}

function cacheProducts(products) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(products));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch {
        // localStorage might be full or unavailable
    }
}

// ─── Main Fetch Function ─────────────────────────────────────
export async function fetchProducts() {
    // 1. Try cache first
    const cached = getCachedProducts();
    if (cached && cached.length > 0) {
        console.log('[Sheets] Loading products from cache');
        return cached;
    }

    // 2. Fetch from Google Sheets
    try {
        console.log('[Sheets] Fetching fresh data...');
        // Add cache buster to URL to force fresh fetch from Google
        const fetchUrl = `${SHEET_CSV_URL}&t=${Date.now()}`;
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error(`Google Sheets responded with ${response.status}`);
        }

        const csvText = await response.text();
        const rows = parseCSV(csvText);
        const products = rows.map(rowToProduct).filter(Boolean);

        console.log(`[Sheets] Found ${products.length} valid products in sheet`);
        console.log(`[Sheets] Last fetch: ${new Date().toLocaleTimeString()}`);

        // Cache even if 0 products (to respect the sheet as the source of truth)
        cacheProducts(products);
        return products;

    } catch (error) {
        console.error('[Sheets] CRITICAL: Failed to load from Google Sheets.', error);
        console.log('[Sheets] Check if your sheet is published to web as CSV.');
        return []; // Return empty array so we don't show old local data
    }
}
