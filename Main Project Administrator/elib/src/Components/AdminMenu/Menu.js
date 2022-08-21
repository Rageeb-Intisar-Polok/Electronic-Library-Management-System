import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./Menu.css";
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";





class Menu extends Component{
    constructor(){
        super();
        console.log("inside constructor");
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleReceiveBook = this.handleReceiveBook.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.handleAddBatch = this.handleAddBatch.bind(this);
        this.handleViewStudent = this.handleViewStudent.bind(this);
        this.state = {id : 'yyy'};
    }

    handleReceiveBook(){
        console.log("handle receive book clicked.");
        this.props.history.push('/receiveBook');
    }
    handleAddBook(){
        console.log("handle add book.");
        this.props.history.push('/addBook');
    }
    handleAddBatch(){
        console.log("handle add batch.");
        this.props.history.push('/addBatch');
    }
    handleViewStudent(){
        console.log("handle view student.");
        this.props.history.push('/viewStudent');
    }
    handleAddStudent(){
        console.log("handle add student.");
        this.props.history.push('/addStudent');
    }

    async componentDidMount(){
        
        const config = {
            method: 'get',
            url: 'http://localhost:5000/menu'
        }
    
        let abc = await Axios(config);
    //    console.log('found from back end : ',abc);
        this.setState({id : abc.data});

        if(abc.data=='yy'){
            console.log("yy found");
            setTimeout(() => { this.props.history.goBack(); }, 2000);
        }
        else if(abc.data == 'yyy'){
            console.log("yy found");

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
        else if(this.state.id == 'yy'){
            return (
                <div>
                    <br/><br/>
                    <h1>Access denied. Enter ID and Password. </h1>
                </div>
            );
        }
        else{
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

                                        <h3>Menu</h3>
            
                                    </div>
                                    <br/>

                                    <div className = "row">
            
                                        <input onClick={this.handleReceiveBook} type="submit" className="btn" value="Receive Book" />
                
                                    </div>
                                <br/>

                                 <div className="row">
               

                                        <input onClick={this.handleAddBook} type="submit" className="btn" value="Add Book" />
              
                                   </div>
                                  <br/>

                                    {/* <div className="row">
              
                                       <input onClick={this.handleAddBatch} type="submit" className="btn" value="Add Batch" />


                                   </div> */}
                                   {/* <br/> */}

                                   <div className = "row">
            
                                        <input onClick={this.handleAddStudent} type="submit" className="btn" value="Add Student" />
                
                                    </div>
                                {/* <br/> */}

                                {/* <div className = "row">
            
                                        <input onClick={this.handleViewStudent} type="submit" className="btn" value="View Student" />
                
                                    </div> */}
                                <br/>


                         </div>
 
                      </div>
                   </div>

                </div>
                </div>
            );
        }

    }


}


export default withRouter(Menu);