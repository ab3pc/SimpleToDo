import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import tasksReducer from "./todoSlice";
import categoryReducer from "./categorySlice";
import { tasksApi } from "./tasksAPI";




export default configureStore({
	reducer: {
		tasks: tasksReducer,
		category: categoryReducer,
		[tasksApi.reducerPath]: tasksApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
})