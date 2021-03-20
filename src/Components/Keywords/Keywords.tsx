import React, { Component, createRef, MouseEventHandler } from 'react'
import Button from '../Button/Button'
import { Crosses } from '../Svg/Loader'
import areEqual from '@modules/areEqual'
import './Keywords.css'

interface Props{
    dataKeywords: Array<string>,
    isActive: boolean,
    isSetup: boolean,
    handleChange: any //change,
    handleWarningChange: any //change
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
            isInput: this.props.dataKeywords.length === 0
        }
    }

    handleDelete = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();

        const { dataset } = e.target as HTMLButtonElement;
        const { name } = dataset;
        const keywords = [...this.props.dataKeywords];

        const index = keywords.indexOf(name as string);
        if(index > -1){
            keywords.splice(index, 1);
            this.props.handleChange('keywords', keywords);
        }
    }

    handleClick = (_e: React.MouseEvent<HTMLDivElement>) => {
        this.setState({
            isInput: true
        });
    }

    enterDownListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keywords = [...this.props.dataKeywords];
        
        if(e.key === 'Enter' && keywords.length < 10){
            const { value } = e.target as HTMLInputElement;
            const converted = value.toLowerCase();
            const isRepeating = keywords.indexOf(converted) === -1 ? false : true;

            let warning;
            
            if(converted !== "" && !isRepeating) keywords.push(converted);
            else if(!converted) warning = "Keyword's value should not be empty";
            else if(isRepeating) warning = "Keywords should not repeat"
                
            this.props.handleChange('keywords', keywords);
            this.props.handleWarningChange({ warning: warning });
            
            this.setState({
                isInput: false
            });
        }
        else if(e.key === 'Enter'){
            this.props.handleWarningChange({ warning: "You can't enter more than 10 keywords" });
            this.setState({
                isInput: false
            });
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State){
        if(!areEqual.arrays(this.props.dataKeywords, nextProps.dataKeywords) || 
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
        const { dataKeywords, isActive } = this.props;
        
        if(dataKeywords.length === 0 && !isInput){
            this.setState({
                isInput: true
            });
        }

        if(isInput && isActive && this.inputRef.current){
            this.inputRef.current.focus({ preventScroll: true });
        }
    }

    render(){
        const { isInput } = this.state;

        return (
            isInput
            ?
            <input type="text" 
                    name="keywords" 
                    ref={ this.inputRef }
                    placeholder="Type something and press enter"
                    maxLength={15}
                    onKeyDown={ this.enterDownListener } /> 
            :
            <div id="container">
                <div id="click" className="background" onClick={ this.handleClick }>
                    <div className="transparent" />
                </div>
                {
                    this.props.dataKeywords.map(keyword => {
                        return(
                            <div className="keyword" key={ keyword }>
                                <p>{ keyword }</p>
                                <Button className="delete"
                                        handleClick={ this.handleDelete } 
                                        name={ keyword }
                                        Content={ Crosses.Green }/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}