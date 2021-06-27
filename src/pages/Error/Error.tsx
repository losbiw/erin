/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import ErrorCodes from './Codes';
import './Error.scss';

interface Props {
  code: number
}

const Error: FC<Props> = ({ code }: Props) => {
  const codeSpread = [...code.toString(10)];

  return (
    <div className="error page">
      <div className="err-code">
        {codeSpread.map((char, i) => <h1 className="code-key" key={`char${char}${i}`}>{char}</h1>)}
      </div>

      <h2 className="fix">{ErrorCodes[code]?.fix}</h2>
      <p className="description">
        {`Oopsie Woopsie! ${ErrorCodes[code]?.description}. 
                  The code monkeys at our office are sorry.` }
      </p>
    </div>
  );
};

export default Error;
