import React, {
  FC, useState, useEffect, useCallback,
} from 'react';
import capitalizeFirstLetter from '@helpers/convert';
import { getEnumKeyByValue } from '@helpers/enum';
import './Quality.scss';
import { Quality as QualityInterface } from '@interfaces/Config';
import { Arrows } from '@icons/UI';
import { connect } from 'react-redux';
import { AppDispatch } from '@app/store';
import { setDownloadQuality as setDownloadQualityAction } from '@/Configuration/settingsSlice';
import options from './options';

interface Props {
  setDownloadQuality: (quality: QualityInterface) => void,
  initialQuality: QualityInterface
}

interface InnerProps {
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

const InnerQuality: FC<InnerProps> = ({
  initValue, activeClass, isExpanded, handlePreviewClick, handleOptionClick,
}: InnerProps) => (
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

const Quality: FC<Props> = ({ initialQuality, setDownloadQuality }: Props) => {
  const [isExpanded, setExpansion] = useState(false);

  const handleClickOutside = useCallback((event: any) => {
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
    setDownloadQuality(value);
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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setDownloadQuality: (quality: QualityInterface) => dispatch(setDownloadQualityAction(quality)),
});

export default connect(null, mapDispatchToProps)(Quality);
