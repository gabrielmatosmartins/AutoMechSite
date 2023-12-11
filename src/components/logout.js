import React from 'react'
import '../css/generalStyle.css'
import '../css/menu.css'

export class Logout extends React.Component {
    constructor(){
        super();
        this.logout = this.logout.bind(this)
        this.logout()
    }

    logout(){
        localStorage.removeItem("id")
        localStorage.removeItem("tipo")
        window.location.href = "/login"
    }

    render(){
        return (
            <>
            </>
        )
    }
    
  }