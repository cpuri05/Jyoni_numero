// Tab switching, cross-field sync, and autocomplete setup

const SECTIONS = ['single', 'compat', 'forecast', 'numeroscope', 'profiles'];

export function switchTab(tabName, onProfilesOpen) {
    SECTIONS.forEach(name => {
        document.getElementById(`section-${name}`).classList.toggle('hidden', name !== tabName);
        document.getElementById(`tab-${name}`).classList.toggle('active', name === tabName);
    });
    if (tabName === 'profiles' && onProfilesOpen) onProfilesOpen();
}

export function setupFieldSync(nameInputs, dobInputs) {
    function syncName(value, source) {
        nameInputs.forEach(el => { if (el !== source) el.value = value; });
    }
    function syncDob(value, source) {
        dobInputs.forEach(el => { if (el !== source) el.value = value; });
    }
    nameInputs.forEach(el => el.addEventListener('input', () => syncName(el.value, el)));
    dobInputs.forEach(el => el.addEventListener('change', () => syncDob(el.value, el)));

    // Return sync functions for use by autocomplete
    return { syncName, syncDob };
}

export function setupAutocomplete(inputElement, listId, storage, getLang, syncName, syncDob, genderSelect = null) {
    const listElement = document.getElementById(listId);
    let currentFocus = -1;

    inputElement.addEventListener('input', function () {
        const val = this.value.trim();
        closeList();
        if (!val) return;
        currentFocus = -1;

        const profiles = storage.searchProfiles(val);
        const t_create = getLang() === 'hi' ? 'नया बनाएं' : 'Create New';

        if (profiles.length === 0) {
            const div = document.createElement('div');
            div.className = 'autocomplete-item create-new';
            div.innerHTML = `<strong>${t_create}:</strong> ${val}`;
            div.addEventListener('click', () => { inputElement.value = val; closeList(); });
            listElement.appendChild(div);
        } else {
            const locale = getLang() === 'hi' ? 'hi-IN' : 'en-US';
            profiles.forEach(profile => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                const dobStr = new Date(profile.dob).toLocaleDateString(locale);
                const genderStr = genderSelect && profile.gender ? ` · ${profile.gender}` : '';
                item.innerHTML = `<strong>${profile.name}</strong> (${dobStr}${genderStr})`;
                item.addEventListener('click', () => {
                    inputElement.value = profile.name;
                    inputElement.dataset.profileId = profile.id;
                    syncName(profile.name, inputElement);
                    if (profile.dob) syncDob(profile.dob, null);
                    if (genderSelect && profile.gender) genderSelect.value = profile.gender;
                    closeList();
                });
                listElement.appendChild(item);
            });
        }
        listElement.style.display = 'block';
    });

    inputElement.addEventListener('keydown', function (e) {
        const items = listElement.getElementsByClassName('autocomplete-item');
        if (e.keyCode === 40) { currentFocus++; setActive(items); }
        else if (e.keyCode === 38) { currentFocus--; setActive(items); }
        else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1 && items[currentFocus]) items[currentFocus].click();
        }
    });

    document.addEventListener('click', e => { if (e.target !== inputElement) closeList(); });

    function setActive(items) {
        if (!items.length) return;
        Array.from(items).forEach(i => i.classList.remove('autocomplete-active'));
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add('autocomplete-active');
    }

    function closeList() {
        listElement.innerHTML = '';
        listElement.style.display = 'none';
    }
}
