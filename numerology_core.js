// --- START OF FILE numerology_core.js ---

class NumerologyEngine {
    constructor() {
        this.LETTER_MAP = {
            1: ['A', 'I', 'J', 'Q', 'Y'],
            2: ['B', 'K', 'R'],
            3: ['C', 'G', 'L', 'S'],
            4: ['D', 'M', 'T'],
            5: ['E', 'H', 'N', 'X'],
            6: ['U', 'V', 'W'],
            7: ['O', 'Z'],
            8: ['F', 'P']
        };

        this.RELATIONSHIPS = {
            1: { friends: [2, 3, 9], neutral: [5], enemy: [4, 6, 7, 8] },
            2: { friends: [1, 5], neutral: [3, 6, 8, 9], enemy: [4, 7] },
            3: { friends: [1, 2, 9], neutral: [4, 7, 8], enemy: [5, 6] },
            4: { friends: [5, 6, 8], neutral: [3], enemy: [1, 2, 7, 9] },
            5: { friends: [1, 4, 6, 7], neutral: [3, 8, 9], enemy: [2] },
            6: { friends: [4, 5, 8], neutral: [3, 7, 9], enemy: [1, 2] },
            7: { friends: [5, 6, 8], neutral: [3], enemy: [1, 2, 4, 9] },
            8: { friends: [4, 5, 6], neutral: [3, 7], enemy: [1, 2, 9] },
            9: { friends: [1, 2, 3], neutral: [6, 8], enemy: [4, 5, 7] }
        };
    }

    _get_digital_root(num) {
        if (num === 0) return 0;
        while (num > 9) {
            let sum = 0;
            while (num > 0) {
                sum += num % 10;
                num = Math.floor(num / 10);
            }
            num = sum;
        }
        return num;
    }

    calculate_vibration(text) {
        if (!text) return 0;
        const clean_text = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
        let total_sum = 0;
        for (let char of clean_text) {
            for (let [num, letters] of Object.entries(this.LETTER_MAP)) {
                if (letters.includes(char)) {
                    total_sum += parseInt(num);
                    break;
                }
            }
        }
        return this._get_digital_root(total_sum);
    }

    check_compatibility(source_num, target_num) {
        if (!source_num || !target_num) return "Neutral"; // Fallback
        if (source_num === target_num) return "Friend";

        const rel = this.RELATIONSHIPS[source_num];
        if (rel.friends.includes(target_num)) return "Friend";
        if (rel.neutral.includes(target_num)) return "Neutral";
        if (rel.enemy.includes(target_num)) return "Enemy";
        return "Neutral";
    }

    calculate_date_metrics(dateString) {
        if (!dateString) return null;
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const day_num = this._get_digital_root(day);
        const month_num = this._get_digital_root(month);
        const year_num = this._get_digital_root(year);
        const dob_raw_sum = day_num + month_num + year_num;
        const dob_num = this._get_digital_root(dob_raw_sum);

        return { day_number: day_num, month_number: month_num, year_number: year_num, dob_number: dob_num };
    }

    get_lucky_numbers(metrics) {
        if (!metrics) return [];
        const basic = metrics.day_number;
        const candidates = [metrics.month_number, metrics.year_number, metrics.dob_number];
        const lucky_set = new Set([basic]);
        candidates.forEach(num => {
            const rel = this.check_compatibility(basic, num);
            if (rel === 'Friend') lucky_set.add(num);
        });
        return Array.from(lucky_set).sort((a, b) => a - b);
    }

    analyze_name_suitability(name_vib, basic_num, lucky_list) {
        if (lucky_list.includes(name_vib)) return { status: "Excellent", code: "lucky_match" };
        const rel = this.check_compatibility(basic_num, name_vib);
        if (rel === 'Friend') return { status: "Good", code: "friend" };
        if (rel === 'Enemy') return { status: "Avoid", code: "enemy" };
        return { status: "Neutral", code: "neutral" };
    }

    // --- NEW: Varshaphal (Forecast) Logic ---

    // 1. Calculate Jeevank (Life Number) - Sum of full DOB
    get_jeevank(dateString) {
        if (!dateString) return 0;
        const d = new Date(dateString);
        // Formula: Sum of all digits in DD, MM, YYYY
        // Simplification: We can just sum the day, month, and year parts
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        
        let sum = day + month + year;
        return this._get_digital_root(sum);
    }

    // 2. Calculate Varshank (Year Number) = Jeevank + Current Year
    get_varshank(jeevank, currentYear) {
        return this._get_digital_root(jeevank + currentYear);
    }

    // 3. Calculate Masank (Month Number) = Varshank + Month Sequence
    get_masank(varshank, monthIndex) {
        // monthIndex: 1 for Jan, 2 for Feb...
        return this._get_digital_root(varshank + monthIndex);
    }

    // 4. Calculate Dinank (Day Number) = Masank + Date + WeekdayValue
    get_dinank(masank, dayDate, weekdayVal) {
        // weekdayVal: Sun=1, Mon=2 ... Sat=7
        let sum = masank + dayDate + weekdayVal;
        return this._get_digital_root(sum);
    }

    // Helper to get Weekday Value (Sun=1...Sat=7) from JS Date (Sun=0...Sat=6)
    get_weekday_value(dateObj) {
        return dateObj.getDay() + 1; 
    }
}