import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { nextPhase } from "./game.slice";


export default function Countdown() {
    const [timeLeft, setTimeLeft] = React.useState(Math.floor(Math.random() * 4) + 2);
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
        <Box sx={{
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography fontFamily="monospace" variant="h1">{timeLeft}</Typography>
        </Box>
    );
}