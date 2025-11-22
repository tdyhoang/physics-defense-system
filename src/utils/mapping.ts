import { defenseDatabase, type DefenseBlock } from "../data/knowledge_base";

export const findBlockByLine = (
  lineNumber: number
): DefenseBlock | undefined => {
  return defenseDatabase.find((block) => block.lines.includes(lineNumber));
};

export const isInteractiveLine = (lineNumber: number): boolean => {
  return defenseDatabase.some((block) => block.lines.includes(lineNumber));
};
