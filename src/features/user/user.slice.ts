import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from '../../api';
import { RootState, AppThunk } from '../../app/store';
import { User } from '../../interfaces';

const initialState: User = {
  _id: '62dceca246adb47c9e94dfe4',
  username: 'shahaf',
  score: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => ({ ...state, _id: action.payload }),
    setUsername: (state, action: PayloadAction<string>) => ({ ...state, username: action.payload }),
    setScore: (state, action: PayloadAction<number>) => ({ ...state, score: action.payload }),
    reset: () => ({ ...initialState }),
  },
});

const { setUserId, setUsername, setScore, reset } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const login =
  (username: string): AppThunk =>
    async (dispatch, getState) => {
      const currentUser = selectUser(getState());
      if (currentUser.username) {
        return;
      }
      const { data, message } = await Api.signUpOrLogIn(username);
      if (data) {
        dispatch(setUserId(data._id));
        dispatch(setUsername(data.username));
        dispatch(setScore(data.score));
      } else {
        dispatch(reset());
      }
      alert(message);
    };

export const logout = (): AppThunk => (dispatch) => { dispatch(reset()) };


export const score =
  (): AppThunk =>
    async (dispatch, getState) => {
      const currentUser = selectUser(getState());
      if (currentUser.username) {
        const { data, message } = await Api.score(currentUser.username);
        if (data) {
          dispatch(setScore(data));
        } else {
          alert(message);
        }
      }
    };

export default userSlice.reducer;
