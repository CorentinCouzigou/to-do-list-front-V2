import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData, newData } from '../../actions';
import PropTypes from 'prop-types';
import Header from '../Header';
import Column from '../Column';
import Form from '../Form';

//styles app
import './App.scss';

export const App = ({ startGetData, listOfTasks, sendNewDataForServer }) => {
  //lancement de l'action pour avoir les data au premier rendu de l'application
  useEffect(() => {
    startGetData();
  }, []);

  useEffect(() => {
    sendNewDataForServer();
  }, [listOfTasks]);

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
        </div>
      </main>
    </div>
  );
}

App.propTypes = {
  startGetData: PropTypes.func.isRequired,
  listOfTasks: PropTypes.array.isRequired,
  sendNewDataForServer: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  listOfTasks: state.listTaks,
});

const mapDispatchToProps = (dispatch) => ({
  startGetData: () => {
    const action = getData();
    dispatch(action);
  },
  sendNewDataForServer: () => {
    const action = newData();
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
