import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  CornerDownLeft,
  FileCode,
  AlertTriangle,
  Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { defenseDatabase, type DefenseBlock } from "../data/knowledge_base";

interface Props {
  onSelectBlock: (block: DefenseBlock) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommandPalette: React.FC<Props> = ({
  onSelectBlock,
  isOpen,
  setIsOpen,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = defenseDatabase.filter((block) => {
    const searchContent = `
      ${block.title} 
      ${block.mnemonic} 
      ${block.shortAnswer} 
      ${block.trap?.question || ""}
      ${block.deepDive.join(" ")}
    `.toLowerCase();

    return searchContent.includes(query.toLowerCase());
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-gray-200"
          >
            <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm kiến thức, cú pháp, hoặc câu hỏi bẫy... (Ví dụ: 'lực', 'scipy', 'tại sao')"
                className="flex-1 bg-transparent border-none outline-none text-lg text-gray-800 placeholder-gray-400"
              />
              <div className="flex items-center space-x-1">
                <kbd className="hidden sm:inline-block px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-400 font-sans shadow-sm">
                  Esc
                </kbd>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {filteredItems.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-400">
                  <p>Không tìm thấy nội dung nào khớp với "{query}"</p>
                </div>
              ) : (
                <div className="px-2 space-y-1">
                  {filteredItems.map((block) => (
                    <button
                      key={block.id}
                      onClick={() => {
                        onSelectBlock(block);
                        setIsOpen(false);
                      }}
                      className="w-full text-left flex items-start px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 group transition-colors"
                    >
                      <div
                        className={`mt-1 p-1.5 rounded-md mr-4 shrink-0 
                        ${
                          block.riskLevel === "critical"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-500 group-hover:bg-blue-200 group-hover:text-blue-600"
                        }`}
                      >
                        {block.riskLevel === "critical" ? (
                          <AlertTriangle size={18} />
                        ) : (
                          <Hash size={18} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-gray-900 group-hover:text-blue-800 truncate">
                            {block.title}
                          </span>
                          <span className="text-xs text-gray-400 font-mono group-hover:text-blue-500">
                            Lines {block.lines.join(", ")}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 truncate group-hover:text-blue-600">
                          {block.mnemonic}
                        </p>

                        {query &&
                          block.trap?.question
                            .toLowerCase()
                            .includes(query.toLowerCase()) && (
                            <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-50 text-red-700 border border-red-100">
                              <AlertTriangle size={10} className="mr-1" /> Bẫy:
                              "{block.trap.question}"
                            </div>
                          )}
                      </div>

                      <div className="ml-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CornerDownLeft size={16} className="text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Đang hiển thị {filteredItems.length} kết quả</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <CornerDownLeft size={10} className="mr-1" /> để chọn
                </span>
                <span className="flex items-center">
                  <span className="mr-1">↑↓</span> để di chuyển
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
