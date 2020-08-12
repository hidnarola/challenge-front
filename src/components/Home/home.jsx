import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import { DB_URL } from "../../configuration/app-config";
import Axios from "axios";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import "./home.scss";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import AddAuthor from "../add-author/add-author";
import AddBooks from "../add-book/addbook";

class Home extends React.Component {
  state = {
    BookList: [],
    authorList: [],
    firstname: "",
    lastname: "",
    Bookname: "",
    isbn: "",
    author: "",
    Bookpage: false,
    authorpage: false,
    dashbaord: true,
    view: false,
    updatebooks: false,
    updateauthor: false,
    Book_id: null,
    Auth_id: null,
  };

  componentDidMount = () => {
    this.GetBookdetails();
    this.getallauthor();
  };

  GetBookdetails = () => {
    try {
      Axios.get(`${DB_URL}GetallBook`)
        .then((res) => {
          this.setState({ BookList: res.data });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getallauthor = () => {
    try {
      Axios.get(`${DB_URL}Getallauthor`)
        .then((res) => {
          this.setState({ authorList: res.data });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  convertDate(inputFormat) {
    const date = new Date(inputFormat);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  handlebookdetails = (e, id) => {
    e.preventDefault();
    this.props.history.push("/Books/" + id);
  };

  addbooks = () => {
    this.setState({
      dashbaord: false,
      Bookpage: true,
      Bookname: "",
      isbn: "",
      author: "",
    });
  };

  addAuthor = () => {
    this.setState({
      dashbaord: false,
      authorpage: true,
      firstname: "",
      lastname: "",
    });
  };

  Editbooks = (e, id) => {
    e.preventDefault();
    console.log(id.author);
    this.setState({
      dashbaord: false,
      Bookpage: true,
      Bookname: id.name,
      updatebooks: true,
      isbn: id.isbn,
      author: id.author._id,
      Book_id: id._id,
    });
  };

  EditAuthor = (e, id) => {
    e.preventDefault();
    this.setState({
      dashbaord: false,
      authorpage: true,
      firstname: id.firstName,
      lastname: id.lastName,
      updateauthor: true,
      Auth_id: id._id,
    });
  };

  handleAddbooks = () => {
    var postdata = {
      name: this.state.Bookname,
      isbn: this.state.isbn,
      Author_id: this.state.author,
    };

    try {
      Axios.post(`${DB_URL}addBook`, postdata)
        .then((res) => {
          this.GetBookdetails();

          this.getallauthor();
          this.setState({
            dashbaord: true,
            authorpage: false,
            Bookpage: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleupdatedbooks = () => {
    var postdata = {
      name: this.state.Bookname,
      isbn: this.state.isbn,
      Author_id: this.state.author,
      Book_id: this.state.Book_id,
    };

    try {
      Axios.put(`${DB_URL}updatebooks`, postdata)
        .then((res) => {
          this.GetBookdetails();

          this.getallauthor();
          this.setState({
            dashbaord: true,
            authorpage: false,
            Bookpage: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  updateauthordetails = () => {
    var postdata = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      Auth_id: this.state.Auth_id,
    };

    try {
      Axios.put(`${DB_URL}updateauthors`, postdata)
        .then((res) => {
          this.GetBookdetails();

          this.getallauthor();
          this.setState({
            dashbaord: true,
            authorpage: false,
            Bookpage: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleAddauthor = () => {
    var data = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
    };

    try {
      Axios.post(`${DB_URL}addAuthor`, data)
        .then((res) => {
          this.GetBookdetails();

          this.getallauthor();
          this.setState({
            dashbaord: true,
            authorpage: false,
            Bookpage: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  handlecancle = () => {
    this.setState({
      dashbaord: true,
      authorpage: false,
      Bookpage: false,
      updateauthor: false,
      updatebooks: false,
      Book_id: null,
      Auth_id: null,
    });
  };

  handlechange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <>
        {this.state.dashbaord && (
          <div className="tbl-section">
            <Grid container spacing={2} className="grid_box">
              <div className="btn-box">
                <Button
                  onClick={this.addAuthor}
                  variant="contained"
                  color="primary"
                  className="btn-size btn-add"
                  startIcon={<AddOutlinedIcon />}
                >
                  author
                </Button>
                <Button
                  onClick={this.addbooks}
                  variant="contained"
                  color="primary"
                  className="btn-size"
                  startIcon={<AddOutlinedIcon />}
                >
                  book
                </Button>
              </div>
              {this.state.BookList.length > 0 ? (
                <>
                  <h4>Book details</h4>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Book name</TableCell>
                          <TableCell>ISBN</TableCell>
                          <TableCell>Author Name</TableCell>
                          <TableCell>Created Date</TableCell>
                          <TableCell>Edit</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.BookList.length > 0 &&
                          this.state.BookList.map((row, i) => (
                            <TableRow key={i} className="row">
                              <TableCell component="th" scope="row">
                                <b
                                  onClick={(e) =>
                                    this.handlebookdetails(e, row._id)
                                  }
                                >
                                  {row.name}
                                </b>
                              </TableCell>
                              <TableCell>{row.isbn}</TableCell>
                              <TableCell>
                                {row.author.firstName} {row.author.lastName}
                              </TableCell>
                              <TableCell>
                                {this.convertDate(row.CreatedDate)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  onClick={(e) =>
                                    this.EditAuthor(e, row.author)
                                  }
                                >
                                  Author
                                </Button>
                                <Button onClick={(e) => this.Editbooks(e, row)}>
                                  Book
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <h1> No data found</h1>
              )}
            </Grid>
          </div>
        )}

        {this.state.Bookpage === true && (
          <>
            <AddBooks
              Bookpage={this.state.Bookpage}
              isbn={this.state.isbn}
              updatebooks={this.state.updatebooks}
              Bookname={this.state.Bookname}
              handlechange={this.handlechange}
              author={this.state.author}
              authorList={this.state.authorList}
              handleAddbooks={this.handleAddbooks}
              handlecancle={this.handlecancle}
              handleupdatedbooks={this.handleupdatedbooks}
            />
          </>
        )}

        {this.state.authorpage === true && (
          <>
            <AddAuthor
              authorpage={this.state.authorpage}
              firstname={this.state.firstname}
              updateauthor={this.state.updateauthor}
              handlechange={this.handlechange}
              lastname={this.state.lastname}
              handleAddauthor={this.handleAddauthor}
              handlecancle={this.handlecancle}
              updateauthordetails={this.updateauthordetails}
            />
          </>
        )}
      </>
    );
  }
}
export default Home;
