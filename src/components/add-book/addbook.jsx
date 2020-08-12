import React from "react";
import {
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

class BookDashboard extends React.Component {
  render() {
    return (
      <>
        {this.props.Bookpage === true && (
          <>
            <form className="Book-form" noValidate autoComplete="off">
              <h3>Add books </h3>
              <div>
                <TextField
                  placeholder="Book name"
                  id="standard-required"
                  label="Book name"
                  name="Bookname"
                  value={this.props.Bookname}
                  onChange={(e) => {
                    this.props.handlechange(e);
                  }}
                />
              </div>
              <div>
                <TextField
                  placeholder="Isbn"
                  id="standard-required"
                  label="Isbn"
                  name="isbn"
                  value={this.props.isbn}
                  onChange={(e) => {
                    this.props.handlechange(e);
                  }}
                />
              </div>
              <div>
                <FormControl variant="filled" className="form-control">
                  <InputLabel id="demo-simple-select-filled-label">
                    Authors
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="author"
                    value={this.props.author}
                    onChange={(e) => {
                      this.props.handlechange(e);
                    }}
                  >
                    {this.props.authorList.map((item, k) => (
                      <MenuItem value={item._id} key={k}>
                        {item.firstName} {item.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                {!this.props.updatebooks ? (
                  <>
                    <Button
                      onClick={this.props.handleAddbooks}
                      variant="contained"
                      color="primary"
                      className="btn-size btn-add"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={this.props.handlecancle}
                      variant="contained"
                      color="primary"
                      className="btn-size"
                    >
                      Cancle
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      className="btn-size btn-add"
                      onClick={this.props.handleupdatedbooks}
                    >
                      update
                    </Button>
                    <Button
                      onClick={this.props.handlecancle}
                      variant="contained"
                      color="primary"
                      className="btn-size"
                    >
                      Cancle
                    </Button>
                  </>
                )}
              </div>
            </form>
          </>
        )}
      </>
    );
  }
}
export default BookDashboard;
