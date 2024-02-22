import authLocalStorageService from "@/services/localStorage/authLocalStorageService";
import { UserLogIn } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fakeLoginData = {
  access_token: "fakeAccessToken",
};

const fakeUserData = {
  email: "fakeuser@example.com",
};

export const logIn = createAsyncThunk("auth/logIn", async ({ login, password }: UserLogIn, { rejectWithValue }) => {
  try {
    if (login === "admin" && password === "admin") {
      authLocalStorageService.setData({ accessToken: fakeLoginData.access_token });
      return { login, auth: true };
    } else {
      return rejectWithValue("Incorrect username or password");
    }
  } catch (error: any) {
    return rejectWithValue("Login failed");
  }
});


export const requestAuth = createAsyncThunk("auth/request", async (_, { rejectWithValue }) => {
  try {
    return { auth: !!authLocalStorageService.getAccessToken(), ...fakeUserData };
  } catch (error: any) {
    return rejectWithValue("Failed to fetch user data");
  }
});

export const logOut = createAsyncThunk("auth/logOut", async (_, { rejectWithValue }) => {
  try {
    authLocalStorageService.deleteData();
    return { auth: false };
  } catch (error: any) {
    return rejectWithValue("Logout failed");
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
  entity: { auth: false, email: "v@razrabotke.net" },
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, setPending);
    builder.addCase(logIn.rejected, setRejected);
    builder.addCase(logIn.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.entity = { ...state.entity, ...payload };
    });
    builder.addCase(requestAuth.pending, setPending);
    builder.addCase(requestAuth.rejected, setRejected);
    builder.addCase(requestAuth.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.entity = { ...state.entity, ...payload };
    });
    builder.addCase(logOut.pending, setPending);
    builder.addCase(logOut.rejected, setRejected);
    builder.addCase(logOut.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.entity = { ...state.entity, ...payload };
    });
  }
});

const { reducer: authReducer } = authSlice;

export const getAuth = () => (state: any) => state.auth.entity;
export const getAuthLoading = () => (state: any) => state.auth.isLoading;
export const getAuthError = () => (state: any) => state.auth.error;

export default authReducer;
