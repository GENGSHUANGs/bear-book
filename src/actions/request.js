import Taro from '@tarojs/taro';

const codes = {};

const baseUrl = 'https://xxxx';

export const DEFAULT_CHECK_MIDWARE = (url, resp) => {
  console.log(url, resp);
  const { statusCode, errMsg, data } = resp;
  if (statusCode !== 200) {
    throw new Error(errMsg);
  }
  const { code, message, data: ret_data } = data;
  if (code !== 0) {
    const localizedMessage = codes[String(code)];
    const err = new Error(`${message}(${localizedMessage})`);
    err.localizedMessage = localizedMessage;
    err.code = code;
    err.data = ret_data;
    throw err;
  }
  return resp;
};

export async function isTokenEmpty() {
  const userid = await Taro.getStorageSync('_whale_app_user_id');
  const usertoken = await Taro.getStorageSync('_whale_app_user_token');
  return !userid || usertoken;
}

async function request(url, options, checkMidware = DEFAULT_CHECK_MIDWARE) {
  const userid = await Taro.getStorageSync('_whale_app_user_id');
  const usertoken = await Taro.getStorageSync('_whale_app_user_token');
  const resp = await Taro.request({
    method: 'POST',
    dataType: 'json',
    url: url.charAt(0) === '/' ? `${baseUrl}${url}` : url,
    ...(options || {}),
    header: {
      userid,
      usertoken,
      ...((options || {}).header || {}),
    },
  });
  checkMidware && (await checkMidware(url, resp));
  return resp.data;
}

export default request;

export async function post(url, options = {}, checkMidware) {
  return await request(url, { method: 'POST', ...options }, checkMidware);
}
