import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./ReceiveBook.css";
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";

class ReceiveBook extends Component {

    constructor(){
        super()
        console.log("inside constructor");
        this.state = {id : 'yyy'};
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

        if(this.state.id == 'yyy'){
            return(
                <div>
                    <h1>Wait for a while.....</h1>
                </div>
            )
        }
        else if (this.state.id == 'yy'){
            return (
                <div>
                    <h1>Access denied. Enter Password. </h1>
                </div>
            );
        }

        else {
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

                                        <h3>Receive Book</h3>
            
                                    </div>
                                    <br/>

                                    <div className = "row">
            
                                        {/* <input onClick={this.handleReceiveBook} type="submit" className="btn" value="Receive Book" /> */}
                                        <input  type="text" value="Book's basic id : " />

                                    </div>
                                <br/>

                                 <div className="row">
               

                                        {/* <input onClick={this.handleAddBook} type="submit" className="btn" value="Add Book" /> */}
                                        <input  type="text" value="Book's main id  : " />
              
                                   </div>
                                  <br/>

                                    {/* <div className="row">
              
                                       <input onClick={this.handleAddBatch} type="submit" className="btn" value="Add Batch" />


                                   </div> */}
                                   {/* <br/> */}

                                   <div className = "row">
            
                                        <input onClick={this.handleAddStudent} type="submit" className="btn" value="Receive" />
                
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

    
};

export default withRouter(ReceiveBook);