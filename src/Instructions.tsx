export function Instructions(): JSX.Element {
    return (
        <>
            <h1>How To Play:</h1>
            <ul className="Instructions-body">
                <li>
                    The code is made up of any combination of the colours with
                    no duplicates
                </li>
                <li>
                    Make guesses from the bottom up filling in the pegs with
                    colours (click on the colours at the top and click where on
                    the board you wish to add it) and press the 'Guess' button
                    to submit a guess
                </li>
                <li>
                    When a guess is made pegs on the righthand side will
                    populate as followed:
                    <ul>
                        <li>red = right colour, right place</li>
                        <li>white = right colour, wrong place</li>
                        <li>black = wrong colour</li>
                    </ul>
                </li>
            </ul>
        </>
    );
}
