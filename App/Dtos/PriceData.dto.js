import Base from './Base.dto'

import joi from 'react-native-joi'

class PriceData extends Base {
  /**
   * Constructs a user object by the given data.
   *
   * @param {json} _data must not be null, must not be empty, must not be undefined.
   * Must match the given User schema.
   *
   * @throws TypeError is thrown if the given _data object does not match the User schema.
   * @throws ReferenceError is thrown if the given arguments are null or invalid.
   *
   */
  constructor (_data) {
    super(joi.object().keys({
      BTCUSD: joi.number().required(),
      BBPUSD: joi.number().required(),
      BBPBTC: joi.string().required(),
    }).options({ allowUnknown: true }), _data)
  }
}

module.exports = PriceData
