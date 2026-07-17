// Local Storage Manager for Numerology Profiles
class ProfileStorage {
    constructor() {
        this.STORAGE_KEY = 'numerology_profiles';
        this.MAX_PROFILES = 100;
    }

    // Generate unique ID
    _generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Get all profiles
    getAllProfiles() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading profiles:', error);
            return [];
        }
    }

    // Save a new profile or update existing
    saveProfile(profileData) {
        try {
            const profiles = this.getAllProfiles();
            
            // Check if profile with same name exists
            const existingIndex = profiles.findIndex(p => p.name.toLowerCase() === profileData.name.toLowerCase());
            
            if (existingIndex !== -1) {
                // Update existing profile
                profiles[existingIndex] = {
                    ...profiles[existingIndex],
                    dob: profileData.dob,
                    gender: profileData.gender || profiles[existingIndex].gender || '',
                    category: profileData.category,
                    text: profileData.text,
                    entityType: profileData.entityType || 'Person',
                    results: {
                        basicNumber: profileData.basicNumber,
                        luckyNumbers: profileData.luckyNumbers,
                        vibration: profileData.vibration,
                        suitability: profileData.suitability,
                        suitabilityCode: profileData.suitabilityCode
                    },
                    updatedAt: new Date().toISOString()
                };
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
                return { success: true, profile: profiles[existingIndex], updated: true };
            }
            
            // Check limit for new profiles
            if (profiles.length >= this.MAX_PROFILES) {
                return { success: false, error: 'Maximum profile limit reached' };
            }

            const newProfile = {
                id: this._generateId(),
                name: profileData.name,
                dob: profileData.dob,
                gender: profileData.gender || '',
                category: profileData.category,
                text: profileData.text,
                entityType: profileData.entityType || 'Person',
                results: {
                    basicNumber: profileData.basicNumber,
                    luckyNumbers: profileData.luckyNumbers,
                    vibration: profileData.vibration,
                    suitability: profileData.suitability,
                    suitabilityCode: profileData.suitabilityCode
                },
                createdAt: new Date().toISOString(),
                notes: profileData.notes || ''
            };

            profiles.unshift(newProfile);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
            
            return { success: true, profile: newProfile, updated: false };
        } catch (error) {
            console.error('Error saving profile:', error);
            return { success: false, error: error.message };
        }
    }

    // Get profile by ID
    getProfile(id) {
        const profiles = this.getAllProfiles();
        return profiles.find(p => p.id === id);
    }

    // Delete profile by ID
    deleteProfile(id) {
        try {
            const profiles = this.getAllProfiles();
            const filtered = profiles.filter(p => p.id !== id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
            return { success: true };
        } catch (error) {
            console.error('Error deleting profile:', error);
            return { success: false, error: error.message };
        }
    }

    // Update profile
    updateProfile(id, updates) {
        try {
            const profiles = this.getAllProfiles();
            const index = profiles.findIndex(p => p.id === id);
            
            if (index === -1) {
                return { success: false, error: 'Profile not found' };
            }

            profiles[index] = { ...profiles[index], ...updates };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
            
            return { success: true, profile: profiles[index] };
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false, error: error.message };
        }
    }

    // Clear all profiles
    clearAll() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return { success: true };
        } catch (error) {
            console.error('Error clearing profiles:', error);
            return { success: false, error: error.message };
        }
    }

    // Search profiles by name
    searchProfiles(query) {
        const profiles = this.getAllProfiles();
        const lowerQuery = query.toLowerCase();
        return profiles.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) ||
            p.text.toLowerCase().includes(lowerQuery)
        );
    }

    // Get profile by name
    getProfileByName(name) {
        const profiles = this.getAllProfiles();
        return profiles.find(p => p.name.toLowerCase() === name.toLowerCase());
    }

    // Get profile count
    getCount() {
        return this.getAllProfiles().length;
    }

    // Export profiles to JSON file
    exportProfiles() {
        try {
            const profiles = this.getAllProfiles();
            const dataStr = JSON.stringify(profiles, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            const timestamp = new Date().toISOString().split('T')[0];
            link.download = `numerology_backup_${timestamp}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            return { success: true };
        } catch (error) {
            console.error('Error exporting profiles:', error);
            return { success: false, error: error.message };
        }
    }

    // Import profiles from JSON data
    importProfiles(data, mode = 'merge') {
        try {
            if (!Array.isArray(data)) {
                return { success: false, error: 'Invalid data format' };
            }

            let profiles = [];
            
            if (mode === 'merge') {
                // Merge with existing profiles
                profiles = this.getAllProfiles();
                const existingNames = new Set(profiles.map(p => p.name.toLowerCase()));
                
                // Add only new profiles (avoid duplicates by name)
                let addedCount = 0;
                data.forEach(importedProfile => {
                    if (!existingNames.has(importedProfile.name.toLowerCase())) {
                        // Regenerate ID to avoid conflicts
                        importedProfile.id = this._generateId();
                        profiles.push(importedProfile);
                        addedCount++;
                    }
                });
                
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
                return { success: true, count: addedCount };
            } else if (mode === 'replace') {
                // Replace all profiles
                // Regenerate IDs for all imported profiles
                const newProfiles = data.map(p => ({
                    ...p,
                    id: this._generateId()
                }));
                
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newProfiles));
                return { success: true, count: newProfiles.length };
            }
            
            return { success: false, error: 'Invalid import mode' };
        } catch (error) {
            console.error('Error importing profiles:', error);
            return { success: false, error: error.message };
        }
    }
}
