import axiosClient from "./axiosClient";
const Orders = {
    getOrders: () => {
        const url = "/oder/find-all";
        return axiosClient.get(url);
    },


};

export default Orders;