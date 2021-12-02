import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../actions';
import PropTypes from 'prop-types';
import Header from '../Header';
import Column from '../Column';
import Form from '../Form';


import './App.scss';

export const App = ({ startGetData, list }) => {
  //lancement de l'action pour avoir les data au premier rendu de l'application
  useEffect(() => {
    startGetData();
  }, []);

  return (
    // chaque column correspond à un liste de todo. Les todos sont classés dans ces colonnes pour définir leurs status.
    <div className="container">
      <Header />
      <Form />
      <main>
        <div className="todo__containder">
          <Column id={1} name={'NEW'} />
          <Column id={2} name={'IN PROGRESS'} />
          <Column id={3} name={'IN REVIEW'} />
          <Column id={4} name={'DONE'} />
        </div>
      </main>
    </div>
  );
}

App.propTypes = {
  startGetData: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  list: state.listTaks,
});

const mapDispatchToProps = (dispatch) => ({
  startGetData: () => {
    const action = getData();
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
