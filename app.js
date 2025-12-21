// --- 1. TRANSLATION DICTIONARY UPDATE ---
// (Paste this into the top of app.js)
const translations = {
    en: {
        app_title: "Numerology",
        tab_single: "Single Analysis",
        tab_compat: "Compatibility",
        tab_forecast: "Forecast", // NEW
        lbl_dob: "Date of Birth",
        lbl_target_date: "Forecast Date", // NEW
        lbl_category: "Category",
        lbl_value: "Enter Name/Text",
        opt_name: "Name",
        opt_business: "Business Name",
        opt_vehicle: "Vehicle Number",
        opt_custom: "Other...",
        btn_calc: "Analyze",
        btn_compare: "Check Compatibility",
        btn_forecast: "Get Horoscope", // NEW
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
        suit_avoid: "Avoid / Challenging (Enemy)",
        // Forecast Specific
        fc_year: "Yearly Influence (Varshank)",
        fc_month: "Monthly Influence (Masank)",
        fc_day: "Daily Influence (Dinank)",
        fc_favorable: "Favorable",
        fc_normal: "Normal",
        fc_unfavorable: "Unfavorable/Caution",
        fc_ruler: "Ruler"
    },
    hi: {
        app_title: "अंकज्योतिष",
        tab_single: "एकल विश्लेषण",
        tab_compat: "मैत्री चक्र",
        tab_forecast: "वर्षफल", // NEW
        lbl_dob: "जन्म तिथि",
        lbl_target_date: "भविष्यफल तिथि", // NEW
        lbl_category: "श्रेणी",
        lbl_value: "नाम दर्ज करें",
        opt_name: "नाम",
        opt_business: "व्यापार का नाम",
        opt_vehicle: "गाड़ी नंबर",
        opt_custom: "अन्य...",
        btn_calc: "विश्लेषण करें",
        btn_compare: "मैत्री जांचें",
        btn_forecast: "भविष्यफल देखें", // NEW
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
        suit_avoid: "अशुभ / शत्रु (बचें)",
        // Forecast Specific
        fc_year: "वर्षफल (वरशंक)",
        fc_month: "मासफल (मासंक)",
        fc_day: "दैनिक फल (दिनांक)",
        fc_favorable: "शुभ (Favorable)",
        fc_normal: "सम (Normal)",
        fc_unfavorable: "अशुभ (Unfavorable)",
        fc_ruler: "स्वामी"
    }
};

let currentLang = 'en';
let engine;

// UI Elements (Add new ones)
let langSwitch, categorySelect, categoryCustom, inputText, inputDob, btnCalculate;
let resultArea, resultMsg, resultNum, resBasicNum, resLuckyList, suitabilityBox;
let inputA, inputB, btnCompare, compatResultArea, numADisp, numBDisp, nameADisp, nameBDisp, relationStatus, compatDesc;
let sectionSingle, sectionCompat, sectionForecast;
let tabSingle, tabCompat, tabForecast;

// Forecast Elements
let inputDobFc, inputTargetDate, btnForecast, forecastResultArea;
let cardYear, cardMonth, cardDay;
let valYear, valMonth, valDay;
let statusYear, statusMonth, statusDay;

document.addEventListener('DOMContentLoaded', () => {
    engine = new NumerologyEngine();
    
    // ... (Previous Reference bindings) ...
    langSwitch = document.getElementById('lang-switch');
    sectionSingle = document.getElementById('section-single');
    sectionCompat = document.getElementById('section-compat');
    sectionForecast = document.getElementById('section-forecast'); // NEW

    tabSingle = document.getElementById('tab-single');
    tabCompat = document.getElementById('tab-compat');
    tabForecast = document.getElementById('tab-forecast'); // NEW

    // Single Logic References
    categorySelect = document.getElementById('category-select');
    categoryCustom = document.getElementById('category-custom');
    inputText = document.getElementById('input-text');
    inputDob = document.getElementById('input-dob');
    btnCalculate = document.getElementById('btn-calculate');
    resultArea = document.getElementById('result-area');
    resultMsg = document.getElementById('result-message');
    resultNum = document.getElementById('result-number');
    resBasicNum = document.getElementById('res-basic-num');
    resLuckyList = document.getElementById('res-lucky-list');
    suitabilityBox = document.getElementById('suitability-box');

    // Compat Logic References
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

    // Forecast Logic References // NEW
    inputDobFc = document.getElementById('input-dob-fc');
    inputTargetDate = document.getElementById('input-target-date');
    btnForecast = document.getElementById('btn-forecast');
    forecastResultArea = document.getElementById('forecast-result-area');
    
    // Forecast Cards
    cardYear = document.getElementById('card-year');
    cardMonth = document.getElementById('card-month');
    cardDay = document.getElementById('card-day');

    // Set Default Date to Today for Target
    inputTargetDate.valueAsDate = new Date();


    // --- LANGUAGE FUNCTION ---
    function updateLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (t[key]) elem.textContent = t[key];
        });

        // Update specific manual elements
        categorySelect.options[0].textContent = t.opt_name;
        categorySelect.options[1].textContent = t.opt_business;
        categorySelect.options[2].textContent = t.opt_vehicle;
        categorySelect.options[3].textContent = t.opt_custom;

        if(lang === 'hi') {
            inputText.placeholder = "जैसे: सूर्य एतर्प्राइज़";
            inputA.placeholder = "पहला नाम";
        } else {
            inputText.placeholder = "e.g., Alice Enterprise";
            inputA.placeholder = "A";
        }
    }

    langSwitch.addEventListener('change', (e) => updateLanguage(e.target.value));
    updateLanguage(currentLang);

    // --- TAB SWITCHING ---
    tabSingle.addEventListener('click', () => switchTab('single'));
    tabCompat.addEventListener('click', () => switchTab('compat'));
    tabForecast.addEventListener('click', () => switchTab('forecast'));

    function switchTab(tabName) {
        sectionSingle.classList.add('hidden');
        sectionCompat.classList.add('hidden');
        sectionForecast.classList.add('hidden');
        
        tabSingle.classList.remove('active');
        tabCompat.classList.remove('active');
        tabForecast.classList.remove('active');

        if(tabName === 'single') {
            sectionSingle.classList.remove('hidden');
            tabSingle.classList.add('active');
        } else if(tabName === 'compat') {
            sectionCompat.classList.remove('hidden');
            tabCompat.classList.add('active');
        } else {
            sectionForecast.classList.remove('hidden');
            tabForecast.classList.add('active');
            // Auto-fill DOB if entered in single tab
            if(inputDob.value && !inputDobFc.value) {
                inputDobFc.value = inputDob.value;
            }
        }
    }

    // --- FORECAST LOGIC ---
    btnForecast.addEventListener('click', () => {
        const dob = inputDobFc.value;
        const target = inputTargetDate.value;
        const t = translations[currentLang];

        if(!dob || !target) return alert(currentLang === 'hi' ? "कृपया सभी तिथियां भरें" : "Please enter all dates");

        const dateObj = new Date(target);
        
        // 1. Calculate Jeevank (Parent)
        const jeevank = engine.get_jeevank(dob);
        
        // 2. Calculate Varshank (Year)
        const year = dateObj.getFullYear();
        const varshank = engine.get_varshank(jeevank, year);
        const relYear = engine.check_compatibility(jeevank, varshank); // Compare Year vs Life

        // 3. Calculate Masank (Month)
        const monthIndex = dateObj.getMonth() + 1;
        const masank = engine.get_masank(varshank, monthIndex);
        const relMonth = engine.check_compatibility(varshank, masank); // Compare Month vs Year

        // 4. Calculate Dinank (Day)
        const dayDate = dateObj.getDate();
        const weekdayVal = engine.get_weekday_value(dateObj);
        const dinank = engine.get_dinank(masank, dayDate, weekdayVal);
        const relDay = engine.check_compatibility(masank, dinank); // Compare Day vs Month

        // Update UI
        updateForecastCard('card-year', varshank, relYear, `${year}`, t);
        updateForecastCard('card-month', masank, relMonth, dateObj.toLocaleString(currentLang === 'hi' ? 'hi-IN' : 'en-US', { month: 'long' }), t);
        updateForecastCard('card-day', dinank, relDay, `${dateObj.getDate()} (${dateObj.toLocaleString(currentLang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'short' })})`, t);

        forecastResultArea.classList.remove('hidden');
    });

    function updateForecastCard(cardId, number, relation, contextText, t) {
        const card = document.getElementById(cardId);
        const numEl = card.querySelector('.fc-number');
        const statusEl = card.querySelector('.fc-status');
        const ctxEl = card.querySelector('.fc-context');

        numEl.textContent = number;
        ctxEl.textContent = contextText;
        
        let statusText = "";
        let statusClass = "";

        if(relation === 'Friend') {
            statusText = t.fc_favorable;
            statusClass = 'status-Friend';
        } else if (relation === 'Enemy') {
            statusText = t.fc_unfavorable;
            statusClass = 'status-Enemy';
        } else {
            statusText = t.fc_normal;
            statusClass = 'status-Neutral';
        }

        statusEl.textContent = statusText;
        
        // Reset classes
        card.className = 'forecast-card'; 
        card.classList.add(statusClass + '-border'); // Add colored border
    }

    // ... (Existing Event Listeners for other tabs) ...
    // Note: Re-paste the Calculate and Compare listeners here if you are overwriting the whole file,
    // or just append the forecast logic if you are editing incrementally.
    categorySelect.addEventListener('change', (e) => {
        if (e.target.value === 'Custom') {
            categoryCustom.classList.remove('hidden');
            categoryCustom.focus();
        } else {
            categoryCustom.classList.add('hidden');
        }
    });

    btnCalculate.addEventListener('click', () => {
        const text = inputText.value.trim();
        const dob = inputDob.value;
        const t = translations[currentLang];

        if (!text || !dob) return alert(t.msg_enter_all);

        const nameVibration = engine.calculate_vibration(text);
        const dateMetrics = engine.calculate_date_metrics(dob);
        const luckyNumbers = engine.get_lucky_numbers(dateMetrics);
        const suitability = engine.analyze_name_suitability(nameVibration, dateMetrics.day_number, luckyNumbers);

        let categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;
        if (categorySelect.value === 'Custom') categoryLabel = categoryCustom.value || "Custom";

        resBasicNum.textContent = dateMetrics.day_number;
        resLuckyList.textContent = luckyNumbers.join(", ");

        if(currentLang === 'hi') {
            resultMsg.innerHTML = `${categoryLabel} <strong>"${text}"</strong> ${t.res_vibration}:`;
        } else {
            resultMsg.innerHTML = `${t.res_prefix} <strong>${categoryLabel}</strong> "${text}" ${t.res_vibration}:`;
        }
        resultNum.textContent = nameVibration;

        let suitText = "", suitClass = "";
        if (suitability.code === 'lucky_match') { suitText = t.suit_exc; suitClass = 'status-Friend'; }
        else if (suitability.code === 'friend') { suitText = t.suit_good; suitClass = 'status-Friend'; }
        else if (suitability.code === 'enemy')  { suitText = t.suit_avoid; suitClass = 'status-Enemy'; }
        else { suitText = t.suit_neut; suitClass = 'status-Neutral'; }

        suitabilityBox.textContent = suitText;
        suitabilityBox.className = `suitability-badge ${suitClass}`;
        resultArea.classList.remove('hidden');
    });

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