import axiosClient from "./axiosClient";
const User = {
    getUsers: () => {
        const url = "user/find-all";
        return axiosClient.get(url);
    },
    uploadImages: (id, body) => {
        const url = `user/upload-image/${id}`;
        return axiosClient.put(url, body);
    },
    createUser: (body) => {
        const url = `/user/create`;
        return axiosClient.post(url, body);
    },

};

export default User;