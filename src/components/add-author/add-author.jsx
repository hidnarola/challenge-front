import React from "react";
import { Button, TextField } from "@material-ui/core";

class AthorDashboard extends React.Component {
  render() {
    return (
      <>
        {this.props.authorpage === true && (
          <>
            <form className="author-form" noValidate autoComplete="off">
              <h3>Add author </h3>
              <div>
                <TextField
                  placeholder="First name"
                  id="standard-required"
                  label="First name"
                  name="firstname"
                  value={this.props.firstname}
                  onChange={(e) => {
                    this.props.handlechange(e);
                  }}
                />
              </div>
              <div>
                <TextField
                  placeholder="Last name"
                  id="standard-required"
                  label="last name"
                  name="lastname"
                  value={this.props.lastname}
                  onChange={(e) => {
                    this.props.handlechange(e);
                  }}
                />
              </div>
              <div>
                {!this.props.updateauthor ? (
                  <>
                    <Button
                      onClick={this.props.handleAddauthor}
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
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      className="btn-size btn-add"
                      onClick={this.props.updateauthordetails}
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
                    </Button>{" "}
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
export default AthorDashboard;
