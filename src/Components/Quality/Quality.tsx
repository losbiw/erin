import React, {
  FC, useState, useEffect, useCallback,
} from 'react';
import capitalizeFirstLetter from '@/helpers/convert';
import { getEnumKeyByValue } from '@helpers/enum';
import './Quality.scss';
import { Quality as QualityInterface } from '@/interfaces/Config';
import { Arrows } from '../Icons/UI';
import options from './options';

interface Props{
    changeQuality: (quality: QualityInterface) => void,
    initialQuality: QualityInterface
}

const Quality: FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { changeQuality, initialQuality } = props;

  const handleClickOutside = useCallback((event) => {
    const { className } = event.srcElement;

    if (className !== 'option' && className !== 'preview' && className !== 'options-container') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const initValue = getEnumKeyByValue(QualityInterface, initialQuality);
  const activeClass = isOpen ? 'active' : '';

  return (
    <div className="dropdown">
      <div
        className="preview"
        role="presentation"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="preview-text">{initValue}</p>
        <Arrows.Forward />
      </div>
      <div className={`background transparent preview-background ${activeClass}`} />
      {isOpen && (
      <div className="options-container">
        {
        options.map((option) => {
          const { value, label } = option;

          return (
            <div
              className="option"
              key={value}
              role="presentation"
              onClick={() => {
                setIsOpen(false);
                changeQuality(value);
              }}
            >
              <div className="text">{ capitalizeFirstLetter(label) }</div>
              <div className="background transparent" />
            </div>
          );
        })
        }
      </div>
      ) }
    </div>
  );
};

export default Quality;
