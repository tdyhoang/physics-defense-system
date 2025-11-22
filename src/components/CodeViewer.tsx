import React from "react";
import { pythonCode } from "../data/source_code";
import { isInteractiveLine, findBlockByLine } from "../utils/mapping";
import type { DefenseBlock } from "../data/knowledge_base";

interface Props {
  onLineClick: (block: DefenseBlock) => void;
  activeBlockId?: string;
}

const CodeViewer: React.FC<Props> = ({ onLineClick, activeBlockId }) => {
  const lines = pythonCode.split("\n");

  return (
    <div className="font-mono text-sm bg-[#282c34] text-[#abb2bf] overflow-auto h-full p-4 leading-6">
      {lines.map((lineContent, index) => {
        const lineNumber = index + 1;
        const interactive = isInteractiveLine(lineNumber);
        const block = findBlockByLine(lineNumber);

        const isActive = block && block.id === activeBlockId;

        return (
          <div
            key={index}
            onClick={() => {
              if (block) onLineClick(block);
            }}
            className={`
              group flex relative cursor-default
              ${
                interactive
                  ? "hover:bg-[#3e4451] cursor-pointer transition-colors duration-150"
                  : ""
              }
              ${
                isActive
                  ? "bg-[#3b4048] border-l-4 border-blue-500"
                  : "border-l-4 border-transparent"
              }
            `}
          >
            <span className="w-8 text-right mr-4 text-[#5c6370] select-none flex-shrink-0">
              {lineNumber}
            </span>

            <pre className="whitespace-pre flex-1">
              <span
                className={`${interactive ? "group-hover:text-white" : ""} ${
                  isActive ? "text-white font-semibold" : ""
                }`}
              >
                {lineContent}
              </span>
            </pre>

            {interactive && !isActive && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        );
      })}
      <div className="h-20" />
    </div>
  );
};

export default CodeViewer;
