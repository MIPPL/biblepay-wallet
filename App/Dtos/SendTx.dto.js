import Base from './Base.dto'

import joi from 'react-native-joi'

class SendTx extends Base {
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
      result: joi.string().required(),
    }).options({ allowUnknown: true }), _data)
  }

  /**
   * Use this method to set the user id by providing a value, else the current user id is returned.
   *
   * @param {integer} _val may be null or undefined to get the id, provide _val to set the user id.
   *
   * @returns {boolean|integer}
   * returns true on successfully setting the value or the user id on get.
   *
   * @throws TypeError on invalid object schema validation.
   */
  result (_val) {
    return (_val !== undefined) ? super.set('result', _val) : super.get('result')
  }
}

module.exports = SendTx
