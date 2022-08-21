import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./ViewStudent.css";
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";

class ViewStudent extends Component {

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
        else{
            return(
                <div>
                    <h1>View Student</h1>
                </div>
            );
        }
        

    }

    
};

export default withRouter(ViewStudent);