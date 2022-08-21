import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import "./BookList.css";
import { getDefaultNormalizer } from '@testing-library/react';

import "../history.js";

class BookList extends Component {

    constructor(){
        super()
        console.log("inside constructor");
        this.handleSubmitL = this.handleSubmitL.bind(this);
        this.handleSubmitR = this.handleSubmitR.bind(this);
        this.handleSubmitIssue = this.handleSubmitIssue.bind(this);
        this.state = {id : 'yyy', deptHtml : "", selectValue : "", title : "", author : "",publisher : "",edition : "",year : "",SbookId : 0};
    }

    finalNumber = 0;
    ttl = [];
    aut = [];
    pub = [];
    edi = [];
    yr = [];
    bookId = [];


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
        
        else if(abc.data=='yyy'){

            setTimeout(() => { this.props.history.goBack(); }, 2000);
            
        }
        else{
            this.setState({id : abc.data});

            let config = {
                method : 'get',
                url : 'http://localhost:5000/getBookNumber'
            }

            let foundNumber = await Axios(config);
         //   let number = parseInt(foundNumber);



            config = {
                method: 'get',
                url: 'http://localhost:5000/bookList'
            }
        
            let foundList = await Axios(config);

            console.log("found book number is : ",foundNumber.data);
         //   console.log("number : ",number);
            console.log("books are : ");
            console.log(foundList);


            let num = foundNumber.data;
            let number = Number(num);
            console.log("the number is : ",number);
            this.finalNumber = number;

            // let ttl = [];
            // let aut = [];
            // let pub = [];
            // let edi = [];
            // let yr = [];

            let i = 0;


            config = {
                method: 'get',
                url: 'http://localhost:5000/getBookTtl'
            }

            let config1 = {
                method: 'get',
                url: 'http://localhost:5000/getBookAut'
            }

            let config2 = {
                method: 'get',
                url: 'http://localhost:5000/getBookPub'
            }

            let config3 = {
                method: 'get',
                url: 'http://localhost:5000/getBookEdi'
            }

            let config4 = {
                method: 'get',
                url: 'http://localhost:5000/getBookYr'
            }

            let config5 = {
                method: 'get',
                url: 'http://localhost:5000/getBookId'
            }

            let ttl1;
            let aut1;
            let pub1;
            let edi1;
            let yr1;
            let BId;


            for(i=0;i<number;i++){
                ttl1=await Axios(config);
                this.ttl[i] = ttl1.data;
                aut1=await Axios(config1);
                this.aut[i] = aut1.data;
                pub1=await Axios(config2);
                this.pub[i] = pub1.data;
                edi1=await Axios(config3);
                this.edi[i] = Number(edi1.data);
                yr1=await Axios(config4);
                this.yr[i] = Number(yr1.data);
                BId = await Axios(config5);
                this.bookId[i] = Number(BId.data);
                console.log("title : ");
                console.log(this.ttl[i]);
                console.log("year : ");
                console.log(this.yr[i]);
                console.log("book no here : ",this.bookId[i])
            }


            if(number>0){
                this.setState({title : this.ttl[0]});
                this.setState({author : this.aut[0]});
                this.setState({publisher : this.pub[0]});
                this.setState({edition : this.edi[0]});
                this.setState({year : this.yr[0]});
                this.setState({SbookId : this.bookId[0]});
            }



        }
       
    }
    a = 0;

    handleSubmitL(){
        
      //  console.log(this.a);
      //  this.a++;
        console.log(this.finalNumbr);
        this.a--;
        if(this.a<0){
            this.a = this.finalNumber-1;
        }
        this.setState({title : this.ttl[this.a]});
        this.setState({author : this.aut[this.a]});
        this.setState({publisher : this.pub[this.a]});
        this.setState({edition : this.edi[this.a]});
        this.setState({year : this.yr[this.a]});
        this.setState({SbookId : this.bookId[this.a]});


        console.log("hadlesubmitL clicked. ",this.a);
        console.log("book is : ",this.state.title);
        console.log("book no is : ",this.state.SbookId);
    }
    handleSubmitR(){
   //     console.log("hadlesubmitR clicked.");
   //     console.log(this.a);
     //   this.a--;
   //     console.log(this.finalNumbr);
        this.a++;
        if(this.a>=this.finalNumber){
            this.a = 0;
        }
        this.setState({title : this.ttl[this.a]});
        this.setState({author : this.aut[this.a]});
        this.setState({publisher : this.pub[this.a]});
        this.setState({edition : this.edi[this.a]});
        this.setState({year : this.yr[this.a]});
        this.setState({SbookId : this.bookId[this.a]});

        console.log("hadlesubmitL clicked. ",this.a);
        console.log("book is : ",this.state.title);
        console.log("book no is : ",this.state.SbookId);
    }

    async handleSubmitIssue(){
        console.log("inside issue submit . book id : ",this.state.SbookId);

        Axios.post('http://localhost:5000/issueSubmitted', {
            id: this.state.id,
            book : this.state.SbookId
        })

        let configlast = {
            method: 'get',
            url: 'http://localhost:5000/isIssuedOrNot'
        }

        let isIssued = await Axios(configlast);
        if(isIssued.data == 1){
            alert("Book is issued.");
        }
        else{
            alert("Book could not be issued.");
        }

    }










    Set() {
        return { __html: this.state.deptHtml };
    }


    render(){

        if(this.state.id == 'yyy'){
            return(
                <div>
                    <h1>Wait for a while.....</h1>
                </div>
            )
        }

        else if(this.state.id == 'yy'){
            return(
                <div>
                    <h1>Access denied. Enter ID and Password. </h1>
                </div>
            );
        }
        else{
            console.log("inside render");
            console.log(this.state.id);
            return (
                
                <div className="d-flex align-items-center container mt-5">
                    <div className = "row">

                        <div className="col">
                            <div className =  "logo">
                                <img className="rounded-circle" src="https://i.ibb.co/T02TH2n/logo.jpg" />
                            </div>
  
                        </div>


                        {/* <div className="col">

                            {/* <img src = {require("../../../../Main_Project_Documents/public/uploads/122724956_796157847784028_160662349399285637_n.jpg")} alt="logo"/> */}

                            {/* <img src = "E:/Programming/Educationals/3-ii/web%20project/Main_Project_Documents/public/uploads/122724956_796157847784028_160662349399285637_n.jpg" alt="logo"/> */}
 
                        {/* </div> */} 

                        <div className="col">
                            <div className = "row">
                                <div className = "col">
                                    <input onClick={this.handleSubmitL} type="submit" className="btn" value="<<-" />
                                </div>
                                <div className = "col">
                                    <input onClick={this.handleSubmitR} type="submit" className="btn" value="->>" />
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label><b>Title : </b></label>
                                </div>
                                <div className = "col">
                                    <label>{this.state.title}</label>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label><b>Author : </b></label>
                                </div>
                                <div className = "col">
                                    <label>{this.state.author}</label>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label><b>Publisher : </b></label>
                                </div>
                                <div className = "col">
                                    <label>{this.state.publisher}</label>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label><b>Edition : </b></label>
                                </div>
                                <div className = "col">
                                    <label>{this.state.edition}</label>
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col">
                                    <label><b>Publication Year : </b></label>
                                </div>
                                <div className = "col">
                                    <label>{this.state.year}</label>
                                </div>
                            </div>
                            <div className = "row">
                            <input onClick={this.handleSubmitIssue} type="submit" className="btn" value="Isuue" />
                            </div>
                        </div>

                        


                    </div>

                </div>
            );
        }

    }

    
};

export default withRouter(BookList);