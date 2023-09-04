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
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
} from "@chakra-ui/react";
let guessNo = 0;

export function MasterMind(): JSX.Element {
    const initialCode = createCode();

    const [selectedColour, setSelectedColour] = useState("white");
    const [board, setBoard] = useState(guessesBoard);
    const [code, _setCode] = useState(initialCode);
    const [gameWon, setGameWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [clickedGuessButtons, setClickedGuessButtons] = useState<number[]>(
        []
    );
    const [_guessButtonPressed, setGuessButtonPressed] = useState(false);
    const [isExploding, setIsExploding] = useState(false);

    const options = colours;

    const checkGameFinished = () => {
        if (gameWon === true) {
            alert("You've already won, please refresh for a new game!");
            return true;
        } else if (gameOver === true) {
            alert("Game Over, refresh to try again!");
            return true;
        }
    };

    const checkOnCorrectTurn = (guessRowIndex: number) => {
        const turnRowIndex = 9 - guessNo;
        if (guessRowIndex < turnRowIndex) {
            alert("Previous guess incomplete");
            return false;
        } else {
            return true;
        }
    };

    const handleMakeGuess = (rowIndex: number) => {
        checkGameFinished();
        if (checkOnCorrectTurn(rowIndex)) {
            const guess = board[rowIndex].row;
            const result = checkCombo(guess, code);
            const shuffleResult = shuffleArray(result);
            const updatedBoard = [...board];
            updatedBoard[rowIndex].pegs = shuffleResult;
            setBoard(updatedBoard);
            guessNo++;
            if (shuffleResult.every((colour) => colour === "red")) {
                setGameWon(true);
                setIsExploding(true);
            } else if (guessNo === 10) {
                setGameOver(true);
            }
        }
    };
    const handleColourSelection = (colour: string) => {
        setSelectedColour(colour);
    };
    const handleAddColourToGuess = (rowIndex: number, columnIndex: number) => {
        if (checkOnCorrectTurn(rowIndex) && !checkGameFinished()) {
            const updatedBoard = [...board];
            updatedBoard[rowIndex].row[columnIndex] = selectedColour;
            setBoard(updatedBoard);
        }
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
            alert("Guess incomplete");
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
            {gameWon && (
                <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="10vh"
                    marginTop={"2vh"}
                >
                    <AlertIcon />
                    <AlertTitle>You Win!</AlertTitle>
                </Alert>
            )}
            {gameOver && (
                <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="10vh"
                    marginTop={"2vh"}
                >
                    <AlertIcon />
                    <AlertTitle>You Lose!</AlertTitle>
                    <AlertDescription>
                        The code was:{" "}
                        {`${code[0]}, ${code[1]}, ${code[2]}, ${code[3]}`}
                    </AlertDescription>
                </Alert>
            )}
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
newgame/reset button - reset code, confetti, board, gameWon, gameOver
replace generic alerts with something better
*/
