import { LOCAL_STORAGE_USER_KEY } from "../constant/constant";
import axiosClient from "./axiosClient";
import Toast from "../components/Toast";
import axios from "axios";
const Auth = {
    login: (body) => {
        const url = "http://localhost:5000/auth/login";
        return axios.post(url, body);
    },
    logout: () => {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);


    },
    register: (body) => {
        const url = "http://localhost:5000/auth/register";
        return axios.post(url, body);
    },
    changePassword: (id, body) => {
        const url = "/auth/changepassword/" + id;
        return axiosClient.put(url, body);
    },
    sendEmail: (body) => {
        const url = "/auth/forgotpassword";
        return axios.post(url, body);
    },
    checkOtp: (body) => {
        const url = "/auth/checkotp";
        return axios.post(url, body);
    },
    resetPassword: (body) => {
        const url = "/auth/resetpassword";
        return axios.put(url, body);
    },
    googleLogin: (body) => {
        const url = "/auth/google_login";
        return axios.post(url, body).then((response) => response.data);
    },
    facebookLogin: (body) => {
        const url = "/auth/facebook_login";
        return axios.post(url, body).then((response) => response.data);
    },
};

export default Auth;