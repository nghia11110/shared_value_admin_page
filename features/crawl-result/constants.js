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
const NO_INPUT_CRAWL_TARGET_DAYS_ERROR = 'チェックして、crawl-target-daysに入力してください！';
const STAY_NUMBER_TEXT = '宿泊可能人数';
const SMOKING = '禁煙';
const NO_SMOKING = '喫煙';
const SMOKING_STATE = {
  '禁煙': 0,
  '喫煙': 1
};
const WEEKDAY_ARRAY = ['月','火','水','木','金','土','日'];
const PLAN_LIST = {
  '複数プラン': 0,
  '返金不可': 1,
  'キャンセル無料': 2,
};
const PLAN_0 = '複数プラン';
const PLAN_1 = '返金不可';
const PLAN_2 = 'キャンセル無料';

const WEEKLY_COUNT = {
  '1週間以内': 0,
  '2週間以内': 1,
  '3週間以内': 2,
  '1ヶ月以内': 3,
  '3ヶ月以内': 11,
  '3ヶ月以上': 54,
};

module.exports = {
  NAME_MIN,
  NAME_MAX,
  NAME_MIN_ERROR,
  NAME_MAX_ERROR,
  USERNAME_EMAIL_ERROR,
  UPDATE_INFO_SUCCESS_MESSAGE,
  UPDATE_INFO_ERROR_MESSAGE,
  FETCH_INFO_ERROR_MESSAGE,
  NO_INPUT_CRAWL_TARGET_DAYS_ERROR,
  STAY_NUMBER_TEXT,
  SMOKING,
  NO_SMOKING,
  SMOKING_STATE,
  WEEKDAY_ARRAY,
  PLAN_0,
  PLAN_1,
  PLAN_2,
  PLAN_LIST,
  WEEKLY_COUNT,
};
