import React, {
  FC, useState, useEffect, useCallback,
} from 'react';
import capitalizeFirstLetter from '@helpers/convert';
import { getEnumKeyByValue } from '@helpers/enum';
import './Quality.scss';
import { Quality as QualityInterface } from '@interfaces/Config';
import { Arrows } from '../Icons/UI';
import options from './options';

interface Props{
  changeQuality: (quality: QualityInterface) => void,
  initialQuality: QualityInterface
}

interface InnerProps{
  initValue: keyof typeof QualityInterface | null,
  activeClass: 'active' | false,
  isExpanded: boolean,
  handlePreviewClick: () => void,
  handleOptionClick: (quality: QualityInterface) => void
}

const renderOptions = (handleClick: (quality: QualityInterface) => void) => {
  const elements: JSX.Element[] = [];

  options.forEach((option) => {
    const { value, label } = option;

    elements.push(
      <div
        className="option"
        key={value}
        role="presentation"
        onClick={() => handleClick(value)}
      >
        <div className="text">{ capitalizeFirstLetter(label) }</div>
        <div className="background transparent" />
      </div>,
    );
  });

  return elements;
};

const InnerQuality: FC<InnerProps> = (props: InnerProps) => {
  const {
    initValue, activeClass, isExpanded, handlePreviewClick, handleOptionClick,
  } = props;

  return (
    <div className="dropdown">
      <div
        className="preview"
        role="presentation"
        onClick={handlePreviewClick}
      >
        <p className="preview-text">{initValue}</p>
        <Arrows.Forward />
      </div>
      <div className={`background transparent preview-background ${activeClass}`} />
      { isExpanded && (
      <div className="options-container">
        { renderOptions(handleOptionClick) }
      </div>
      ) }
    </div>
  );
};

const Quality: FC<Props> = (props: Props) => {
  const [isExpanded, setExpansion] = useState(false);
  const { changeQuality, initialQuality } = props;

  const handleClickOutside = useCallback((event) => {
    const { className } = event.srcElement;

    if (className !== 'option' && className !== 'preview' && className !== 'options-container') {
      setExpansion(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handlePreviewClick = () => setExpansion(!isExpanded);

  const handleOptionClick = (value: QualityInterface) => {
    setExpansion(false);
    changeQuality(value);
  };

  const initValue = getEnumKeyByValue(QualityInterface, initialQuality);

  return (
    <InnerQuality
      initValue={initValue}
      activeClass={isExpanded && 'active'}
      isExpanded={isExpanded}
      handlePreviewClick={handlePreviewClick}
      handleOptionClick={handleOptionClick}
    />
  );
};

export default Quality;
