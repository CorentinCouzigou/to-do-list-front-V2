import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData, newData, handleToggleDescription, handleModifyInputDescription,toggleModifyDescription, submitModifyDescription } from '../../actions';
import PropTypes from 'prop-types';
import Header from '../Header';
import Column from '../Column';
import Form from '../Form';
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

//styles app
import './App.scss';

export const App = ({ startGetData, listOfTasks, sendNewDataForServer, toggleModal, nameTask, description, handleToggleDescription, idTask, modifyInputValue, handleModifyInputValueChange, toggleModifyDescription, HandleToggleModifyDescription, submitModifyDescription }) => {
  //lancement de l'action pour avoir les data au premier rendu de l'application
  useEffect(() => {
    startGetData();
  }, []);

  useEffect(() => {
    sendNewDataForServer();
  }, [listOfTasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitModifyDescription();
  }
  
  return (
    // chaque column correspond à un liste de todo. Les todos sont classés dans ces colonnes pour définir leurs status.
    <div className="container">
      <Header />
      <Form />
      <main>

        <div className="todo__container">
          <Column name={'NEW'} />
          <Column name={'IN PROGRESS'} />
          <Column name={'IN REVIEW'} />
          <Column name={'DONE'} />
          {toggleModal &&
            <div className="modal__container">
              <div className="modal">
                <h2>{nameTask}</h2>
                {toggleModifyDescription ?
                  <form id={idTask} type="task__formSubmit" onSubmit={(event) => handleSubmit(event)}>
                    <input className="task__modifyInput" placeholder={description} value={modifyInputValue} onChange={handleModifyInputValueChange}>
                    </input>
                    <button title="Valided modification" type="submit" className="modal__check" ><AiFillCheckCircle /></button>
                  </form> : <p>{description}</p>}
                <button title="Close description" type="button" className="modal__close" onClick={() => handleToggleDescription()}><AiFillCloseCircle /></button>

                {toggleModifyDescription === false ? <button type="button" title="Modify description" className="modal__modify" onClick={() => HandleToggleModifyDescription()} >🖉</button> : ""}

              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}

App.propTypes = {
  startGetData: PropTypes.func.isRequired,
  listOfTasks: PropTypes.array.isRequired,
  sendNewDataForServer: PropTypes.func.isRequired,
  toggleModal: PropTypes.bool.isRequired,
  handleToggleDescription: PropTypes.func.isRequired,
  nameTask: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  idTask: PropTypes.number.isRequired,
  idTaskWhenModifiedDescription: PropTypes.number.isRequired,
  modifyInputValue: PropTypes.string.isRequired,
  toggleModifyDescription: PropTypes.bool.isRequired,
  submitModifyDescription: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
  listOfTasks: state.listTaks,
  toggleModal: state.toggleModal,
  nameTask: state.nameTaskDescription,
  description: state.taskDescription,
  idTask: state.idTaskDescription,
  idTaskWhenModifiedDescription: state.idTaskWhenModifiedDescription,
  modifyInputValue: state.inputModifyDescription,
  toggleModifyDescription: state.toggleModifyDescription,
});

const mapDispatchToProps = (dispatch) => ({
  startGetData: () => {
    const action = getData();
    dispatch(action);
  },

  handleModifyInputValueChange: (event) => {
    const action = handleModifyInputDescription(event.target.value)
    dispatch(action)
  },
  sendNewDataForServer: () => {
    const action = newData();
    dispatch(action);
  },
  handleToggleDescription: () => {
    const action = handleToggleDescription();
    dispatch(action);
  },
  HandleToggleModifyDescription: () => {
    const action = toggleModifyDescription();
    dispatch(action);
  },
  submitModifyDescription: () => {
    const action = submitModifyDescription();
    dispatch(action);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
