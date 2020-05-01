import React, { Component } from 'react';

class Toc extends Component{
    // 프로젝트 성능 향상을 위하여 불필요한 렌더 방지 'shouldComponentUpdate'!
    // 그렇기에 오리지널 데이터를 변경하는 push보다는 concat함수를 쓴다.
    shouldComponentUpdate(newProps, newState){
        if(this.props.data === newProps.data){
            return false;
        } return true;
    }
    render(){
        let lists = [];
        let data = this.props.data;
        let i = 0;
        while(i < data.length){
            lists.push(
                <li key={data[i].id}>
                    <a 
                        href={"/content/" + data[i].id}
                        data-id = {data[i].id}
                        onClick={function(e){
                            e.preventDefault();
                            this.props.onChangePage(e.target.dataset.id);
                        }.bind(this)}
                    >{data[i].title}</a>
                </li>
            );
            i += 1;
        }
        return(
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
        );
    }
}

export default Toc;