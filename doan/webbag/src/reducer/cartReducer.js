import { v4 as uuidv4 } from 'uuid'
export const cartReducer = (state, action) => {
    switch (action.type) {
        case "GET_CART":
            return {
                ...state,
                cart: action.payload.map(i => { return { ...i, id: uuidv4() } }),
            };
        case "SET_CART":
            return {
                ...state,
                cart: action.payload,
            };
        case "ADD_TO_CART_SUCCESS":
            if (state.cart.find(i => i.product_id == action.payload.product_id && i.product_color == action.payload.product_color)) {
                return {
                    ...state, cart: state.cart.map(i => {
                        if (i.product_id == action.payload.product_id && i.product_color == action.payload.product_color) {
                            return { ...i, product_quantity: i.product_quantity + action.payload.product_quantity }
                        } else return i
                    })
                }
            } else {
                return { ...state, cart: [...state.cart, { ...action.payload, id: uuidv4() }] }
            }

        case "REMOVE_FROM_CART":

            return {
                ...state,
                cart: state.cart.filter((item) => !(item.product_id == action.payload.product_id && item.product_color == action.payload.product_color)),
            };
        case "INCREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) => {
                    if (item.product_id === action.payload.product_id && item.product_color == action.payload.product_color) {
                        return {
                            ...item,
                            product_quantity: item.product_quantity + 1,
                        };
                    }
                    return item;
                }),

            };
        case "DECREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart
                    .map((item) => {
                        if (item.product_id === action.payload.product_id && item.product_color == action.payload.product_color) {
                            return {
                                ...item,
                                product_quantity: item.product_quantity - 1,
                            };
                        }
                        return item;
                    })
                    .filter((item) => item.product_quantity > 0),
            };
        case "TOTAL_PRICE":
            return {
                ...state,
                total: state.cart ? state.cart.reduce(
                    (total, item) => total + item.product_quantity * item.product_price,
                    0
                ) : 0,
            };
        case "TOTAL_PRICE_CART":
            return {
                ...state,
                totalCart: state.cart
                    .filter((item) => action.payload.includes(item.id))
                    .reduce(
                        (total, item) => total + item.product_quantity * item.product_price,
                        0
                    ),
                cartIdChecked: action.payload,
            };
        case "CHANGE_AMOUNT":
            return {
                ...state,
                amount: state.cart ? state.cart.length : 0,
            };
        case "PAYMENT":
            return {
                ...state
                , cart: state.cart.filter((item) => !action.payload.includes(item.id)), total: state.cart ? state.cart.reduce(
                    (total, item) => total + item.product_quantity * item.product_price,
                    0
                ) : 0,
                amount: state.cart ? state.cart.length : 0,
                cartIdChecked: [],
                totalCart: 0
            };
        case "REMOVE_ALL_CART":
            return {
                ...state
                , cart: [],
                amount: 0,
                cartIdChecked: [],
                totalCart: 0
            };
        case "LOG_OUT":
            return {
                cart: [],
                total: 0,
                amount: 0,
                cartIdChecked: [],
                totalCart: 0,
            };
        default:
            return state;
    }
};