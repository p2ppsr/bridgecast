# bridgecast

Notify Bridgeport bridges about new transactions

The code is hosted [on GitHub](https://github.com/p2ppsr/bridgecast) and the package is available [through NPM](https://www.npmjs.com/package/bridgecast).

## Installation

    npm i bridgecast

## Example Usage

```js
const bridgecast = require('bridgecast')

const acceptingBridges = await bridgecast({
  tx: { // An Everett-stype Transaction Envelope
    rawTx: '...',
    inputs: {
      '...': '...'
    },
    mapiResponses: [{'...': '...'}]
  },
  bridges: [
    '...', // Bridge ID 1
    '...' // Bridge ID 2
  ]
})

// acceptingBridges is now an array of the bridge IDs that have processed the transaction
console.log(acceptingBridges)
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [bridgecast](#bridgecast)
    *   [Parameters](#parameters)

### bridgecast

Notify Bridgeport bridges about new transactions

#### Parameters

*   `obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** All parameters are provided in an object (optional, default `{}`)

    *   `obj.bridges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** The array of Bridge IDs to notify (optional, default `[]`)
    *   `obj.tx` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An Everett-style transaction envelope

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>>** Bridge IDs that accepted the transaction

## License

The license for the code in this repository is the Open BSV License.