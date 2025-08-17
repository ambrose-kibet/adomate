import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface FontsState {
  fonts: string[];
  loading: boolean;
  error: string | null;
  activeFonts: string[];
}

const initialState: FontsState = {
  fonts: [],
  loading: false,
  error: null,
  activeFonts: [],
};

// Thunk to fetch fonts (only if not already cached)
interface GoogleFontsApiResponse {
  items: { family: string }[];
}

export const fetchFonts = createAsyncThunk<string[]>(
  "fonts/fetchFonts",
  async () => {
    const res = await axios.get<GoogleFontsApiResponse>(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_KEY}`
    );
    return res.data.items.map((f) => f.family);
  }
);

const fontsSlice = createSlice({
  name: "fonts",
  initialState,
  reducers: {
    addActiveFont: (state, action: PayloadAction<string>) => {
      const font = action.payload;
      const fontSet = new Set(state.activeFonts);
      fontSet.add(font);
      state.activeFonts = Array.from(fontSet); // ✅ uniqueness guaranteed
    },
    clearActiveFonts: (state) => {
      state.activeFonts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFonts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFonts.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.fonts = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchFonts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load fonts";
      });
  },
});
export const { addActiveFont, clearActiveFonts } = fontsSlice.actions;

export default fontsSlice.reducer;
