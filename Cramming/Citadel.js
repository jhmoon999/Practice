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
  
*/

// https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1

const debounce = (fn, time) => {
    let timeout;
  
    return function() {
      const functionCall = () => fn.apply(this, arguments);
      
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }

//   Create a wrapper function with two arguments: a callback and an integer for the timeout— this will hold the state of the timeout. Note that the wrapper function will only be called once, when the wrapper function is referenced.
//   Declare the timeout variable, which will be undefined until the timeout is set in the returned function.
//   Return a function — this will be called every time the function is called. Make sure that the function returned is not an arrow function, as you will lose context.
//   Apply this context to callback function, and attach arguments.
//   clearTimeout if timeout exists.
//   setTimeout and pass the applied function.
//   This way, the clearTimeout resets the timeout each time the function is called, and if the function is not called within the time provided, then it will finally fire the function.
//   Using the function would look like this:
//   window.addEventListener('keyup', debounce((e) => {
//     console.log(e);
//   }, 1000));
//   The first argument being passed is the event handler, and the second is the amount of time in milliseconds that we would consider an element “inactive” after the last event is fired.

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