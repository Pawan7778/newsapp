import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgURL, newsURL, author, date ,source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
              <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style = {{left : '90%',zIndex : "1" }}>
                {source}
              </span>
          <img src={imgURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsURL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary bg-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
