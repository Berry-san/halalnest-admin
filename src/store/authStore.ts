import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Define the types for the store's state and actions
interface AuthState {
  user: Record<string, unknown> | null
  isAuthenticated: boolean
  login: (userData: Record<string, unknown>) => void
  logout: () => void
}

// Create the store with persistence using the `storage` option
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => {
        set({ user: null, isAuthenticated: false }) // Clear the merchant data
        sessionStorage.removeItem('auth-storage') // Optionally remove from session storage directly
      },
    }),
    {
      name: 'auth-storage', // Name of the storage (localStorage key)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useAuthStore
