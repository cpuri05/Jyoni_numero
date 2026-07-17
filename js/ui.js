// DOM rendering helpers — no business logic, no event binding

export function renderPlaneAnalysis(analysis, t, lang) {
    const noFull    = lang === 'hi' ? 'कोई पूर्ण तल नहीं'    : 'No full planes';
    const noPartial = lang === 'hi' ? 'कोई आंशिक तल नहीं'   : 'No partial planes';
    const noEmpty   = lang === 'hi' ? 'कोई खाली तल नहीं'    : 'No empty planes';

    document.getElementById('full-planes-list').innerHTML =
        analysis.full_planes.length === 0
            ? `<div class="no-planes">${noFull}</div>`
            : analysis.full_planes.map(p => `
                <div class="plane-card full-plane">
                    <div class="plane-header">
                        <span class="plane-name">${p.name}</span>
                        <span class="plane-numbers">${p.numbers_present.join(', ')}</span>
                    </div>
                    <div class="plane-interpretation">${p.interpretation}</div>
                </div>`).join('');

    document.getElementById('partial-planes-list').innerHTML =
        analysis.partial_planes.length === 0
            ? `<div class="no-planes">${noPartial}</div>`
            : analysis.partial_planes.map(p => `
                <div class="plane-card partial-plane">
                    <div class="plane-header">
                        <span class="plane-name">${p.name}</span>
                    </div>
                    <div class="plane-numbers-detail">
                        <span class="present"><strong>${t.present_numbers}:</strong> ${p.numbers_present.join(', ') || '-'}</span>
                        <span class="missing"><strong>${t.missing_numbers}:</strong> ${p.numbers_missing.join(', ') || '-'}</span>
                    </div>
                </div>`).join('');

    document.getElementById('empty-planes-list').innerHTML =
        analysis.empty_planes.length === 0
            ? `<div class="no-planes">${noEmpty}</div>`
            : analysis.empty_planes.map(p => `
                <div class="plane-card empty-plane">
                    <div class="plane-header">
                        <span class="plane-name">${p.name}</span>
                        <span class="plane-numbers missing-all">${p.numbers_missing.join(', ')}</span>
                    </div>
                    <div class="plane-interpretation">${p.interpretation}</div>
                </div>`).join('');
}

export function renderColourPills(prefix, number, engine, lang, t) {
    const data = engine.get_favourable_colours(number, lang);
    if (!data) return;
    const pillsEl = document.getElementById(`${prefix}-colour-pills`);
    const themeEl = document.getElementById(`${prefix}-colour-theme`);
    pillsEl.innerHTML = data.colours.map(c => {
        const r = parseInt(c.hex.slice(1, 3), 16);
        const g = parseInt(c.hex.slice(3, 5), 16);
        const b = parseInt(c.hex.slice(5, 7), 16);
        return `<span class="colour-pill" style="background:rgba(${r},${g},${b},0.15);color:${c.hex};border-color:rgba(${r},${g},${b},0.35)">
            <span class="colour-dot" style="background:${c.hex}"></span>${c.name}
        </span>`;
    }).join('');
    themeEl.textContent = lang === 'hi'
        ? `${data.theme} ${t.colour_theme_prefix}`
        : `${t.colour_theme_prefix} ${data.theme}`;
}

export function renderFavourableDates(basicNumber, engine) {
    const dates = engine.get_favourable_dates(basicNumber);
    const grid = document.getElementById('dob-dates-grid');
    grid.innerHTML = '';
    for (let d = 1; d <= 31; d++) {
        const cell = document.createElement('span');
        cell.className = 'date-cell';
        cell.textContent = d;
        if (dates.best.includes(d))       cell.classList.add('date-best');
        else if (dates.good.includes(d))  cell.classList.add('date-good');
        else if (dates.avoid.includes(d)) cell.classList.add('date-avoid');
        else                              cell.classList.add('date-neutral');
        grid.appendChild(cell);
    }
}

export function renderLoshuGrid(result, loshuGrid) {
    const numMap = [
        [4, 9, 2],
        [3, 5, 7],
        [8, 1, 6]
    ];
    loshuGrid.innerHTML = '';
    result.grid.forEach((row, rowIdx) => {
        row.forEach((count, colIdx) => {
            const num = numMap[rowIdx][colIdx];
            const cell = document.createElement('div');
            cell.className = 'loshu-cell';

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
}

export function renderProfiles(profiles, lang, t, onLoad, onDelete) {
    const locale = lang === 'hi' ? 'hi-IN' : 'en-US';
    return profiles.map(profile => `
        <div class="profile-card" data-id="${profile.id}">
            <div class="profile-card-header">
                <div>
                    <h3 class="profile-name">${profile.name}</h3>
                    <div class="profile-date">${new Date(profile.createdAt).toLocaleDateString(locale)}</div>
                </div>
            </div>
            <div class="profile-card-body">
                <div class="profile-info-item">
                    <span class="profile-info-label">${t.profile_dob}</span>
                    <span class="profile-info-value">${new Date(profile.dob).toLocaleDateString(locale)}</span>
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
        </div>`).join('');
}

export function updateForecastCard(cardId, number, relation, contextText, t) {
    const card = document.getElementById(cardId);
    const numEl    = card.querySelector('.fc-number');
    const statusEl = card.querySelector('.fc-status');
    const ctxEl    = card.querySelector('.fc-context');

    numEl.textContent = number;
    ctxEl.textContent = contextText;

    let statusText, statusClass;
    if (relation === 'Friend') {
        statusText  = t.fc_favorable;
        statusClass = 'status-Friend';
    } else if (relation === 'Enemy') {
        statusText  = t.fc_unfavorable;
        statusClass = 'status-Enemy';
    } else {
        statusText  = t.fc_normal;
        statusClass = 'status-Neutral';
    }

    statusEl.textContent = statusText;
    card.className = `forecast-card ${statusClass}-border`;
}
