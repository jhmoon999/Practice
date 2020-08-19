import React from 'react';

class Translator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    const { translations } = this.props;
    return (
      <React.Fragment>
        <div className="controls">
          <div className="input-container">
            <span>input:</span>
            <input type="text" 
                   className="text-input" 
                   data-testid="text-input" 
                   onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="input-container">
            <span>output:</span>
            <input type="text" 
                   className="text-output" 
                   data-testid="text-output" 
                   readOnly 
                   value={translations.get(this.state.value) || ''}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Translator;
