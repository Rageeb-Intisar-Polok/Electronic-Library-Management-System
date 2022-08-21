import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./Menu.css";
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";





class Menu extends Component{
    constructor(){
        super()
        console.log("inside constructor");
        this.handleMenu = this.handleMenu.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleMyBooks = this.handleMyBooks.bind(this);
        this.handleIssueBook = this.handleIssueBook.bind(this);
        this.state = {id : 'yyy'};
    }

    handleMenu(){
        console.log("handle clicked.");
        
    }
    handleChangePassword(){
        console.log("handle change password.");
        this.props.history.push('/changePassword');
    }
    handleMyBooks(){
        console.log("handle change password.");
        this.props.history.push('/myBooks');
    }
    handleIssueBook(){
        console.log("handle change password.");
        this.props.history.push('/issueBook');
    }

    async componentDidMount(){
        
        const config = {
            method: 'get',
            url: 'http://localhost:5000/menu'
        }
    
        let abc = await Axios(config);
        console.log('found from back end : ',abc);
        this.setState({id : abc.data});

        if(abc.data=='yy'){

            setTimeout(() => { this.props.history.goBack(); }, 2000);
        }
       
    }



    render(){
        console.log("render");

        if(this.state.id == 'yyy'){
            console.log("yyy found.");
            return(
                <div>
                    <h1>Please wait for a moment ...... </h1>
                </div>
            );
        }
        else if(this.state.id >3){
            return(
                <div className="d-flex align-items-center container mt-5">
                    <div>
                    <div className = "row">

                        <div className="col">
                            <div className =  "logo">
                                <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
                            </div>
                        </div>
                        <div className="col">

                            <div className = "box">

        
                                    <div className = "row">

                                        <label>Menu</label>
            
                                    </div>

                                    <div className = "row">
            
                                        <input onClick={this.handleMyBooks} type="submit" className="btn" value="My Books" />
                
                                    </div>
                                <br/>

                                 <div className="row">
               

                                        <input onClick={this.handleIssueBook} type="submit" className="btn" value="Issue book" />
              
                                   </div>
                                  <br/>

                                    <div className="row">
              
                                       <input onClick={this.handleChangePassword} type="submit" className="btn" value="Change Password" />


                                   </div>
                                   <br/>


                         </div>
 
                      </div>
                   </div>

                </div>
                </div>
            );
        }
        else{
            return (
                <div>
                    <br/><br/>
                    <h1>Access denied. Enter ID and Password. </h1>
                </div>
            );
        }

    }


}


export default withRouter(Menu);