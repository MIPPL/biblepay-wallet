import Base from './Base.dto'

import joi from 'react-native-joi'

class Network extends Base {
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
      data: joi.array().items(joi.object().keys({
        difficulty: joi.number().required()
      }))
    }).options({ allowUnknown: true }), _data)
  }


}

module.exports = Network
