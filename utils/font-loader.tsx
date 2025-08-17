import { useEffect } from "react";
import WebFont from "webfontloader";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export const useLoadFonts = () => {
  const activeFonts = useSelector((s: RootState) => s.fonts.activeFonts);

  useEffect(() => {
    if (activeFonts.length === 0) return;

    WebFont.load({
      google: {
        families: activeFonts,
      },
      active: () => {
        console.log("Loaded fonts:", activeFonts.join(", "));
      },
    });
  }, [activeFonts]);
};
