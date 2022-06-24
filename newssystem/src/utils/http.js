import axios from "axios";
import NProgress from "accessible-nprogress";

axios.defaults.baseURL = 'http://localhost:5001'

let requests = 0;
axios.interceptors.request.use(function (config) {
    if (requests === 0) {
        NProgress.start();
    }
    requests++;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    requests--;
    if (requests === 0) {
        NProgress.done();
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});