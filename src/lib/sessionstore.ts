import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define the store state interface
interface SessionState {
    user: string;
    userThere: boolean;
}

// Helper function to get initial state from sessionStorage
function getInitialState(): SessionState {
    if (!browser) {
        return { user: '', userThere: false };
    }

    try {
        const stored = sessionStorage.getItem('appSession');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error reading from sessionStorage:', e);
    }

    return { user: '', userThere: false };
}

// Create a custom store with sessionStorage persistence
function createSessionStore() {
    const initialState = getInitialState();
    const { subscribe, set, update } = writable<SessionState>(initialState);

    return {
        subscribe,

        // Set both values at once
        setSession: (user: string, userThere: boolean) => {
            const newState = { user, userThere };
            if (browser) {
                sessionStorage.setItem('appSession', JSON.stringify(newState));
            }
            set(newState);
        },

        // Set user value
        setUser: (user: string) => {
            update(state => {
                const newState = { ...state, user };
                if (browser) {
                    sessionStorage.setItem('appSession', JSON.stringify(newState));
                }
                return newState;
            });
        },

        // Set userThere value
        setUserThere: (userThere: boolean) => {
            update(state => {
                const newState = { ...state, userThere };
                if (browser) {
                    sessionStorage.setItem('appSession', JSON.stringify(newState));
                }
                return newState;
            });
        },

        // Clear the session
        clearSession: () => {
            const newState = { user: '', userThere: false };
            if (browser) {
                sessionStorage.removeItem('appSession');
            }
            set(newState);
        }
    };
}

// Export the store instance
export const sessionStore = createSessionStore();