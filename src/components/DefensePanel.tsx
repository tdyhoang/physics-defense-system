import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Anchor,
  ShieldAlert,
  Zap,
} from "lucide-react";
import type { DefenseBlock } from "../data/knowledge_base";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

interface Props {
  activeBlock: DefenseBlock | null;
}

const riskColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200 animate-pulse-slow",
};

const DefensePanel: React.FC<Props> = ({ activeBlock }) => {
  if (!activeBlock) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center border-l border-gray-200 bg-gray-50">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600">Chế độ chờ lệnh</h3>
        <p className="mt-2 text-sm">
          Chạm vào bất kỳ dòng code nào bên trái để kích hoạt hệ thống phòng
          thủ.
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
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="h-full overflow-y-auto p-6 bg-white border-l border-gray-200 shadow-xl"
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {activeBlock.title}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
              riskColors[activeBlock.riskLevel]
            }`}
          >
            {activeBlock.riskLevel === "critical"
              ? "Rủi ro cực cao"
              : `Rủi ro: ${activeBlock.riskLevel}`}
          </span>
        </div>

        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-bold text-blue-800 uppercase mb-2 flex items-center">
            <Zap className="w-4 h-4 mr-2" /> Trả lời nhanh (3s)
          </h3>
          <p className="text-blue-900 text-lg leading-relaxed font-medium">
            "{activeBlock.shortAnswer}"
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {activeBlock.docsReference && (
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center">
                <BookOpen className="w-3 h-3 mr-1" /> Tài liệu tham khảo (Docs)
              </h4>
              <p className="text-sm font-semibold text-purple-700">
                {activeBlock.docsReference.library} /{" "}
                {activeBlock.docsReference.concept}
              </p>
              <p className="text-xs text-gray-600 italic mt-1">
                "{activeBlock.docsReference.desc}"
              </p>
            </div>
          )}

          {activeBlock.physicsMath && (
            <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center">
                <Anchor className="w-3 h-3 mr-1" /> Cơ sở Vật lý
              </h4>
              <div className="text-lg text-center py-2">
                <BlockMath math={activeBlock.physicsMath} />
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">
            Giải thích chi tiết
          </h3>
          <p className="text-gray-600 leading-7 text-justify">
            {activeBlock.fullExplanation}
          </p>
        </div>

        {activeBlock.trap && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-sm font-bold text-red-700 uppercase mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" /> Cẩn thận câu hỏi gài!
            </h3>
            <p className="font-bold text-red-900 mb-2">
              "{activeBlock.trap.question}"
            </p>
            <div className="bg-white p-3 rounded border border-red-100 text-red-800 text-sm italic">
              <span className="font-bold not-italic">Đáp trả: </span>
              {activeBlock.trap.answer}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default DefensePanel;
