import React from "react";

const Search = props =>
  <div className="container center">
    <div className="row">
      <div className="col-lg-12">
        <div className="panel panel-primary">
          <div className="chip">
            <h2 className="panel-title">
              <strong>
                <i className="fa fa-search" aria-hidden="true"></i> Search
              </strong>
            </h2>
          </div>
          <div className="container text-left">
            <form>
              <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <input onChange={props.handleTopicChange} type="text" className="form-control" id="topic" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label htmlFor="start-year">Start Year</label>
                <input onChange={props.handleStartYearChange} type="text" className="form-control" id="start-year" />
              </div>
              <div className="form-group">
                <label htmlFor="end-year">End Year</label>
                <input onChange={props.handleEndYearChange} type="text" className="form-control" id="end-year" />
              </div>
              <button onClick={props.handleFormSubmit} type="submit" className="waves-effect waves-light btn-large"><i className="material-icons right">send</i>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <br/><br/>

    <div className="row">
      <div className="col-lg-12">
        <div className="panel panel-primary">
          <div className="chip">
            <h2 className="panel-title">
              <strong>
                <i className="fa fa-newspaper-o" aria-hidden="true"></i> Results
              </strong>
            </h2>
          </div>
          <div className="panel-body">
            {props.renderArticles()}
          </div>
        </div>
      </div>
    </div>
    <br/><br/>
  </div>


export default Search;
