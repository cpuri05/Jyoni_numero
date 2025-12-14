// --- 1. TRANSLATION DICTIONARY ---
const translations = {
    en: {
        app_title: "Numerology",
        tab_single: "Single Analysis",
        tab_compat: "Compatibility",
        lbl_dob: "Date of Birth",
        lbl_category: "Category",
        lbl_value: "Enter Name/Text",
        opt_name: "Name",
        opt_business: "Business Name",
        opt_vehicle: "Vehicle Number",
        opt_custom: "Other...",
        btn_calc: "Analyze",
        btn_compare: "Check Compatibility",
        lbl_person_a: "First Name/Entity",
        lbl_person_b: "Second Name/Entity",
        res_prefix: "The",
        res_vibration: "vibration is",
        res_basic_lbl: "Basic Number (Moolank)",
        res_lucky_lbl: "Lucky Numbers",
        rel_friend: "Friend",
        rel_neutral: "Neutral",
        rel_enemy: "Enemy",
        rel_desc: "are considered",
        msg_enter_all: "Please enter Date of Birth and Text.",
        suit_exc: "Excellent Match! (Lucky Number)",
        suit_good: "Good Match (Friendly)",
        suit_neut: "Neutral Match",
        suit_avoid: "Avoid / Challenging (Enemy)"
    },
    hi: {
        app_title: "अंकज्योतिष",
        tab_single: "एकल विश्लेषण",
        tab_compat: "मैत्री चक्र",
        lbl_dob: "जन्म तिथि",
        lbl_category: "श्रेणी",
        lbl_value: "नाम दर्ज करें",
        opt_name: "नाम",
        opt_business: "व्यापार का नाम",
        opt_vehicle: "गाड़ी नंबर",
        opt_custom: "अन्य...",
        btn_calc: "विश्लेषण करें",
        btn_compare: "मैत्री जांचें",
        lbl_person_a: "पहला नाम",
        lbl_person_b: "दूसरा नाम",
        res_prefix: "",
        res_vibration: "का मूलांक है",
        res_basic_lbl: "मूलांक (Basic Number)",
        res_lucky_lbl: "भाग्यशाली अंक",
        rel_friend: "मित्र",
        rel_neutral: "सम (Neutral)",
        rel_enemy: "शत्रु",
        rel_desc: "का संबंध है",
        msg_enter_all: "कृपया जन्म तिथि और नाम दोनों दर्ज करें।",
        suit_exc: "सर्वोत्तम! (भाग्यशाली अंक)",
        suit_good: "शुभ (मित्र अंक)",
        suit_neut: "सम (साधारण)",
        suit_avoid: "अशुभ / शत्रु (बचें)"
    }
};

let currentLang = 'en';
let engine;

// --- UI Elements ---
let langSwitch, categorySelect, categoryCustom, inputText, inputDob, btnCalculate;
let resultArea, resultMsg, resultNum, resBasicNum, resLuckyList, suitabilityBox;
let inputA, inputB, btnCompare, compatResultArea, numADisp, numBDisp, nameADisp, nameBDisp, relationStatus, compatDesc;
let sectionSingle, sectionCompat, tabSingle, tabCompat;

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    engine = new NumerologyEngine();
    
    // UI References
    langSwitch = document.getElementById('lang-switch');
    sectionSingle = document.getElementById('section-single');
    sectionCompat = document.getElementById('section-compat');
    tabSingle = document.getElementById('tab-single');
    tabCompat = document.getElementById('tab-compat');
    
    // Single Analysis Inputs
    categorySelect = document.getElementById('category-select');
    categoryCustom = document.getElementById('category-custom');
    inputText = document.getElementById('input-text');
    inputDob = document.getElementById('input-dob');
    btnCalculate = document.getElementById('btn-calculate');
    
    // Single Analysis Results
    resultArea = document.getElementById('result-area');
    resultMsg = document.getElementById('result-message');
    resultNum = document.getElementById('result-number');
    resBasicNum = document.getElementById('res-basic-num');
    resLuckyList = document.getElementById('res-lucky-list');
    suitabilityBox = document.getElementById('suitability-box');

    // Compatibility Inputs
    inputA = document.getElementById('compat-input-a');
    inputB = document.getElementById('compat-input-b');
    btnCompare = document.getElementById('btn-compare');
    compatResultArea = document.getElementById('compat-result-area');
    numADisp = document.getElementById('num-a-disp');
    numBDisp = document.getElementById('num-b-disp');
    nameADisp = document.getElementById('name-a-disp');
    nameBDisp = document.getElementById('name-b-disp');
    relationStatus = document.getElementById('relation-status');
    compatDesc = document.getElementById('compat-desc');

    // --- LANGUAGE FUNCTION ---
    function updateLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        // Update simple text elements
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (t[key]) elem.textContent = t[key];
        });

        // Update select options manually
        categorySelect.options[0].textContent = t.opt_name;
        categorySelect.options[1].textContent = t.opt_business;
        categorySelect.options[2].textContent = t.opt_vehicle;
        categorySelect.options[3].textContent = t.opt_custom;

        // Update placeholders
        if(lang === 'hi') {
            inputText.placeholder = "जैसे: सूर्य एतर्प्राइज़";
            categoryCustom.placeholder = "श्रेणी का नाम लिखें";
            inputA.placeholder = "पहला नाम";
            inputB.placeholder = "दूसरा नाम";
        } else {
            inputText.placeholder = "e.g., Alice Enterprise";
            categoryCustom.placeholder = "Enter Category Name";
            inputA.placeholder = "A";
            inputB.placeholder = "B";
        }
    }

    // Event Listener for Language Switch
    langSwitch.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    // Initialize language
    updateLanguage(currentLang);

    // --- LOGIC ---

    tabSingle.addEventListener('click', () => {
        sectionSingle.classList.remove('hidden');
        sectionCompat.classList.add('hidden');
        tabSingle.classList.add('active');
        tabCompat.classList.remove('active');
    });

    tabCompat.addEventListener('click', () => {
        sectionSingle.classList.add('hidden');
        sectionCompat.classList.remove('hidden');
        tabSingle.classList.remove('active');
        tabCompat.classList.add('active');
    });

    categorySelect.addEventListener('change', (e) => {
        if (e.target.value === 'Custom') {
            categoryCustom.classList.remove('hidden');
            categoryCustom.focus();
        } else {
            categoryCustom.classList.add('hidden');
        }
    });

    // --- SINGLE ANALYSIS CALCULATION ---
    btnCalculate.addEventListener('click', () => {
        const text = inputText.value.trim();
        const dob = inputDob.value;
        const t = translations[currentLang];

        if (!text || !dob) return alert(t.msg_enter_all);

        // 1. Calculate Name Vibration
        const nameVibration = engine.calculate_vibration(text);
        
        // 2. Calculate Date Metrics & Lucky Numbers
        const dateMetrics = engine.calculate_date_metrics(dob);
        const luckyNumbers = engine.get_lucky_numbers(dateMetrics);

        // 3. Analyze Suitability
        const suitability = engine.analyze_name_suitability(nameVibration, dateMetrics.day_number, luckyNumbers);

        // 4. Update UI
        let categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;
        if (categorySelect.value === 'Custom') {
            categoryLabel = categoryCustom.value || "Custom";
        }

        // Display Profile
        resBasicNum.textContent = dateMetrics.day_number;
        resLuckyList.textContent = luckyNumbers.join(", ");

        // Display Name Vibration
        if(currentLang === 'hi') {
            resultMsg.innerHTML = `${categoryLabel} <strong>"${text}"</strong> ${t.res_vibration}:`;
        } else {
            resultMsg.innerHTML = `${t.res_prefix} <strong>${categoryLabel}</strong> "${text}" ${t.res_vibration}:`;
        }
        resultNum.textContent = nameVibration;

        // Display Suitability Badge
        let suitText = "";
        let suitClass = "";
        
        if (suitability.code === 'lucky_match') { suitText = t.suit_exc; suitClass = 'status-Friend'; }
        else if (suitability.code === 'friend') { suitText = t.suit_good; suitClass = 'status-Friend'; }
        else if (suitability.code === 'enemy')  { suitText = t.suit_avoid; suitClass = 'status-Enemy'; }
        else { suitText = t.suit_neut; suitClass = 'status-Neutral'; }

        suitabilityBox.textContent = suitText;
        suitabilityBox.className = `suitability-badge ${suitClass}`;

        resultArea.classList.remove('hidden');
    });

    // --- COMPATIBILITY CALCULATION ---
    btnCompare.addEventListener('click', () => {
        const textA = inputA.value.trim();
        const textB = inputB.value.trim();
        const t = translations[currentLang];

        if (!textA || !textB) return alert(currentLang === 'hi' ? "कृपया दोनों नाम दर्ज करें" : "Please enter both names");

        const numA = engine.calculate_vibration(textA);
        const numB = engine.calculate_vibration(textB);
        const rawRel = engine.check_compatibility(numA, numB);
        
        let displayRel = rawRel;
        if (rawRel === 'Friend') displayRel = t.rel_friend;
        if (rawRel === 'Neutral') displayRel = t.rel_neutral;
        if (rawRel === 'Enemy') displayRel = t.rel_enemy;

        nameADisp.textContent = textA;
        numADisp.textContent = numA;
        nameBDisp.textContent = textB;
        numBDisp.textContent = numB;

        relationStatus.textContent = displayRel;
        relationStatus.className = `relation-badge status-${rawRel}`;

        if(currentLang === 'hi') {
             compatDesc.innerHTML = `${textA} (${numA}) और ${textB} (${numB}) के बीच <strong>${displayRel}</strong> ${t.rel_desc}।`;
        } else {
            compatDesc.innerHTML = `${textA} (${numA}) and ${textB} (${numB}) ${t.rel_desc} <strong>${displayRel}s</strong>.`;
        }
        
        compatResultArea.classList.remove('hidden');
    });
});