import React, {
  FC, useEffect, useState, memo,
} from 'react';
import './Keywords.scss';
import Warning from '@interfaces/Warning';
import { Crosses } from '@icons/UI';
import { connect } from 'react-redux';
import { AppDispatch } from '@app/store';
import { addWarning } from '@/Warning/warningSlice';

interface Props {
  keywords: string[],
  isActive: boolean,
  isSetup: boolean,
  changeKeywords: (keywords: string[]) => void,
  setWarning: (warning: Warning | string) => void
}

interface InputProps {
  isFocused: boolean,
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

interface ContainerProps {
  handleClick: () => void,
  handleDelete: (keyword: string) => void,
  keywords: string[],
}

interface KeywordProps {
  keyword: string,
  handleClick: () => void,
}

interface InnerProps extends InputProps, ContainerProps {
  isInput: boolean
}

const KeywordsInput: FC<InputProps> = (props: InputProps) => {
  const { isFocused, handleKeyDown } = props;

  return (
    <input
      type="text"
      className="keyword-input"
      name="keywords"
      ref={(ref) => {
        if (isFocused) ref?.focus({ preventScroll: true });
      }}
      placeholder="Type something and press enter"
      maxLength={15}
      onKeyDown={handleKeyDown}
    />
  );
};

const Keyword: FC<KeywordProps> = ({ keyword, handleClick }: KeywordProps) => (
  <div className="keyword" key={keyword}>
    <p>{keyword}</p>

    <button
      className="delete"
      type="button"
      onClick={handleClick}
    >
      <Crosses.Green />
    </button>
  </div>
);

const KeywordsContainer: FC<ContainerProps> = (props: ContainerProps) => {
  const { keywords, handleClick, handleDelete } = props;

  return (
    <div className="keywords-container">
      <div
        className="click background"
        role="presentation"
        onClick={handleClick}
      >
        <div className="transparent" />
      </div>
      {
        keywords.map((keyword) => {
          const handleKeywordClick = () => handleDelete(keyword);

          return (
            <Keyword
              keyword={keyword}
              handleClick={handleKeywordClick}
              key={keyword}
            />
          );
        })
      }
    </div>
  );
};

const InnerKeywords: FC<InnerProps> = (props: InnerProps) => {
  const {
    isInput, isFocused, handleDelete, handleKeyDown, handleClick, keywords,
  } = props;

  return isInput ? (
    <KeywordsInput
      isFocused={isFocused}
      handleKeyDown={handleKeyDown}
    />
  ) : (
    <KeywordsContainer
      handleClick={handleClick}
      handleDelete={handleDelete}
      keywords={keywords}
    />
  );
};

const Keywords: FC<Props> = memo((props: Props) => {
  const {
    keywords, changeKeywords, setWarning, isActive, isSetup,
  } = props;

  const [isInput, setInput] = useState(keywords.length === 0);

  useEffect(() => {
    if (keywords.length === 0 && !isInput) {
      setInput(true);
    }
  });

  const handleDelete = (keyword: string) => {
    const index = keywords.indexOf(keyword);

    if (index > -1) {
      const dataKeywords = [...keywords];
      dataKeywords.splice(index, 1);
      changeKeywords(dataKeywords);
    }
  };

  const handleClick = () => {
    setInput(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const dataKeywords = [...keywords];

    if (e.key === 'Enter' && keywords.length < 10) {
      const { value } = e.target as HTMLInputElement;
      const converted = value.toLowerCase();
      const isRepeating = keywords.indexOf(converted) !== -1;

      changeKeywords(dataKeywords);
      setInput(false);

      if (converted && !isRepeating) {
        dataKeywords.push(converted);
      } else if (!converted) {
        setWarning("Keyword's value should not be empty");
      } else if (isRepeating) {
        setWarning('Keywords should not repeat');
      }
    } else if (e.key === 'Enter') {
      setWarning("You can't enter more than 10 keywords");
      setInput(false);
    }
  };

  return (
    <InnerKeywords
      keywords={keywords}
      isInput={isInput}
      isFocused={(!isSetup || isActive)}
      handleClick={handleClick}
      handleDelete={handleDelete}
      handleKeyDown={handleKeyDown}
    />
  );
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addWarning: () => dispatch(addWarning),
});

export default connect(null, mapDispatchToProps)(Keywords);
