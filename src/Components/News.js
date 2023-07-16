import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    console.log("news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,

      totalResults: 0,
    };
    document.title = `NewsMaonkey - ${this.props.category} `;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.page}&pagesize=${this.props.pagesize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      page: 1,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  //   handleNextClick=async()=>{
  //      if(this.state.page+1>Math.ceil((this.state.totalResults)/this.props.pagesize)){

  //      }
  //      else{

  //        console.log("next");

  //        let url  = `https://newsapi.org/v2/top-headlines?country=${this.props.country}category=${this.props.category}&apiKey={this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
  //        this.setState({
  //         loading:true
  //        })
  //        let data = await fetch(url)
  //       let parsedData = await data.json();

  //       this.setState({
  //        articles:parsedData.articles,
  //        page : this.state.page+1,
  //        loading:false
  //      })
  //      }
  //  }
  //  handlePrevClick=async()=>{
  //        console.log("prev");
  //        let url  = `https://newsapi.org/v2/top-headlines?country=${this.props.country}category=${this.props.category}&apiKey={this.props.apiKey}&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
  //        this.setState({
  //         loading:true
  //        })
  //        let data = await fetch(url)
  //       let parsedData = await data.json();

  //       this.setState({
  //        articles:parsedData.articles,
  //        page : this.state.page-1,
  //        loading:false
  //      })
  //  }
  fetchMoreData = async () => {
    this.props.setProgress(10);
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pagesize=${this.props.pagesize}`;

    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      this.props.setProgress(30);
      const data = await response.json();
      this.props.setProgress(70);

      this.setState((prevState) => ({
        articles: prevState.articles.concat(data.articles),
        page: nextPage,
        totalResults: data.totalResults,
        loading: false,
      }));
      this.props.setProgress(100);
    } catch (error) {
      console.log("Error fetching more data:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Top {this.props.category} headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={
                        element.title ? element.title.slice(0, 40) + "..." : ""
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 90) + ".."
                          : ""
                      }
                      imageurl={element.urlToImage}
                      author={element.author ? element.author : "unknown"}
                      time={
                        new Date(element.publishedAt).getDate() +
                        "/" +
                        (new Date(element.publishedAt).getMonth() + 1) +
                        "/" +
                        new Date(element.publishedAt).getFullYear()
                      }
                      source={element.source.name}
                      newsurl={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* {(!this.state.loading) && 
        <div className='container d-flex justify-content-between'>
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)}className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>} */}
      </div>
    );
  }
}
