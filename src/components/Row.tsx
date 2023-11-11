import Cell from "./Cell";

export default function Row({
  secretWord,
  pos,
  currentRow,
  setRowWords,
  cellClass,
}: {
  secretWord: string;
  pos: number;
  cellClass: string[][];
  currentRow: number;
  setRowWords: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="row">
      {Array(secretWord.length)
        .fill(0)
        .map((_, i) => {
          return (
            <Cell
              key={i}
              isCurrent={pos === currentRow}
              setRowWords={setRowWords}
              cellIndex={i}
              cellClass={cellClass}
              rowIndex={pos}
            />
          );
        })}
    </div>
  );
}
