import React from 'react';
import ReactDOM from 'react-dom';
import mainCss from './src/css/main.less';
import UiTableHeader from './src/uiTableComponent/UiTableHeader.jsx';
import UiTableBody from './src/uiTableComponent/UiTableBody.jsx';
import customData from './data.json';

const Console = console;
class UiSortTable extends React.Component {
  constructor(props) {
    super(props);
    Console.log(this.props.uData);
    this.state = {
      sort: {
        col: 0,
        direction: true
      },
      headerData: []
    };
  }

  sortColumn(index) {
    this.setState({
      sort: index
    });
    Console.log('Click sort');
  }

  render() {
    return (
      <div>
        <UiTableHeader onHeaderClick={p => this.sortColumn(p)} />
        <UiTableBody sort={this.state.sort} />
      </div>
    );
  }
}

function loadUiTable() {
  ReactDOM.render(
    <UiSortTable uData={customData} />,
    document.getElementById('root')
  );
}

loadUiTable();
