import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Admin from './Components/AdminLogin/AdminLogin';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AdminPanel from './Components/AdminPanel/AdminPanel';
import AddStudent from './Components/AddStudent/AddStudent';
import Book from './Components/Book/Book';
import Menu from './Components/student_menu/Menu';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import IssueBook from './Components/IssueBook/IssueBook';
import MyBooks from './Components/MyBooks/MyBooks';
import BookList from './Components/BookList/BookList';

function App() {
  return (
    <div>
      {/* <h1>Hello</h1>
      <Login></Login>
      <AdminLogin></AdminLogin> */}

      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/checkLogin">
            <Login></Login>
          </Route>
          <Route path="/adminLogin">
            <AdminLogin></AdminLogin>
          </Route>
          <Route path="/adminPanel">
            <AdminPanel></AdminPanel>
          </Route>
          <Route path="/addStudent">
            <AddStudent></AddStudent>
          </Route>
          <Route path="/book">
            <Book></Book>
          </Route>
          <Route path="/menu">
            <Menu></Menu>
          </Route>
          <Route path="/changePassword">
            <ChangePassword></ChangePassword>
          </Route>
          <Route path="/issueBook">
            <IssueBook></IssueBook>
          </Route>
          <Route path="/myBooks">
            <MyBooks></MyBooks>
          </Route>
          <Route path = "/bookList">
            <BookList></BookList>
          </Route>



        <Route exact path="/">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
