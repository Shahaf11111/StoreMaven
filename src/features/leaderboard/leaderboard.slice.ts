import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { RootState, AppThunk } from "../../app/store";
import { Score } from "../../interfaces";
import { error } from "../alert/alert.slice";

interface ILeaderboard {
    scores: Score[];
    open: boolean;
}

const initialState: ILeaderboard = {
    scores: [],
    open: false,
};

export const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => ({ ...state, open: action.payload }),
        setScores: (state, action: PayloadAction<Score[]>) => ({ ...state, scores: [...action.payload] }),
    },
});

const { setOpen, setScores } = leaderboardSlice.actions;

export const selectOpenLeaderboard = (state: RootState) => state.leaderboard.open;
export const selectScores = (state: RootState) => state.leaderboard.scores;

export const updateScores =
    (): AppThunk =>
        async (dispatch) => {
            const { data } = await api.getLeaderboard();
            if (data) {
                dispatch(setScores(data));
            } else {
                dispatch(error("No games played"));
            }
        };

export const showLeaderboard =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(setOpen(true));
        };

export const hideLeaderboard =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(setOpen(false));
        };

export default leaderboardSlice.reducer;
