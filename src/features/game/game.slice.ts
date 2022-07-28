import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Side } from "../../interfaces";
import { error, success } from "../alert/alert.slice";
import { score } from "../user/user.slice";

interface GameRound {
    phase: "idle" | "run" | "complete";
    side: Side | null;
}

const initialState: GameRound = {
    phase: "idle",
    side: null,
};

export const gameRoundSlice = createSlice({
    name: "game-round",
    initialState,
    reducers: {
        idle: () => ({ ...initialState }),
        run: (state) => ({ ...state, phase: "run" }),
        complete: (state) => ({ ...state, phase: "complete" }),
        setSide: (state, action: PayloadAction<Side>) => ({ ...state, side: action.payload }),
    },
});

export const { idle, run, complete, setSide } = gameRoundSlice.actions;

export const selectPhase = (state: RootState) => state.gameRound.phase;
export const selectSide = (state: RootState) => state.gameRound.side;

export const userInput =
    (chosenSide: Side): AppThunk =>
        (dispatch, getState) => {
            const phase = selectPhase(getState());
            if (phase === "idle") {
                dispatch(error("Too Soon"));
                dispatch(complete());
            } else if (phase === "run") {
                const side = selectSide(getState());
                if (side === chosenSide) {
                    dispatch(success("Hurray!"));
                    dispatch(score());
                } else {
                    dispatch(error("Wrong Key"));
                }
                dispatch(complete());
            } else if (phase === "complete") {
                dispatch(error("Too Late"));
                dispatch(idle());
            }
        }

export const nextPhase =
    (): AppThunk =>
        (dispatch, getState) => {
            const phase = selectPhase(getState());
            if (phase === "idle") {
                dispatch(run());
            } else if (phase === "run") {
                dispatch(complete());
            } else {
                dispatch(idle());
            }
        }


export default gameRoundSlice.reducer;
