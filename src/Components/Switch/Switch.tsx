import React from 'react';
import './Switch.scss';

interface Props{
    isChecked: boolean,
    handleSwitch: Function
}

export default function Switch(props: Props) {
  const { isChecked, handleSwitch } = props;

  return (
    <label className="switch" htmlFor="switch">
      <input
        id="switch"
        type="checkbox"
        className="switch-input"
        defaultChecked={isChecked}
        onChange={(_e) => handleSwitch()}
      />
      <span className="switch-slider">
        <span className="gradient" />
      </span>
    </label>
  );
}
