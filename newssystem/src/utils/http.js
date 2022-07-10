import axios from "axios";
import NProgress from "accessible-nprogress";
import {changeLoading} from "../redux/reducers/LoadingReducer";
import {store} from "../redux/store";


let requests = 0;

axios.defaults.baseURL = 'http://localhost:5001'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    store.dispatch(changeLoading())
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch(changeLoading())
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
