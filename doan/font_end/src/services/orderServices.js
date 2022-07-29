import axiosClient from "./axiosClient";
const Orders = {
    getOrders: (params) => {
        const url = "/oder/find-all";
        return axiosClient.get(url, { params });
    },
    updateOrders: (id, body) => {
        const url = "/oder/update/" + id;
        return axiosClient.put(url, body);
    },
};

export default Orders;