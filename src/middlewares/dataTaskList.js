import api from './utils/api';
import { GET_DATA, NEW_DATA, ChangeDataTask } from '../actions';

const dataTasks = (store) => (next) => (action) => {
    // l'action passe avant dans les middlewares puis dans le reducer
    // je fais donc ma requete axios ici pour envoyer les données ensuite.
    switch (action.type) {
        case GET_DATA: {
            const getData = async () => {
                try {
                    // requete api sur http://localhost:3001/ pour avoir toutes les exemples de tasks
                    const response = await api.get('/');
                    store.dispatch(ChangeDataTask(response.data));
                }
                catch (error) {
                    console.log('error', error);
                }
            };
            getData();
            break;
        }
        case NEW_DATA: {
            const getData = async () => {
                try {
                    const state = store.getState();
                    const response = await api.post('/', {
                        newTaskList: state.list
                    });

                }
                catch (error) {
                    console.log('error', error);
                }
            };
            getData();
            break;
        }


        default:
            next(action);
    }
};
export default dataTasks;
