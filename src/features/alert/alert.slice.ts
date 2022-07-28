import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from '../../api';
import { RootState, AppThunk } from '../../app/store';
import { Side, User } from '../../interfaces';
import { score } from '../user/user.slice';

interface Alert {
    severity: 'info' | 'success' | 'error';
    message: string | null;
}

const initialState: Alert = {
    severity: 'success',
    message: null,
};

export const gameRoundSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        hide: () => ({ ...initialState }),
        info: (state, action: PayloadAction<string>) => ({ severity: 'info', message: action.payload }),
        success: (state, action: PayloadAction<string>) => ({ severity: 'success', message: action.payload }),
        error: (state, action: PayloadAction<string>) => ({ severity: 'error', message: action.payload }),
    },
});


export const { hide, info, success, error } = gameRoundSlice.actions;

export const selectSeverity = (state: RootState) => state.alert.severity;
export const selectMessage = (state: RootState) => state.alert.message;

export default gameRoundSlice.reducer;
