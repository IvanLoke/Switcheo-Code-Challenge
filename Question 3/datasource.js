class Coin {
  //creating a class to hold attributes and methods
  constructor(buy, sell, id, pair, timestamp) {
    this.buy = buy;
    this.sell = sell;
    this.id = id;
    this.pair = pair;
    this.timestamp = timestamp;
  }
  mid() {
    // function that returns the mid point value
    return (this.buy + this.sell) / 200;
  }
  quote() {
    //function that returns the currency code located at back of string
    return this.pair.substr(-3);
  }
}

class Datasource {
  async getPrices() {
    //to use the await method, method must be async
    let response = await fetch("https://interview.switcheo.com/test.json"); // await delays the method call until fetch returns the data
    let dataoutput = await response.json(); //response.json changes data from json to a js object
    let pricesArray = [];
    dataoutput.data.prices.forEach((price) => {
      const exchangePrice = new Coin(
        price.buy,
        price.sell,
        price.id,
        price.pair,
        price.timestamp
      );
      pricesArray.push(exchangePrice);
    });
    return pricesArray;
  }
}

const ds = new Datasource();

ds.getPrices()
  .then((prices) => {
    prices.forEach((price) => {
      console.log(
        `Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
