/*
  Autocomplete Debounce
  
  class component {...
  function onChange(e) {
    // do stuff, some api call
  }
  const debouncedOnChange = debounce(onChange, 200);
  
  render() {
    return 
      <input onChange={this.debouncedOnChange} />
  }
  
  }
  
  
  [jjjjjjjjjjjjj ]
  Implement debounce
*/

var debounce = function(callback, time) {
  
  setTimeout(callback, time);
}

/*
    Time traveling stock trader problem. You hav e a time machine and want to know the maximum profit you can make if you went back in time knowing the close prices of MSFT for each day over the last ten years.
    
    You can bring with you any amount of money, but you need to follow these rules each day or else obama's time travel police will find you and put you in a detention camp.
    
    Each day you can do ONE of the following choices:
    
    1. You can buy ONE share of MSFT
    2. You can SELL any number of shares (but no shorting) MSFT
    3. You can do nothing
    
    
    get_profit(prices: int[]):
        returns profit made in optimal case
        
    [1,2,3] -> b, b, s(2) -> profit of 3
    [1,2,3,2] -> b, b, s(2), n -> 3
    [1,2,3,2,5] -> b, b, b, b, s(4) -> profit of 12


*/

// [1,2,3,2,5,1,1,6]
// [1,2,10,1,1,1,1]

var timeTravelStocks = function(prices) {
  
  const buySell = function(start, end) {
    if (start === end) return 0;
    const maxPrice = Math.max(...prices.slice(start, end));
    console.log("price: ", maxPrice);
    const day = prices.indexOf(maxPrice);
    console.log("day: ", day);
    let profit = 0;
    for (let i = start; i < day; i++) {
      profit += maxPrice - prices[i];
    }
    return profit + buySell(day + 1, end);
  }
  return buySell(0, prices.length - 1);
}

const test1 = [1,2,3,2,5];
console.log(timeTravelStocks(test1));