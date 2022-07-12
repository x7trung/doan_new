import axiosClient from "./axiosClient";
const Products = {
    getProducts: (params) => {
        const url = "/product/find-all";
        return axiosClient.get(url, { params });
    },
    uploadImages: (id, body) => {
        const url = `/product/upload-image/${id}`;
        return axiosClient.put(url, body);
    },
    createProduct: (body) => {
        const url = `/product/create`;
        return axiosClient.post(url, body);
    },

};

export default Products;