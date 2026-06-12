// Data layer for Sparkit Knits Pvt. Ltd.

export const PRODUCTS = [
    // General / POY Series
    { id: "taiwan-zurich", name: "Taiwan Zurich", category: "Premium Knits", image: "pics/taiwan_zuric.png" },
    { id: "micro-juric-240", name: "Micro Zurich 240 GSM", category: "Premium Knits", specs: { gsm: "240" }, image: "pics/micro_juric_240GSM.jpg" },
    { id: "armani", name: "Armani", category: "Premium Knits", image: "pics/armani.jpg" },
    { id: "denim-dyson", name: "Denim(Dyson)", category: "Premium Knits", image: "pics/denim(Dyson).jpg" },
    { id: "zylo-chq", name: "Zylo ( Chq pant )", category: "Premium Knits", image: "pics/zylo(chq pant).jpg" },
    { id: "zylo-fd", name: "Zylo FD", category: "Premium Knits", image: "pics/zylo fd.jpg" },
    { id: "waffle-sd", name: "Waffle SD", category: "Premium Knits", image: "pics/waffle sd.jpeg" },
    { id: "waffle-fd", name: "Waffle FD", category: "Premium Knits", image: "pics/waffle fd.jpg" },
    { id: "w-strip", name: "W.strip", category: "Premium Knits", image: "pics/wStripe.jpg" },

    // King Roma Series
    { id: "king-roma-spandax", name: "King Roma spandax", category: "King Roma Series", image: "pics/king roma spandex.jpg" },
    { id: "king-roma-non-spandax", name: "King Roma non spandax", category: "King Roma Series", image: "pics/king-roma-nonspandex-fabric.png" },
    { id: "king-roma-dd", name: "King Roma DD", category: "King Roma Series", image: "pics/king roma dd.jpeg" },

    // Peanut Series
    { id: "peanut-280", name: "Peanut 280 GSM", category: "Peanut Series", specs: { gsm: "280" }, image: "pics/peanut-280-gsm.jpg" },
    { id: "peanut-260", name: "Peanut 260 GSM", category: "Peanut Series", specs: { gsm: "260" }, image: "pics/peanut-260-gsm.jpg" },
    { id: "peanut-check", name: "Peanut Check", category: "Peanut Series", image: "pics/peanut check.jpeg" },
    { id: "super-peanut", name: "Super peanut", category: "Peanut Series", image: "pics/super peanut.jpeg" },
    { id: "peanut-denim", name: "Peanut Denim", category: "Peanut Series", image: "pics/Knitted-Denim-Peanut-Fabrics.jpeg" },

    // Twill Series
    { id: "twill-almond", name: "Twill almond 280 gsm", category: "Twill Series", specs: { gsm: "280" }, image: "pics/Twill almond 280 gsm.jpeg" },
    { id: "twill-denim-milange", name: "Twill denim milange", category: "Twill Series", image: "pics/Twill denim milange.jpg" },

    // Specialty
    { id: "fd-malai", name: "FD Malai 150 GSM", category: "Specialty", specs: { gsm: "150" }, image: "pics/fd-super-malai-fabric.png" },

    // New Products / High Performance
    { id: "silky-new-product", name: "Silky new product", category: "Innovations", image: "pics/fabric1.jpg" },
    { id: "super-silky-300", name: "Super silky 300 gsm", category: "Innovations", specs: { gsm: "300" }, image: "pics/Super silky 300 gsm.jpg" },
    { id: "black-arrow", name: "Black arrow", category: "Performance", image: "pics/Black arrow.jpg" },
    { id: "white-arrow", name: "White Arrow", category: "Performance", image: "pics/White Arrow.jpg" },
    { id: "ferrari", name: "Ferrari", category: "Performance", image: "pics/Ferrari.jpg" },
    { id: "ferrari-chq", name: "Ferrari Chq", category: "Performance", image: "pics/Ferrari Chq.jpg" },
    { id: "track-line", name: "Track Line", category: "Performance", image: "pics/Track Line.jpg" },
    { id: "exide-1", name: "EXIDE 1", category: "Performance", image: "pics/fabric1.jpg" },
    { id: "exide-2", name: "EXIDE 2", category: "Performance", image: "pics/fabric1.jpg" },
    { id: "kanex", name: "KANEX", category: "Performance", image: "pics/kanex.jpg" }
];

export const PROCESS_STEPS = [
    { title: "POY Selection", desc: "Selecting high-quality Partially Oriented Yarn (POY) to ensure a superior fabric foundation." },
    { title: "Knitting", desc: "State-of-the-art circular and flatbed machines for precision weaving." },
    { title: "Dyeing", desc: "Eco-friendly dyeing processes with precision color matching and finishing." },
    { title: "Quality Check", desc: "Multi-point inspection to ensure zero defects per meter before dispatch." }
];

export const STATS = [
    { value: 500, label: "Clients", prefix: "+", suffix: "" },
    { value: 50, label: "Kg/Month", prefix: "", suffix: "M" },
    { value: 30, label: "Countries", prefix: "+", suffix: "" },
    { value: 98, label: "Quality Rate", prefix: "", suffix: "%" }
];
