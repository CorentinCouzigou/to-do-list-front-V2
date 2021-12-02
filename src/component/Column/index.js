import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Task from '../Task';
import { handleChangePositionTaskInColumn } from '../../actions/index';

import "./column.scss"

export const Column = ({ id, name, datas, idTaskDragging, changePositionTaskInColumn }) => {
    useEffect(() => {
    }, [datas]);
    const columnRef = useRef();
    const taskRef = useRef();
    // on filtre les tasks pour récupérer celles dont la position correspond à l'id de la colonne pour pouvoir maper dessus
    const tasksFilter = datas.filter(data => data.position === id);

    const handleDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();

    }
    function drop(event) {
        changePositionTaskInColumn(idTaskDragging, event.currentTarget.id);
    }

    return (
        <div ref={columnRef} className="column" onDrop={(event) => drop(event)} id={id} onDragOver={(event) => handleDragOver(event)} >
            <h2 className="todo__title">{name}</h2>
            <ul >
                {/* on map sur les tasks filtrées pour qu'à chaque task on créé un composant Task et on y passe en props task.label */}
                {tasksFilter.map((task) => (
                    <Task ref={taskRef}
                        nameTask={task.label}
                        idColumn={id}
                        key={task.id}
                        idTask={task.id}
                    />
                ))}
            </ul>
        </div>
    )
}

Column.propTypes = {
    id: PropTypes.number.isRequired,
    idTaskDragging: PropTypes.number.isRequired,
    changePositionTaskInColumn: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    datas: state.listTaks,
    idTaskDragging: state.taskDragging,
});

const mapDispatchToProps = (dispatch) => ({
    changePositionTaskInColumn: (idTask, idColumn) => {
        const action = handleChangePositionTaskInColumn(idTask, idColumn);
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);



