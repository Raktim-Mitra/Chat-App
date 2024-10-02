import { create } from "zustand";
import { createAuthSlice } from "./Slice/Auth-slice.js";
import { createChatSlice } from "./Slice/Chat-slice.js";

export const useAppStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));
