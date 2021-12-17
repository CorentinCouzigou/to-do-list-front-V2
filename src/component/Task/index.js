import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModifyTask, deleteTask, onModifyInputValueChange, handleModifySubmit, handleTaskDrapping, handleToggleDescription, setTaskDescription } from '../../actions';
import { AiFillCloseCircle, AiFillCheckCircle, } from "react-icons/ai";
import { MdOutlineDescription } from "react-icons/md";

import "./task.scss"

export const Task = ({
    idTask,
    nameTask,
    inputModifyId,
    changeToggleModifyTask,
    startDeleteTask,
    modifyInputValue,
    handleModifyInputValueChange,
    changeTaskDrapping,
    handleSubmit,
    handleToggleDescription,
    setTaskDescription,
    description
}) => {
    const handleDragStart = (event) => {
        changeTaskDrapping(+event.target.id);
    };
    const startSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    }

    return (
        // les différents boutons sont affichés en fonction de l'état du state et donc des actions de l'utilisateur
        <li id={idTask} className="task" draggable="true" onDrag={(event) => handleDragStart(event)} onClick={(event) => console.log(event.clientY)} >
            <div div className="container__button" >
                {/* button pour suprrimer */}
                <button title="Remove task" className="task__button__delete" type="button" onClick={() => startDeleteTask(idTask)}><AiFillCloseCircle /></button>
            </div >

            <div className="container__text">
                {/* Nom de la task*/}
                {inputModifyId !== idTask ?
                    <p className="task__text">{nameTask}</p>
                    :
                    //formulaire de modification de la tâche
                    (
                        <form id={idTask} className="task__formSubmit" onSubmit={(event) => startSubmit(event)}>
                            <input className="task__modifyInput" placeholder={nameTask} value={modifyInputValue} onChange={handleModifyInputValueChange}>
                            </input>
                            <button title="Validate modification" type="submit" className="task__button__check" ><AiFillCheckCircle /></button>
                        </form>
                    )
                }
            </div>
            <button title="Show description" className="description" type="button" onClick={() => { return (setTaskDescription(idTask, nameTask, description), handleToggleDescription()) }}><MdOutlineDescription /></button>
            <div className="container__button">
                {/* button pour activer la modification du nom de la task*/}
                {!inputModifyId && <button type="button" className="task__button__modify" onClick={() => changeToggleModifyTask(idTask)} title="Modify this task" >🖉</button>}

            </div>
        </li>
    )
}

Task.propTypes = {
    nameTask: PropTypes.string.isRequired,
    idTask: PropTypes.number.isRequired,
    idColumn: PropTypes.number.isRequired,
    changePositionRigth: PropTypes.func.isRequired,
    changePositionLeft: PropTypes.func.isRequired,
    inputModifyId: PropTypes.number.isRequired,
    changeToggleModifyTask: PropTypes.func.isRequired,
    startDeleteTask: PropTypes.func.isRequired,
    changeTaskDrapping: PropTypes.func.isRequired,
    handleToggleDescription: PropTypes.func.isRequired,
    setTaskDescription: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
    inputModifyId: state.inputModifyId,
    modifyInputValue: state.modifyInputValue,
});

const mapDispatchToProps = (dispatch) => ({
    changeToggleModifyTask: (idTask) => {
        const action = toggleModifyTask(idTask);
        dispatch(action);
    },
    startDeleteTask: (idTask) => {
        const action = deleteTask(idTask)
        dispatch(action);
    },
    handleModifyInputValueChange: (event) => {
        const action = onModifyInputValueChange(event.target.value)
        dispatch(action)
    },
    handleSubmit: () => {
        const action = handleModifySubmit()
        dispatch(action)
    },
    changeTaskDrapping: (idTask) => {
        const action = handleTaskDrapping(idTask)
        dispatch(action)
    },
    handleToggleDescription: () => {
        const action = handleToggleDescription()
        dispatch(action)
    },
    setTaskDescription: (idTask, nameTask, description) => {
        const action = setTaskDescription(idTask, nameTask, description);
        dispatch(action)
    }


});
export default connect(mapStateToProps, mapDispatchToProps)(Task);


