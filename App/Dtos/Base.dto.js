import joi from 'react-native-joi'

export default class Base {
  /**
   * Constructs a base object with the given schema and data.
   *
   * @param {joi.Schema} _schema must not be null, must not be undefined,
   * must be a valid JOI schema.
   *
   * @see https://github.com/hapijs/joi
   *
   * @param {json} _object must not be null, must not be undefined, _object data to match the given
   * JOI schema.
   *
   * @throws TypeError on invalid schema validation.
   * @throws ReferenceError on invalid arguments.
   *
   */
  constructor (_schema, _object) {
    /**
     * A validation flag, which indicates if the current object has a valid data object
     * which matches the given schema.
     *
     * Use {@link Base.hasValidSchema} to verify if a instance is valid.
     * @type {boolean}
     */
    this.valid = false

    /**
     * Holds the current object data. The data must match against the schema.
     * @type {json}
     */
    this.data = _object

    /**
     * Holds the current JOI Schema to match and validate the object data.
     *
     * @see https://github.com/hapijs/joi
     *
     * @type {joi.Schema}
     */
    this.schema = _schema

    this.validate(_schema, _object)
  }

  /**
   * Use this method to validate the given json _object against the given _schema object.
   *
   * @param {joi.Schema} _schema must not be null, must be a valid Joi.Schema to validate the given
   * _object json. Throws ReferenceError on invalid argument.
   *
   * @param {*} _object must not be null, must be an json data which will be validated against
   * the given _schema object. Throws ReferenceError on invalid argument.
   *
   * @throws TypeError on invalid schema validation.
   * @throws ReferenceError on invalid arguments.
   */
  validate (_schema, _object) {
    this.valid = false

    if (!_schema) {
      throw new ReferenceError('Base::validate: Invalid _schema arg. was given.')
    }

    if (!_object) {
      throw new ReferenceError('Base::validate: Invalid _object arg. was given.')
    }

    const result = joi.validate(_object, _schema, null)

    if (result.error === null) {
      this.valid = true
    } else {
      throw new TypeError('Base::validate: Resolved to invalid object schema. ('+result.error+')')
    }
  }

  /**
   * Use this method to verify if the current instance has an valid data object matched against
   * the schema.
   *
   * @returns {boolean} returns true if the given schema validation was successful else false.
   */
  hasValidSchema () { return this.valid }

  /**
   * Use this method to get the data by field.
   *
   * @param {string} field must not be null, must not be undefined, must be a string field,
   * defined by the schema to access the data.
   *
   * @returns {*|null} returns the given data on success else null.
   */
  get (field) {
    if (field === 'data') {
      return this.data
    }

    return field && this.data[field] != null ? this.data[field] : null
  }

  /**
   * Use this method to set an value for a given field. The field
   * must be schema confirm.
   *
   * Any non-schema defined fields will not be set or ignored.
   *
   * @param {string} field must not be null, must be a valid field defined by the current schema.
   *
   * @param {any} value to set the field.
   *
   * @returns {boolean} returns true on success else false.
   *
   * @throws TypeError on invalid object schema validation.
   */
  set (field, value) {
    try {
      this.data[field] = value
      this.validate(this.schema, this.data)
      return true
    } catch (e) {
      /**
       * Remove the assigned field from the data and validate the data against the schema to
       * ensure correctness.
       */
      if (delete this.data[field]) {
        this.validate(this.schema, this.data)
      }

      return false
    }
  }
}
