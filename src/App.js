import React, { Component } from 'react';
import './App.css';
import Toc from './components/Toc';
import Content from './components/Content';
import Subject from'./components/Subject';
import Control from'./components/Control';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode : "read",
      selected_toc_id : 2,
      subject : {title: "WEB", sub: "World Wide Web!"},
      welcome : {title : "welcome", desc : "Hello, React !"},
      toc : [
        {id : 1, title : "HTML", desc : "HTML is for information"},
        {id : 2, title : "CSS", desc : "CSS is for design"},
        {id : 3, title : "JavaScript", desc : "JavaScript is for interactive"},
      ]
    }
  }
  render(){
    let _title, _desc = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === "read"){
      let i = 0;
      while(i < this.state.toc.length){
        let data = this.state.toc[i];
        if(data.id === this.state.selected_toc_id){
          _title = data.title;
          _desc = data.desc;
          break
        }
        i += 1;
      }
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage = {function(){
            this.setState({mode : "welcome"});
          }.bind(this)}>
        </Subject>
        {/* <header>
          <h1><a href="/" onClick={function(e){
            e.preventDefault();
            // this.state.mode = "welcome";
            this.setState({
              mode : "welcome"
            });
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}
        <Toc 
          onChangePage={function(id){
           this.setState({
            mode : "read",
            selected_toc_id : parseInt(id)
           });
          }.bind(this)}
          data = {this.state.toc}>
        </Toc>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode : _mode
          });
        }.bind(this)}>
        </Control>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
