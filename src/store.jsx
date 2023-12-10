import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import activeChatSlice from "./slices/activeChatSlice";

// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    activeChat: activeChatSlice,
  },
});
