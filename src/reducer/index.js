import {
  changePositionRightCurrentTask,
  changePositionLeftCurrentTask,
  findOneTaskForDelete,
  findOneTaskForModify,
} from '../selectors';

import {
  CHANGE_INPUT_VALUE,
  CHANGE_POSITION_RIGHT,
  CHANGE_POSITION_LEFT,
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
  newData
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
      console.log('idtask', idTask);
      console.log('idcolumn', idColumn)
      const modifiedTask = state.listTaks.map((task) => {
        if (task.id === idTask) {
          return { ...task, status: idColumn }
        }
        else return task
      });
      // console.log("modifiedTask", modifiedTask);
      newData();
      return {
        ...state,
        listTaks: modifiedTask,
      };
    }
    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        newTask: value,
      };

    case CHANGE_POSITION_RIGHT:
      return {
        ...state,
        listTaks: [...changePositionRightCurrentTask(state.listTaks, idTask)]
      };
    case CHANGE_POSITION_LEFT:
      return {
        ...state,
        listTaks: [...changePositionLeftCurrentTask(state.listTaks, idTask)]
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        listTaks: [...state.listTaks, newTask],
        newTaskValue: '',
      };
    case DELETE_TASK:
      return {
        ...state,
        listTaks: [...findOneTaskForDelete(state.listTaks, idTask)]
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
    case HANDLE_MODIFY_SUBMIT:
      return {
        ...state,
        listTaks: [...findOneTaskForModify(state.listTaks, state.inputModifyId, state.modifyInputValue)],
        inputModifyId: 0,
        modifyInputValue: '',
      };
    default:
      // de base on retourne le state courant
      return state;
  }
};

export default reducer;