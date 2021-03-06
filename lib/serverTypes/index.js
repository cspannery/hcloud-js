const snakeCase = require('snake-case')
const ServerType = require('./serverType')
const ServerTypeList = require('./serverTypeList')

class ServerTypesEndpoint {
  constructor (client) {
    this.client = client
  }

  async list (params) {
    const snakeCaseParams = {}
    if (params) {
      Object.keys(params).forEach(key => {
        snakeCaseParams[snakeCase(key)] = params[key]
      })
    }

    const response = await this.client.axios({
      url: '/server_types',
      method: 'GET',
      params: snakeCaseParams
    })

    // Make new ServerType objects
    const serverTypes = []
    response.data.server_types.forEach(serverType => serverTypes.push(new ServerType(serverType)))

    // Return a list
    const meta = response.data.meta
    return new ServerTypeList(this, params, meta, serverTypes)
  }

  async get (id) {
    const response = await this.client.axios({
      url: '/server_types/' + id,
      method: 'GET'
    })

    // Return new ServerType instance
    return new ServerType(response.data.server_type)
  }
}

module.exports = ServerTypesEndpoint
