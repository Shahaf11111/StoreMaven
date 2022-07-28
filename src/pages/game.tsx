import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Game from "../features/game";
import Leaderboard from "../features/leaderboard";
import { selectOpenLeaderboard, showLeaderboard } from "../features/leaderboard/leaderboard.slice";
import { logout } from "../features/user/user.slice";
import UserDetailsBar from "../features/user/UserDetailsBar";
import { IMenuItem } from "../interfaces";

export default function GamePage() {
    const dispatch = useAppDispatch();
    const openLeaderboard = useAppSelector(selectOpenLeaderboard);
    const navigate = useNavigate();

    const menu: IMenuItem[] = [
        {
            title: "Switch User",
            action: () => {
                dispatch(logout());
                navigate("/");
            },
        },
        {
            title: "Leaderboard",
            action: () => {
                dispatch(showLeaderboard());
            },
        }
    ];

    return (
        <Box>
            <UserDetailsBar menu={menu} />
            {openLeaderboard ? <Leaderboard /> : <Game />}
        </Box>
    );
}
