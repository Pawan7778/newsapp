import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from './Spinner'
import PropTypes from 'prop-types';

export class News extends Component {

static defaultProps = {
  country : "in",
  pageSize : 8,
  category : 'general'
}

static defaultProps = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
}


 
  constructor() {
    super();
    this.state = {
      articles:[],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8ecc4d7a3904da4b02f9826f2f5fe0d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    // console.log("Prev")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8ecc4d7a3904da4b02f9826f2f5fe0d&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  };

  handleNextCLick = async () => {
    // console.log("Next")
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d8ecc4d7a3904da4b02f9826f2f5fe0d&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading :false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className = "text-center">NewsHUB - Top Headlines</h1>
        {this.state.loading && <Loader/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  newsURL={element.url}
                  imgURL={element.urlToImage}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextCLick}
            disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
