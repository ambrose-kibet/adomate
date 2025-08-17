"use client";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./ssr-safe-storage";
import fabricReducer from "./fabric/fabric-slice";
import canvasReducer from "./fabric/canvas-slice";
import fontsReducer from "./fonts/fonts-slice";

const persistConfig = {
  key: "fabric",
  storage,
};

const fontsPersistConfig = {
  key: "fonts",
  storage,
};

const persistedFontsReducer = persistReducer(fontsPersistConfig, fontsReducer);

const persistedFabricReducer = persistReducer(persistConfig, fabricReducer);

export const store = configureStore({
  reducer: {
    fabric: persistedFabricReducer,
    canvas: canvasReducer,
    fonts: persistedFontsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
