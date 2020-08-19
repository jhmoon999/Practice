import React from 'react';

class CycleCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  handleClick(e) {
    let temp = this.state.count + 1;
    if (temp >= this.props.cycle) temp = 0;
    this.setState({count: temp})
  }

  render() {
    return (
      <button
        data-testid="cycle-counter"
        style={{ fontSize: '1rem', width: 120, height: 30, }}
        onClick={(e) => this.handleClick(e)}
      >{this.state.count}</button>
    );
  }
}

export default CycleCounter;
