import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  role: string;
}

interface UserStore extends User {
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  id: 0,
  name: "",
  email: "",
  type: "",
  role: "",
  setUser: (user: User) => set(user),
}));
