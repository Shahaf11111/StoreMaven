import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/user.slice";
import gameRoundReducer from "../features/game/game.slice";
import alertReducer from "../features/alert/alert.slice";
import leaderboardReducer from "../features/leaderboard/leaderboard.slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        gameRound: gameRoundReducer,
        leaderboard: leaderboardReducer,
        alert: alertReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
