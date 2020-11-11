import React, { Component } from 'react'
import Button from '../Button/Button'
import { Crosses } from '../Svg/Loader'
import { toLowerCase } from '@modules/convert'
import './Keywords.css'

export default class Keywords extends Component{
    constructor(_props){
        super();

        this.inputRef = React.createRef();
        
        this.state = {
            isInput: false
        }
    }

    handleDelete = e =>{
        e.preventDefault();
        const { name } = e.target.dataset;
        const keywords = [...this.props.data];

        const index = keywords.indexOf(name);
        if(index > -1){
            keywords.splice(index, 1);
            this.props.handler('keywords', keywords);
        }
    }

    handleClick = e =>{
        this.setState({
            isInput: true
        });
    }

    enterDownListener = e =>{
        const keywords = [...this.props.data];
        
        if(e.key === 'Enter' && keywords.length < 10){
            const { value } = e.target;
            const converted = toLowerCase(value);
            const isRepeating = keywords.indexOf(converted) === -1 ? false : true;

            let warning;
            
            if(converted !== "" && !isRepeating){
                keywords.push(converted);
            }
            else if(!converted) warning = "Keyword's value should not be empty";
            else if(isRepeating) warning = "Keywords should not repeat"
                
            this.props.handler('keywords', keywords);
            this.props.warning({ warning: warning });
            this.setState({
                isInput: false
            });
        }
        else if(e.key === 'Enter'){
            this.props.warning({ warning: "You can't enter more than 10 keywords" });
            this.setState({
                isInput: false
            });
        }
    }

    componentDidMount(){
        this.componentDidUpdate();
    }

    componentDidUpdate(){
        const { isInput } = this.state;
        const keywords = this.props.data;

        if(isInput){
            this.inputRef.current.focus({ preventScroll: true });
        }
        
        if(keywords.length === 0 && !isInput){
            this.setState({
                isInput: true
            });
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
                    maxLength="15"
                    onKeyDown={ this.enterDownListener } /> 
            :
            <div id="container">
                <div id="click" className="background" onClick={ this.handleClick }>
                    <div className="transparent" />
                </div>
                {
                    this.props.data.map(keyword => {
                        return(
                            <div className="keyword" key={ keyword }>
                                <p>{ keyword }</p>
                                <Button className="delete"
                                        handler={ this.handleDelete } 
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