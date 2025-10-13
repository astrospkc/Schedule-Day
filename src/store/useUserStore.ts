import { create } from "zustand"


export type User = {
    name: string;
    email: string;
    passwrord: string;
}

interface UserState {
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
}

export const useUserStore = create<UserState>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}))

