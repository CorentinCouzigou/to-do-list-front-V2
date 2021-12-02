// je cherche dans la tableau des task la task qui doit changer de position, puis je lui ajoute 1 à sa position et je renvoie les autres taks.
export const changePositionRightCurrentTask = (tasksList, id) => {
  const newTaskList = tasksList.map(task => {
    if(task.id === id) {
      return {
        ...task,
        position: task.position + 1
      }
    }
    return task
  })
  return newTaskList
}

// je cherche dans la tableau des task la task qui doit changer de position, puis je lui enleve 1 à sa position et je renvoie les autres taks.
export const changePositionLeftCurrentTask = (tasksList, id) => {
  const newTaskList = tasksList.map(task => {
    if(task.id === id) {
      return {
        ...task,
        position: task.position - 1
      }
    }
    return task
  })
  return newTaskList
}

// Ici à l'aide d'un .map je recherche la task qui a l'id donc l'utilisateur veut supprimer. 
//puis je retourne l'ensemble des tasks sauf celle qui a l'id sélectionné par l'utilisateur
export const findOneTaskForDelete = (tasksList, id) => {
  const newTaskList = tasksList.filter(task => {
    if(task.id !== id) return task      
  })
  return newTaskList
}

export const findOneTaskForModify = (tasksList, id, modifyInputValue) =>{
  // je vérifie que la valeur rentrer par l'utilisateur n'est pas vide. 
  const correctValue = modifyInputValue.length;
  const newTaskList = tasksList.map(task => {
    if(task.id === id && correctValue > 1) {
      return {
        ...task,
        label: modifyInputValue,
      }
    }
    return task
  })
  return newTaskList
}