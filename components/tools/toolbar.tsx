"use client";

import { useDispatch, useSelector } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import type { RootState } from "@/lib/redux/store";
import { clearCanvas } from "@/lib/redux/fabric/fabric-slice";
import { Undo, Redo, RotateCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CommonTools from "./common-tools";
import TextTools from "./text-tools";
import { clearActiveFonts } from "@/lib/redux/fonts/fonts-slice";

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const { past, future } = useSelector((s: RootState) => s.fabric);
  return (
    <div className="flex  w-full justify-between items-center p-2 bg-background absolute top-0 left-0 ">
      <Tooltip>
        <TooltipTrigger
          className="p-2"
          onClick={() => {
            dispatch(clearCanvas());
            dispatch(clearActiveFonts());
            dispatch(UndoActionCreators.clearHistory());
          }}
        >
          <RotateCcw className="h-5 w-5" />
        </TooltipTrigger>
        <TooltipContent>Reset Canvas</TooltipContent>
      </Tooltip>
      <div className="flex items-center gap-2">
        <TextTools />
        <CommonTools />
      </div>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger
            className="p-2"
            disabled={past.length === 0}
            onClick={() => dispatch(UndoActionCreators.undo())}
          >
            <Undo
              className={`${past.length === 0 ? "text-gray-400" : ""} h-5 w-5`}
            />
          </TooltipTrigger>
          <TooltipContent className={past.length === 0 ? "text-muted" : ""}>
            Undo
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            className="p-2"
            disabled={future.length === 0}
            onClick={() => dispatch(UndoActionCreators.redo())}
          >
            <Redo
              className={`${
                future.length === 0 ? "text-gray-400" : ""
              } h-5 w-5`}
            />
          </TooltipTrigger>
          <TooltipContent className={future.length === 0 ? "text-muted" : ""}>
            Redo
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
export default Toolbar;
