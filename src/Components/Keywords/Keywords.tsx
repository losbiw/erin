import React, {
  FC, useEffect, useState, useRef, memo,
} from 'react';
import './Keywords.scss';
import { Warning } from '@/interfaces/Warning';
import { Crosses } from '../Icons/UI';

interface Props{
    keywords: string[],
    isActive: boolean,
    isSetup: boolean,
    changeKeywords: (keywords: string[]) => void,
    setWarning: (warning: Warning | string) => void
}

const Keywords: FC<Props> = memo((props: Props) => {
  const {
    keywords, changeKeywords, setWarning, isActive, isSetup,
  } = props;

  const [isInput, setInput] = useState(keywords.length === 0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (keywords.length === 0 && !isInput) {
      setInput(true);
    }

    if (isInput && (!isSetup || isActive)) {
      inputRef?.current?.focus({ preventScroll: true });
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

  const keyDownListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const dataKeywords = [...keywords];

    if (e.key === 'Enter' && keywords.length < 10) {
      const { value } = e.target as HTMLInputElement;
      const converted = value.toLowerCase();
      const isRepeating = keywords.indexOf(converted) !== -1;

      if (converted !== '' && !isRepeating) dataKeywords.push(converted);
      else if (!converted) setWarning("Keyword's value should not be empty");
      else if (isRepeating) setWarning('Keywords should not repeat');

      changeKeywords(dataKeywords);
      setInput(false);
    } else if (e.key === 'Enter') {
      setWarning("You can't enter more than 10 keywords");
      setInput(false);
    }
  };

  return (
    isInput
      ? (
        <input
          type="text"
          className="keyword-input"
          name="keywords"
          ref={inputRef}
          placeholder="Type something and press enter"
          maxLength={15}
          onKeyDown={keyDownListener}
        />
      )

      : (
        <div className="keywords-container">
          <div className="click background" role="presentation" onClick={handleClick}>
            <div className="transparent" />
          </div>
          {
            keywords.map((keyword) => (
              <div className="keyword" key={keyword}>
                <p>{ keyword }</p>

                <button
                  className="delete"
                  type="button"
                  onClick={() => handleDelete(keyword)}
                >
                  <Crosses.Green />
                </button>
              </div>
            ))
          }
        </div>
      )
  );
});

export default Keywords;
