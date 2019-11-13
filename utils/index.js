

export const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
export const guid = () => `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;

/**
 * 睡眠时间
 * 结合ES6的 async await generator
 * @param {number} time
 */
export const sleep = time => new Promise((resolve) => {
    setTimeout(() => {
        resolve(true);
    }, time);
});



// LocalStorage与SessionStorage封装
function StorageSet(storageString) {
    const ms = 'yijiao';
    const storage = window[storageString];

    if (!window[storageString]) {
        // alert("浏览器支持"+storageString);
        return false;
    }

    const init = () => {
        storage.setItem(ms, '{"data":{}}');
    };

    const set = (key, value) => {
        let mydata = storage.getItem(ms);

        if (!mydata) {
            init();
            mydata = storage.getItem(ms);
        }
        mydata = JSON.parse(mydata);
        mydata.data[key] = value;
        storage.setItem(ms, JSON.stringify(mydata));
        return mydata.data;
    };

    const get = (key) => {
        let mydata = storage.getItem(ms);

        if (!mydata) {
            return false;
        }
        mydata = JSON.parse(mydata);

        return mydata.data[key];
    };

    const remove = (key) => {
        let mydata = storage.getItem(ms);

        if (!mydata) {
            return false;
        }

        mydata = JSON.parse(mydata);
        delete mydata.data[key];
        storage.setItem(ms, JSON.stringify(mydata));
        return mydata.data;
    };

    const clear = () => {
        storage.removeItem(ms);
    };

    return {
        set,
        get,
        remove,
        init,
        clear,
    };
}

export const LocalStorage = StorageSet('localStorage');
export const SessionStorage = StorageSet('sessionStorage');

export const isEmpty = (value) => {
    switch (typeof value) {
        case 'undefined':
            return true;
        case 'string':
            if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true;
            break;
        case 'boolean':
            if (!value) return true;
            break;
        case 'number':
            if (value === 0 || isNaN(value)) return true;
            break;
        case 'object':
            if (value === null || value.length === 0) return true;
            for (const key in value) {
                return false;
            }
            return true;
        default:
    }
    return false;
};

export const Precision = (num) => {
    const _precision = 12;
    return Number.parseInt(num.toPrecision(_precision));
};


export const encodeSearchParams = (obj) => {
    const params = [];
    Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
            value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
    });
    return params.join('&');
};



// 判断token是否过期
export const isTokenExpired = () => {
    // 获取本地时间
    // const nowTime = new Date().getTime() / 1000;
    // 获取过期时间
    const ExpireTime = LocalStorage.get('accessTokenExpireTime');
    if (!ExpireTime) {
        return false;
    }
    // 校验本地时间
    // const difftime = 10;
    // 如果 < 10分钟，则说明即将过期
    // return (ExpireTime - nowTime) < difftime * 60;
    return false;
};

// 判断refreshToke是否过期
export const isRefreshTokenExpired = () => {
    // 获取本地时间
    const nowTime = new Date().getTime() / 1000;
    // 获取过期时间
    const ExpireTime = LocalStorage.get('refreshTokenExpireTime');
    if (!ExpireTime) {
        return false;
    }
    return ExpireTime < nowTime;
};
