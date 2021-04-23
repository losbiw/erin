import React, { FC } from 'react';
import ErrorCodes from './ErrorCodes';
import './Error.scss';

interface Props{
    code: number
}

const Error: FC<Props> = (props: Props) => {
  const { code } = props;

  const codeSpread = [...code.toString(10)];
  let index = 0;

  return (
    <div className="error page">
      <div className="err-code">
        {
          codeSpread.map((char) => {
            index += 1;
            return <h1 className="code-key" key={`char${index}`}>{ char }</h1>;
          })
        }
      </div>

      <h2 className="fix">{ ErrorCodes[code]?.fix }</h2>
      <p className="description">
        { `Oopsie Woopsie! ${ErrorCodes[code]?.description}. 
                  The code monkeys at our office are sorry.` }
      </p>
    </div>
  );
};

export default Error;
