import { IconButton, Icon } from "@chakra-ui/react";

interface CBProps {
    colour: string;
    handleFn: (colour: string) => void;
}

export function ColourButtons(props: CBProps): JSX.Element {
    return (
        <IconButton
            aria-label="colour"
            icon={
                <CircleIcon
                    boxSize={8}
                    color={
                        props.colour === "yellow"
                            ? `${props.colour}.400`
                            : `${props.colour}.500`
                    }
                />
            }
            colorScheme={props.colour}
            size={"lg"}
            isRound={true}
            color={props.colour}
            onClick={() => {
                props.handleFn(props.colour);
            }}
        />
    );
}
const CircleIcon = (props: { boxSize: number; color: string }) => (
    <Icon viewBox="0 0 200 200" {...props}>
        <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
        />
    </Icon>
);
