import React from "react";
import { Grid, Card, CardActionArea, CardContent } from "@material-ui/core";
import { DB_URL } from "../../configuration/app-config";
import Axios from "axios";

import "./book-detail.scss";

class Bookdetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      BookList: [],
    };
  }

  componentDidMount = () => {
    let Id = this.props.match.params.id;
    this.GetBookdetails(Id);
  };

  GetBookdetails = (Id) => {
    try {
      Axios.get(`${DB_URL}getBookbyId/` + Id)
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

  convertDate(inputFormat) {
    const date = new Date(inputFormat);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  render() {
    return (
      <>
        <Grid container className="Detail-page">
          <h2>Book details</h2>
          {this.state.BookList.length > 0 &&
            this.state.BookList.map((row, i) => (
              <Card key={i} className="card">
                <CardActionArea>
                  <CardContent>
                    <h3>Book Name : {row.name} </h3>

                    <h3>ISBN : {row.isbn} </h3>

                    <h3>Author : {row.author.firstName} </h3>

                    <h3>Created : {this.convertDate(row.CreatedDate)} </h3>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </Grid>
      </>
    );
  }
}
export default Bookdetails;
