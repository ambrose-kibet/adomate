"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Canvas } from "fabric";
import * as fabric from "fabric";

interface CanvasState {
  canvasInstance: Canvas | null;
  selectedObject: fabric.Object | null;
  selectedObjects: fabric.Object[]; // Optional: to track selected objects on the canvas
}

const initialState: CanvasState = {
  canvasInstance: null,
  selectedObject: null, // Optional: to track the currently active object on the canvas
  selectedObjects: [], // Optional: to track selected objects on the canvas
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvasInstance = action.payload;
    },
    clearCanvas: (state) => {
      state.canvasInstance = null;
    },
    setSelectedObject: (state, action: PayloadAction<any>) => {
      state.selectedObject = action.payload;
    },
    setSelectedObjects: (state, action: PayloadAction<any[]>) => {
      state.selectedObjects = action.payload;
    },
  },
});

export const { setCanvas, clearCanvas, setSelectedObject, setSelectedObjects } =
  canvasSlice.actions;

export default canvasSlice.reducer;
