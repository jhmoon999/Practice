import React from 'react';

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageData: {
        data: []
      }
    }
  }

  getPageData(page) {
    this.setState({currentPage: page});
    fetch(`https://jsonmock.hackerrank.com/api/articles?page=${page}`)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log('result: ', result);
          this.setState({pageData: result});
        },
        (error) => {
          console.log('error: ', error);
        }
      )
  }

  componentDidMount() {
    this.getPageData(this.state.currentPage);
  }

  render() {
    const {total_pages, data} = this.state.pageData;
    const pageButtons = [], dataTitles = [];
    for (let i = 1; i <= total_pages; i++) {
      pageButtons.push(<button data-testid="page-button" 
                               key={`page-button${i}`} 
                               onClick={() => this.getPageData(i)}>
                          {i}
                       </button>)
    }
    for (let i = 0; i < data.length; i++) {
      let temp = data[i].title;
      if (temp !== '' && temp !== null) {
        dataTitles.push(<li key={`title-${i}`} 
                            data-testid="result-row">
                          {temp}
                        </li>)
      }
    }
    return (
      <React.Fragment>
        <div className="pagination">
          {pageButtons}
        </div>
        <ul className="results">
          {dataTitles}
        </ul>
      </React.Fragment>
    );
  }
}

export default Articles;
