import React from 'react';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringIn: '', 
      stringOut: [],
      enableAppend: false,
      enableUndo: false
    };
  }

  handleChange(e) {
    let temp = e.target.value;
    this.setState({stringIn: temp});
    if (temp.length > 0) {
      this.setState({enableAppend: true})
    }
    else this.setState({enableAppend: false});
  }

  appendString() {
    let temp = this.state.stringOut.slice();
    temp.push(this.state.stringIn);
    this.setState({
      stringIn: '',
      stringOut: temp,
      enableAppend: false,
      enableUndo: true
    });
  }

  undoAppend() {
    let temp = this.state.stringOut.slice();
    if (temp.length > 0) {
      temp.pop();
      this.setState({stringOut: temp});
      if (temp.length === 0) {
        this.setState({enableUndo: false});
      }
    }
  }

  render() {
    let temp = this.state.stringOut.join(' ');
    return (
      <React.Fragment>
        <div className="controls">
          <input className="word-input" 
                 type="text" 
                 data-testid="word-input" 
                 onChange={(e) => this.handleChange(e)}
                 value={this.state.stringIn}
          />
          <button data-testid="append-button" 
                  onClick={(e) => this.appendString()}
                  disabled={!this.state.enableAppend}>
            Append
          </button>
          <button data-testid="undo-button"
                  onClick={(e) => this.undoAppend()}
                  disabled={!this.state.enableUndo}>
            Undo
          </button>
        </div>
        <div className="text-field" data-testid="text-field">
          {temp}
        </div>
      </React.Fragment>
    );
  }
}

export default TextEditor;
