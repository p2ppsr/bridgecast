const parapet = require('parapet-js')
const boomerang = require('boomerang-http')

/**
 * Notify Bridgeport bridges about new transactions
 *
 * @param {Object} obj All parameters are provided in an object
 * @param {Array<String>} obj.bridges The array of Bridge IDs to notify
 * @param {Object} obj.tx An Everett-style transaction envelope
 * @param {array<string>} obj.bridgeportResolvers The BHRP resolvers used when broadcasting the transaction
 *
 * @returns {Promise<Array<String>>} Bridge IDs that accepted the transaction
 */
const bridgecast = async ({ bridges = [], tx, bridgeportResolvers } = {}) => {
  const broadcastURLs = {}

  // For each bridge that accepted the tx, look up other BHRP nodes
  for (const bridge of bridges) {
    const nodes = await parapet({
      bridge: '1TW5ogeDZyvq5q7tEjpNcBmJWsmQk7AeQ', // BHRP
      resolvers: bridgeportResolvers,
      request: {
        type: 'json-query',
        query: {
          v: 3,
          q: {
            collection: 'bridges',
            find: {
              bridge
            },
            project: {
              URL: 1
            }
          }
        }
      }
    })
    for (const node of nodes) {
      broadcastURLs[`${node.URL}/processTransaction`] = 1
    }
  }

  const acceptingBridges = {}

  // Send the transaction to each of the bridges
  for (const broadcastURL of Object.keys(broadcastURLs)) {
    try {
      const result = await boomerang(
        'POST',
        broadcastURL,
        {
          ...tx,
          bridges
        }
      )
      result.acceptingBridges.forEach(x => (acceptingBridges[x] = 1))
    } catch (e) { /* not our problem */ }
  }
  return Object.keys(acceptingBridges)
}

module.exports = bridgecast
