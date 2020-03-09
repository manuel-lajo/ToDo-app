import React from 'react';

import './Button.css';

const button = props => (
  <button
      className={['task-button', props.btnType].join(' ')}
      onClick={props.clicked}>{props.children}</button>
);

export default button;