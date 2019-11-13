import { Loading } from 'element-ui';

let needLoadingRequestCount = 0;
let loading;
function startLoading(config) {
    loading = Loading.service({
        target: '.content',
        lock: true,
        spinner: 'el-icon-loading',
        text: config.text || '正在努力加载页面...',
        background: 'rgba(255, 255, 255, 0.8)',
    });
}
function endLoading() {
    loading.close();
}

export function showFullScreenLoading(config) {
    if (needLoadingRequestCount === 0) {
        startLoading(config);
    }
    needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
}
