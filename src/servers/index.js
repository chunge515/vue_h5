import $http from '../../utils/http';

export default {
    getData(data) {
        return $http.post('/api/getValue/getValue', data);
    },
    getObjectGroupData(data) {
        return $http.get('/api/getValue/getObjectName', data);
    },
};
