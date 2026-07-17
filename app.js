// --- 1. TRANSLATION DICTIONARY UPDATE ---
// (Paste this into the top of app.js)
const translations = {
    en: {
        app_title: "Numerology",
        tab_single: "Number Analysis",
        tab_compat: "Compatibility",
        tab_forecast: "Forecast",
        tab_numeroscope: "Numeroscope",
        tab_profiles: "Saved Profiles",
        lbl_dob: "Date of Birth",
        lbl_gender: "Gender",
        opt_male: "Male",
        opt_female: "Female",
        lbl_target_date: "Forecast Date",
        lbl_entity_type: "Entity Type",
        opt_person: "Person",
        opt_business_entity: "Business",
        opt_vehicle_entity: "Vehicle",
        opt_other: "Other",
        lbl_person_name: "Person Name",
        create_new: "Create New",
        lbl_category: "Category",
        lbl_value: "Enter Name/Text",
        opt_name: "Name",
        opt_business: "Business Name",
        opt_vehicle: "Vehicle Number",
        opt_phone: "Phone Number",
        opt_custom: "Other...",
        btn_calc: "Analyze",
        btn_compare: "Check Compatibility",
        btn_forecast: "Get Horoscope",
        btn_loshu: "Generate Numeroscope",
        btn_save: "💾 Save Profile",
        btn_clear_all: "🗑️ Clear All Profiles",
        lbl_person_a: "First Name/Entity",
        lbl_person_b: "Second Name/Entity",
        res_prefix: "The",
        res_vibration: "vibration is",
        res_basic_lbl: "Basic Number (Moolank)",
        res_friendly_lbl: "Friendly Numbers",
        res_neutral_lbl: "Neutral Numbers",
        res_enemy_lbl: "Enemy Numbers",
        rel_friend: "Friend",
        rel_neutral: "Neutral",
        rel_enemy: "Enemy",
        rel_desc: "are considered",
        msg_enter_all: "Please enter Date of Birth and Text.",
        suit_exc: "Excellent Match! (Lucky Number)",
        suit_good: "Good Match (Friendly)",
        suit_neut: "Neutral Match",
        suit_avoid: "Avoid / Challenging (Enemy)",
        fc_year: "Yearly Influence (Varshank)",
        fc_month: "Monthly Influence (Masank)",
        fc_day: "Daily Influence (Dinank)",
        fc_favorable: "Favorable",
        fc_normal: "Normal",
        fc_unfavorable: "Unfavorable/Caution",
        fc_ruler: "Ruler",
        loshu_driver: "Driver (Psychic)",
        loshu_conductor: "Conductor (Destiny)",
        loshu_kua: "Kua Number",
        analysis_title: "Plane Analysis (Yogs)",
        full_planes: "✓ Active Planes (Full)",
        partial_planes: "◐ Partially Active Planes",
        empty_planes: "○ Inactive Planes (Empty)",
        present_numbers: "Present",
        missing_numbers: "Missing",
        interp_theme: "Core Theme:",
        interp_strengths: "Strengths:",
        interp_shadow: "Shadow Traits:",
        interp_colours: "Favourable Colours:",
        colour_theme_prefix: "Enhances",
        interp_dates: "Favourable Dates:",
        dates_best: "Best",
        dates_good: "Good",
        dates_neutral: "Neutral",
        dates_avoid: "Avoid",
        dates_footnote: "Applies to dates present in the month",
        dob_analysis_title: "Birth Number Analysis",
        name_analysis_title: "Name/Entity Analysis",
        // Profile Management
        total_profiles: "Total Profiles",
        no_profiles: "No saved profiles yet",
        no_profiles_hint: "Analyze a name and save it to see it here",
        search_placeholder: "Search profiles...",
        modal_title: "Save Profile",
        modal_name: "Profile Name",
        modal_cancel: "Cancel",
        modal_save: "Save",
        profile_saved: "Profile saved successfully!",
        profile_deleted: "Profile deleted",
        confirm_delete: "Delete this profile?",
        confirm_clear_all: "Delete ALL profiles? This cannot be undone.",
        profile_dob: "DOB",
        profile_category: "Category",
        profile_vibration: "Vibration",
        profile_status: "Status",
        btn_load: "Load",
        btn_delete: "Delete",
        btn_export: "📥 Export Data",
        btn_import: "📤 Import Data",
        import_modal_title: "Import Profiles",
        import_modal_desc: "How would you like to import the profiles?",
        import_merge: "Merge with Existing",
        import_replace: "Replace All",
        export_success: "Profiles exported successfully!",
        import_success: "Profiles imported successfully!",
        import_merged: "profiles merged with existing data",
        import_replaced: "All profiles replaced with imported data",
        import_error: "Error importing file. Please check the file format.",
        no_file_selected: "Please select a file to import"
    },
    hi: {
        app_title: "अंकज्योतिष",
        tab_single: "अंक विश्लेषण",
        tab_compat: "मैत्री चक्र",
        tab_forecast: "वर्षफल",
        tab_numeroscope: "अंक पत्री",
        tab_profiles: "सहेजे प्रोफाइल",
        lbl_dob: "जन्म तिथि",
        lbl_gender: "लिंग",
        opt_male: "पुरुष",
        opt_female: "महिला",
        lbl_target_date: "भविष्यफल तिथि",
        lbl_entity_type: "इकाई प्रकार",
        opt_person: "व्यक्ति",
        opt_business_entity: "व्यापार",
        opt_vehicle_entity: "वाहन",
        opt_other: "अन्य",
        lbl_person_name: "व्यक्ति का नाम",
        create_new: "नया बनाएं",
        lbl_category: "श्रेणी",
        lbl_value: "नाम दर्ज करें",
        opt_name: "नाम",
        opt_business: "व्यापार का नाम",
        opt_vehicle: "गाड़ी नंबर",
        opt_phone: "फोन नंबर",
        opt_custom: "अन्य...",
        btn_calc: "विश्लेषण करें",
        btn_compare: "मैत्री जांचें",
        btn_forecast: "भविष्यफल देखें",
        btn_loshu: "अंक पत्री बनाएं",
        btn_save: "💾 प्रोफाइल सहेजें",
        btn_clear_all: "🗑️ सभी प्रोफाइल हटाएं",
        lbl_person_a: "पहला नाम",
        lbl_person_b: "दूसरा नाम",
        res_prefix: "",
        res_vibration: "का मूलांक है",
        res_basic_lbl: "मूलांक (Basic Number)",
        res_friendly_lbl: "मित्र अंक",
        res_neutral_lbl: "सम अंक",
        res_enemy_lbl: "शत्रु अंक",
        rel_friend: "मित्र",
        rel_neutral: "सम (Neutral)",
        rel_enemy: "शत्रु",
        rel_desc: "का संबंध है",
        msg_enter_all: "कृपया जन्म तिथि और नाम दोनों दर्ज करें।",
        suit_exc: "सर्वोत्तम! (भाग्यशाली अंक)",
        suit_good: "शुभ (मित्र अंक)",
        suit_neut: "सम (साधारण)",
        suit_avoid: "अशुभ / शत्रु (बचें)",
        fc_year: "वर्षफल (वरशंक)",
        fc_month: "मासफल (मासंक)",
        fc_day: "दैनिक फल (दिनांक)",
        fc_favorable: "शुभ (Favorable)",
        fc_normal: "सम (Normal)",
        fc_unfavorable: "अशुभ (Unfavorable)",
        fc_ruler: "स्वामी",
        loshu_driver: "चालक (Psychic)",
        loshu_conductor: "संचालक (Destiny)",
        loshu_kua: "कुआ नंबर",
        analysis_title: "तल विश्लेषण (योग)",
        full_planes: "✓ सक्रिय तल (पूर्ण)",
        partial_planes: "◐ आंशिक सक्रिय तल",
        empty_planes: "○ निष्क्रिय तल (खाली)",
        present_numbers: "उपस्थित",
        missing_numbers: "गुम",
        interp_theme: "मूल विषय:",
        interp_strengths: "शक्तियां:",
        interp_shadow: "छाया गुण:",
        interp_colours: "अनुकूल रंग:",
        colour_theme_prefix: "में वृद्धि करता है",
        interp_dates: "शुभ तिथियाँ:",
        dates_best: "सर्वश्रेष्ठ",
        dates_good: "शुभ",
        dates_neutral: "सामान्य",
        dates_avoid: "अशुभ",
        dates_footnote: "माह में उपलब्ध तिथियों पर लागू",
        dob_analysis_title: "जन्म अंक विश्लेषण",
        name_analysis_title: "नाम/वस्तु विश्लेषण",
        // Profile Management
        total_profiles: "कुल प्रोफाइल",
        no_profiles: "अभी तक कोई प्रोफाइल नहीं",
        no_profiles_hint: "नाम का विश्लेषण करें और यहां देखने के लिए सहेजें",
        search_placeholder: "प्रोफाइल खोजें...",
        modal_title: "प्रोफाइल सहेजें",
        modal_name: "प्रोफाइल का नाम",
        modal_cancel: "रद्द करें",
        modal_save: "सहेजें",
        profile_saved: "प्रोफाइल सहेजा गया!",
        profile_deleted: "प्रोफाइल हटाया गया",
        confirm_delete: "इस प्रोफाइल को हटाएं?",
        confirm_clear_all: "सभी प्रोफाइल हटाएं? यह पूर्ववत नहीं किया जा सकता।",
        profile_dob: "जन्म तिथि",
        profile_category: "श्रेणी",
        profile_vibration: "मूलांक",
        profile_status: "स्थिति",
        btn_load: "लोड करें",
        btn_delete: "हटाएं",
        btn_export: "📥 डेटा एक्सपोर्ट करें",
        btn_import: "📤 डेटा इम्पोर्ट करें",
        import_modal_title: "प्रोफाइल इम्पोर्ट करें",
        import_modal_desc: "आप प्रोफाइल कैसे इम्पोर्ट करना चाहते हैं?",
        import_merge: "मौजूदा के साथ मिलाएं",
        import_replace: "सभी बदलें",
        export_success: "प्रोफाइल एक्सपोर्ट हो गए!",
        import_success: "प्रोफाइल इम्पोर्ट हो गए!",
        import_merged: "प्रोफाइल मौजूदा डेटा के साथ मिला दिए गए",
        import_replaced: "सभी प्रोफाइल इम्पोर्टेड डेटा से बदल दिए गए",
        import_error: "फाइल इम्पोर्ट करने में त्रुटि। कृपया फाइल फॉर्मेट जांचें।",
        no_file_selected: "कृपया इम्पोर्ट करने के लिए फाइल चुनें"
    }
};

let currentLang = 'en';
let engine;
let storage;
let lastAnalysisData = null;
let lastLoshuResult = null; // Store last Lo Shu result for re-rendering on language change
let lastVibrationNumber = null; // Store last vibration number for re-rendering on language change
let lastBasicNumber = null; // Store last basic number for re-rendering on language change

// UI Elements
let langSwitch, entityTypeSelect, inputText, inputDob, btnCalculate;
let resultArea, resultMsg, resultNum, resBasicNum, resFriendlyList, resNeutralList, resEnemyList, suitabilityBox;
let inputA, inputB, btnCompare, compatResultArea, numADisp, numBDisp, nameADisp, nameBDisp, relationStatus, compatDesc;
let sectionSingle, sectionCompat, sectionForecast, sectionNumeroscope, sectionProfiles;
let tabSingle, tabCompat, tabForecast, tabNumeroscope, tabProfiles;
let btnSaveProfile, saveModal, modalProfileName, modalSave, modalCancel;
let profilesList, emptyState, profileCount, searchProfiles, btnClearAll, btnExport, btnImport, fileImport, importModal, importMerge, importReplace, importCancel;

// Forecast Elements
let inputNameFc, inputDobFc, inputTargetDate, btnForecast, forecastResultArea;
let cardYear, cardMonth, cardDay;
let valYear, valMonth, valDay;
let statusYear, statusMonth, statusDay;

// Lo Shu Grid Elements
let inputNameLoshu, inputDobLoshu, inputGender, btnLoshu, loshuResultArea, loshuDriver, loshuConductor, loshuKua, loshuGrid;

document.addEventListener('DOMContentLoaded', () => {
    engine = new NumerologyEngine();
    storage = new ProfileStorage();
    
    // Reference bindings
    langSwitch = document.getElementById('lang-switch');
    sectionSingle = document.getElementById('section-single');
    sectionCompat = document.getElementById('section-compat');
    sectionForecast = document.getElementById('section-forecast');
    sectionNumeroscope = document.getElementById('section-numeroscope');
    sectionProfiles = document.getElementById('section-profiles');

    tabSingle = document.getElementById('tab-single');
    tabCompat = document.getElementById('tab-compat');
    tabForecast = document.getElementById('tab-forecast');
    tabNumeroscope = document.getElementById('tab-numeroscope');
    tabProfiles = document.getElementById('tab-profiles');

    // Single Logic References
    entityTypeSelect = document.getElementById('entity-type-select');
    inputText = document.getElementById('input-text');
    inputDob = document.getElementById('input-dob');
    btnCalculate = document.getElementById('btn-calculate');
    resultArea = document.getElementById('result-area');
    resultMsg = document.getElementById('result-message');
    resultNum = document.getElementById('result-number');
    resBasicNum = document.getElementById('res-basic-num');
    resFriendlyList = document.getElementById('res-friendly-list');
    resNeutralList = document.getElementById('res-neutral-list');
    resEnemyList = document.getElementById('res-enemy-list');
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

    // Forecast Logic References
    inputNameFc = document.getElementById('input-name-fc');
    inputDobFc = document.getElementById('input-dob-fc');
    inputTargetDate = document.getElementById('input-target-date');
    btnForecast = document.getElementById('btn-forecast');
    forecastResultArea = document.getElementById('forecast-result-area');
    
    // Forecast Cards
    cardYear = document.getElementById('card-year');
    cardMonth = document.getElementById('card-month');
    cardDay = document.getElementById('card-day');

    // Lo Shu Grid References
    inputNameLoshu = document.getElementById('input-name-loshu');
    inputDobLoshu = document.getElementById('input-dob-loshu');
    inputGender = document.getElementById('input-gender');
    btnLoshu = document.getElementById('btn-loshu');
    loshuResultArea = document.getElementById('loshu-result-area');
    loshuDriver = document.getElementById('loshu-driver');
    loshuConductor = document.getElementById('loshu-conductor');
    loshuKua = document.getElementById('loshu-kua');
    loshuGrid = document.getElementById('loshu-grid');

    // Profile Management References
    btnSaveProfile = document.getElementById('btn-save-profile');
    saveModal = document.getElementById('save-modal');
    modalProfileName = document.getElementById('modal-profile-name');
    modalSave = document.getElementById('modal-save');
    modalCancel = document.getElementById('modal-cancel');
    profilesList = document.getElementById('profiles-list');
    emptyState = document.getElementById('empty-state');
    profileCount = document.getElementById('profile-count');
    searchProfiles = document.getElementById('search-profiles');
    btnClearAll = document.getElementById('btn-clear-all');
    btnExport = document.getElementById('btn-export');
    btnImport = document.getElementById('btn-import');
    fileImport = document.getElementById('file-import');
    importModal = document.getElementById('import-modal');
    importMerge = document.getElementById('import-merge');
    importReplace = document.getElementById('import-replace');
    importCancel = document.getElementById('import-cancel');

    // Set Default Date to Today for Target
    inputTargetDate.valueAsDate = new Date();

    // --- AUTOCOMPLETE SETUP ---
    setupAutocomplete(inputText, 'autocomplete-list');
    setupAutocomplete(inputA, 'autocomplete-list-a');
    setupAutocomplete(inputB, 'autocomplete-list-b');
    setupAutocomplete(inputNameFc, 'autocomplete-list-fc');
    setupAutocomplete(inputNameLoshu, 'autocomplete-list-loshu', true);


    // --- LANGUAGE FUNCTION ---
    function updateLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (t[key]) elem.textContent = t[key];
        });

        // Update entity type options
        entityTypeSelect.options[0].textContent = t.opt_person;
        entityTypeSelect.options[1].textContent = t.opt_business_entity;
        entityTypeSelect.options[2].textContent = t.opt_vehicle_entity;
        entityTypeSelect.options[3].textContent = t.opt_phone;
        entityTypeSelect.options[4].textContent = t.opt_other;

        if(lang === 'hi') {
            inputText.placeholder = "जैसे: सूर्य";
            inputA.placeholder = "पहला नाम";
            inputNameFc.placeholder = "नाम दर्ज करें";
            inputNameLoshu.placeholder = "नाम दर्ज करें";
        } else {
            inputText.placeholder = "e.g., Alice";
            inputA.placeholder = "A";
            inputNameFc.placeholder = "Enter name";
            inputNameLoshu.placeholder = "Enter name";
        }

        // Re-render Lo Shu analysis if it exists
        if (lastLoshuResult) {
            const analysis = engine.analyze_planes(lastLoshuResult.frequencies, currentLang);
            renderPlaneAnalysis(analysis, t);
        }

        // Re-render vibration interpretation if it exists
        if (lastVibrationNumber && lastBasicNumber) {
            const dobInterpretation = engine.get_vibration_interpretation(lastBasicNumber, currentLang);
            const nameInterpretation = engine.get_vibration_interpretation(lastVibrationNumber, currentLang);
            
            if (dobInterpretation) {
                document.getElementById('dob-interp-title').textContent = dobInterpretation.title;
                document.getElementById('dob-interp-theme').textContent = dobInterpretation.theme;
                document.getElementById('dob-interp-strengths').textContent = dobInterpretation.strengths;
                document.getElementById('dob-interp-shadow').textContent = dobInterpretation.shadow;
            }
            
            if (nameInterpretation) {
                document.getElementById('name-interp-title').textContent = nameInterpretation.title;
                document.getElementById('name-interp-theme').textContent = nameInterpretation.theme;
                document.getElementById('name-interp-strengths').textContent = nameInterpretation.strengths;
                document.getElementById('name-interp-shadow').textContent = nameInterpretation.shadow;
            }

            // Re-render colour theme labels on language switch
            renderColourPills('dob', lastBasicNumber);
            renderColourPills('name', lastVibrationNumber);
            renderFavourableDates(lastBasicNumber);
        }
    }

    langSwitch.addEventListener('change', (e) => updateLanguage(e.target.value));
    updateLanguage(currentLang);

    // --- AUTOCOMPLETE FUNCTION ---
    function setupAutocomplete(inputElement, listId, showGender = false) {
        const listElement = document.getElementById(listId);
        let currentFocus = -1;

        inputElement.addEventListener('input', function() {
            const val = this.value.trim();
            closeAllLists();
            if (!val) return;
            currentFocus = -1;

            const profiles = storage.searchProfiles(val);
            const t = translations[currentLang];

            if (profiles.length === 0) {
                const createDiv = document.createElement('div');
                createDiv.className = 'autocomplete-item create-new';
                createDiv.innerHTML = `<strong>${t.create_new}:</strong> ${val}`;
                createDiv.addEventListener('click', function() {
                    inputElement.value = val;
                    closeAllLists();
                });
                listElement.appendChild(createDiv);
            } else {
                profiles.forEach(profile => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'autocomplete-item';
                    const dobStr = new Date(profile.dob).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US');
                    const genderStr = showGender && profile.gender ? ` · ${profile.gender}` : '';
                    itemDiv.innerHTML = `<strong>${profile.name}</strong> (${dobStr}${genderStr})`;
                    itemDiv.addEventListener('click', function() {
                        inputElement.value = profile.name;
                        inputElement.dataset.profileId = profile.id;
                        syncName(profile.name, inputElement);

                        if (profile.dob) {
                            syncDob(profile.dob, null);
                        }
                        if (inputElement === inputNameLoshu && profile.gender) {
                            inputGender.value = profile.gender;
                        }

                        closeAllLists();
                    });
                    listElement.appendChild(itemDiv);
                });
            }
            listElement.style.display = 'block';
        });

        inputElement.addEventListener('keydown', function(e) {
            let items = listElement.getElementsByClassName('autocomplete-item');
            if (e.keyCode === 40) { // Down
                currentFocus++;
                addActive(items);
            } else if (e.keyCode === 38) { // Up
                currentFocus--;
                addActive(items);
            } else if (e.keyCode === 13) { // Enter
                e.preventDefault();
                if (currentFocus > -1 && items[currentFocus]) {
                    items[currentFocus].click();
                }
            }
        });

        function addActive(items) {
            if (!items) return;
            removeActive(items);
            if (currentFocus >= items.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = items.length - 1;
            items[currentFocus].classList.add('autocomplete-active');
        }

        function removeActive(items) {
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('autocomplete-active');
            }
        }

        function closeAllLists() {
            listElement.innerHTML = '';
            listElement.style.display = 'none';
        }

        document.addEventListener('click', function(e) {
            if (e.target !== inputElement) closeAllLists();
        });
    }

    // --- TAB SWITCHING ---
    tabSingle.addEventListener('click', () => switchTab('single'));
    tabCompat.addEventListener('click', () => switchTab('compat'));
    tabForecast.addEventListener('click', () => switchTab('forecast'));
    tabNumeroscope.addEventListener('click', () => switchTab('numeroscope'));
    tabProfiles.addEventListener('click', () => switchTab('profiles'));

    // --- CROSS-TAB FIELD SYNC ---
    // Name fields: inputText (single) <-> inputNameFc (forecast) <-> inputNameLoshu (numeroscope)
    function syncName(value, source) {
        if (source !== inputText)       inputText.value = value;
        if (source !== inputNameFc)     inputNameFc.value = value;
        if (source !== inputNameLoshu)  inputNameLoshu.value = value;
    }
    // DOB fields: inputDob (single) <-> inputDobFc (forecast) <-> inputDobLoshu (numeroscope)
    function syncDob(value, source) {
        if (source !== inputDob)        inputDob.value = value;
        if (source !== inputDobFc)      inputDobFc.value = value;
        if (source !== inputDobLoshu)   inputDobLoshu.value = value;
    }

    [inputText, inputNameFc, inputNameLoshu].forEach(el => {
        el.addEventListener('input', () => syncName(el.value, el));
    });
    [inputDob, inputDobFc, inputDobLoshu].forEach(el => {
        el.addEventListener('change', () => syncDob(el.value, el));
    });

    function switchTab(tabName) {
        sectionSingle.classList.add('hidden');
        sectionCompat.classList.add('hidden');
        sectionForecast.classList.add('hidden');
        sectionNumeroscope.classList.add('hidden');
        sectionProfiles.classList.add('hidden');
        
        tabSingle.classList.remove('active');
        tabCompat.classList.remove('active');
        tabForecast.classList.remove('active');
        tabNumeroscope.classList.remove('active');
        tabProfiles.classList.remove('active');

        if(tabName === 'single') {
            sectionSingle.classList.remove('hidden');
            tabSingle.classList.add('active');
        } else if(tabName === 'compat') {
            sectionCompat.classList.remove('hidden');
            tabCompat.classList.add('active');
        } else if(tabName === 'forecast') {
            sectionForecast.classList.remove('hidden');
            tabForecast.classList.add('active');
        } else if(tabName === 'numeroscope') {
            sectionNumeroscope.classList.remove('hidden');
            tabNumeroscope.classList.add('active');
        } else if(tabName === 'profiles') {
            sectionProfiles.classList.remove('hidden');
            tabProfiles.classList.add('active');
            loadProfiles();
        }
    }

    // --- FORECAST LOGIC ---
    btnForecast.addEventListener('click', () => {
        const name = inputNameFc.value.trim();
        const dob = inputDobFc.value;
        const target = inputTargetDate.value;
        const t = translations[currentLang];

        if(!name) return alert(currentLang === 'hi' ? "कृपया नाम दर्ज करें" : "Please enter name");
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

    // --- LO SHU GRID LOGIC ---
    btnLoshu.addEventListener('click', () => {
        const name = inputNameLoshu.value.trim();
        const dob = inputDobLoshu.value;
        const gender = inputGender.value;
        const t = translations[currentLang];

        if (!name) return alert(currentLang === 'hi' ? 'कृपया नाम दर्ज करें' : 'Please enter a name');
        if (!dob) return alert(currentLang === 'hi' ? 'कृपया जन्म तिथि दर्ज करें' : 'Please enter date of birth');

        const result = engine.calculate_lo_shu_grid(dob, gender);
        lastLoshuResult = result; // Store for language switching
        
        const analysis = engine.analyze_planes(result.frequencies, currentLang);
        
        loshuDriver.textContent = result.driver;
        loshuConductor.textContent = result.conductor;
        loshuKua.textContent = result.kua;
        
        // Render grid
        loshuGrid.innerHTML = '';
        result.grid.forEach((row, rowIdx) => {
            row.forEach((count, colIdx) => {
                const cell = document.createElement('div');
                cell.className = 'loshu-cell';
                
                // Get the number for this position
                const numMap = [
                    [4, 9, 2],
                    [3, 5, 7],
                    [8, 1, 6]
                ];
                const num = numMap[rowIdx][colIdx];
                
                // Create cell content
                const numLabel = document.createElement('div');
                numLabel.className = 'cell-number';
                numLabel.textContent = num;
                
                const countLabel = document.createElement('div');
                countLabel.className = 'cell-count';
                if (count > 0) {
                    countLabel.textContent = Array(count).fill(num).join(', ');
                    cell.classList.add('filled');
                } else {
                    countLabel.textContent = '-';
                    cell.classList.add('empty');
                }
                
                cell.appendChild(numLabel);
                cell.appendChild(countLabel);
                loshuGrid.appendChild(cell);
            });
        });
        
        // Render plane analysis
        renderPlaneAnalysis(analysis, t);
        
        loshuResultArea.classList.remove('hidden');

        // Save/update profile with numeroscope results
        storage.saveProfile({
            name: name,
            dob: dob,
            gender: gender,
            category: 'Person',
            text: name,
            entityType: 'Person',
            basicNumber: result.driver,
            luckyNumbers: [],
            vibration: result.conductor,
            suitability: '',
            suitabilityCode: ''
        });
    });

    function renderFavourableDates(basicNumber) {
        const dates = engine.get_favourable_dates(basicNumber);
        const grid = document.getElementById('dob-dates-grid');
        grid.innerHTML = '';
        for (let d = 1; d <= 31; d++) {
            const cell = document.createElement('span');
            cell.className = 'date-cell';
            cell.textContent = d;
            if (dates.best.includes(d))        cell.classList.add('date-best');
            else if (dates.good.includes(d))   cell.classList.add('date-good');
            else if (dates.avoid.includes(d))  cell.classList.add('date-avoid');
            else                               cell.classList.add('date-neutral');
            grid.appendChild(cell);
        }
    }

    function renderColourPills(prefix, number) {
        const data = engine.get_favourable_colours(number, currentLang);
        if (!data) return;
        const t = translations[currentLang];
        const pillsEl = document.getElementById(`${prefix}-colour-pills`);
        const themeEl = document.getElementById(`${prefix}-colour-theme`);
        pillsEl.innerHTML = data.colours.map(c => {
            const hex = c.hex;
            // Convert hex to rgb for rgba tint
            const r = parseInt(hex.slice(1,3),16);
            const g = parseInt(hex.slice(3,5),16);
            const b = parseInt(hex.slice(5,7),16);
            return `<span class="colour-pill" style="background:rgba(${r},${g},${b},0.15);color:${hex};border-color:rgba(${r},${g},${b},0.35)">
                <span class="colour-dot" style="background:${hex}"></span>${c.name}
            </span>`;
        }).join('');
        themeEl.textContent = currentLang === 'hi' ? `${data.theme} ${t.colour_theme_prefix}` : `${t.colour_theme_prefix} ${data.theme}`;
    }

    function renderPlaneAnalysis(analysis, t) {
        // Full Planes
        const fullPlanesList = document.getElementById('full-planes-list');
        if (analysis.full_planes.length === 0) {
            fullPlanesList.innerHTML = `<div class="no-planes">${currentLang === 'hi' ? 'कोई पूर्ण तल नहीं' : 'No full planes'}</div>`;
        } else {
            fullPlanesList.innerHTML = analysis.full_planes.map(plane => `
                <div class="plane-card full-plane">
                    <div class="plane-header">
                        <span class="plane-name">${plane.name}</span>
                        <span class="plane-numbers">${plane.numbers_present.join(', ')}</span>
                    </div>
                    <div class="plane-interpretation">${plane.interpretation}</div>
                </div>
            `).join('');
        }

        // Partial Planes
        const partialPlanesList = document.getElementById('partial-planes-list');
        if (analysis.partial_planes.length === 0) {
            partialPlanesList.innerHTML = `<div class="no-planes">${currentLang === 'hi' ? 'कोई आंशिक तल नहीं' : 'No partial planes'}</div>`;
        } else {
            partialPlanesList.innerHTML = analysis.partial_planes.map(plane => `
                <div class="plane-card partial-plane">
                    <div class="plane-header">
                        <span class="plane-name">${plane.name}</span>
                    </div>
                    <div class="plane-numbers-detail">
                        <span class="present"><strong>${t.present_numbers}:</strong> ${plane.numbers_present.join(', ') || '-'}</span>
                        <span class="missing"><strong>${t.missing_numbers}:</strong> ${plane.numbers_missing.join(', ') || '-'}</span>
                    </div>
                </div>
            `).join('');
        }

        // Empty Planes
        const emptyPlanesList = document.getElementById('empty-planes-list');
        if (analysis.empty_planes.length === 0) {
            emptyPlanesList.innerHTML = `<div class="no-planes">${currentLang === 'hi' ? 'कोई खाली तल नहीं' : 'No empty planes'}</div>`;
        } else {
            emptyPlanesList.innerHTML = analysis.empty_planes.map(plane => `
                <div class="plane-card empty-plane">
                    <div class="plane-header">
                        <span class="plane-name">${plane.name}</span>
                        <span class="plane-numbers missing-all">${plane.numbers_missing.join(', ')}</span>
                    </div>
                    <div class="plane-interpretation">${plane.interpretation}</div>
                </div>
            `).join('');
        }
    }

    // ... (Existing Event Listeners for other tabs) ...
    // Note: Re-paste the Calculate and Compare listeners here if you are overwriting the whole file,
    // or just append the forecast logic if you are editing incrementally.
    btnCalculate.addEventListener('click', () => {
        const text = inputText.value.trim();
        const dob = inputDob.value;
        const entityType = entityTypeSelect.value;
        const t = translations[currentLang];

        if (!text || !dob) return alert(t.msg_enter_all);

        const nameVibration = engine.calculate_vibration(text);
        const dateMetrics = engine.calculate_date_metrics(dob);
        const friendlyNumbers = engine.get_friendly_numbers(dateMetrics.day_number);
        const neutralNumbers = engine.get_neutral_numbers(dateMetrics.day_number);
        const enemyNumbers = engine.get_enemy_numbers(dateMetrics.day_number);
        const luckyNumbers = engine.get_lucky_numbers(dateMetrics);
        const suitability = engine.analyze_name_suitability(nameVibration, dateMetrics.day_number, luckyNumbers);

        const categoryLabel = entityTypeSelect.options[entityTypeSelect.selectedIndex].text;
        
        // Store last analysis for saving
        lastAnalysisData = {
            name: text,
            dob: dob,
            category: categoryLabel,
            text: text,
            entityType: entityType,
            basicNumber: dateMetrics.day_number,
            luckyNumbers: luckyNumbers,
            vibration: nameVibration,
            suitability: suitability.status,
            suitabilityCode: suitability.code
        };

        resBasicNum.textContent = dateMetrics.day_number;
        resFriendlyList.textContent = friendlyNumbers.join(", ");
        resNeutralList.textContent = neutralNumbers.join(", ");
        resEnemyList.textContent = enemyNumbers.join(", ");

        if(currentLang === 'hi') {
            resultMsg.innerHTML = `${categoryLabel} <strong>"${text}"</strong> ${t.res_vibration}:`;
        } else {
            resultMsg.innerHTML = `${t.res_prefix} <strong>${categoryLabel}</strong> "${text}" ${t.res_vibration}:`;
        }
        resultNum.textContent = nameVibration;

        // Store vibration number for language switching
        lastVibrationNumber = nameVibration;
        lastBasicNumber = dateMetrics.day_number;

        // Render colour pills
        renderColourPills('dob', dateMetrics.day_number);
        renderColourPills('name', nameVibration);
        renderFavourableDates(dateMetrics.day_number);

        // Display dual interpretation (DOB + Name)
        const dobInterpretation = engine.get_vibration_interpretation(dateMetrics.day_number, currentLang);
        const nameInterpretation = engine.get_vibration_interpretation(nameVibration, currentLang);
        
        if (dobInterpretation && nameInterpretation) {
            // DOB Analysis
            document.getElementById('dob-number-badge').textContent = dateMetrics.day_number;
            document.getElementById('dob-interp-title').textContent = dobInterpretation.title;
            document.getElementById('dob-interp-theme').textContent = dobInterpretation.theme;
            document.getElementById('dob-interp-strengths').textContent = dobInterpretation.strengths;
            document.getElementById('dob-interp-shadow').textContent = dobInterpretation.shadow;
            
            // Name Analysis
            document.getElementById('name-number-badge').textContent = nameVibration;
            document.getElementById('name-interp-title').textContent = nameInterpretation.title;
            document.getElementById('name-interp-theme').textContent = nameInterpretation.theme;
            document.getElementById('name-interp-strengths').textContent = nameInterpretation.strengths;
            document.getElementById('name-interp-shadow').textContent = nameInterpretation.shadow;
            
            document.getElementById('dual-interpretation').classList.remove('hidden');
        }

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

    // --- PROFILE MANAGEMENT ---
    
    // Save Profile Button
    btnSaveProfile.addEventListener('click', () => {
        if (!lastAnalysisData) return;
        modalProfileName.value = lastAnalysisData.name;
        saveModal.classList.remove('hidden');
        modalProfileName.focus();
    });

    // Modal Save
    modalSave.addEventListener('click', () => {
        const profileName = modalProfileName.value.trim();
        if (!profileName) return alert(currentLang === 'hi' ? 'कृपया नाम दर्ज करें' : 'Please enter a name');
        
        const result = storage.saveProfile({
            ...lastAnalysisData,
            name: profileName
        });
        
        if (result.success) {
            saveModal.classList.add('hidden');
            const t = translations[currentLang];
            const msg = result.updated ? 
                (currentLang === 'hi' ? 'प्रोफाइल अपडेट किया गया!' : 'Profile updated!') : 
                t.profile_saved;
            alert(msg);
        } else {
            alert(result.error);
        }
    });

    // Modal Cancel
    modalCancel.addEventListener('click', () => {
        saveModal.classList.add('hidden');
    });

    // Close modal on background click
    saveModal.addEventListener('click', (e) => {
        if (e.target === saveModal) {
            saveModal.classList.add('hidden');
        }
    });

    // Load Profiles
    function loadProfiles(searchQuery = '') {
        const profiles = searchQuery ? storage.searchProfiles(searchQuery) : storage.getAllProfiles();
        const t = translations[currentLang];
        
        profileCount.textContent = storage.getCount();
        
        if (profiles.length === 0) {
            profilesList.innerHTML = '';
            emptyState.classList.remove('hidden');
            btnClearAll.classList.add('hidden');
            btnExport.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            btnClearAll.classList.remove('hidden');
            btnExport.classList.remove('hidden');
            renderProfiles(profiles);
        }
    }

    // Render Profile Cards
    function renderProfiles(profiles) {
        const t = translations[currentLang];
        profilesList.innerHTML = profiles.map(profile => `
            <div class="profile-card" data-id="${profile.id}">
                <div class="profile-card-header">
                    <div>
                        <h3 class="profile-name">${profile.name}</h3>
                        <div class="profile-date">${new Date(profile.createdAt).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US')}</div>
                    </div>
                </div>
                <div class="profile-card-body">
                    <div class="profile-info-item">
                        <span class="profile-info-label">${t.profile_dob}</span>
                        <span class="profile-info-value">${new Date(profile.dob).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US')}</span>
                    </div>
                    <div class="profile-info-item">
                        <span class="profile-info-label">${t.profile_category}</span>
                        <span class="profile-info-value">${profile.entityType || profile.category}</span>
                    </div>
                    <div class="profile-info-item">
                        <span class="profile-info-label">${t.profile_vibration}</span>
                        <span class="profile-info-value">${profile.results.vibration}</span>
                    </div>
                    <div class="profile-info-item">
                        <span class="profile-info-label">${t.profile_status}</span>
                        <span class="profile-info-value">${profile.results.suitability}</span>
                    </div>
                </div>
                <div class="profile-card-footer">
                    <button class="profile-btn profile-btn-load" data-action="load" data-id="${profile.id}">${t.btn_load}</button>
                    <button class="profile-btn profile-btn-delete" data-action="delete" data-id="${profile.id}">${t.btn_delete}</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to buttons
        document.querySelectorAll('[data-action="load"]').forEach(btn => {
            btn.addEventListener('click', (e) => loadProfile(e.target.dataset.id));
        });
        
        document.querySelectorAll('[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', (e) => deleteProfile(e.target.dataset.id));
        });
    }

    // Load Profile into Analyzer
    function loadProfile(id) {
        const profile = storage.getProfile(id);
        if (!profile) return;
        
        inputDob.value = profile.dob;
        inputText.value = profile.text;
        
        // Set entity type
        entityTypeSelect.value = profile.entityType || 'Person';
        
        switchTab('single');
    }

    // Delete Profile
    function deleteProfile(id) {
        const t = translations[currentLang];
        if (!confirm(t.confirm_delete)) return;
        
        const result = storage.deleteProfile(id);
        if (result.success) {
            loadProfiles(searchProfiles.value);
        }
    }

    // Search Profiles
    searchProfiles.addEventListener('input', (e) => {
        loadProfiles(e.target.value);
    });

    // Clear All Profiles
    btnClearAll.addEventListener('click', () => {
        const t = translations[currentLang];
        if (!confirm(t.confirm_clear_all)) return;
        
        const result = storage.clearAll();
        if (result.success) {
            loadProfiles();
        }
    });

    // --- EXPORT/IMPORT FUNCTIONALITY ---
    
    // Export Profiles
    btnExport.addEventListener('click', () => {
        const result = storage.exportProfiles();
        if (result.success) {
            const t = translations[currentLang];
            alert(t.export_success);
        }
    });

    // Import Button Click
    btnImport.addEventListener('click', () => {
        fileImport.click();
    });

    // File Selected
    let importedData = null;
    fileImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                importedData = JSON.parse(event.target.result);
                // Validate data
                if (!Array.isArray(importedData)) {
                    throw new Error('Invalid format');
                }
                // Show import options modal
                importModal.classList.remove('hidden');
            } catch (error) {
                const t = translations[currentLang];
                alert(t.import_error);
                importedData = null;
            }
        };
        reader.readAsText(file);
        // Reset file input
        e.target.value = '';
    });

    // Import Merge
    importMerge.addEventListener('click', () => {
        if (!importedData) return;
        const result = storage.importProfiles(importedData, 'merge');
        if (result.success) {
            const t = translations[currentLang];
            alert(`${t.import_success} (${result.count} ${t.import_merged})`);
            loadProfiles();
        }
        importModal.classList.add('hidden');
        importedData = null;
    });

    // Import Replace
    importReplace.addEventListener('click', () => {
        if (!importedData) return;
        const result = storage.importProfiles(importedData, 'replace');
        if (result.success) {
            const t = translations[currentLang];
            alert(`${t.import_success} (${result.count} ${t.import_replaced})`);
            loadProfiles();
        }
        importModal.classList.add('hidden');
        importedData = null;
    });

    // Import Cancel
    importCancel.addEventListener('click', () => {
        importModal.classList.add('hidden');
        importedData = null;
    });

    // Close import modal on background click
    importModal.addEventListener('click', (e) => {
        if (e.target === importModal) {
            importModal.classList.add('hidden');
            importedData = null;
        }
    });
});