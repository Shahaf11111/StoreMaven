import { Box } from "@mui/material";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useEventListener from "../../hooks/useEventListener";
import { Side } from "../../interfaces";
import Countdown from "./Countdown";
import { idle, selectPhase, userInput } from "./game.slice";
import GameBoard from "./GameBoard";

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

    React.useEffect(() => {
        dispatch(idle());
    }, []);

    useEventListener("keypress", handleKeyPress);

    return (
        <Box height="90vh">
            {phase === "idle" && <Countdown />}
            {phase === "run" && <GameBoard />}
            {phase === "complete" && <Countdown hidden timeout={1} />}
        </Box>
    );
}
