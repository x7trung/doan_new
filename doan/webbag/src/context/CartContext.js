import { createContext, useReducer, useContext, useEffect } from "react";
import { cartReducer } from "../reducer/cartReducer";
import Users from "../services/userServices";
import { AuthContext } from "../context/AuthContext";
import Toast from "../components/Toast";
import { LOCAL_STORAGE_CART_KEY } from "../constant/constant";

export const CartContext = createContext();

const initialCart = {
    cart: [],
    total: 0,
    amount: 0,
    cartIdChecked: [],
    totalCart: 0,
};

const CartProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [cartState, dispatch] = useReducer(cartReducer, initialCart);

    const getCart = () => {
        if (auth.id)
            Users.getUser(auth.id)
                .then((data) => {

                    dispatch({
                        type: "GET_CART",
                        payload: data?.data.cart,
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });

    };
    useEffect(() => {
        getCart();
    }, [auth]);

    const totalCart = (idArr) => {
        dispatch({ type: "TOTAL_PRICE_CART", payload: idArr });
    };
    const payment = (idArr) => {
        dispatch({ type: "PAYMENT", payload: idArr });
    };
    useEffect(() => {
        dispatch({ type: "CHANGE_AMOUNT" });
        dispatch({ type: "TOTAL_PRICE" });
    }, [cartState.cart]);

    const setCart = (cart) => {
        dispatch({ type: "SET_CART", payload: cart });
    };

    const addToCart = async (id, item) => {
        console.log(item)
        try {
            if (!id) { Toast("warn", "bạn phải đăng nhập"); return }
            const data = await Users.addToCart(auth.id, item);
            dispatch({
                type: "ADD_TO_CART_SUCCESS",
                payload: item,
            });


            Toast("success", "Thêm vào giỏ hàng thành công");
        } catch (error) {
            Toast("error", error.message);
        }
    };

    const removeFromCart = async (item, toast) => {
        try {

            await Users.removeCart(auth.id, item);
            dispatch({ type: "REMOVE_FROM_CART", payload: item });
            if (toast !== "noToast")
                Toast("success", "Xóa khỏi giỏ hàng thành công");

        } catch (error) {
            Toast("error", error.message);
        }
    };

    const increaseQuantity = async (item) => {
        try {

            await Users.incCart(auth.id, item);
            dispatch({ type: "INCREASE_QUANTITY", payload: item });

        } catch (error) {
            Toast("error", error.message);
        }
    };

    const decreaseQuantity = async (item) => {
        try {
            await Users.decCart(auth.id, item);
            dispatch({ type: "DECREASE_QUANTITY", payload: item });
        } catch (error) {
            Toast("error", error.message);
        }
    };
    const removeAllCart = async () => {
        try {
            await Users.deleteAllCart(auth.id);
            dispatch({ type: "REMOVE_ALL_CART" });
        } catch (error) {
            Toast("error", error.message);
        }
    };

    const logOut = () => {
        dispatch({ type: "LOG_OUT" });
    };

    return (
        <CartContext.Provider
            value={{
                cartState,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                totalCart,
                logOut,
                payment,
                removeAllCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;