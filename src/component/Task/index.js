import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { movePositionLeft, movePositionRight, toggleModifyTask, deleteTask, onModifyInputValueChange, handleModifySubmit, handleTaskDrapping } from '../../actions';

import "./task.scss"

export const Task = ({
    idColumn,
    idTask,
    nameTask,
    changePositionLeft,
    changePositionRigth,
    inputModifyId,
    changeToggleModifyTask,
    startDeleteTask,
    modifyInputValue,
    handleModifyInputValueChange,
    handleSubmit,
    changeTaskDrapping
}) => {
    const handleDragStart = (event) => {
        changeTaskDrapping(+event.target.id);
    }
    const drop = (event) => {
        changeTaskDrapping(+event.target.id);
    }
    return (
        // les différents boutons sont affichés en fonction de l'état du state et donc des actions de l'utilisateur
        <li id={idTask} className="task" draggable="true" onDrag={(event) => handleDragStart(event)} >
            <div div className="container__button" >
                {/* button changer de colonne vers la droite (position -1)*/}
                {idColumn > 1 && <button type="button" className="task__button" onClick={() => changePositionLeft(idTask)}>&larr;</button>}

                {/* button pour suprrimer */}
                <button className="task__button__delete" type="button" onClick={() => startDeleteTask(idTask)}>✖</button>
            </div >

            <div className="container__text">
                {/* Nom de la task*/}
                {inputModifyId !== idTask ?
                    <p className="task__text"> {nameTask}</p>
                    :
                    (
                        <form type="submit" onSubmit={handleSubmit}>
                            <input className="task__modifyInput" placeholder={nameTask} value={modifyInputValue} onChange={handleModifyInputValueChange}>
                            </input>
                            <button type="submit" className="task__button__check" >✔</button>
                        </form>
                    )
                }
            </div>

            <div className="container__button">
                {/* button pour activer la modification du nom de la task*/}
                {!inputModifyId && <button type="button" className="task__button__modify" onClick={() => changeToggleModifyTask(idTask)} >🖉</button>}

                {/* button changer de colonne vers la droite (position +1)*/}
                {idColumn < 4 && <button type="button" className="task__button" onClick={() => changePositionRigth(idTask)}>&rarr;</button>}
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
};


const mapStateToProps = (state) => ({
    inputModifyId: state.inputModifyId,
    modifyInputValue: state.modifyInputValue
});

const mapDispatchToProps = (dispatch) => ({
    changePositionRigth: (idTask) => {
        const action = movePositionRight(idTask)
        dispatch(action);
    },
    changePositionLeft: (idTask) => {
        const action = movePositionLeft(idTask)
        dispatch(action);
    },
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
    }


});
export default connect(mapStateToProps, mapDispatchToProps)(Task);


