import axiosClient from "./axiosClient";
const Products = {
    getProducts: (params) => {
        const url = "/product/find-all";
        return axiosClient.get(url, { params });
    },
    getProductById: (id) => {
        const url = "/product/find-one/" + id;
        return axiosClient.get(url);
    },
    comment: (id, body) => {
        const url = "/product/comment/" + id;
        return axiosClient.put(url,body);
    },
};

export default Products;