"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { addActiveFont, fetchFonts } from "@/lib/redux/fonts/fonts-slice";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useVirtualizer } from "@tanstack/react-virtual";
import { debounce } from "lodash";
import { ITextProps } from "fabric";
import WebFont from "webfontloader";

const FontPicker: React.FC<{
  updateText: (args: {
    property: keyof ITextProps;
    value: string | number | boolean | undefined;
  }) => void;
  currentFont: string;
}> = ({ updateText, currentFont }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    fonts: { fonts, loading },
    canvas: { canvasInstance },
  } = useSelector((s: RootState) => s);

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedFont, setSelectedFont] = React.useState<string | null>(
    currentFont || null
  );

  // ✅ Debounced handler for search input
  const debouncedSearch = React.useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
      }, 500),
    []
  );

  // Fetch fonts only if cache is empty
  React.useEffect(() => {
    if (fonts.length === 0) {
      dispatch(fetchFonts());
    }
  }, [dispatch, fonts.length]);

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Filter fonts by search query
  const filteredFonts = React.useMemo(
    () => fonts.filter((f) => f.toLowerCase().includes(search.toLowerCase())),
    [fonts, search]
  );

  // Virtualizer setup
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredFonts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 10,
  });

  const handleFontSelect = (font: string) => {
    WebFont.load({
      google: {
        families: [font],
      },
      active: () => {
        setSelectedFont(font);
        updateText({ property: "fontFamily", value: font });
        canvasInstance?.discardActiveObject();
        dispatch(addActiveFont(font));
        setOpen(false);
      },
    });
  };
  console.log(currentFont, "currentFont in FontPicker");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-32 text-center text-xs">
          {loading ? "Loading ..." : selectedFont || "Select font"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72">
        <Command>
          <CommandInput
            placeholder="Search fonts..."
            onValueChange={(val) => debouncedSearch(val)} // ✅ debounce here
          />
          <CommandList>
            <div
              ref={parentRef}
              style={{
                height: "300px",
                overflow: "auto",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: rowVirtualizer.getTotalSize(),
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const font = filteredFonts[virtualRow.index];
                  return (
                    <Button
                      key={font}
                      variant={font === selectedFont ? "default" : "ghost"}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                        fontFamily: font,
                      }}
                      onClick={() => handleFontSelect(font)}
                      className="cursor-pointer"
                    >
                      {font}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FontPicker;
