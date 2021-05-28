import React from 'react';
import './Switch.scss';

interface Props {
  isChecked: boolean,
  id: string,
  handleSwitch: () => void,
}

const Switch = ({ isChecked, handleSwitch, id }: Props) => (
  <label className="switch" htmlFor={id}>
    <input
      id={id}
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
