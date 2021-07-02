import React, {
  FC, useEffect, useState, memo,
} from 'react';
import './Keywords.scss';
import Warning from '@interfaces/Warning';
import { Crosses } from '@icons/UI';
import { connect } from 'react-redux';
import { AppDispatch } from '@app/store';
import { addWarning as addWarningAction } from '@/Warning/warningSlice';
import { addKeyword as addKeywordAction, deleteKeyword as deleteKeywordAction } from '@/Configuration/settingsSlice';

interface Props {
  keywords: string[],
  isFocused: boolean,
  addKeyword: (keyword: string) => void,
  deleteKeyword: (keyword: string) => void,
  addWarning: (warning: Warning | string) => void
}

interface InputProps {
  isFocused: boolean,
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

interface ContainerProps {
  handleClick: () => void,
  deleteKeyword: (keyword: string) => void,
  keywords: string[],
}

interface KeywordProps {
  keyword: string,
  handleClick: () => void,
}

interface InnerProps extends InputProps, ContainerProps {
  isInput: boolean
}

const KeywordsInput: FC<InputProps> = ({ isFocused, handleKeyDown }: InputProps) => (
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

const KeywordsContainer: FC<ContainerProps> = ({
  keywords, handleClick, deleteKeyword,
}: ContainerProps) => (
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
          const handleKeywordClick = () => deleteKeyword(keyword);

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

const InnerKeywords: FC<InnerProps> = ({
  isInput, isFocused, deleteKeyword, handleKeyDown, handleClick, keywords,
}: InnerProps) => (isInput ? (
  <KeywordsInput
    isFocused={isFocused}
    handleKeyDown={handleKeyDown}
  />
) : (
  <KeywordsContainer
    handleClick={handleClick}
    deleteKeyword={deleteKeyword}
    keywords={keywords}
  />
));

const Keywords: FC<Props> = memo(({
  keywords, addKeyword, deleteKeyword, addWarning, isFocused,
}: Props) => {
  const [isInput, setInput] = useState(keywords.length === 0);

  useEffect(() => {
    if (keywords.length === 0 && !isInput) {
      setInput(true);
    }
  });

  const handleClick = () => {
    setInput(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywords.length < 10) {
      const { value } = e.target as HTMLInputElement;
      const validated = value.toLowerCase();
      const isRepeating = keywords.indexOf(validated) !== -1;

      setInput(false);

      if (validated && !isRepeating) {
        addKeyword(validated);
      } else if (validated === '') {
        addWarning("Keyword's value should not be empty");
      } else if (isRepeating) {
        addWarning('Keywords should not repeat');
      }
    } else if (e.key === 'Enter') {
      addWarning("You can't enter more than 10 keywords");
      setInput(false);
    }
  };

  return (
    <InnerKeywords
      keywords={keywords}
      isInput={isInput}
      isFocused={isFocused}
      handleClick={handleClick}
      deleteKeyword={deleteKeyword}
      handleKeyDown={handleKeyDown}
    />
  );
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addWarning: (warning: string | Warning) => dispatch(addWarningAction(warning)),
  addKeyword: (keyword: string) => dispatch(addKeywordAction(keyword)),
  deleteKeyword: (keyword: string) => dispatch(deleteKeywordAction(keyword)),
});

export default connect(null, mapDispatchToProps)(Keywords);
