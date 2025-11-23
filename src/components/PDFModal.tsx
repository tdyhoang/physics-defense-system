import React from "react";
import { X, ExternalLink, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const PDFModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-gray-900">
          <div className="flex items-center justify-between px-4 py-3 bg-[#21252b] border-b border-black text-white shrink-0">
            <h2 className="font-semibold text-sm flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Bai12.pdf
            </h2>

            <div className="flex items-center space-x-3">
              <a
                href="/Bai12.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                title="Mở trong tab mới"
              >
                <ExternalLink size={18} />
              </a>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-red-600/80 hover:bg-red-600 rounded text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 bg-gray-800 relative w-full h-full"
          >
            <iframe
              src="/Bai12.pdf#view=FitH"
              className="w-full h-full border-none"
              title="Đề bài gốc"
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1] text-gray-500">
              Đang tải tài liệu...
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PDFModal;
