export function Instructions(): JSX.Element {
    return (
        <>
            <h1>How To Play:</h1>
            <ul className="Instructions-body">
                <li>
                    The code is made up of 4 of the colours of any combination
                    with no duplicates
                </li>
                <li>
                    Make guesses from the bottom up filling in the white pegs
                    with colours (click on the colours at the top and click
                    where on the board you wish to add it) and press the 'Guess'
                    button to submit a guess
                </li>
                <li>
                    When a guess is made pegs on the righthand side will
                    populate as followed:
                    <li>red = right colour, right place</li>
                    <li>white = right colour, wrong place</li>
                    <li>black = wrong colour</li>
                </li>
            </ul>
        </>
    );
}
