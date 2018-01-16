import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/api";
import io from 'socket.io-client';
import SweetAlert from 'sweetalert-react';
//const socket = io();
class Main extends Component {
  
  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: [],
    show:false,
    title:''
  };
  // When the component mounts, get a list of all saved articles and update this.state.saved
  componentDidMount() {
    var that = this;
  /*  socket.on('article', function (data) {
      console.log(data);
       that.setState({ show: true });
       that.setState({ title: data.article.title});
    });*/
    this.getSavedArticles();
  }
  // Method for getting saved articles (all articles) from the db
  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }


  // A helper method for rendering one search results div for each article
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // A helper method for rendering one div for each saved article
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // When the search form submits, perform NYT api search with user input
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Getting NYT Articles");
    console.log("this.state.topic: ", this.state.topic);
    console.log("this.state.startYear: ", this.state.startYear);
    console.log("this.state.endYear: ", this.state.endYear);
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  }

  // When save article button is clicked, add article to db
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
   //socket.emit('articles', {article: newSave});
  }

  // When delete article button is clicked, remove article from db
  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {

    return (
        <div className="container">
        <div>
           <SweetAlert
          show={this.state.show}
          title="This article was saved"
          text={this.state.title}
           onConfirm={() => this.setState({ show: false })}

          />
          </div>
          {/* Jumbotron */}
          <div className="jumbotron black">
            <h1 className="text-center"><strong className="text-white">New York Times</strong></h1>
          </div>
          {/* Search Form and Results Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />
          {/* Saved Articles Section */}
          <div className="container center">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="panel panel-primary">
                  <div className="panel-heading chip">
                    <h3 className="panel-title">
                      <strong>
                        <i className="fa fa-cloud" aria-hidden="true"></i> Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {this.renderSaved()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="page-footer black lighten-1">
            <div className="footer-copyright">
            <div className="container ">
             © 2018 Copyright MoudGW
              <a className="grey-text text-lighten-4 right" href='https://github.com/MoudGW'><i className="fa fa-github fa-2x" aria-hidden="true"/></a>
            </div>
            </div>
          </footer>
        </div>
    );
  }

}

export default Main;
