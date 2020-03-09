import React from 'react';

import './Task.css';
import Button from '../UI/Button/Button';

const task = props => {
  let content = !props.checked
    ? <div className="task__description">{props.description}</div>
    : <div className="task__description task__description--checked">{props.description}</div>
  return (
    <div className="task-container">
      <Button btnType="task-button--check" clicked={props.updateTask}>{!props.checked ? 'CHECK' : 'UNCHECK'}</Button>
      {content}
      <Button btnType="task-button--delete" clicked={props.deleteTask}>DELETE</Button>
    </div>
  );
};

export default task;