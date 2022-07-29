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
    updateProduct: (msp, body) => {
        const url = `/product/update/${msp}`;
        return axiosClient.put(url, body);
    },
    createProduct: (body) => {
        const url = `/product/create`;
        return axiosClient.post(url, body);
    },
    getTotal: (body) => {
        const url = `/product/find-total`;
        return axiosClient.post(url, body);
    },
    deleteProduct: (id) => {
        const url = `/product/delete/${id}`;
        return axiosClient.delete(url);
    },

};

export default Products;