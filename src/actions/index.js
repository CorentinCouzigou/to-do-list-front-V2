export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const TOGGLE_MODIFY_TASK = 'TOGGLE_MODIFY_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const GET_DATA = 'GET_DATA';
export const CHANGE_DATA_TASK = 'CHANGE_DATA_TASK';
export const SEND_MESSAGE_ERROR_TRUE = 'SEND_MESSAGE_ERROR_TRUE';
export const SEND_MESSAGE_ERROR_FALSE = 'SEND_MESSAGE_ERROR_FALSE';
export const ON_MODIFY_INPUT_VALUE_CHANGE = 'ON_MODIFY_INPUT_VALUE_CHANGE';
export const HANDLE_MODIFY_SUBMIT = 'HANDLE_MODIFY_SUBMIT';
export const HANDLE_TASKDRAPPING = 'HANDLE_TASKDRAPPING';
export const HANDLE_CHANGE_POSITION_TASK_IN_COLUMN = 'HANDLE_CHANGE_POSITION_TASK_IN_COLUMN';
export const NEW_DATA = "NEW_DATA";

export const getData = () => ({
  type: GET_DATA,
});
export const newData = () => ({
  type: NEW_DATA
})

export const handleTaskDrapping = (payload) => ({
  type: HANDLE_TASKDRAPPING,
  payload,
});
export const handleChangePositionTaskInColumn = (idTask, idColumn) => ({
  type: HANDLE_CHANGE_POSITION_TASK_IN_COLUMN,
  idTask,
  idColumn,
});

export const ChangeDataTask = (payload) => ({
  type: CHANGE_DATA_TASK,
  payload,
});

export const changeInputValue = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value,
});

export const addNewTask = (newTask) => ({
  type: ADD_NEW_TASK,
  newTask,
});

export const toggleModifyTask = (idTask) => ({
  type: TOGGLE_MODIFY_TASK,
  idTask,
});

export const deleteTask = (idTask) => ({
  type: DELETE_TASK,
  idTask,
});

export const sendMessageErrorTrue = () => ({
  type: SEND_MESSAGE_ERROR_TRUE,
});

export const sendMessageErrorFalse = () => ({
  type: SEND_MESSAGE_ERROR_FALSE,
});

export const onModifyInputValueChange = (inputValue) => ({
  type: ON_MODIFY_INPUT_VALUE_CHANGE,
  inputValue,
})

export const handleModifySubmit = () => ({
  type: HANDLE_MODIFY_SUBMIT,
})