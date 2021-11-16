export const setTasks = (tasks) => ({
  type: "SET_TASKS",
  payload: tasks,
});

export const editTasks = (id, text) => ({
  type: "EDIT_TASK",
  payload: {
    id,
    text,
  },
});

export const removeTsk = (id) => ({
  type: "REMOVE_TASK",
  payload: id,
});

export const addTsk = (objTask) => ({
	type: "ADD_TASK",
	payload: objTask
});

export const changeCheked = (id, complited) => ({
	type: "SET_CHEKED",
	payload: {
		id,
		complited
	}
})
