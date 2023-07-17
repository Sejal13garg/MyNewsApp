
import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes
}from "react-router-dom";

export default class App extends Component {
  apiKey=`${process.env.REACT_APP_NEWS_API}`
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
       
      />
          <Routes>
            <Route exact path='/'   element={<News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={15} key='general' country="in" category="general"/>}/>
            <Route exact path='/business'   element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pagesize={15} country="in" category="business"/>}/>
            <Route exact path='/health'  element={<News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={15} key='health' country="in" category="health"/>}/>
            <Route exact path='/entertainment'  element={<News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={15}key='entertainment' country="in" category="entertainment"/>}/>
            <Route exact path='/science'   element={<News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={15} key='science' country="in" category="science"/>}/>
            <Route exact path='/sports'  element={<News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={15} key='sports' country="in" category="sports"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

