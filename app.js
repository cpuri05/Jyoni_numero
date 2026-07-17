import { translations } from './js/translations.js';
import { switchTab, setupFieldSync, setupAutocomplete } from './js/tabs.js';
import {
    renderPlaneAnalysis, renderColourPills, renderFavourableDates,
    renderLoshuGrid, renderProfiles, updateForecastCard
} from './js/ui.js';

let currentLang = 'en';
let engine, storage;
let lastAnalysisData = null;
let lastLoshuResult = null;
let lastVibrationNumber = null;
let lastBasicNumber = null;

document.addEventListener('DOMContentLoaded', () => {
    engine  = new NumerologyEngine();
    storage = new ProfileStorage();

    // --- DOM REFERENCES ---
    const langSwitch       = document.getElementById('lang-switch');
    const entityTypeSelect = document.getElementById('entity-type-select');
    const inputText        = document.getElementById('input-text');
    const inputDob         = document.getElementById('input-dob');
    const btnCalculate     = document.getElementById('btn-calculate');
    const resultArea       = document.getElementById('result-area');
    const resultMsg        = document.getElementById('result-message');
    const resultNum        = document.getElementById('result-number');
    const resBasicNum      = document.getElementById('res-basic-num');
    const resFriendlyList  = document.getElementById('res-friendly-list');
    const resNeutralList   = document.getElementById('res-neutral-list');
    const resEnemyList     = document.getElementById('res-enemy-list');
    const suitabilityBox   = document.getElementById('suitability-box');

    const inputA          = document.getElementById('compat-input-a');
    const inputB          = document.getElementById('compat-input-b');
    const btnCompare      = document.getElementById('btn-compare');
    const compatResultArea = document.getElementById('compat-result-area');
    const numADisp        = document.getElementById('num-a-disp');
    const numBDisp        = document.getElementById('num-b-disp');
    const nameADisp       = document.getElementById('name-a-disp');
    const nameBDisp       = document.getElementById('name-b-disp');
    const relationStatus  = document.getElementById('relation-status');
    const compatDesc      = document.getElementById('compat-desc');

    const inputNameFc      = document.getElementById('input-name-fc');
    const inputDobFc       = document.getElementById('input-dob-fc');
    const inputTargetDate  = document.getElementById('input-target-date');
    const btnForecast      = document.getElementById('btn-forecast');
    const forecastResultArea = document.getElementById('forecast-result-area');

    const inputNameLoshu  = document.getElementById('input-name-loshu');
    const inputDobLoshu   = document.getElementById('input-dob-loshu');
    const inputGender     = document.getElementById('input-gender');
    const btnLoshu        = document.getElementById('btn-loshu');
    const loshuResultArea = document.getElementById('loshu-result-area');
    const loshuDriver     = document.getElementById('loshu-driver');
    const loshuConductor  = document.getElementById('loshu-conductor');
    const loshuKua        = document.getElementById('loshu-kua');
    const loshuGrid       = document.getElementById('loshu-grid');

    const btnSaveProfile   = document.getElementById('btn-save-profile');
    const saveModal        = document.getElementById('save-modal');
    const modalProfileName = document.getElementById('modal-profile-name');
    const modalSave        = document.getElementById('modal-save');
    const modalCancel      = document.getElementById('modal-cancel');
    const profilesList     = document.getElementById('profiles-list');
    const emptyState       = document.getElementById('empty-state');
    const profileCount     = document.getElementById('profile-count');
    const searchProfiles   = document.getElementById('search-profiles');
    const btnClearAll      = document.getElementById('btn-clear-all');
    const btnExport        = document.getElementById('btn-export');
    const btnImport        = document.getElementById('btn-import');
    const fileImport       = document.getElementById('file-import');
    const importModal      = document.getElementById('import-modal');
    const importMerge      = document.getElementById('import-merge');
    const importReplace    = document.getElementById('import-replace');
    const importCancel     = document.getElementById('import-cancel');

    // --- INIT ---
    inputTargetDate.valueAsDate = new Date();

    // --- LANGUAGE ---
    function t() { return translations[currentLang]; }

    function updateLanguage(lang) {
        currentLang = lang;
        const tr = t();
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (tr[key]) el.textContent = tr[key];
        });
        entityTypeSelect.options[0].textContent = tr.opt_person;
        entityTypeSelect.options[1].textContent = tr.opt_business_entity;
        entityTypeSelect.options[2].textContent = tr.opt_vehicle_entity;
        entityTypeSelect.options[3].textContent = tr.opt_phone;
        entityTypeSelect.options[4].textContent = tr.opt_other;

        if (lang === 'hi') {
            inputText.placeholder     = 'जैसे: सूर्य';
            inputA.placeholder        = 'पहला नाम';
            inputNameFc.placeholder   = 'नाम दर्ज करें';
            inputNameLoshu.placeholder = 'नाम दर्ज करें';
        } else {
            inputText.placeholder     = 'e.g., Alice';
            inputA.placeholder        = 'A';
            inputNameFc.placeholder   = 'Enter name';
            inputNameLoshu.placeholder = 'Enter name';
        }

        if (lastLoshuResult) {
            const analysis = engine.analyze_planes(lastLoshuResult.frequencies, currentLang);
            renderPlaneAnalysis(analysis, tr, currentLang);
        }

        if (lastVibrationNumber && lastBasicNumber) {
            const dobInterp  = engine.get_vibration_interpretation(lastBasicNumber, currentLang);
            const nameInterp = engine.get_vibration_interpretation(lastVibrationNumber, currentLang);
            if (dobInterp) {
                document.getElementById('dob-interp-title').textContent     = dobInterp.title;
                document.getElementById('dob-interp-theme').textContent     = dobInterp.theme;
                document.getElementById('dob-interp-strengths').textContent = dobInterp.strengths;
                document.getElementById('dob-interp-shadow').textContent    = dobInterp.shadow;
            }
            if (nameInterp) {
                document.getElementById('name-interp-title').textContent     = nameInterp.title;
                document.getElementById('name-interp-theme').textContent     = nameInterp.theme;
                document.getElementById('name-interp-strengths').textContent = nameInterp.strengths;
                document.getElementById('name-interp-shadow').textContent    = nameInterp.shadow;
            }
            renderColourPills('dob',  lastBasicNumber,    engine, currentLang, tr);
            renderColourPills('name', lastVibrationNumber, engine, currentLang, tr);
            renderFavourableDates(lastBasicNumber, engine);
        }
    }

    langSwitch.addEventListener('change', e => updateLanguage(e.target.value));
    updateLanguage(currentLang);

    // --- FIELD SYNC & AUTOCOMPLETE ---
    const { syncName, syncDob } = setupFieldSync(
        [inputText, inputNameFc, inputNameLoshu],
        [inputDob, inputDobFc, inputDobLoshu]
    );
    const getLang = () => currentLang;
    setupAutocomplete(inputText,      'autocomplete-list',       storage, getLang, syncName, syncDob);
    setupAutocomplete(inputA,         'autocomplete-list-a',     storage, getLang, syncName, syncDob);
    setupAutocomplete(inputB,         'autocomplete-list-b',     storage, getLang, syncName, syncDob);
    setupAutocomplete(inputNameFc,    'autocomplete-list-fc',    storage, getLang, syncName, syncDob);
    setupAutocomplete(inputNameLoshu, 'autocomplete-list-loshu', storage, getLang, syncName, syncDob, inputGender);

    // --- TABS ---
    ['single', 'compat', 'forecast', 'numeroscope', 'profiles'].forEach(name => {
        document.getElementById(`tab-${name}`).addEventListener('click', () =>
            switchTab(name, loadProfiles)
        );
    });

    // --- NUMBER ANALYSIS ---
    btnCalculate.addEventListener('click', () => {
        const text      = inputText.value.trim();
        const dob       = inputDob.value;
        const tr        = t();
        if (!text || !dob) return alert(tr.msg_enter_all);

        const nameVibration  = engine.calculate_vibration(text);
        const dateMetrics    = engine.calculate_date_metrics(dob);
        const friendlyNums   = engine.get_friendly_numbers(dateMetrics.day_number);
        const neutralNums    = engine.get_neutral_numbers(dateMetrics.day_number);
        const enemyNums      = engine.get_enemy_numbers(dateMetrics.day_number);
        const luckyNumbers   = engine.get_lucky_numbers(dateMetrics);
        const suitability    = engine.analyze_name_suitability(nameVibration, dateMetrics.day_number, luckyNumbers);
        const categoryLabel  = entityTypeSelect.options[entityTypeSelect.selectedIndex].text;

        lastAnalysisData = {
            name: text, dob, category: categoryLabel, text,
            entityType: entityTypeSelect.value,
            basicNumber: dateMetrics.day_number, luckyNumbers,
            vibration: nameVibration,
            suitability: suitability.status, suitabilityCode: suitability.code
        };
        lastVibrationNumber = nameVibration;
        lastBasicNumber     = dateMetrics.day_number;

        resBasicNum.textContent     = dateMetrics.day_number;
        resFriendlyList.textContent = friendlyNums.join(', ');
        resNeutralList.textContent  = neutralNums.join(', ');
        resEnemyList.textContent    = enemyNums.join(', ');

        resultMsg.innerHTML = currentLang === 'hi'
            ? `${categoryLabel} <strong>"${text}"</strong> ${tr.res_vibration}:`
            : `${tr.res_prefix} <strong>${categoryLabel}</strong> "${text}" ${tr.res_vibration}:`;
        resultNum.textContent = nameVibration;

        renderColourPills('dob',  dateMetrics.day_number, engine, currentLang, tr);
        renderColourPills('name', nameVibration,           engine, currentLang, tr);
        renderFavourableDates(dateMetrics.day_number, engine);

        const dobInterp  = engine.get_vibration_interpretation(dateMetrics.day_number, currentLang);
        const nameInterp = engine.get_vibration_interpretation(nameVibration, currentLang);
        if (dobInterp && nameInterp) {
            document.getElementById('dob-number-badge').textContent      = dateMetrics.day_number;
            document.getElementById('dob-interp-title').textContent      = dobInterp.title;
            document.getElementById('dob-interp-theme').textContent      = dobInterp.theme;
            document.getElementById('dob-interp-strengths').textContent  = dobInterp.strengths;
            document.getElementById('dob-interp-shadow').textContent     = dobInterp.shadow;
            document.getElementById('name-number-badge').textContent     = nameVibration;
            document.getElementById('name-interp-title').textContent     = nameInterp.title;
            document.getElementById('name-interp-theme').textContent     = nameInterp.theme;
            document.getElementById('name-interp-strengths').textContent = nameInterp.strengths;
            document.getElementById('name-interp-shadow').textContent    = nameInterp.shadow;
            document.getElementById('dual-interpretation').classList.remove('hidden');
        }

        const suitMap = {
            lucky_match: { text: tr.suit_exc,   cls: 'status-Friend' },
            friend:      { text: tr.suit_good,  cls: 'status-Friend' },
            enemy:       { text: tr.suit_avoid, cls: 'status-Enemy'  },
        };
        const suit = suitMap[suitability.code] || { text: tr.suit_neut, cls: 'status-Neutral' };
        suitabilityBox.textContent = suit.text;
        suitabilityBox.className   = `suitability-badge ${suit.cls}`;
        resultArea.classList.remove('hidden');
    });

    // --- COMPATIBILITY ---
    btnCompare.addEventListener('click', () => {
        const textA = inputA.value.trim();
        const textB = inputB.value.trim();
        const tr    = t();
        if (!textA || !textB) return alert(currentLang === 'hi' ? 'कृपया दोनों नाम दर्ज करें' : 'Please enter both names');

        const numA   = engine.calculate_vibration(textA);
        const numB   = engine.calculate_vibration(textB);
        const rawRel = engine.check_compatibility(numA, numB);
        const relMap = { Friend: tr.rel_friend, Neutral: tr.rel_neutral, Enemy: tr.rel_enemy };
        const displayRel = relMap[rawRel] || rawRel;

        nameADisp.textContent    = textA;
        numADisp.textContent     = numA;
        nameBDisp.textContent    = textB;
        numBDisp.textContent     = numB;
        relationStatus.textContent = displayRel;
        relationStatus.className = `relation-badge status-${rawRel}`;
        compatDesc.innerHTML = currentLang === 'hi'
            ? `${textA} (${numA}) और ${textB} (${numB}) के बीच <strong>${displayRel}</strong> ${tr.rel_desc}।`
            : `${textA} (${numA}) and ${textB} (${numB}) ${tr.rel_desc} <strong>${displayRel}s</strong>.`;
        compatResultArea.classList.remove('hidden');
    });

    // --- FORECAST ---
    btnForecast.addEventListener('click', () => {
        const name   = inputNameFc.value.trim();
        const dob    = inputDobFc.value;
        const target = inputTargetDate.value;
        const tr     = t();
        if (!name)         return alert(currentLang === 'hi' ? 'कृपया नाम दर्ज करें' : 'Please enter name');
        if (!dob || !target) return alert(currentLang === 'hi' ? 'कृपया सभी तिथियां भरें' : 'Please enter all dates');

        const dateObj   = new Date(target);
        const jeevank   = engine.get_jeevank(dob);
        const varshank  = engine.get_varshank(jeevank, dateObj.getFullYear());
        const masank    = engine.get_masank(varshank, dateObj.getMonth() + 1);
        const dinank    = engine.get_dinank(masank, dateObj.getDate(), engine.get_weekday_value(dateObj));
        const locale    = currentLang === 'hi' ? 'hi-IN' : 'en-US';

        updateForecastCard('card-year',  varshank, engine.check_compatibility(jeevank, varshank),  `${dateObj.getFullYear()}`, tr);
        updateForecastCard('card-month', masank,   engine.check_compatibility(varshank, masank),   dateObj.toLocaleString(locale, { month: 'long' }), tr);
        updateForecastCard('card-day',   dinank,   engine.check_compatibility(masank, dinank),     `${dateObj.getDate()} (${dateObj.toLocaleString(locale, { weekday: 'short' })})`, tr);
        forecastResultArea.classList.remove('hidden');
    });

    // --- NUMEROSCOPE ---
    btnLoshu.addEventListener('click', () => {
        const name   = inputNameLoshu.value.trim();
        const dob    = inputDobLoshu.value;
        const gender = inputGender.value;
        const tr     = t();
        if (!name) return alert(currentLang === 'hi' ? 'कृपया नाम दर्ज करें' : 'Please enter a name');
        if (!dob)  return alert(currentLang === 'hi' ? 'कृपया जन्म तिथि दर्ज करें' : 'Please enter date of birth');

        const result = engine.calculate_lo_shu_grid(dob, gender);
        lastLoshuResult = result;

        loshuDriver.textContent    = result.driver;
        loshuConductor.textContent = result.conductor;
        loshuKua.textContent       = result.kua;

        renderLoshuGrid(result, loshuGrid);
        renderPlaneAnalysis(engine.analyze_planes(result.frequencies, currentLang), tr, currentLang);
        loshuResultArea.classList.remove('hidden');

        storage.saveProfile({
            name, dob, gender, category: 'Person', text: name, entityType: 'Person',
            basicNumber: result.driver, luckyNumbers: [],
            vibration: result.conductor, suitability: '', suitabilityCode: ''
        });
    });

    // --- PROFILE MANAGEMENT ---
    btnSaveProfile.addEventListener('click', () => {
        if (!lastAnalysisData) return;
        modalProfileName.value = lastAnalysisData.name;
        saveModal.classList.remove('hidden');
        modalProfileName.focus();
    });

    modalSave.addEventListener('click', () => {
        const profileName = modalProfileName.value.trim();
        if (!profileName) return alert(currentLang === 'hi' ? 'कृपया नाम दर्ज करें' : 'Please enter a name');
        const result = storage.saveProfile({ ...lastAnalysisData, name: profileName });
        if (result.success) {
            saveModal.classList.add('hidden');
            const tr  = t();
            alert(result.updated ? (currentLang === 'hi' ? 'प्रोफाइल अपडेट किया गया!' : 'Profile updated!') : tr.profile_saved);
        } else {
            alert(result.error);
        }
    });

    modalCancel.addEventListener('click', () => saveModal.classList.add('hidden'));
    saveModal.addEventListener('click', e => { if (e.target === saveModal) saveModal.classList.add('hidden'); });

    function loadProfiles(searchQuery = '') {
        const profiles = searchQuery ? storage.searchProfiles(searchQuery) : storage.getAllProfiles();
        const tr = t();
        profileCount.textContent = storage.getCount();
        const hasProfiles = profiles.length > 0;
        emptyState.classList.toggle('hidden', hasProfiles);
        btnClearAll.classList.toggle('hidden', !hasProfiles);
        btnExport.classList.toggle('hidden', !hasProfiles);
        if (!hasProfiles) { profilesList.innerHTML = ''; return; }

        profilesList.innerHTML = renderProfiles(profiles, currentLang, tr);
        document.querySelectorAll('[data-action="load"]').forEach(btn =>
            btn.addEventListener('click', e => {
                const profile = storage.getProfile(e.target.dataset.id);
                if (!profile) return;
                inputDob.value  = profile.dob;
                inputText.value = profile.text;
                entityTypeSelect.value = profile.entityType || 'Person';
                switchTab('single');
            })
        );
        document.querySelectorAll('[data-action="delete"]').forEach(btn =>
            btn.addEventListener('click', e => {
                if (!confirm(t().confirm_delete)) return;
                const result = storage.deleteProfile(e.target.dataset.id);
                if (result.success) loadProfiles(searchProfiles.value);
            })
        );
    }

    searchProfiles.addEventListener('input', e => loadProfiles(e.target.value));

    btnClearAll.addEventListener('click', () => {
        if (!confirm(t().confirm_clear_all)) return;
        const result = storage.clearAll();
        if (result.success) loadProfiles();
    });

    btnExport.addEventListener('click', () => {
        const result = storage.exportProfiles();
        if (result.success) alert(t().export_success);
    });

    btnImport.addEventListener('click', () => fileImport.click());

    let importedData = null;
    fileImport.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = event => {
            try {
                importedData = JSON.parse(event.target.result);
                if (!Array.isArray(importedData)) throw new Error('Invalid format');
                importModal.classList.remove('hidden');
            } catch {
                alert(t().import_error);
                importedData = null;
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });

    importMerge.addEventListener('click', () => {
        if (!importedData) return;
        const result = storage.importProfiles(importedData, 'merge');
        if (result.success) { alert(`${t().import_success} (${result.count} ${t().import_merged})`); loadProfiles(); }
        importModal.classList.add('hidden');
        importedData = null;
    });

    importReplace.addEventListener('click', () => {
        if (!importedData) return;
        const result = storage.importProfiles(importedData, 'replace');
        if (result.success) { alert(`${t().import_success} (${result.count} ${t().import_replaced})`); loadProfiles(); }
        importModal.classList.add('hidden');
        importedData = null;
    });

    importCancel.addEventListener('click', () => { importModal.classList.add('hidden'); importedData = null; });
    importModal.addEventListener('click', e => {
        if (e.target === importModal) { importModal.classList.add('hidden'); importedData = null; }
    });
});
