import React, { useState } from "react";
import { Search } from "lucide-react";
import CodeViewer from "./CodeViewer";
import DefensePanel from "./DefensePanel";
import CommandPalette from "./CommandPalette";
import type { DefenseBlock } from "../data/knowledge_base";

const DefenseDashboard: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<DefenseBlock | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gray-900 overflow-hidden relative">
      <CommandPalette
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
        onSelectBlock={setActiveBlock}
      />

      <div className="h-[40vh] lg:h-full lg:w-7/12 border-b lg:border-b-0 lg:border-r border-gray-700 shadow-2xl z-10 flex flex-col">
        <div className="bg-[#21252b] text-gray-400 text-xs px-4 py-3 flex items-center justify-between select-none border-b border-black">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 mr-4"></span>
            <span className="font-sans font-medium text-gray-300">
              input_file_1.py
            </span>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition-colors text-gray-300 border border-gray-700"
          >
            <Search size={12} />
            <span>Tìm kiếm (Ctrl+K)</span>
          </button>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <CodeViewer
            onLineClick={setActiveBlock}
            activeBlockId={activeBlock?.id}
          />
        </div>
      </div>

      <div className="flex-1 h-[60vh] lg:h-full bg-white relative z-20">
        <DefensePanel activeBlock={activeBlock} />
      </div>
    </div>
  );
};

export default DefenseDashboard;
