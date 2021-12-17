import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeInputValue, addNewTask, sendMessageErrorTrue, sendMessageErrorFalse } from '../../actions';
import './form.scss';

export const Form = ({
  handleOnChange,
  listOfTasks,
  handleNewTask,
  errorMessage,
  handleSendMessageErrorTrue,
  handleSendMessageErrorFalse,
  newTaskValue,
}) => {
  const handleOnSubmit = (event) => {
    // preventDefault pour éviter le rechargement de la page lors du submit de l'event
    event.preventDefault();
    //condition pour vérifier si l'utilisateur rentre au moins un caractère pour sa tâche
    if (event.target[0].value.length === 0) {
      handleSendMessageErrorTrue();
    } else {
      handleSendMessageErrorFalse();
      const idList = listOfTasks.map((task) => task.id);
      const maxId = Math.max(...idList);
      handleNewTask({
        // ici si jamais l'utilisateur n'a pas de task dans sa list l'id de la nouvelle task sera égale à 1
        id: maxId === -Infinity ? 1 : maxId + 1,
        label: `${event.target[0].value}`,
        status: "new",
        description: "",
      });
    }
  }

  return (
    <div className="form__container">
      <form className="form" onSubmit={handleOnSubmit}>
        <input value={newTaskValue} type="text" className="form__input" placeholder="Add new task" onChange={(event) => handleOnChange(event)} />
        <button className="form__button" type="submit">
          Validate</button>
      </form>
      {errorMessage && <span className="form__error">You must at least write one character</span>}
    </div>

  );
}
Form.propTypes = {
  newTaskValue: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  listOfTasks: PropTypes.array.isRequired,
  handleNewTask: PropTypes.func.isRequired,
  errorMessage: PropTypes.bool.isRequired,
  handleSendMessageErrorTrue: PropTypes.func.isRequired,
  handleSendMessageErrorFalse: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  listOfTasks: state.listTaks,
  newTaskValue: state.newTaskValue,
  errorMessage: state.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  handleOnChange: (event) => {
    const action = changeInputValue(event.target.value);
    dispatch(action);
  },
  handleNewTask: (newTask) => {
    const action = addNewTask(newTask);
    dispatch(action);
  },
  handleSendMessageErrorTrue: () => {
    const action = sendMessageErrorTrue();
    dispatch(action);
  },
  handleSendMessageErrorFalse: () => {
    const action = sendMessageErrorFalse();
    dispatch(action);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);