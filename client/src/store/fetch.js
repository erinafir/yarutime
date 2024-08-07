import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import serverApi from "../helper/serverApi";

const initialState = {
    tasksState: []
}

export const taskSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    fetchTasks: (state, action) => {
      state.tasks = action.payload;
      // console.log(state.tasks, 'slice');
      // return state;
    },
  },
});

export const { fetchTasks } = taskSlice.actions;
export const fetchData = () => {
  return async function (dispatch) {
      try {
          const { data } = await serverApi({
              url: `/task`,
              method: "get",
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem(`token`)}`
              }
          })
          // console.log(data, `----------`);
          dispatch(fetchTasks(data))
          // console.log(data, '.....');
      } catch (error) {
          console.log(error);
          Swal.fire({
              title: 'Error!',
              text: error.response.data.message,
              icon: 'error',
              confirmButtonText: 'Cool'
            })
      }
  }
}

export default taskSlice.reducer