import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Anchor,
  Zap,
  ExternalLink,
} from "lucide-react";
import type { DefenseBlock } from "../data/knowledge_base";
import "katex/dist/katex.min.css";
import parse from "html-react-parser";

interface Props {
  activeBlock: DefenseBlock | null;
}

const riskColors = {
  low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  high: "bg-orange-50 text-orange-800 border-orange-200",
  critical: "bg-rose-50 text-rose-800 border-rose-200 animate-pulse-slow",
};

const DefensePanel: React.FC<Props> = ({ activeBlock }) => {
  if (!activeBlock) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-200">
          <Zap className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-semibold text-slate-600">
          Hệ thống sẵn sàng
        </h3>
        <p className="mt-2 text-sm text-slate-500 max-w-xs">
          Chọn một dòng code để xem phân tích chiến thuật.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeBlock.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-full overflow-y-auto bg-white flex flex-col"
      >
        <div
          className={`p-6 border-b ${
            activeBlock.riskLevel === "critical" ? "bg-rose-50/50" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
                riskColors[activeBlock.riskLevel]
              }`}
            >
              {activeBlock.riskLevel === "critical"
                ? "⚠️ CÂU HỎI NGUY HIỂM"
                : `ĐỘ KHÓ: ${activeBlock.riskLevel}`}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {activeBlock.title}
          </h2>
          <p className="text-slate-500 font-medium italic">
            "{activeBlock.mnemonic}"
          </p>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" /> Trả lời nhanh (Dưới 10s)
            </h3>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-blue-900 text-lg font-medium leading-relaxed">
                {activeBlock.shortAnswer}
              </p>
            </div>
          </div>
          {activeBlock.docsSnippet && (
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" /> Tài liệu gốc (Official
                Docs)
              </h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white">
                <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-white h-6 rounded text-xs text-slate-500 flex items-center px-2 truncate">
                    {activeBlock.docsSnippet.sourceUrl}
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </div>
                <div className="p-4 font-serif text-slate-700 docs-content bg-[#fcfcfc]">
                  {parse(activeBlock.docsSnippet.contentHTML)}
                </div>
              </div>
            </div>
          )}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
              <Anchor className="w-4 h-4 mr-2" /> Giải thích sâu (Nếu bị hỏi
              thêm)
            </h3>
            <ul className="space-y-3">
              {activeBlock.deepDive.map((item, idx) => (
                <li key={idx} className="flex items-start text-slate-600">
                  <span className="mr-3 text-blue-400 mt-1.5">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {activeBlock.trap && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" /> Cạm bẫy giảng viên
              </h3>
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-5">
                <p className="font-bold text-rose-900 mb-2 text-lg">
                  "{activeBlock.trap.question}"
                </p>
                <div className="mt-3 pt-3 border-t border-rose-200/60">
                  <p className="text-rose-800 italic">
                    <span className="font-bold not-italic bg-white px-2 py-0.5 rounded text-xs border border-rose-200 mr-2 uppercase">
                      Đáp trả
                    </span>
                    {activeBlock.trap.answer}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="h-10"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DefensePanel;
