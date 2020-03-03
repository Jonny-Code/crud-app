import { createContext } from "react";
export const AppContext = createContext<any>(null);

export function reducer(state: any, payload: any) {
  switch (payload.type) {
    case "add":
      return [...state, payload.docs];
    case "spread":
      return [...payload.docs];
    case "remove":
      return state.filter((i: any) => i._id !== payload._id);
    case "update":
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === payload.docs._id) {
          state[i] = payload.docs;
        }
      }
      return [...state];

    default:
      return [];
  }
}
