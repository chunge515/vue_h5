import axios from 'axios';
import { Message } from 'element-ui';
import { LocalStorage, isEmpty, encodeSearchParams } from './index';
import { tryHideFullScreenLoading, showFullScreenLoading } from './pageLoading';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

let URL_PREFIX = location.origin;

const $ = axios.create({
    baseURL: URL_PREFIX,
    timeout: 15000,
});

window.$axios = $;

// 请求拦截器
$.interceptors.request.use((config) => {
    // debugger
    const token = LocalStorage.get('token');
    if (config.showLoading) {
        showFullScreenLoading(config);
    }
    config.headers = {
        'Content-Type': 'application/json',
    };
    if (token !== '' && token !== undefined && token) {
        config.headers.token = token;
    }
    return config;
}, error => Promise.reject(error));

// 响应拦截器
$.interceptors.response.use((response) => {

    if (response.config.showLoading) {
        tryHideFullScreenLoading();
    }
    if (response.data.code !== '200') {
        Message.error(response.data.msg ? response.data.msg : '请求错误,请重试');
        return
    }
    return response.data;
}, (error) => {
    tryHideFullScreenLoading();
    Message.error('服务器错误');
    return Promise.reject(error);
});

export default {
    request: (interfaceConfig, data, config) => {
        if (config === undefined) {
            config = { showLoading: false };
        }
        /**
         * @todo 异常时需进一步提示
         */
        if (interfaceConfig.method === undefined || interfaceConfig.path === undefined) {
            return;
        }
        if (interfaceConfig.method === 'post') {
            return $.post(interfaceConfig.path, data, config);
        }
        let pathUrl = '';
        if (isEmpty(data)) {
            pathUrl = interfaceConfig.path;
        } else {
            if (isEmpty(data)) {
                pathUrl = interfaceConfig.path;
            } else {
                pathUrl = `${interfaceConfig.path}?${encodeSearchParams(data)}`;
            }
            return $.get(pathUrl, config);
        }
        return $.get(pathUrl, config);
    },
    post: (url, data, config) => {
        if (config === undefined) {
            config = { showLoading: false };
        }
        return $.post(url, data, config);
    },
    get: (url, data = {}, config) => {
        if (config === undefined) {
            config = { showLoading: false };
        }
        let pathUrl = '';
        if (isEmpty(data)) {
            pathUrl = url;
        } else {
            pathUrl = `${url}?${encodeSearchParams(data)}`;
        }
        return $.get(pathUrl, config);
    },
};
