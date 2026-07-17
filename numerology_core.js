class NumerologyEngine {
    constructor() {
        // Chaldean Letter Values
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

        // Planetary Relationships
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
        const clean_text = text.toUpperCase();
        let total_sum = 0;
        
        for (let char of clean_text) {
            // Check if character is a digit
            if (char >= '0' && char <= '9') {
                total_sum += parseInt(char);
            }
            // Check if character is a letter
            else if (char >= 'A' && char <= 'Z') {
                for (let [num, letters] of Object.entries(this.LETTER_MAP)) {
                    if (letters.includes(char)) {
                        total_sum += parseInt(num);
                        break;
                    }
                }
            }
            // Ignore all other characters (spaces, special chars, etc.)
        }
        return this._get_digital_root(total_sum);
    }

    check_compatibility(source_num, target_num) {
        if (!source_num || !target_num) return "Neutral"; 
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

    get_friendly_numbers(basic_num) {
        if (!basic_num) return [];
        const rel = this.RELATIONSHIPS[basic_num];
        return rel ? rel.friends.sort((a, b) => a - b) : [];
    }

    get_neutral_numbers(basic_num) {
        if (!basic_num) return [];
        const rel = this.RELATIONSHIPS[basic_num];
        return rel ? rel.neutral.sort((a, b) => a - b) : [];
    }

    get_enemy_numbers(basic_num) {
        if (!basic_num) return [];
        const rel = this.RELATIONSHIPS[basic_num];
        return rel ? rel.enemy.sort((a, b) => a - b) : [];
    }

    analyze_name_suitability(name_vib, basic_num, lucky_list) {
        if (lucky_list.includes(name_vib)) return { status: "Excellent", code: "lucky_match" };
        const rel = this.check_compatibility(basic_num, name_vib);
        if (rel === 'Friend') return { status: "Good", code: "friend" };
        if (rel === 'Enemy') return { status: "Avoid", code: "enemy" };
        return { status: "Neutral", code: "neutral" };
    }

    // --- FORECAST LOGIC ---

    get_jeevank(dateString) {
        if (!dateString) return 0;
        const d = new Date(dateString);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        let sum = day + month + year;
        return this._get_digital_root(sum);
    }

    get_varshank(jeevank, currentYear) {
        return this._get_digital_root(jeevank + currentYear);
    }

    get_masank(varshank, monthIndex) {
        return this._get_digital_root(varshank + monthIndex);
    }

    get_dinank(masank, dayDate, weekdayVal) {
        let sum = masank + dayDate + weekdayVal;
        return this._get_digital_root(sum);
    }

    get_weekday_value(dateObj) {
        return dateObj.getDay() + 1; // Sun=1, Mon=2...
    }

    // --- VIBRATION NUMBER INTERPRETATIONS ---
    get_vibration_interpretation(number, lang = 'en') {
        const interpretations = {
            1: {
                title_en: "The Pioneer & Leader",
                title_hi: "अग्रणी और नेता",
                theme_en: "Independence, innovation, and original action.",
                theme_hi: "स्वतंत्रता, नवाचार और मौलिक कार्य।",
                strengths_en: "High willpower, fierce determination, and natural leadership abilities.",
                strengths_hi: "उच्च इच्छाशक्ति, दृढ़ संकल्प और स्वाभाविक नेतृत्व क्षमता।",
                shadow_en: "Can become aggressive, self-centered, or emotionally distant.",
                shadow_hi: "आक्रामक, आत्म-केंद्रित या भावनात्मक रूप से दूर हो सकते हैं।"
            },
            2: {
                title_en: "The Diplomat & Partner",
                title_hi: "राजनयिक और साथी",
                theme_en: "Harmony, balance, and cooperative relationships.",
                theme_hi: "सामंजस्य, संतुलन और सहयोगात्मक संबंध।",
                strengths_en: "Highly intuitive, patient, diplomatic, and supportive of others.",
                strengths_hi: "अत्यधिक सहज, धैर्यवान, कूटनीतिक और दूसरों के सहायक।",
                shadow_en: "Tendency to be overly sensitive, fearful of conflict, or passive.",
                shadow_hi: "अत्यधिक संवेदनशील, संघर्ष से डरने वाले या निष्क्रिय होने की प्रवृत्ति।"
            },
            3: {
                title_en: "The Creative Communicator",
                title_hi: "रचनात्मक संचारक",
                theme_en: "Self-expression, joy, and social energy.",
                theme_hi: "आत्म-अभिव्यक्ति, आनंद और सामाजिक ऊर्जा।",
                strengths_en: "Imaginative, witty, highly artistic, and naturally optimistic.",
                strengths_hi: "कल्पनाशील, मजाकिया, अत्यधिक कलात्मक और स्वाभाविक रूप से आशावादी।",
                shadow_en: "Prone to scattering energy, superficiality, or moodiness.",
                shadow_hi: "ऊर्जा बिखेरने, सतहीपन या मनमौजीपन की प्रवृत्ति।"
            },
            4: {
                title_en: "The Builder & Architect",
                title_hi: "निर्माता और वास्तुकार",
                theme_en: "Stability, hard work, and practical structure.",
                theme_hi: "स्थिरता, कड़ी मेहनत और व्यावहारिक संरचना।",
                strengths_en: "Highly reliable, organized, methodical, and grounded.",
                strengths_hi: "अत्यधिक विश्वसनीय, संगठित, व्यवस्थित और जमीन से जुड़े।",
                shadow_en: "Can be stubborn, rigid, overly cautious, or resistant to change.",
                shadow_hi: "जिद्दी, कठोर, अत्यधिक सावधान या परिवर्तन के प्रतिरोधी हो सकते हैं।"
            },
            5: {
                title_en: "The Freedom Seeker",
                title_hi: "स्वतंत्रता साधक",
                theme_en: "Change, adventure, and dynamic movement.",
                theme_hi: "परिवर्तन, साहसिक कार्य और गतिशील गति।",
                strengths_en: "Adaptable, resourceful, progressive, and highly curious.",
                strengths_hi: "अनुकूलनीय, संसाधनपूर्ण, प्रगतिशील और अत्यधिक जिज्ञासु।",
                shadow_en: "Restless, impulsive, easily distracted, or prone to overindulgence.",
                shadow_hi: "बेचैन, आवेगी, आसानी से विचलित होने वाले या अति-भोग की प्रवृत्ति।"
            },
            6: {
                title_en: "The Nurturer & Caregiver",
                title_hi: "पालनकर्ता और देखभालकर्ता",
                theme_en: "Responsibility, unconditional love, and service.",
                theme_hi: "जिम्मेदारी, बिना शर्त प्यार और सेवा।",
                strengths_en: "Compassionate, fiercely protective, harmonizing, and deeply family-oriented.",
                strengths_hi: "दयालु, अत्यधिक सुरक्षात्मक, सामंजस्यपूर्ण और गहराई से परिवार-उन्मुख।",
                shadow_en: "Overly self-sacrificing, prone to meddling, or perfectionistic.",
                shadow_hi: "अत्यधिक आत्म-बलिदानी, हस्तक्षेप करने की प्रवृत्ति या पूर्णतावादी।"
            },
            7: {
                title_en: "The Seeker & Thinker",
                title_hi: "साधक और विचारक",
                theme_en: "Spirituality, deep wisdom, and inner investigation.",
                theme_hi: "आध्यात्मिकता, गहरी बुद्धि और आंतरिक अन्वेषण।",
                strengths_en: "Analytical, highly intuitive, truth-seeking, and intellectually profound.",
                strengths_hi: "विश्लेषणात्मक, अत्यधिक सहज, सत्य-साधक और बौद्धिक रूप से गहन।",
                shadow_en: "Tends to be secretive, isolated, cynical, or detached from reality.",
                shadow_hi: "गुप्त, अलग-थलग, निंदक या वास्तविकता से अलग होने की प्रवृत्ति।"
            },
            8: {
                title_en: "The Powerhouse & Achiever",
                title_hi: "शक्तिशाली और उपलब्धि प्राप्तकर्ता",
                theme_en: "Material abundance, financial success, and karmic balance.",
                theme_hi: "भौतिक प्रचुरता, वित्तीय सफलता और कर्म संतुलन।",
                strengths_en: "Authoritative, efficient, resilient, and highly organized.",
                strengths_hi: "आधिकारिक, कुशल, लचीले और अत्यधिक संगठित।",
                shadow_en: "Materialistic, controlling, power-hungry, or overly work-oriented.",
                shadow_hi: "भौतिकवादी, नियंत्रक, शक्ति के भूखे या अत्यधिक कार्य-उन्मुख।"
            },
            9: {
                title_en: "The Wise Humanitarian",
                title_hi: "बुद्धिमान मानवतावादी",
                theme_en: "Universal love, completion, and spiritual transformation.",
                theme_hi: "सार्वभौमिक प्रेम, पूर्णता और आध्यात्मिक परिवर्तन।",
                strengths_en: "Deeply compassionate, generous, idealistic, and spiritually open-minded.",
                strengths_hi: "गहराई से दयालु, उदार, आदर्शवादी और आध्यात्मिक रूप से खुले विचारों वाले।",
                shadow_en: "Prone to carrying the weight of the world, emotional drama, or feeling bitter about the past.",
                shadow_hi: "दुनिया का बोझ उठाने, भावनात्मक नाटक या अतीत के बारे में कड़वाहट महसूस करने की प्रवृत्ति।"
            }
        };

        const interp = interpretations[number];
        if (!interp) return null;

        return {
            title: lang === 'hi' ? interp.title_hi : interp.title_en,
            theme: lang === 'hi' ? interp.theme_hi : interp.theme_en,
            strengths: lang === 'hi' ? interp.strengths_hi : interp.strengths_en,
            shadow: lang === 'hi' ? interp.shadow_hi : interp.shadow_en
        };
    }

    get_favourable_dates(basicNumber) {
        const friendly = this.get_friendly_numbers(basicNumber);
        const enemy = this.get_enemy_numbers(basicNumber);
        const result = { best: [], good: [], neutral: [], avoid: [] };
        for (let d = 1; d <= 31; d++) {
            const n = this._get_digital_root(d);
            if (n === basicNumber)       result.best.push(d);
            else if (friendly.includes(n)) result.good.push(d);
            else if (enemy.includes(n))    result.avoid.push(d);
            else                           result.neutral.push(d);
        }
        return result;
    }

    // --- FAVOURABLE COLOURS ---
    get_favourable_colours(number, lang = 'en') {
        const data = {
            1: { theme_en: 'Leadership',   theme_hi: 'नेतृत्व',       colours: [{ name_en: 'Red',         name_hi: 'लाल',         hex: '#e53e3e' }, { name_en: 'Orange',     name_hi: 'नारंगी',      hex: '#dd6b20' }, { name_en: 'Golden',     name_hi: 'सुनहरा',      hex: '#d69e2e' }] },
            2: { theme_en: 'Balance',      theme_hi: 'संतुलन',        colours: [{ name_en: 'White',       name_hi: 'सफ़ेद',        hex: '#e2e8f0' }, { name_en: 'Silver',     name_hi: 'चाँदी',       hex: '#a0aec0' }, { name_en: 'Light Blue', name_hi: 'हल्का नीला',  hex: '#63b3ed' }] },
            3: { theme_en: 'Creativity',   theme_hi: 'रचनात्मकता',    colours: [{ name_en: 'Yellow',      name_hi: 'पीला',         hex: '#ecc94b' }, { name_en: 'Pink',       name_hi: 'गुलाबी',      hex: '#ed64a6' }, { name_en: 'Purple',     name_hi: 'बैंगनी',      hex: '#9f7aea' }] },
            4: { theme_en: 'Stability',    theme_hi: 'स्थिरता',       colours: [{ name_en: 'Green',       name_hi: 'हरा',          hex: '#38a169' }, { name_en: 'Grey',       name_hi: 'धूसर',         hex: '#718096' }, { name_en: 'Dark Green', name_hi: 'गहरा हरा',    hex: '#276749' }] },
            5: { theme_en: 'Freedom',      theme_hi: 'स्वतंत्रता',    colours: [{ name_en: 'Light Brown', name_hi: 'हल्का भूरा',  hex: '#c05621' }, { name_en: 'Green',      name_hi: 'हरा',          hex: '#48bb78' }, { name_en: 'Silver',     name_hi: 'चाँदी',       hex: '#a0aec0' }] },
            6: { theme_en: 'Harmony',      theme_hi: 'सामंजस्य',      colours: [{ name_en: 'White',       name_hi: 'सफ़ेद',        hex: '#e2e8f0' }, { name_en: 'Pink',       name_hi: 'गुलाबी',      hex: '#ed64a6' }, { name_en: 'Light Blue', name_hi: 'हल्का नीला',  hex: '#63b3ed' }] },
            7: { theme_en: 'Spirituality', theme_hi: 'आध्यात्मिकता',  colours: [{ name_en: 'Light Green', name_hi: 'हल्का हरा',   hex: '#68d391' }, { name_en: 'Grey',       name_hi: 'धूसर',         hex: '#718096' }, { name_en: 'White',      name_hi: 'सफ़ेद',        hex: '#e2e8f0' }] },
            8: { theme_en: 'Power',        theme_hi: 'शक्ति',         colours: [{ name_en: 'Black',       name_hi: 'काला',         hex: '#1a202c' }, { name_en: 'Dark Blue',  name_hi: 'गहरा नीला',   hex: '#2b4c7e' }, { name_en: 'Grey',       name_hi: 'धूसर',         hex: '#718096' }] },
            9: { theme_en: 'Completion',   theme_hi: 'पूर्णता',       colours: [{ name_en: 'Red',         name_hi: 'लाल',         hex: '#e53e3e' }, { name_en: 'Crimson',    name_hi: 'गहरा लाल',    hex: '#9b2335' }, { name_en: 'Orange',     name_hi: 'नारंगी',      hex: '#dd6b20' }] }
        };
        const entry = data[number];
        if (!entry) return null;
        return {
            theme: lang === 'hi' ? entry.theme_hi : entry.theme_en,
            colours: entry.colours.map(c => ({ name: lang === 'hi' ? c.name_hi : c.name_en, hex: c.hex }))
        };
    }

    // --- LO SHU GRID LOGIC ---

    reduce_to_single_digit(n) {
        return this._get_digital_root(n);
    }

    calculate_kua_number(dob, gender) {
        const year = new Date(dob).getFullYear();
        const yn = this._get_digital_root(year);
        if (gender === 'Male') {
            return this._get_digital_root(11 - yn);
        } else {
            return this._get_digital_root(yn + 4);
        }
    }

    // Plane definitions
    get_plane_definitions() {
        return {
            mental_plane: {
                name_en: "Mental / Mind Plane",
                name_hi: "मानसिक तल",
                numbers: [4, 9, 2],
                strength_desc_en: "Excellent analytical abilities, strong memory, sharp logic, and clear thinking.",
                strength_desc_hi: "उत्कृष्ट विश्लेषणात्मक क्षमता, तेज स्मृति, तीव्र तर्क और स्पष्ट सोच।",
                weakness_desc_en: "Prone to overthinking, poor logical synthesis under stress, or difficulty remembering details.",
                weakness_desc_hi: "अधिक सोचने की प्रवृत्ति, तनाव में कमजोर तार्किक संश्लेषण, या विवरण याद रखने में कठिनाई।"
            },
            emotional_plane: {
                name_en: "Emotional / Heart Plane",
                name_hi: "भावनात्मक तल",
                numbers: [3, 5, 7],
                strength_desc_en: "High emotional intelligence, deep empathy, strong intuitive instincts, and artistic/spiritual inclination.",
                strength_desc_hi: "उच्च भावनात्मक बुद्धिमत्ता, गहरी सहानुभूति, मजबूत सहज प्रवृत्ति और कलात्मक/आध्यात्मिक झुकाव।",
                weakness_desc_en: "Difficulty managing or expressing emotions, feeling detached, or lacking intuitive guidance.",
                weakness_desc_hi: "भावनाओं को प्रबंधित या व्यक्त करने में कठिनाई, अलग महसूस करना, या सहज मार्गदर्शन की कमी।"
            },
            practical_plane: {
                name_en: "Practical / Physical Plane",
                name_hi: "व्यावहारिक तल",
                numbers: [8, 1, 6],
                strength_desc_en: "Grounded work ethic, excellent practical execution, hands-on capability, and material sense.",
                strength_desc_hi: "ठोस कार्य नैतिकता, उत्कृष्ट व्यावहारिक निष्पादन, व्यावहारिक क्षमता और भौतिक समझ।",
                weakness_desc_en: "Struggles to convert abstract ideas into physical reality; lacks grounded discipline.",
                weakness_desc_hi: "अमूर्त विचारों को भौतिक वास्तविकता में बदलने में संघर्ष; ठोस अनुशासन की कमी।"
            },
            planning_plane: {
                name_en: "Planning / Thought Plane",
                name_hi: "योजना तल",
                numbers: [4, 3, 8],
                strength_desc_en: "Foresight, strong planning skills, orderly thinking, and organizational structures.",
                strength_desc_hi: "दूरदर्शिता, मजबूत योजना कौशल, व्यवस्थित सोच और संगठनात्मक संरचना।",
                weakness_desc_en: "Tends to jump into things without planning; disorganized thoughts or lack of long-term vision.",
                weakness_desc_hi: "बिना योजना के चीजों में कूदने की प्रवृत्ति; अव्यवस्थित विचार या दीर्घकालिक दृष्टि की कमी।"
            },
            willpower_plane: {
                name_en: "Willpower Plane",
                name_hi: "इच्छाशक्ति तल",
                numbers: [9, 5, 1],
                strength_desc_en: "Unyielding determination, high self-confidence, persistent drive, and resistance to failure.",
                strength_desc_hi: "अटूट संकल्प, उच्च आत्मविश्वास, निरंतर प्रेरणा और विफलता के प्रति प्रतिरोध।",
                weakness_desc_en: "Easily discouraged by obstacles, low self-belief, or lack of sustained motivation.",
                weakness_desc_hi: "बाधाओं से आसानी से निराश, कम आत्म-विश्वास, या निरंतर प्रेरणा की कमी।"
            },
            action_plane: {
                name_en: "Action / Execution Plane",
                name_hi: "कार्य तल",
                numbers: [2, 7, 6],
                strength_desc_en: "Fast execution, rapid conversion of plans into action, and high physical drive.",
                strength_desc_hi: "तेज निष्पादन, योजनाओं को कार्य में तेजी से बदलना और उच्च शारीरिक प्रेरणा।",
                weakness_desc_en: "Prone to procrastination, delays in starting projects, or trouble following through with physical tasks.",
                weakness_desc_hi: "विलंब की प्रवृत्ति, परियोजनाओं को शुरू करने में देरी, या शारीरिक कार्यों को पूरा करने में परेशानी।"
            },
            golden_yog: {
                name_en: "Golden Yog / Success Plane",
                name_hi: "स्वर्ण योग",
                numbers: [4, 5, 6],
                strength_desc_en: "Strong affinity for financial success, material prosperity, luck, luxury, and social status.",
                strength_desc_hi: "वित्तीय सफलता, भौतिक समृद्धि, भाग्य, विलासिता और सामाजिक स्थिति के लिए मजबूत आत्मीयता।",
                weakness_desc_en: "Obstacles in acquiring luxury, financial volatility, or lack of strong supportive structures.",
                weakness_desc_hi: "विलासिता प्राप्त करने में बाधाएं, वित्तीय अस्थिरता, या मजबूत सहायक संरचनाओं की कमी।"
            },
            silver_yog: {
                name_en: "Silver Yog / Property Plane",
                name_hi: "रजत योग",
                numbers: [2, 5, 8],
                strength_desc_en: "Exceptional potential for land, real estate, property ownership, and deep emotional stability.",
                strength_desc_hi: "भूमि, अचल संपत्ति, संपत्ति स्वामित्व और गहरी भावनात्मक स्थिरता के लिए असाधारण क्षमता।",
                weakness_desc_en: "Difficulty in accumulating fixed physical assets; feelings of instability or being unanchored.",
                weakness_desc_hi: "निश्चित भौतिक संपत्ति जमा करने में कठिनाई; अस्थिरता या निराधार होने की भावना।"
            },
            balance_diag: {
                name_en: "Balance in Adversity (9-7)",
                name_hi: "विपरीत परिस्थितियों में संतुलन (9-7)",
                numbers: [9, 7],
                strength_desc_en: "Ability to maintain composure and balance during challenging situations; strong crisis management.",
                strength_desc_hi: "कठिन परिस्थितियों में संयम और संतुलन बनाए रखने की क्षमता; मजबूत संकट प्रबंधन।",
                weakness_desc_en: "May struggle to stay balanced under pressure; difficulty handling stressful situations.",
                weakness_desc_hi: "दबाव में संतुलित रहने के लिए संघर्ष कर सकते हैं; तनावपूर्ण स्थितियों को संभालने में कठिनाई।"
            },
            research_diag: {
                name_en: "Deep Research (7-1)",
                name_hi: "गहन शोध (7-1)",
                numbers: [7, 1],
                strength_desc_en: "Natural inclination for deep research, investigation, and analytical thinking; excellent problem-solving.",
                strength_desc_hi: "गहन शोध, जांच और विश्लेषणात्मक सोच के लिए स्वाभाविक झुकाव; उत्कृष्ट समस्या-समाधान।",
                weakness_desc_en: "May lack depth in research; superficial understanding or avoiding detailed investigation.",
                weakness_desc_hi: "शोध में गहराई की कमी हो सकती है; सतही समझ या विस्तृत जांच से बचना।"
            },
            wisdom_diag: {
                name_en: "Spiritual Wisdom (3-1)",
                name_hi: "आध्यात्मिक ज्ञान (3-1)",
                numbers: [3, 1],
                strength_desc_en: "Spiritual awareness, deep knowledge, high intelligence, and philosophical thinking.",
                strength_desc_hi: "आध्यात्मिक जागरूकता, गहन ज्ञान, उच्च बुद्धि और दार्शनिक सोच।",
                weakness_desc_en: "May lack spiritual depth or intellectual curiosity; difficulty connecting with higher wisdom.",
                weakness_desc_hi: "आध्यात्मिक गहराई या बौद्धिक जिज्ञासा की कमी हो सकती है; उच्च ज्ञान से जुड़ने में कठिनाई।"
            },
            conflict_diag: {
                name_en: "Argumentative Nature (3-9)",
                name_hi: "विवादास्पद प्रवृत्ति (3-9)",
                numbers: [3, 9],
                strength_desc_en: "Strong debating skills and ability to defend positions; good for legal and advocacy work.",
                strength_desc_hi: "मजबूत बहस कौशल और पदों की रक्षा करने की क्षमता; कानूनी और वकालत के काम के लिए अच्छा।",
                weakness_desc_en: "Prone to litigation, arguments, and conflicts; may be overly confrontational.",
                weakness_desc_hi: "मुकदमेबाजी, बहस और संघर्ष की प्रवृत्ति; अत्यधिक टकरावपूर्ण हो सकते हैं।"
            }
        };
    }

    analyze_planes(frequencies, lang = 'en') {
        const planes = this.get_plane_definitions();
        const analysis = {
            full_planes: [],
            partial_planes: [],
            empty_planes: []
        };

        for (const [key, plane] of Object.entries(planes)) {
            const present = plane.numbers.filter(n => frequencies[n] > 0);
            const missing = plane.numbers.filter(n => frequencies[n] === 0);
            const score = present.length;
            const totalNumbers = plane.numbers.length;

            const planeResult = {
                key: key,
                name: lang === 'hi' ? plane.name_hi : plane.name_en,
                numbers_present: present,
                numbers_missing: missing,
                score: score,
                total: totalNumbers
            };

            // Full when all numbers present
            if (score === totalNumbers) {
                planeResult.interpretation = lang === 'hi' ? plane.strength_desc_hi : plane.strength_desc_en;
                analysis.full_planes.push(planeResult);
            } 
            // Empty when no numbers present
            else if (score === 0) {
                planeResult.interpretation = lang === 'hi' ? plane.weakness_desc_hi : plane.weakness_desc_en;
                analysis.empty_planes.push(planeResult);
            } 
            // Partial when some numbers present
            else {
                analysis.partial_planes.push(planeResult);
            }
        }

        return analysis;
    }

    calculate_lo_shu_grid(dob, gender) {
        const dateObj = new Date(dob);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        
        // Extract base digits (ignore 0s)
        const base_digits = [];
        [day, month, year].forEach(num => {
            String(num).split('').forEach(d => {
                if (d !== '0') base_digits.push(parseInt(d));
            });
        });
        
        // Calculate driver, conductor, kua
        const driver = this._get_digital_root(day);
        const conductor = this._get_digital_root(day + month + year);
        const kua = this.calculate_kua_number(dob, gender);
        
        // Combine all numbers
        const combined = [...base_digits, driver, conductor, kua];
        
        // Calculate frequency
        const freq = {};
        for (let i = 1; i <= 9; i++) freq[i] = 0;
        combined.forEach(n => { if (n >= 1 && n <= 9) freq[n]++; });
        
        // Build grid (Lo Shu layout)
        const grid = [
            [freq[4], freq[9], freq[2]],
            [freq[3], freq[5], freq[7]],
            [freq[8], freq[1], freq[6]]
        ];
        
        return {
            driver,
            conductor,
            kua,
            grid,
            frequencies: freq
        };
    }
}