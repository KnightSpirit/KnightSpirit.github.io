import React from 'react';


export default class UiTableBody extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    this.rData = [
      {
        name: 'fsad',
        result: [123, 43, 56]
      },
      {
        name: '小i',
        result: [223, 43, 56]
      },
      {
        name: 'fsadsdaf',
        result: [123, 89, 56]
      }
    ];
    const sortOption = this.props.sort;
    if (this.props.sortMethod) this.rData.sort(this.props.sortMethod);
    else {
      this.rData.sort((p1, p2) => {
        const result = sortOption.direction ?
          p1.result[sortOption.col] - p2.result[sortOption.col] :
          -(p1.result[sortOption.col] - p2.result[sortOption.col]);
        return result;
      });
    }
    const dataRow = this.rData.map((rData) => {
      return (
        <div>
          <span className="data-col">{rData.name}</span>
          <span className="data-col">{rData.result[0]}</span>
          <span className="data-col">{rData.result[1]}</span>
          <span className="data-col">{rData.result[2]}</span>
        </div>
      );
    });
    return <div>{dataRow}</div>;
  }
}

