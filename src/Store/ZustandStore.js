import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  loading: true,

  //new array wishlist
  wishList : [],

  setToken: (token) => set({ token , loading: false}),
  setUser: (user) => set({ user  , loading: false}),
  setLoading: (state) => set({ loading: state }),
  clearAuth: () => set({ token: null, user: null , loading: false}),

  // Array - wishList manipulation method
  addToWishList : (id, head,text) =>
    set((state) => ({wishList : [...state.wishList , {id ,head , text}]}
    )),

  removeFromWishList : (id) =>
    set((state) => ({
      wishList : state.wishList.filter((single) => single !== id)
    }
    )),

    ClearWishList : () =>
      set((state) => ({
        wishList : state.wishList = []
      })),
}));