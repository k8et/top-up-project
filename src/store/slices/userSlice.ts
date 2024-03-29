import { UserCreate, UserUpdate } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const fakeUserData = [
  {
    id_user: "user_1",
    name: "user_1",
    token: "fqfw11wf",
    username: "user_1",
  }
];


const fakeCreateUser = async (payload: any) => {
  return { content: payload };
};

const fakeUpdateUser = async (payload: any) => {
  return { content: payload };
};

const fakeDeleteUser = async (userId: any) => {
  return userId;
};

export const requestUser = createAsyncThunk("user/request", async (_,) => {
  return fakeUserData;
});

export const createUser = createAsyncThunk("user/create", async (payload: UserCreate, { rejectWithValue }) => {
  try {
    const content = await fakeCreateUser(payload);
    return { ...payload, ...content };
  } catch (error: any) {
    return rejectWithValue(JSON.stringify(error));
  }
});

export const updateUser = createAsyncThunk("user/update", async (payload: UserUpdate, { rejectWithValue }) => {
  try {
    const content = await fakeUpdateUser(payload);
    return { ...payload, ...content };
  } catch (error: any) {
    return rejectWithValue(JSON.stringify(error));
  }
});

export const deleteUser = createAsyncThunk("user/delete", async (payload: number, { rejectWithValue }) => {
  try {
    await fakeDeleteUser(payload);
    return payload;
  } catch (error: any) {
    return rejectWithValue(JSON.stringify(error));
  }
});

const setPending = (state: any) => {
  state.isLoading = true;
  state.error = null;
};
const setRejected = (state: any, { payload }: any) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  entities: [],
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestUser.pending, setPending);
    builder.addCase(requestUser.rejected, setRejected);
    builder.addCase(requestUser.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.entities = payload;
    });
    builder.addCase(createUser.pending, setPending);
    builder.addCase(createUser.rejected, setRejected);
    builder.addCase(createUser.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.entities = [...state.entities, payload];
    });
    builder.addCase(updateUser.pending, setPending);
    builder.addCase(updateUser.rejected, setRejected);
    builder.addCase(updateUser.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      const index = state.entities.findIndex((f: any) => f?.id_user === payload?.id_user);
      state.entities[index] = { ...state.entities[index], ...payload };
    });
    builder.addCase(deleteUser.pending, setPending);
    builder.addCase(deleteUser.rejected, (state, action) => {
      setRejected(state, action);
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.entities = state.entities.filter((f: any) => f?.id_user !== payload);
    });
  }
});

const { reducer: userReducer } = userSlice;

export const getUserList = () => (state: any) => state.user.entities;
export const getUserLoading = () => (state: any) => state.user.isLoading;
export const getUserError = () => (state: any) => state.user.error;

export default userReducer;
