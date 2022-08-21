const express = require('express');
const app = express();
const mysql = require("mysql");
const bcrypt = require('bcrypt');

 const cors = require('cors');
 const bodyParser = require('body-parser');
const { AutoEncryptionLoggerLevel } = require('mongodb');

 app.use(bodyParser.json());
 app.use(cors());


   a = 'yy';
   id = 'ss';
   
   gave_password = '';
   en_g_pass = '';
   got_password = '';
   got_id = '';




 const db = mysql.createConnection({
     host: '127.0.0.1',
     user: 'root',
     password: 'g0(DenW1ngisaracket',
     database: 'elib'
 });


  db.connect((err)=>{
      if(err) { console.log("can not connect to mysql database, polok");
            console.log(err);
    }
      console.log("connected to mysql database, polok");



  });



  app.post('/login', (req,res)=>{
    
    console.log("                                                 inside post backend new");

    a = 'yy';

    const ID = req.body.id;
    got_id = ID;
    const Pass = req.body.pass;
    gave_Password = Pass;

    console.log(ID);



     const sqlInsert = `SELECT pass from student WHERE id = '${ID}'`;

     console.log(sqlInsert);
    
   
     db.query(sqlInsert,(err,result)=>{

        console.log("inside db query new");

        console.log(result);
        console.log(Pass);

        bcrypt.compare(Pass, result[0].pass, (error,response) =>{
          console.log("inside compare");
          if(response){
            console.log("entered correct password");
            a = ID;
          }
          else{
            console.log("user do not has access.");
            a = 'yy';
          }
        })


     });
  })


  async function test(peraPass){
    en_g_pass = await hashPassword(peraPass,10);
    if(en_g_pass == got_password){
      a = got_id;
      console.log(en_g_pass);
      console.log(got_password);
      console.log("a is assigned to id")
    }
    else{
      a = 'yy';
      console.log(en_g_pass);
      console.log(got_password);
      console.log("a is assigned to yy.")
    }
  }



  async function hashPassword (password, saltRounds = 10){

      console.log("inside hashing process");

      try {
          // Generate a salt
          const salt = await bcrypt.genSalt(saltRounds);

          // Hash password
          return await bcrypt.hash(password, salt);
      } catch (error) {
          console.log(error);
      }

      // Return null if error
      return null;
  };






  app.get('/checkLogin',(req,res)=>{
      console.log("                                               inside get backend new");



      console.log(a);
      res.send(a);
  })


  app.post('/addStudent', (req,res)=>{

    const id = req.body.id;
    const nm = req.body.nm;
    const dept = req.body.dept;
    const lvl = req.body.lvl;
    const trm = req.body.trm;
    const pass = req.body.pass;

    console.log("inside add student backend");


    const sqlInsert = "INSERT INTO student (id, name, dept, lvl, term, pass) values (?,?,?,?,?,?)";
    db.query(sqlInsert,[id,nm,dept,lvl,trm,pass],(err,result)=>{
        console.log("send to database");
    });
  });

  app.get('/menu',(req,res)=>{
    console.log("inside get backend menu");
    console.log(a);
    res.send(a);
    });

    let changepass = 'null';

  app.post('/changePass1',(req,res)=>{
    console.log("inside sendpass1 for password management");
    let p = req.body.fp;
    let pn = req.body.np;
    changepass = req.body.np;
    let sqlInsert = `SELECT pass from student WHERE id = '${a}'`;
    console.log(p);
    console.log(a);
    db.query(sqlInsert,(err,result)=>{
      console.log("inside db query of p.c.1");
      console.log(result);
      bcrypt.compare(p, result[0].pass, (error,response) =>{
        console.log("inside compare");
        if(response){
          console.log("entered correct password");
          console.log("a is : ");
          console.log(a);
          updatePass(a,pn);
        }
        else{
          console.log("user do not has access.");
          a = 'yy';
        }
      })
    })
  });

  async function updatePass(a,np){
    new_pass = await hashPassword (np, 10);
    sqlsyntax = 'UPDATE student SET pass = ? WHERE id = ?';
    db.query(sqlsyntax,[new_pass,a],(err,result)=>{
      console.log("send to database");
    });
  }

  app.get('http://localhost:5000/changePass2',(req,res)=>{
    console.log("inside change password 2.");
    sqlsyntax = 'SELECT pass FROM student WHERE id = ?';
    db.query(sqlsyntax,[a],(err,result)=>{
      bcrypt.compare(changepass, result[0].pass, (error,response) =>{
        console.log("inside compare");
        if(response){
          console.log("password changed");
          a = ID;
          res.send("changed");
        }
        else{
          console.log("could not change password.");
          a = 'yy';
        }
      })
    })
    })
 // })



 let number = 0;

 app.get('/collectDeptNumber',(req,res)=>{
   
  
   console.log("from add student for counting depts from database..");
   const toPass = `SELECT count( * ) as name FROM depts`;
 //  const toPass = `SELECT pass from student WHERE id = '180201100'`;
   db.query(toPass,(err,result)=>{
     console.log("inside counting dept numbers");
     console.log(result);
     number = result[0].name;
     console.log(number);
     let toSend = JSON.stringify(number);
     console.log(toSend);
     res.send(toSend);
     console.log("after sending number");
   });

   console.log("after the q block");


 });


 app.get('/collectDepts',(req,res)=>{



   console.log("from add student for collecting depts from database.. ");
   const sqlInsert = "SELECT name FROM depts";
   console.log(sqlInsert);
   db.query(sqlInsert,(err,result)=>{
     console.log("inside query of collecting depts....");
     console.log(result);

     let dept = "<select id = \"dept\"> ";


     for(i=0;i<number;i++){

       dept = dept.concat("<option value = \"");
       dept = dept.concat(result[i].name);
       dept = dept.concat("\">");
       dept = dept.concat(result[i].name);
       dept = dept.concat("</option>");

     }

     dept = dept.concat("</select>");

     console.log(dept);


     res.send(dept);
   });
 });









                                                                      // issue books

  let department;
  let level;
  let term;
  let book_Num = 0;
  let book_Num_to_Send;
  let book_Id;
  app.post('/issueBookSentDetails',(req,res)=>{
      console.log("inside issueBookSentDetails");
      department = req.body.dept;
      level = req.body.lvl;
      term = req.body.trm;
      console.log(department);
      let toPass = "SELECT count(*) as title FROM book WHERE dept = ? AND Lvl = ? AND term = ?";
      db.query(toPass,[department,level,term],(err,result)=>{
        console.log("inside db query issueBookSentDetails");
        console.log(result);
        book_Num_to_Send = result;
        book_Num = result[0].title;
        console.log("the book number is : ",book_Num);
      })
  })



  app.get('/getBookNumber',(req,res)=>{
    console.log("sending book number to front end. that is : ",book_Num);
    let toSend = JSON.stringify(book_Num);
    res.send(toSend);
  })

  let ttl = [];
  let aut = [];
  let pub = [];
  let edi = [];
  let yr = [];
  let bno = [];
  let i=0;

  let temp = 0;


  app.get('/bookList',(req,res)=>{
    temp = 0;
    let toPass = "SELECT * FROM book WHERE dept = ? AND Lvl = ? AND term = ?";
    db.query(toPass,[department,level,term],(err,result)=>{
      console.log("collecting books from database.");
      console.log(result);
      for(i=0;i<book_Num;i++){
        ttl[i]=result[i].title;
        aut[i]=result[i].author;
        pub[i]=result[i].publisher;
        edi[i]=result[i].edition;
        yr[i]=result[i].publication_year;
        bno[i]=result[i].book_no;
        console.log("book no : ",bno[i]);
      }
      res.send(result);
    })

  })



  app.get('/getBookTtl',(req,res)=>{
    let toSend = JSON.stringify(ttl[temp]);
    console.log("title : ",toSend);
    res.send(toSend);
  })
  app.get('/getBookAut',(req,res)=>{
    let toSend = JSON.stringify(aut[temp]);
    res.send(toSend);
  })
  app.get('/getBookPub',(req,res)=>{
    let toSend = JSON.stringify(pub[temp]);
    res.send(toSend);
  })
  app.get('/getBookEdi',(req,res)=>{
    let toSend = JSON.stringify(edi[temp]);
    res.send(toSend);
  })
  app.get('/getBookYr',(req,res)=>{
    let toSend = JSON.stringify(yr[temp]);
    res.send(toSend);
  })
  app.get('/getBookId',(req,res)=>{
    let toSend = JSON.stringify(bno[temp]);
    temp++;
    res.send(toSend);
  })


  let able = 1;


  app.post('/issueSubmitted',(req,res)=>{
    console.log("app.post issuesubmitted");
    let stId = req.body.id;
    let book = req.body.book;
    console.log("issueSubmitted last");
    colBook(stId,book);
  })

  function colBook(stId,book){
    console.log("function colbook");
    let toPass = "select count(*) as book_basic_id from issue_books WHERE holding_id = ?";
    db.query(toPass,[stId],(result,err)=>{
      if(err){
        console.log(err);
      }
      console.log("inside function colBook");
      console.log(result);
      if(result==null){
        console.log("this is null");
        able = 1;
        try_to_issue(stId,book);
      }
      else{
        if(result[0].book_basic_id<3){
          try_to_issue(stId,book);
        }
        else{
          able = 0;
        }
      }
      console.log("db query inside function colbook finishes");
    })
  }

  function try_to_issue(stId,book){
    console.log("function try_to_issue");
    let toPass = "SELECT count(*) as basic_id from all_book WHERE yes = ? and basic_id = ? ";
    db.query(toPass,[0,book],(result,err)=>{
      console.log("inside function try_to_issue",result);
      if(result==null){
        console.log("book not available to issue.");
        able = 0;
      }
      else{
        if(result[0].basic_id>0){
          console.log("can be issued. book available. process starts....");
          final_issue(stId,book);
        }
      }
      console.log("inside function try to issue finishes");
    })
  }

  function final_issue(stId,book){
    console.log("final_issue");
    let toPass = "select self_id from all_book where basic_id = ?";
    db.query(toPass,(result,err)=>{
      console.log("inside final issue");
      let to_be_issued = result[0].self_id;
      let toPass2 = "insert into issue_books(holding_id, book_basic_id, book_main_id, holding_date) values (?,?,?,?)";
      var d = new Date();
      let bochor = String(d.getFullYear());
      let mas = String(d.getMonth()+1);
      let tarikh = String(d.getDate());
      let UltimateDate = bochor+'-'+mas+'-'+tarikh;
      console.log("and the ultimate date is : ",UltimateDate);

      db.query(toPass2,[stId,book,to_be_issued,UltimateDate],(result2,err)=>{
        console.log("inside final issue db 2");
        console.log("updated to issue book.");
        let toPass3 = "UPDATE all_book SET holder_id = ?, holding_date = ? WHERE basic_id = ? and self_id = ?";
        db.query(toPass3,[stId,UltimateDate,book,to_be_issued],(result3,err)=>{
          console.log("inside final issue db 3");
          console.log("inserted to all_book");
          console.log("Alhamdulillah, issue book is completed.");
          able = 1;
          console.log("inside final issue db 3 finishes");
        })
        console.log("inside final issue db 2 finishes");
      })
      console.log("inside final issue finishes");
    })
  }


  app.get('/isIssuedOrNot',(req,res)=>{
    console.log("checking whether issued or not.");
    console.log(able);
    res.send(able);
  })






























app.get('/', (req, res) => {
    res.send('Hello World! by default')
})

app.listen(5000, () => {
    console.log('Listening on port 5000')
  })