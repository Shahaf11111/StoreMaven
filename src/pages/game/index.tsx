import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Game from "../../features/game";
import { logout } from "../../features/user/user.slice";
import UserDetailsBar from "../../features/user/UserDetailsBar";
import { IMenuItem } from "../../interfaces";

export default function GamePage() {
    const dispatch = useAppDispatch();
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
            action: () => console.log('leaderboard'),
        }
    ];

    return (
        <Box>
            <UserDetailsBar menu={menu} />
            <Game />
        </Box>
    );
}
