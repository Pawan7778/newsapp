import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Loader from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [Articles, setArticles] = useState([])
  const [Loading, setLoading] = useState(true)
  const [Page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // document.title = `${capitalizeFirstLetter(
  //   props.category
  // )}-NewsHub`;
  

  const updateNews = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${setPage(1)}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
useEffect(() => {
  updateNews()
}, [])

 const fetchMoreData = async () => {
    setPage(Page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${Page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(Articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h1 className="text-center">
          NewsHUB - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {Loading && <Loader />}
        <InfiniteScroll
          dataLength={Articles.length}
          next={fetchMoreData}
          hasMore={Articles.length !== totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {Articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      newsURL={element.url}
                      imgURL={element.urlToImage}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}

export default News;


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.PropsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
