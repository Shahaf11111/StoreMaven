import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Drawer, Typography } from "@mui/material";
import {
    hideLeaderboard,
    selectOpenLeaderboard,
    selectScores,
    updateScores,
} from "./leaderboard.slice";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function Leaderboard() {
    const dispatch = useAppDispatch();
    const open = useAppSelector(selectOpenLeaderboard);
    const scores = useAppSelector(selectScores);

    React.useEffect(() => {
        if (open) {
            dispatch(updateScores());
        }
    }, [open]);

    return (
        <Drawer open={open} onClose={() => dispatch(hideLeaderboard())}>
            <TableContainer component={Paper}>
                <Typography m={2} variant="h5" fontWeight="bold" textAlign="center">Leaderboard</Typography>
                <Table sx={{ m: "auto", minWidth: 300 }}>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>User</StyledTableCell>
                            <StyledTableCell>Score</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {scores.map(({ username, score }) => (
                            <StyledTableRow key={username}>
                                <StyledTableCell component="th" scope="row">
                                    {username}
                                </StyledTableCell>
                                <StyledTableCell>{score}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Drawer>
    );
}