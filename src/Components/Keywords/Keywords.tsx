import React, { Component, createRef } from 'react'
import { Crosses } from '../Icons/UI'
import areEqual from '@modules/areEqual'
import './Keywords.scss'
import { Warning } from '@/interfaces/Warning';

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

export default class Keywords extends Component<Props, State>{
    private inputRef: React.RefObject<HTMLInputElement>;
    
    constructor(props: Props){
        super(props);

        this.inputRef = createRef();
        
        this.state = {
            isInput: this.props.keywords.length === 0
        }
    }

    handleDelete = (keyword: string) => {
        const { keywords, changeKeywords } = this.props;
        const index = keywords.indexOf(keyword);

        if(index > -1){
            const dataKeywords = [...keywords];
            dataKeywords.splice(index, 1);
            changeKeywords(dataKeywords);
        }
    }

    handleClick = () => {        
        this.setState({
            isInput: true
        });
    }

    keyDownListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { changeKeywords, setWarning, keywords } = this.props;
        const dataKeywords = [...keywords];
        
        if(e.key === 'Enter' && keywords.length < 10){
            const { value } = e.target as HTMLInputElement;
            const converted = value.toLowerCase();
            const isRepeating = keywords.indexOf(converted) === -1 ? false : true;
            
            if(converted !== "" && !isRepeating) dataKeywords.push(converted);
            else if(!converted) setWarning("Keyword's value should not be empty");
            else if(isRepeating) setWarning("Keywords should not repeat");
                
            changeKeywords(dataKeywords);
            
            this.setState({
                isInput: false
            });
        }
        else if(e.key === 'Enter'){
            setWarning("You can't enter more than 10 keywords");

            this.setState({
                isInput: false
            });
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State){
        if(!areEqual.arrays(this.props.keywords, nextProps.keywords) || 
           !areEqual.objects(this.state, nextState) ||
           nextProps.isSetup)
        {
            return true
        }
        return false
    }

    componentDidMount(){
        this.componentDidUpdate();
    }

    componentDidUpdate(){
        const { isInput } = this.state;
        const { keywords, isSetup } = this.props;
        
        if(keywords.length === 0 && !isInput){
            this.setState({
                isInput: true
            });
        }

        if(isInput && !isSetup && this.inputRef.current){
            this.inputRef.current.focus({ preventScroll: true });
        }
    }

    render(){
        const { inputRef, handleClick, keyDownListener, handleDelete, props } = this;

        return (
            this.state.isInput
            ? <input type="text" 
                    name="keywords" 
                    ref={ inputRef }
                    placeholder="Type something and press enter"
                    maxLength={15}
                    onKeyDown={ keyDownListener } /> 

            : <div className="keywords-container">
                <div className="click background" onClick={ handleClick }>
                    <div className="transparent" />
                </div>

                {
                    props.keywords.map(keyword => {
                        return(
                            <div className="keyword" key={ keyword }>
                                <p>{ keyword }</p>

                                <button className='delete'
                                        onClick={ () => handleDelete(keyword) }>
                                    <Crosses.Green />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}