//
import {data} from "browserslist";

export function purchaseCart(userId) {
    return fetch('/api/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userId": userId
        }),
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse and return the response JSON
            } else {
                return response.json().then(data => {
                    const errorMessage = data.error || 'Failed to place order';
                    alert(errorMessage);
                    throw new Error(errorMessage);
                });
            }
        });
}
export const deleteCartItem = (userId, bookId) => {
    return fetch('/api/deleteCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": userId,
            "bookId": bookId
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log("删除购物车成功");
                return true;
            } else {
                throw new Error(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
            throw new Error("删除购物车失败");
        });
};
export const updateCart = (userId, bookId) => {
    return fetch('/api/updateCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": userId,
            "bookId": bookId
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log("ok");
                return true;
            } else {
                throw new Error(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
            throw new Error("更新购物车失败");
        });
};
//
// export const getCartByUserId = (userId) => {
//     return fetch(`/api/getCartById?userId=${userId}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.ok) {
//                 return data.data.map(cart => ({
//                     id: cart.id,
//                     userId: cart.userId,
//                     bookDetailsId: cart.bookDetailsId,
//                     quantity: cart.quantity
//                 }));
//             } else {
//                 throw new Error(data.msg);
//             }
//         })
//         .catch(error => {
//             console.error(error);
//             return null;
//         });
// };
//
