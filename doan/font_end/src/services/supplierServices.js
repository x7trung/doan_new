import axiosClient from "./axiosClient";
const Supplier = {
    getSupplier: (params) => {
        const url = "/supplier/find-all";
        return axiosClient.get(url, { params });
    },
};

export default Supplier;