import { configureStore } from "@reduxjs/toolkit";
import  taskSlice  from "./fetch";

export default configureStore({
  reducer: {
    fetch: taskSlice
  },
});
