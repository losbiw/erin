import React, { Component, createRef } from 'react';
import areEqual from '@modules/areEqual';
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

interface State{
    isInput: boolean
}

export default class Keywords extends Component<Props, State> {
    private inputRef: React.RefObject<HTMLInputElement>;

    constructor(props: Props) {
      super(props);

      this.inputRef = createRef();

      this.state = {
        isInput: props.keywords.length === 0,
      };
    }

    componentDidMount() {
      this.componentDidUpdate();
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
      const { keywords } = this.props;

      if (!areEqual.arrays(keywords, nextProps.keywords)
             || !areEqual.objects(this.state, nextState)
             || nextProps.isSetup) {
        return true;
      }
      return false;
    }

    componentDidUpdate() {
      const { isInput } = this.state;
      const { keywords, isSetup, isActive } = this.props;

      if (keywords.length === 0 && !isInput) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isInput: true,
        });
      }

      if (isInput && (!isSetup || isActive) && this.inputRef.current) {
        this.inputRef.current.focus({ preventScroll: true });
      }
    }

    handleDelete = (keyword: string) => {
      const { keywords, changeKeywords } = this.props;
      const index = keywords.indexOf(keyword);

      if (index > -1) {
        const dataKeywords = [...keywords];
        dataKeywords.splice(index, 1);
        changeKeywords(dataKeywords);
      }
    }

    handleClick = () => {
      this.setState({
        isInput: true,
      });
    }

    keyDownListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { changeKeywords, setWarning, keywords } = this.props;
      const dataKeywords = [...keywords];

      if (e.key === 'Enter' && keywords.length < 10) {
        const { value } = e.target as HTMLInputElement;
        const converted = value.toLowerCase();
        const isRepeating = keywords.indexOf(converted) !== -1;

        if (converted !== '' && !isRepeating) dataKeywords.push(converted);
        else if (!converted) setWarning("Keyword's value should not be empty");
        else if (isRepeating) setWarning('Keywords should not repeat');

        changeKeywords(dataKeywords);

        this.setState({
          isInput: false,
        });
      } else if (e.key === 'Enter') {
        setWarning("You can't enter more than 10 keywords");

        this.setState({
          isInput: false,
        });
      }
    }

    render() {
      const {
        inputRef, handleClick, keyDownListener, handleDelete, props,
      } = this;
      const { isInput } = this.state;

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
                props.keywords.map((keyword) => (
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
    }
}
