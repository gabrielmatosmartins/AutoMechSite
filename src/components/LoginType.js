import React from 'react'
import '../css/generalStyle.css'

export class LoginType extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="col-md-12 col-xs-6 mb-3 text-center">
                <button type={this.props.type} className={this.props.className}><span><i className={this.props.fa_icon}></i>{this.props.text}</span></button>
            </div>
        );
    }
}