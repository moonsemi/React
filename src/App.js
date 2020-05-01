import React, { Component } from 'react';
import './App.css';
import Toc from './components/Toc';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from'./components/Subject';
import Control from'./components/Control';



class App extends Component {
  constructor(props){
    super(props);
    this.max_toc_id = 3;
    this.state = {
      mode : "welcome",
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
  getReadContent(){
    let i = 0;
    while(i < this.state.toc.length){
      let data = this.state.toc[i];
      if(data.id === this.state.selected_toc_id){
        return data;
        break;
      }
      i += 1;
    }
  };
  getContent(){
    let _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === "read"){
      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add toc to this.state.toc
        this.max_toc_id = this.max_toc_id+1;
        // this.state.toc.push(
        //   {id : max_toc_id, title : _title, desc : _desc}
        // );
        let _tocs = this.state.toc.concat(
          {id : this.max_toc_id, title : _title, desc : _desc}
        );
        this.setState({
          toc : _tocs,
          mode : "read",
          selected_toc_id:this.max_toc_id
        });
      }.bind(this)}></CreateContent>;
    } else if(this.state.mode === "update"){
      let _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
        // add toc to this.state.toc
        // this.state.toc.push(
        //   {id : max_toc_id, title : _title, desc : _desc}
        // );
        // let _tocs = this.state.toc.concat(
        //   {id : this.max_toc_id, title : _title, desc : _desc}
        // );
        let _tocs = Array.from(this.state.toc);
        let i = 0;
        while(i < _tocs.length){
          if(_tocs[i].id === _id){
            _tocs[i] = {id : _id, title : _title, desc : _desc};
            break;
          }
          i += 1;
        }
        this.setState({
          toc : _tocs,
          mode : "read"
        });
      }.bind(this)}></UpdateContent>;
    }
    return _article;
  };
  render(){
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
          if(_mode === "delete"){
            if(window.confirm("정말 삭제하시겠습니까?")){
              let _toc = Array.from(this.state.toc);
              let i = 0;
              while(i < _toc.length){
                if(_toc[i].id === this.state.selected_toc_id){
                  _toc.splice(i,1);
                  break;
                }
                i += 1
              }
              this.setState({
                mode : "welcome",
                toc : _toc
              })
            }
          }else{
            this.setState({
              mode : _mode
            });
          }
        }.bind(this)}>
        </Control>
        {this.getContent()}
      </div>
    );
  };
}

export default App;
