import React, { Component } from 'react'
import Button from '../Button/Button'
import { Crosses } from '../Svg/Loader'
import './keywords.css'

export default class Keywords extends Component{
    constructor(props){
        super();
        
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
            const isRepeating = keywords.indexOf(value) === -1 ? false : true;
            let warning;
            
            if(value !== "" && !isRepeating){
                keywords.push(value);
            }
            else if(value === "") warning = "Keyword's value should not be empty";
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
                    id="keywords" 
                    name="keywords" 
                    placeholder="Type something and press enter"
                    maxLength="15"
                    autoFocus
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