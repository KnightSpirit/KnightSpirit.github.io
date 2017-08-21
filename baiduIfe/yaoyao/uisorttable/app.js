import React from 'react';
import ReactDOM from 'react-dom';
import main_css from './src/css/main.less';
import customData from './data.json'

class UiSortTable extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.uData)
        this.state = {
            sort : {
                col : 0,
                direction: true
            },
            headerData:[]
        };
    }

    sortColumn(index){
        this.setState({
            sort:index
        })
        console.log("Click sort");
    }

    render(){
        return (
            <div>
                <UiTableHeader onHeaderClick={(p)=> this.sortColumn(p)}  />
                <UiTableBody sort={this.state.sort} />
            </div>
        );
    }
}

class UiTableHeader extends React.Component{
    constructor(props){
        super();
        this.title = [];
        this.state = {
            sort : {
                col:0,
                direction : false
            }
        };
    }

    sortThisCol(index){
        this.setState({
            sort: {
                col:index,
                direction : !this.state.sort.direction
            }
        });
        this.props.onHeaderClick(this.state.sort);
    }

    render(){
        let header = [];
        this.title = ["姓名", "数学", "语文", "英语"];
        for(let i = 0; i < this.title.length; i ++){
            let header_class = this.title[i] !== "姓名" ? "header can-sort":"header";
            header.push(
                <span onClick={() => this.sortThisCol(i)} className={header_class} key={i} >{this.title[i]}</span>
            );
        }
        return <div style={{marginBottom:12+'px'}}>{header}</div>;
    }
}

class UiTableBody extends React.Component{
    constructor(props){
        super();
    }

    render(){
        this.rData = [
            {
                name:"fsad",
                result : [123,43,56]
            },
            {
                name:"小i",
                result : [223,43,56]
            },
            {
                name:"fsadsdaf",
                result : [123,89,56]
            }
        ];

        let sortOption = this.props.sort;
        if (this.props.sortMethod) this.rData.sort(sortMethod);
        else{
            this.rData.sort((p1, p2) =>{
                let result = sortOption.direction ? p1.result[sortOption.col] - p2.result[sortOption.col] :
                             -(p1.result[sortOption.col] - p2.result[sortOption.col]);
                return result;
            })
        }

        let dataRow = this.rData.map(rData=>{ 
            return (
                <div>
                    <span className="data-col">{rData["name"]}</span>
                    <span className="data-col">{rData["result"][0]}</span>
                    <span className="data-col">{rData["result"][1]}</span>
                    <span className="data-col">{rData["result"][2]}</span>
                </div>
            );
        });
        return <div>{dataRow}</div>;
    }
}

function loadUiTable(){
    ReactDOM.render(
        <UiSortTable uData={customData} />,
        document.getElementById("root")
    );
}

loadUiTable();