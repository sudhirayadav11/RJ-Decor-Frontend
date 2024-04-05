import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";


const initialState = {
  isLoggedIn: false,
  user: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// logout user
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("token");
   // Call the logout API
   const response = await authService.logout();
   return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  
  },

  extraReducers: (builder) => {
    builder


      // register user
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Register successful!");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
          ? action.payload.toString()
          : "Unknown Error";
        state.user = null;
        toast.error(state.message);
      })



      // login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...action.payload,
            cartItems: [...action.payload.cartItems],
          })
        );
        toast.success("login successful!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
          ? action.payload.toString()
          : "Unknown Error";
        state.user = null;
        toast.error(state.message);
      })




        // logout user
      .addCase(logout.pending, (state) => {
          state.isLoading = true;
        })
      .addCase(logout.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isLoggedIn = false;
          state.user = null;
          toast.success(action.payload);
        })
      .addCase(logout.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
            ? action.payload.toString()
            : "Unknown Error";
          state.user = null;
          toast.error(state.message);
        })


  },
});

export const { RESET_AUTH } = userSlice.actions;

export default userSlice.reducer;
