import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { nextPhase } from "./game.slice";

interface CountdownProps {
    timeout?: number;
    hidden?: boolean;
}

export default function Countdown({ hidden = false, timeout }: CountdownProps) {
    const [timeLeft, setTimeLeft] = React.useState(timeout || Math.floor(Math.random() * 4) + 2);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (!timeLeft) {
            dispatch(nextPhase());
            return;
        };

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {hidden ? "" : <Typography fontFamily="monospace" variant="h1">{timeLeft}</Typography>}
        </Box>
    );
}