import { ChangeEvent, useState, useRef } from "react";

export default function Cell({
  isCurrent,
  setRowWords,
  rowIndex,
  cellIndex,
  cellClass,
}: {
  isCurrent: boolean;
  cellIndex: number;
  rowIndex: number;
  cellClass: string[][];
  setRowWords: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (!isCurrent) return;
    if (!/^[a-zA-Z]+$/.test(value)) {
      setInput("");
      return;
    }
    setInput(value.toUpperCase());
    setRowWords((prev) => {
      const newRowWords = [...prev];
      newRowWords[cellIndex] = value.toUpperCase();
      return newRowWords;
    });
    inputRef?.current?.blur();
    if (cellIndex < cellClass[rowIndex].length - 1) {
      const nextInput = inputRef?.current?.parentNode?.parentNode?.children[
        cellIndex + 1
      ].children[0] as HTMLInputElement;
      nextInput?.focus();
    }
  }

  return (
    <div className={cellClass[rowIndex][cellIndex]}>
      <input
        type="text"
        className="input"
        disabled={!isCurrent}
        maxLength={1}
        onChange={(e) => handleChange(e)}
        value={input}
        ref={inputRef}
      />
    </div>
  );
}
