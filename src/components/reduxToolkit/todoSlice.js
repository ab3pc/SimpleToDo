import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchToDos = createAsyncThunk(
  "tasksToolkit/fetchToDos",
  async function (category, { rejectWithValue }) {
    try {
      const response = await axios
        .get(
          `http://localhost:3001/tasks?${
            category !== null ? `checked=${category}` : ""
          }`
        )
        .catch((err) => {
          if (err.response.status === 404) {
            throw new Error("Can't load tasks. Server Error!");
          }
        });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteToDo = createAsyncThunk(
  "tasksToolkit/deleteToDo",
  async function (id, { rejectWithValue, dispatch }) {
      try {
      const response = await axios
        .delete(`http://localhost:3001/tasks/${id}`)
        .catch((err) => {
          if (err.response.status === 404) {
            throw new Error("Can't delete task. Server error!");
          }
        });
      dispatch(removeTsk(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToDo = createAsyncThunk(
  "tasksToolkit/addToDo",
  async function (obj, { rejectWithValue, dispatch }) {
    try {
      const response = await axios
        .post("http://localhost:3001/tasks", obj)
        .catch((err) => {
          if (err.response.status === 404) {
            throw new Error("Cat't add task. Some problem with server");
          }
        });

      dispatch(addTsk(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeStatusToDO = createAsyncThunk(
	"tasksToolkit/changeStatusToDO",
	async function({id,complited}, {rejectWithValue, dispatch}) {
		try {
			const response = await axios.patch(`http://localhost:3001/tasks/${id}`, {checked: complited}).catch((err) => {
				if(err.response.status === 404) {
					throw new Error('Can\'t change status! Some problem with server!')
				}
			})
		
			dispatch(changeCheked(response.data));
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
);

export const editTodo = createAsyncThunk(
	'tasksToolkit/editTodo',
	async function({id, newText}, {rejectWithValue,dispatch,getState}) {
   		try {
			const response = await axios.patch(`http://localhost:3001/tasks/${id}`, {text: newText}).catch((err) => {
				if(err.response.status === 404) {
					throw new Error("Can't edit ToDO. Some problem with server")
				}
			});

		} catch (error) {
			return rejectWithValue(error.message)
		}
    dispatch(editTasks({id, newText}));
	}
)

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: "tasksToolkit",
  initialState: {
    tasks: [],
    status: null,
    error: null,
  },
  reducers: {
    addTsk(state, action) {
      state.tasks.push(action.payload);
    },
    editTasks(state, action) {
      state.tasks = state.tasks.map(task => {
        if (task.id === action.payload.id) {
          task.text = action.payload.newText
        }
        return task;
      })
	},
    removeTsk(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    changeCheked(state, action) {
			state.tasks = state.tasks.map(task => {
			if (task.id === action.payload.id) {
				task.checked = action.payload.checked
			}
			return task
		})
	},
  },
  extraReducers: {
    [fetchToDos.pending]: (state) => {
      state.status = "loading";
      state.error = null; //не обьязательно, если была какая-то ошибка то обнуляем
    },
    [fetchToDos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.tasks = action.payload;
    },

    [addToDo.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.error = action.payload;
    },
    [fetchToDos.rejected]: setError,
    [deleteToDo.rejected]: setError,
    [addToDo.rejected]: setError,
    [changeStatusToDO.rejected]: setError,
    [editTodo.rejected]: setError,
  },
});
const { addTsk, editTasks, removeTsk, changeCheked } =
  tasksSlice.actions;

export default tasksSlice.reducer;
