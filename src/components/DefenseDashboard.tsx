import React, { useState } from "react";
import CodeViewer from "./CodeViewer";
import DefensePanel from "./DefensePanel";
import type { DefenseBlock } from "../data/knowledge_base";

const DefenseDashboard: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<DefenseBlock | null>(null);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gray-900 overflow-hidden">
      <div className="h-[40vh] lg:h-full lg:w-7/12 border-b lg:border-b-0 lg:border-r border-gray-700 shadow-2xl z-10">
        <div className="bg-[#21252b] text-gray-400 text-xs px-4 py-2 flex items-center select-none border-b border-black">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 mr-4"></span>
          <span className="font-sans font-medium">
            bai12.py — Project Physics Defense
          </span>
        </div>
        <CodeViewer
          onLineClick={setActiveBlock}
          activeBlockId={activeBlock?.id}
        />
      </div>

      <div className="flex-1 h-[60vh] lg:h-full bg-white relative z-20">
        <DefensePanel activeBlock={activeBlock} />
      </div>
    </div>
  );
};

export default DefenseDashboard;
