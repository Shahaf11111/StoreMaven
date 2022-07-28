import { Box } from "@mui/material";
import useEventListener from "../../hooks/useEventListener";
import GameBoard from "./GameBoard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Side } from "../../interfaces";
import { selectPhase, userInput } from "./game.slice";
import Countdown from "./Countdown";

export default function Game() {
    const phase = useAppSelector(selectPhase);
    const dispatch = useAppDispatch();

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key == "a") {
            dispatch(userInput(Side.left));
        }
        if (event.key == "l") {
            dispatch(userInput(Side.right));
        }
    }

    useEventListener("keypress", handleKeyPress);

    return (
        <Box>
            {phase === "idle" && <Countdown />}
            {phase === "run" && <GameBoard />}
            {phase === "complete" && <Countdown />}
        </Box>
    );
}
