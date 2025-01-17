const NAME_MIN = 3;
const NAME_MAX = 60;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type serverd by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR

const NAME_MIN_ERROR = `String length must be at least ${NAME_MIN} characters long`;
const NAME_MAX_ERROR = `String length must be less than or equal to ${NAME_MAX} characters long`;
const USERNAME_EMAIL_ERROR = 'Email must be a valid email address';
const UPDATE_INFO_SUCCESS_MESSAGE = 'Successfully updated.';
const UPDATE_INFO_ERROR_MESSAGE = 'Could not save your information';
const FETCH_INFO_ERROR_MESSAGE = 'Could not fetch information';
const NO_INPUT_ERROR = '入力したデータが足りません！';

module.exports = {
  NAME_MIN,
  NAME_MAX,
  NAME_MIN_ERROR,
  NAME_MAX_ERROR,
  USERNAME_EMAIL_ERROR,
  UPDATE_INFO_SUCCESS_MESSAGE,
  UPDATE_INFO_ERROR_MESSAGE,
  FETCH_INFO_ERROR_MESSAGE,
  NO_INPUT_ERROR,
};
