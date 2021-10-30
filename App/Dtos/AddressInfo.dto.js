import Base from './Base.dto'

import joi from 'react-native-joi'

class Address extends Base {
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
      address: joi.string().required(),
      balance: joi.string().required(),
      unconfirmedBalance: joi.string().required(),
      transactions: joi.array().items(joi.object().keys({
        confirmations: joi.number().integer().required()
      }))
    }).options({ allowUnknown: true }), _data)
  }

  address (_val) {
    return (_val !== undefined) ? super.set('address', _val) : super.get('address')
  }

  transactions (_val) {
    return (_val !== undefined) ? super.set('transactions', _val) : super.get('transactions')
  }

  balance (_val) {
    return (_val !== undefined) ? super.set('balance', _val) : super.get('balance')
  }

  unconfirmedBalance (_val) {
    return (_val !== undefined) ? super.set('unconfirmedBalance', _val) : super.get('unconfirmedBalance')
  }
}

module.exports = Address
