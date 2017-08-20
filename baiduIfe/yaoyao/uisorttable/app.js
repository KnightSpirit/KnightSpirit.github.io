import React from 'react'
import ReactDOM from 'react-dom'
import main_css from './src/css/main.less'

class UiSortTable extends React.Component{
    constructor(){
        super();
        this.state = {
            sort : {
                col : 0,
                direction: true
            }
        }
    }

    sortColumn(index){
        let a = index;
    }

    render(){
        return (
            <div>
                <UiTableHeader onHeaderClick={()=> sortColumn()}  />
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
        }
    }

    componentDidMount(){
    }

    sortThisCol(index){
        this.setState({
            sort: {
                col:index,
                direction : !this.state.sort.direction
            }
        })
        onHeaderClick(this.state.sort);
    }

    render(){
        let header = [];
        this.title = ["姓名", "数学", "语文", "英语"];
        for(let i = 0; i < this.title.length; i ++){
            let header_class = this.title[i] !== "姓名" ? "header can-sort":"header";
            header.push(
                <span onClick={() => this.sortThisCol(i)} className={header_class} key={i} >{this.title[i]}</span>
            )
        }
        return <div style={{marginBottom:12+'px'}}>{header}</div>;
    }
}

class UiTableBody extends React.Component{
    constructor(props){
        super()
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
        ]

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

ReactDOM.render(
    <UiSortTable />,
    document.getElementById("root")
)