# Jyoni_numero

A Progressive Web Application (PWA) for Vedic Numerology analysis and forecasting.

## Overview

Jyoni_numero is a bilingual (English/Hindi) numerology application that provides comprehensive numerological analysis based on Vedic principles. The app works offline and can be installed on any device as a standalone application.

## Features

### 1. Number Analysis
Analyze the numerological vibration of names, business names, vehicle numbers, or any custom text:
- Calculate vibration numbers for any text input
- Determine basic number (Moolank) from date of birth
- Identify lucky numbers based on planetary relationships
- Assess suitability/compatibility between your birth date and chosen names/numbers
- Get recommendations (Excellent, Good, Neutral, or Avoid)
- Save analyzed profiles for future reference

### 2. Compatibility Checker
Check the numerological compatibility between two entities:
- Compare vibration numbers of two names or entities
- Determine relationship status (Friend, Neutral, or Enemy)
- Understand planetary relationships between numbers
- Useful for partnerships, relationships, or business collaborations

### 3. Forecast (Horoscope)
Get personalized numerological forecasts for any date:
- **Yearly Influence (Varshank)**: Overall energy for the year
- **Monthly Influence (Masank)**: Monthly vibrations and trends
- **Daily Influence (Dinank)**: Day-specific guidance
- Each forecast shows whether the period is Favorable, Normal, or Unfavorable
- Hierarchical view showing how daily influences nest within monthly and yearly cycles

### 4. Numeroscope (Lo Shu Grid)
Generate a personalized Lo Shu Grid based on your birth date and gender:
- **Driver (Psychic) Number**: Your day-to-day personality
- **Conductor (Destiny) Number**: Your life path and destiny
- **Kua Number**: Feng Shui directional energy (calculated using Direct Calendar Year method)
- **3×3 Lo Shu Grid Matrix**: Visual representation of number frequencies in your numerological profile
- Grid shows active and missing numbers in your birth chart
- Based on ancient Chinese Lo Shu Square principles

### 5. Saved Profiles
Manage and access your previously analyzed numerology profiles:
- **Save Profiles**: Store analyzed names/entities with all calculated results
- **Quick Access**: View all saved profiles in one place
- **Search & Filter**: Find specific profiles quickly
- **Load & Re-analyze**: Load any saved profile back into the analyzer
- **Local Storage**: All data stored locally on your device (offline-capable)
- **Profile Management**: Delete individual profiles or clear all at once

### Additional Features
- **Bilingual Support**: Switch between English and Hindi (हिंदी)
- **Offline Capability**: Works without internet connection after first load
- **Installable**: Can be installed as a standalone app on mobile and desktop
- **Responsive Design**: Adapts to all screen sizes
- **Dark/Light Theme**: Automatic theme adaptation based on system preferences
- **Profile Storage**: Save and manage unlimited numerology profiles locally

## How to Launch

### Option 1: Direct File Opening
1. Navigate to the project directory
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)

### Option 2: Local Web Server (Recommended for PWA features)

#### Using Python:
```bash
cd /path/to/Jyoni_numero
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser

#### Using Node.js (npx):
```bash
cd /path/to/Jyoni_numero
npx serve
```
Then open the URL shown in terminal (usually `http://localhost:3000`)

#### Using PHP:
```bash
cd /path/to/Jyoni_numero
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser

### Option 3: Install as PWA
1. Launch the app using Option 2
2. In your browser, look for the "Install" button in the address bar
3. Click to install as a standalone application
4. Access from your device's app menu

## Usage Guide

### Number Analysis
1. Select the **Number Analysis** tab
2. Enter your **Date of Birth**
3. Choose a **Category** (Name, Business Name, Vehicle Number, or Custom)
4. Enter the **text/name** you want to analyze
5. Click **Analyze** to see:
   - Your basic number and lucky numbers
   - The vibration number of the entered text
   - Suitability verdict with color-coded recommendation
6. Click **💾 Save Profile** to store the analysis for future reference

### Compatibility Check
1. Select the **Compatibility** tab
2. Enter the **first name/entity**
3. Enter the **second name/entity**
4. Click **Check Compatibility** to see:
   - Vibration numbers for both entities
   - Relationship status (Friend/Neutral/Enemy)
   - Detailed compatibility description

### Forecast
1. Select the **Forecast** tab
2. Enter your **Date of Birth**
3. Select the **Target Date** you want to forecast (defaults to today)
4. Click **Get Horoscope** to see:
   - Yearly influence with status
   - Monthly influence with status
   - Daily influence with status
   - Color-coded indicators (Green=Favorable, Gray=Normal, Red=Unfavorable)

### Numeroscope
1. Select the **Numeroscope** tab
2. Enter your **Date of Birth**
3. Select your **Gender** (Male/Female)
4. Click **Generate Numeroscope** to see:
   - Driver (Psychic) Number: Represents your external personality
   - Conductor (Destiny) Number: Represents your life path
   - Kua Number: Your Feng Shui directional number
   - Lo Shu Grid: 3×3 matrix showing the frequency of each number (1-9) in your profile
5. The grid displays:
   - Numbers in small circles (top-left) show the Lo Shu position (1-9)
   - Bold numbers in center show how many times that number appears
   - Filled cells (with color) indicate active numbers
   - Empty cells (grayed out) show missing numbers

### Saved Profiles
1. Select the **Saved Profiles** tab
2. View all your saved numerology profiles
3. Use the **search box** to filter profiles by name
4. Click **Load** on any profile to:
   - Auto-fill the Number Analysis tab with saved data
   - Re-analyze or modify the profile
5. Click **Delete** to remove a profile
6. Click **🗑️ Clear All Profiles** to delete all saved profiles

### Language Switching
- Use the dropdown in the header to switch between English and हिंदी (Hindi)
- All interface elements and results will update automatically

## Technical Details

### Files Structure
```
Jyoni_numero/
├── index.html           # Main application interface
├── app.js               # Orchestrator: DOM event bindings
├── numerology_core.js   # Core numerology calculation engine
├── storage.js           # Profile storage and management (localStorage)
├── style.css            # Styling and responsive design
├── manifest.json        # PWA configuration
├── service-worker.js    # Offline caching functionality
├── js/
│   ├── translations.js  # i18n strings (English & Hindi)
│   ├── ui.js            # DOM rendering helpers
│   ├── tabs.js          # Tab switching, field sync, autocomplete
│   └── sw-register.js   # Service worker registration
└── icons/               # App icons for PWA installation
```

### Browser Requirements
- Modern browser with JavaScript enabled
- For PWA features: Chrome, Edge, Safari, or Firefox (latest versions)
- No additional dependencies or installations required

## License

See LICENSE file for details.

---

**Note**: This application is for entertainment and educational purposes. Numerological interpretations are based on traditional Vedic principles.
