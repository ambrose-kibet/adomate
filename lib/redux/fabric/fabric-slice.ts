"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable, { includeAction } from "redux-undo";

export interface FabricState {
  canvasJSON: string;
  canvasWidth: number;
  canvasHeight: number; // Optional background color
}

export const EMPTY_JSON = '{"objects":[],"background":"#fff"}';

const initialState: FabricState = {
  canvasJSON: EMPTY_JSON,
  canvasWidth: 720,
  canvasHeight: 480, // Default background color
};

const fabricCoreSlice = createSlice({
  name: "fabricCore",
  initialState,
  reducers: {
    updateCanvas: (state, action: PayloadAction<FabricState>) => {
      state.canvasJSON = action.payload.canvasJSON;
      state.canvasWidth = action.payload.canvasWidth;
      state.canvasHeight = action.payload.canvasHeight;
    },
    clearCanvas: (state) => {
      state.canvasJSON = EMPTY_JSON;
      state.canvasWidth = 720;
      state.canvasHeight = 480;
    },
  },
});

export const { updateCanvas, clearCanvas } = fabricCoreSlice.actions;

// Wrap with redux-undo to get past/present/future
const fabricReducer = undoable(fabricCoreSlice.reducer, {
  limit: 20,
  filter: includeAction(["fabricCore/updateCanvas", "fabricCore/clearCanvas"]), // Include only specific actions for undo/redo
});

export default fabricReducer;
