import CanvasEditor from "@/components/canvas-editor";
import HistoryThumbnails from "@/components/history-thumbnails";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="font-sans grid grid-cols-[400px_1fr_120px]  min-h-[calc(100vh-73px)] ">
      <Sidebar />
      <CanvasEditor />
      <HistoryThumbnails />
    </div>
  );
}
