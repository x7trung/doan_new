import axiosClient from "./axiosClient";
const Users = {
    getUser: (id) => {
        const url = "/user/find-one/" + id;
        return axiosClient.get(url);
    },
    updateUser: (id, body) => {
        const url = "/user/update/" + id;
        return axiosClient.put(url, body);
    },
    addToCart: (id, body) => {
        const url = "/user/add-to-cart/" + id;
        return axiosClient.put(url, body);
    },
    incCart: (id, body) => {
        const url = "user/inc-to-cart/" + id;
        return axiosClient.put(url, body);
    },
    decCart: (id, body) => {
        const url = "user/dec-to-cart/" + id;
        return axiosClient.put(url, body);
    },
    removeCart: (id, body) => {
        const url = "user/delete-to-cart/" + id;
        return axiosClient.put(url, body);
    },
    deleteAllCart: (id) => {
        const url = "user/remove-all-cart/" + id;
        return axiosClient.delete(url);
    },
    order: (id, body) => {
        const url = "oder/create/" + id;
        return axiosClient.post(url, body);
    },
    addToLike: (id, body) => {
        const url = "user/increase-like/" + id;
        return axiosClient.put(url, body);
    },
    removeFromLike: (id, body) => {
        const url = "user/decrease-like/" + id;
        return axiosClient.put(url, body);
    },
    cancelOrders: (id, body) => {
        const url = "oder/update/" + id;
        return axiosClient.put(url, body);
    },
};

export default Users;