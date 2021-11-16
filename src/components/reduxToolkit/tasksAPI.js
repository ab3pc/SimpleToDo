import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
	reducerPath: 'tasksApi', //в каком месте в редаксе данные будут лежать
	tagTypes: ["Tasks"],
	baseQuery: fetchBaseQuery({baseUrl: 'https://ab3pc-todo.herokuapp.com/'}), //надстройка над простым Fetch, можно и axios
	endpoints: (builder) => ({
		getAllTasks: builder.query({
			query: (category) => `tasks?${category !== null ? `checked=${category}` : ""}`, 
			providesTags: (result) => result
			  ? [
				  ...result.map(({ id }) => ({ type: 'Tasks', id })),
				  { type: 'Tasks', id: 'LIST' },
				]
			  : [{ type: 'Tasks', id: 'LIST' }],
		}),
		addTaskAPI: builder.mutation({
			query: (body) =>({
				url: 'tasks',
				method: "POST",
				body,
			}),
			invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
		}),
		deleteTaskAPI: builder.mutation({
			query: (id) => ({
				url: `tasks/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
		}),
		editTaskAPI: builder.mutation({
			query: ({id,newText}) => ({
				url: `tasks/${id}`,
				method: 'PATCH',
				body: {text: newText}
			}),
			invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
		}),
		changeComplitedAPI: builder.mutation({
			query: ({id, complited}) => ({
				url:  `tasks/${id}`,
				method: 'PATCH',
				body: {checked:complited} 
			}),
			invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
		})
	})
});

export const {useGetAllTasksQuery, useAddTaskAPIMutation, useDeleteTaskAPIMutation, useChangeComplitedAPIMutation, useEditTaskAPIMutation} = tasksApi;