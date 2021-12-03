
import {
  CHANGE_INPUT_VALUE,
  ADD_NEW_TASK,
  TOGGLE_MODIFY_TASK,
  DELETE_TASK,
  CHANGE_DATA_TASK,
  SEND_MESSAGE_ERROR_TRUE,
  SEND_MESSAGE_ERROR_FALSE,
  ON_MODIFY_INPUT_VALUE_CHANGE,
  HANDLE_MODIFY_SUBMIT,
  HANDLE_TASKDRAPPING,
  HANDLE_CHANGE_POSITION_TASK_IN_COLUMN,
} from '../actions';

const initialState = {
  listTaks: [],
  newTaskValue: '',
  errorMessage: false,
  inputModifyId: 0,
  modifyInputValue: '',
  taskDragging: 0,
}
const reducer = (state = initialState, {
  type,
  value,
  idTask,
  newTask,
  payload,
  inputValue,
  idColumn,
  modifiedValue,
  idTaskModified,
  idTaskDrapping
}) => {
  switch (type) {
    case CHANGE_DATA_TASK:
      return {
        ...state,
        listTaks: payload,
      };
    case HANDLE_TASKDRAPPING:
      return {
        ...state,
        taskDragging: payload,
      };
    case HANDLE_CHANGE_POSITION_TASK_IN_COLUMN: {
      const modifiedTask = state.listTaks.map((task) => {
        if (task.id === idTask) {
          return { ...task, status: idColumn }
        }
        else return task
      });
      return {
        ...state,
        listTaks: modifiedTask,
      };
    }
    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        newTaskValue: value,
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        listTaks: [...state.listTaks, newTask],
        newTaskValue: '',
      };
    case DELETE_TASK: {
      console.log('idDelete', idTask);
      const newListOfTasks = []
      const listOfTasksWithoutIdTaskDelete = state.listTaks.map((task) => {
        if (task.id !== idTask) {
          //obligé de push dans un nouveau tableau pour éviter un élement undefined
          return newListOfTasks.push(task)
        }
        else { }
      });
      return {
        ...state,
        listTaks: newListOfTasks,
      };
    };
    case TOGGLE_MODIFY_TASK:
      return {
        ...state,
        inputModifyId: idTask
      };
    case SEND_MESSAGE_ERROR_TRUE:
      return {
        ...state,
        errorMessage: true
      };
    case SEND_MESSAGE_ERROR_FALSE:
      return {
        ...state,
        errorMessage: false,
      };
    case ON_MODIFY_INPUT_VALUE_CHANGE:
      return {
        ...state,
        modifyInputValue: inputValue,
      };
    case HANDLE_MODIFY_SUBMIT: {
      const listOfTasksWithTaskModified = state.listTaks.map((task) => {
        if (task.id === state.inputModifyId && state.modifyInputValue.length > 0) {
          return { ...task, label: state.modifyInputValue }
        }
        else return task
      });
      return {
        ...state,
        listTaks: listOfTasksWithTaskModified,
        inputModifyId: 0,
      };
    }
    default:
      // de base on retourne le state courant
      return state;
  }
};

export default reducer;