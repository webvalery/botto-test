function isNull(val) {
  return val === null;
}

function isNotNull(val) {
  return !isNull(val);
}

function isUndefined(val) {
  return val === undefined;
}

function isNotUndefined(val) {
  return !isUndefined(val);
}

function isString(val) {
  return typeof val === 'string';
}

function isNotString(val) {
  return !isString(val);
}

function isArray(val) {
  return Array.isArray(val);
}

function isNotArray(val) {
  return !isArray(val);
}

function isNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val) && isFinite(val);
}

function isNotNumber(val) {
  return !isNumber(val);
}

function isInfinity(value) {
  return value === Infinity || value === -Infinity;
}

function isNotInfinity(value) {
  return !isInfinity(value);
}

function isBoolean(val) {
  return typeof val === 'boolean';
}

function isNotBoolean(val) {
  return !isBoolean(val);
}

function isEmpty(val) {
  return isEmptyString(val)
    || isNan(val)
    || isEmptyArray(val)
    || isEmptyObject(val);
}
function isNotEmpty(val) {
  return !isEmpty(val);
}

function isEmptyString(val) {
  return isString(val) && val === '';
}

function isNan(val) {
  return Number.isNaN(val);
}

function isEmptyArray(val) {
  return isArray(val) && val.length === 0;
}

function isObject(val) {
  return isNotNull(val)
    && isNotUndefined(val)
    && isNotString(val)
    && isNotArray(val)
    && isNotNumber(val)
    && isNotInfinity(val)
    && isNotBoolean(val);
}

function isNotObject(val) {
  return !isObject(val);
}

function isEmptyObject(val) {
  return isObject(val) && Object.keys(val).length === 0;
}

function isNotEmptyObject(val) {
  return isObject(val) && Object.keys(val).length > 0;
}

function isObjectWithFields(object, fields) {
  return isObject(object)
    && fields.every((field) => Object.prototype.hasOwnProperty.call(object, field));
}

const validationRules = {
  isNull,
  isNotNull,
  isUndefined,
  isNotUndefined,
  isString,
  isNotString,
  isArray,
  isNotArray,
  isNumber,
  isNotNumber,
  isInfinity,
  isNotInfinity,
  isBoolean,
  isNotBoolean,
  isEmpty,
  isNotEmpty,
  isEmptyString,
  isNan,
  isEmptyArray,
  isObject,
  isNotObject,
  isEmptyObject,
  isNotEmptyObject,
  isObjectWithFields,
};

export default validationRules;
