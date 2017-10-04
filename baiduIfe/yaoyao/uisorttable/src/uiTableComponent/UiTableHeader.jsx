import React from 'react';

class UiTableHeader extends React.Component {
  constructor(props) {
    super();
    this.title = [];
    this.state = {
      sort: {
        col: 0,
        direction: false
      }
    };
  }

  sortThisCol(index) {
    this.setState({
      sort: {
        col: index,
        direction: !this.state.sort.direction
      }
    });
    this.props.onHeaderClick(this.state.sort);
  }

  render() {
    let header = [];
    this.title = ['姓名', '数学', '语文', '英语'];
    for (let i = 0; i < this.title.length; i++) {
      let headerClass = this.title[i] !== '姓名' ? 'header can-sort' : 'header';
      header.push(
        <span onClick={() => this.sortThisCol(i)} className={headerClass} key={i}>{this.title[i]}
        </span>
      );
    }
    return <div style={{ marginBottom: 12 + 'px' }}>{header}</div>;
  }
}

export default UiTableHeader;
