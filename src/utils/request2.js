import fetch from 'dva/fetch';
import { notification } from 'antd';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request2(url, options) {
    const defaultOptions = {
        credentials: 'include',
    };
    var newOptions = { ...defaultOptions, ...options };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        newOptions.headers = {
            Accept: 'application/json , text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8',
            ...newOptions.headers,
        };
        newOptions.body = JSON.stringify(newOptions.body);
    }
    return fetch(url, newOptions)
        .then(checkStatus)
        .catch((error) => {
            if (error.errorCode) {
                notification.error({
                    message: error.name,
                    description: error.message,
                });
            }
            if ('stack' in error && 'message' in error) {
                notification.error({
                    message: `请求错误: ${url}`,
                    description: error.message,
                });
            }
            return error;
        })
        .then(response => {
            let coType = response.headers.get("content-type");
            if (coType.indexOf('application/json')>0) {
                return response.json(); 
            } else {
                return response.text();
            }
        });
}
