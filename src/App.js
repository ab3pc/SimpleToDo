import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import InputCheckBox from "./components/InputCheckBox";
import Item from "./components/Item";
import { changeCategory } from "./components/reduxToolkit/categorySlice";
import { useAddTaskAPIMutation, useChangeComplitedAPIMutation, useDeleteTaskAPIMutation, useGetAllTasksQuery, useEditTaskAPIMutation} from "./components/reduxToolkit/tasksAPI";
import {
  editTodo,
  fetchToDos,
  deleteToDo,
  addToDo,
  changeStatusToDO
} from "./components/reduxToolkit/todoSlice";



function App() {
  const [visibleAddTask, setVisibleAddTask] = React.useState(false);
  const [taskInput, setTaskInput] = React.useState("");
  const dispatch = useDispatch();

  const handleTaskInput = (e) => {
    setTaskInput(e.target.value);
  };
 // const { tasks, status } = useSelector(({ tasks }) => tasks);
  const { category } = useSelector(({ category }) => category);
  
  // ===RTK QUERY===
  const {data, error, isLoading} = useGetAllTasksQuery(category);
  const [addTaskAPI] = useAddTaskAPIMutation();
  const [deleteTaskAPI, {error: deleteError, isSuccess: deleteSuccess}] = useDeleteTaskAPIMutation();
  const [changeComplitedAPI] = useChangeComplitedAPIMutation();
  const [editTaskAPI, {error: editError}] = useEditTaskAPIMutation();
  // ===RTK QUERY===


  // React.useEffect(() => {
   //   dispatch(fetchToDos(category));
  //   }, [category]);

  const currentDate = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dateTime = date + " " + time;
    return dateTime;
  };

  const addTask =  () => {
    if (!taskInput) {
      alert("EMPTY! Please, enter your task");
      return;
    }
     addTaskAPI({text: taskInput, checked: false, date: currentDate()}).unwrap()
    .then((payload) => console.log('fulfilled', payload))
    .catch((error) => console.error('rejected', error));


    //dispatch(addToDo({ text: taskInput, checked: false, date: currentDate() }));
    setVisibleAddTask(false);
    setTaskInput("");
  };

  const editTask = (id, text) => {
    const newText = window.prompt("Enter new text, please", text);
    if (!newText) {
      return;
    }
    editTaskAPI({id, newText}).unwrap();
    
     // dispatch(editTodo({id, newText}));
   };

  const removeTask = (id) => {
  
    if (window.confirm("Delete task?")) {
      deleteTaskAPI(id).unwrap();
      //dispatch(deleteToDo(id));
    
    }
  };

  const checkedTask = (id, complited) => {
    changeComplitedAPI({id, complited}).unwrap();
//dispatch(changeStatusToDO({id, complited})); 
}

  //=========================Section4sorting===============================================

  const sortBy = [
    { id: null, name: "All" },
    { id: true, name: "Completed" },
    { id: false, name: "Active" },
  ];

  const setCategoty = (key) => {
    dispatch(changeCategory(key));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="todo">
          <div className="todo__title">
            <h1>Simple ToDo</h1>
          </div>

          <div className="todo__content">
            <div className="todo__sort">

              {sortBy.map((item, id) => (
                <InputCheckBox
                  key={`${id}_${item.name}`}
                  {...item}
                  setCategoty={setCategoty}
                  category={category}
                />
              ))}
            </div>

            {isLoading && <h2>LOADING...</h2>}
            {error && <h2>Error {error}</h2>}

            <ul className="todo__items">
              {data
                ? data.map((task, id) => (
                    <Item
                      key={`${task.id}__${id}`}
                      {...task}
                      edit={editTask}
                      remove={removeTask}
                      onCheked={checkedTask}
                    />
                  ))
                : "Нет задач. Нажмите добавить и введите текст"}
            </ul>

            <div className="todo__input">
              <div
                className="todo__input-add"
                onClick={() => setVisibleAddTask(!visibleAddTask)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1V15"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 8H15"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Add task</span>
              </div>
              {visibleAddTask && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter your task, please! Please!!!"
                    onChange={handleTaskInput}
                  />
                  <button onClick={addTask}>Add</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
