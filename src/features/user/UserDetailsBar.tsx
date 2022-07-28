import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { logout, selectUser } from "./user.slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMenuItem } from "../../interfaces";

interface IMenuItemsProps {
    menu: IMenuItem[];
}

export default function UserDetailsBar({ menu }: IMenuItemsProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleAction = (action: Function) => {
        handleClose();
        action();
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    React.useEffect(() => {
        if (!user.username) {
            navigate("/");
        }
    }, []);

    return (
        <Box sx={{ maxHeight: "10vh", flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" sx={{ mr: 1 }} onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        {menu.map(({ title, action }) =>
                            <MenuItem key={title} onClick={() => handleAction(action)}>{title}</MenuItem>
                        )}
                        <MenuItem key="Log Out" onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {user.username}
                    </Typography>
                    <Avatar sx={{ backgroundColor: "purple" }}>{user.score}</Avatar>
                </Toolbar>
            </AppBar>
        </Box>
    );
}