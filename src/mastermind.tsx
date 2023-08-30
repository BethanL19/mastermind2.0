import { useState } from "react";
import {
    colours,
    checkCombo,
    createCode,
    guessesBoard,
    shuffleArray,
} from "./mastermindFns";
import { ColourButtons } from "./colourButton";
import ConfettiExplosion from "react-confetti-explosion";

export function MasterMind(): JSX.Element {
    const initialCode = createCode();

    const [selectedColour, setSelectedColour] = useState("");
    const [board, setBoard] = useState(guessesBoard);
    const [code, _setCode] = useState(initialCode);
    const [gameWon, setGameWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [clickedGuessButtons, setClickedGuessButtons] = useState<number[]>(
        []
    );
    const [_guessButtonPressed, setGuessButtonPressed] = useState(false);
    const [isExploding, setIsExploding] = useState(false);

    let guessNo = 1;
    const options = colours;

    const checkGameFinished = () => {
        if (gameWon === true) {
            alert("You've already won, please refresh for a new game!");
        } else if (gameOver === true) {
            alert("Game Over, refresh to try again!");
        }
    };

    const handleMakeGuess = (rowIndex: number) => {
        checkGameFinished();
        const guess = board[rowIndex].row;
        const result = checkCombo(guess, code);
        const shuffleResult = shuffleArray(result);
        const updatedBoard = [...board];
        updatedBoard[rowIndex].pegs = shuffleResult;
        setBoard(updatedBoard);
        guessNo++;
        if (shuffleResult.every((colour) => colour === "red")) {
            alert("You Win!");
            setGameWon(true);
            setIsExploding(true);
        } else if (guessNo === 10) {
            alert("Game Over, refresh to try again!");
            setGameOver(true);
        }
    };
    const handleColourSelection = (colour: string) => {
        setSelectedColour(colour);
    };
    const handleAddColourToGuess = (rowIndex: number, columnIndex: number) => {
        checkGameFinished();
        const updatedBoard = [...board];
        updatedBoard[rowIndex].row[columnIndex] = selectedColour;
        setBoard(updatedBoard);
    };
    const doNothingWhenPegClicked = (_colour: string) => {
        ("");
    };
    const isGuessButtonClicked = (rowIndex: number) => {
        return clickedGuessButtons.includes(rowIndex);
    };
    const checkGuessComplete = (guess: string[]) => {
        return !guess.includes("white");
    };
    const handleGuessButtonClick = (rowIndex: number) => {
        if (
            !isGuessButtonClicked(rowIndex) &&
            checkGuessComplete(board[rowIndex].row)
        ) {
            handleMakeGuess(rowIndex);
            setClickedGuessButtons((prevClickedButtons) => [
                ...prevClickedButtons,
                rowIndex,
            ]);
            setGuessButtonPressed(true);
        } else {
            alert("guess incomplete");
        }
    };

    const optionsButtons = options.map((c, index) => (
        <ColourButtons
            key={index}
            colour={c}
            handleFn={() => {
                handleColourSelection(c);
            }}
        />
    ));
    const wholeBoard = board.map((r, rowIndex) => (
        <div key={rowIndex} className="Board">
            {r.row.map((c, columnIndex) => (
                <ColourButtons
                    key={columnIndex}
                    colour={c}
                    handleFn={() => {
                        handleAddColourToGuess(rowIndex, columnIndex);
                    }}
                />
            ))}
            {r.pegs.map((c, rowIndex) => (
                <ColourButtons
                    key={rowIndex}
                    colour={c}
                    handleFn={() => {
                        doNothingWhenPegClicked(c);
                    }}
                />
            ))}
            <button
                className="GuessButton"
                key={rowIndex}
                onClick={() => {
                    handleGuessButtonClick(rowIndex);
                }}
                disabled={isGuessButtonClicked(rowIndex)}
            >
                Guess
            </button>
        </div>
    ));

    return (
        <>
            <div className="Options">{optionsButtons}</div>
            <>
                {isExploding && (
                    <ConfettiExplosion
                        force={0.8}
                        duration={3000}
                        particleCount={250}
                        width={1600}
                    />
                )}
            </>
            <div className="Board">{wholeBoard}</div>
            {/* {code.map((c, index) => (
                <h1 key={index}>{c}</h1>
            ))} */}
        </>
    );
}

/*
guessNp = 1 , max = 10 then you lose
add complete previous turn or something alert if previous guess not made
add you lose if run out of guess & reveal code
newgame/reset button*/
