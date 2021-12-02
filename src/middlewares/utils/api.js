import axios from 'axios';
// pré-configuration de l'instance d'axios
// ici on passe le baseUrl, ainsi quand on utilisera "api"
// on aura pas besoin de préciser cette valeur de baseUrl
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export default api;