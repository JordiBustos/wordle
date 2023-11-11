import { useState } from "react";
import "./App.css";
import Row from "./components/Row";
import useEnter from "./hooks/useEnter";

function App() {
  const SECRET_WORD: string = "REACT";
  const [currentRow, setCurrentRow] = useState(0);
  const [rowWords, setRowWords] = useState<string[]>(
    createRowWords()
  );
  const [cellClass, setCellClass] = useState<string[][]>(
    Array(SECRET_WORD.length + 1).fill(Array(SECRET_WORD.length).fill("cell"))
  );

  function isDisabled() {
    return (
      isWin || currentRow > SECRET_WORD.length + 1 || rowWords.includes("")
    );
  }

  function createRowWords() {
    return Array(SECRET_WORD.length).fill("");
  }

  const [isWin, setIsWin] = useState(false);
  useEnter(!isDisabled() ? handleSubmit : () => {});

  function handleSubmit() {
    const tmpIsWin = rowWords.join("").toUpperCase() === SECRET_WORD;
    
    const newRowClasses = rowWords.map((word, i) => {
      if (word === SECRET_WORD[i]) {
        return "cell success";
      }
      if (SECRET_WORD.includes(word)) {
        return "cell warning";
      }
      return "cell error";
    });

    setCellClass((prev) => {
      const newCellClasses = [...prev];
      newCellClasses[currentRow] = newRowClasses;
      return newCellClasses;
    });

    if (!tmpIsWin) {
      setRowWords(createRowWords());
      setCurrentRow((prev) => prev + 1);
    } else {
      setCurrentRow(Infinity);
    }
    setIsWin(tmpIsWin);
  }

  return (
    <section>
      {isWin && <h1>You win!</h1>}
      {Array(SECRET_WORD.length + 1)
        .fill(0)
        .map((_, i) => {
          return (
            <Row
              key={i}
              pos={i}
              currentRow={currentRow}
              secretWord={SECRET_WORD}
              setRowWords={setRowWords}
              cellClass={cellClass}
            />
          );
        })}
      <button
        disabled={isDisabled()}
        onClick={handleSubmit}
        className="send-button"
      >
        Send
      </button>
    </section>
  );
}

export default App;
