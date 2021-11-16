const initialState = {
  tasks: [],
  lists: [],
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "EDIT_TASK": {
      const newTasks = [...state.tasks].map((task) => {
        if (task.id === action.payload.id) {
          task.text = action.payload.text;
        }
        return task;
      });
      return {
        ...state,
        tasks: newTasks,
      };
    }
    case "REMOVE_TASK": {
      return {
        ...state,
        tasks: [...state.tasks].filter(task => task.id !== action.payload)
      }
    }
case "ADD_TASK": {
  return {
    ...state,
    tasks:[...state.tasks, action.payload]
  }
}
case "SET_CHEKED": {
  const chkd = [...state.tasks].map((task) => {
    if (task.id === action.payload.id) {
      task.checked = action.payload.complited
    }
    return task
  });

  return {
    ...state,
    tasks: chkd

  }
}

    default:
      return state;
  }
};

export default tasks;
