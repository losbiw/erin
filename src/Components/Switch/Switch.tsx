import React from 'react';
import './Switch.scss';

interface Props {
  isChecked: boolean,
  handleSwitch: () => void
}

const Switch = ({ isChecked, handleSwitch }: Props) => (
  <label className="switch" htmlFor="switch">
    <input
      id="switch"
      type="checkbox"
      className="switch-input"
      defaultChecked={isChecked}
      onChange={handleSwitch}
    />
    <span className="switch-slider">
      <span className="gradient" />
    </span>
  </label>
);

export default Switch;
