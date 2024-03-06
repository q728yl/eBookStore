import {error} from "bfj/src/events";
import axios from "axios";

export const getBooksList = (callback) => {
    fetch("/api/getList")
        .then(response => response.json())
        .then(data => {
            // 在这里处理返回的数据，将书籍列表传递给回调函数
            callback(data["Books"]);
        })
        .catch(error => console.error(error));
}
export const graphqlGetBookByTitle = async (url, query, callback) => {
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
    }
    await fetch(url, opts)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function AddBook(title, author, ibsn, image, description, rating, quantity, in_stock, price, tag) {
    return fetch('/api/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "author": author,
            "IBSN": ibsn,
            "image": image,
            "description": description,
            "rating": rating,
            "quantity": quantity,
            "in_stock": in_stock,
            "price": price,
            "tag": tag
        }),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Failed to add book');
        })
        .then(data => {
            console.log('add succeed:', data);
            return 'Add book succeed!';
        })
        .catch(error => {
            console.error('Error:', error);
            throw new Error(error.message);
        });
}
// export const getBookTagWordCount= (callback) => {
//     fetch("/api/getBookWordCount")
//         .then(response => response.json())
//         .then(data => {
//             // 在这里处理返回的数据，将书籍列表传递给回调函数
//             callback(data["data"]);
//             // alert(data)
//         })
//         .catch(error => console.error(error));
// }
export const getAuthorByBookName = async (bookName) => {
    try {
        // 发送 GET 请求到后端 API 来获取作者信息
        const response = await fetch(`http://localhost:8099/microservice/findAuthorByBookName/${bookName}`);
        if (!response.ok) {
            console.log("error");
            return null; // 或者返回适当的错误信息
        }
        const data = await response.json();
        if (data.ok && data.data) {
            const author = data.data;
            console.log("Author:", author);
            return author;
        } else {
            alert("该书不存在")
            console.log("No data or invalid response");
            return null; // 或者返回适当的错误信息
        }
    } catch (error) {
        console.error("Error:", error);
        return null; // 或者返回适当的错误信息
    }
};
export const getBooksListByTag = (tagName, callback) => {
    // axios.post('/api/neo4j')
    //     .then(response => {
    //         console.log('neo4j succeed:', response);
    //     })
    //     .catch(error => {
    //         console.error('Error init:', error);
    //     });
    axios.post('/api/getBookByType', {tagName})
        .then(response => {
            const bookList = response.data.Books;
            console.log('neo4j succeed11:', response);
            callback(bookList);
        })
        .catch(error => {
            console.error('Error fetching book list:', error);
        });
};

export const getBooksListByTitle = async (searchTermTitle, callback) => {
    const graphqlQuery = {
        query: `
      query($title: String!) {
  bookByTitle(title: $title) {
    id
    title
    IBSN
    author
    tag
    description
    price
    rating
    in_stock
    quantity
    image
  }
}`,
        variables: {
            title: searchTermTitle,
        },
    };

    try {
        const response = await fetch('/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(graphqlQuery),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.json();
        console.log(responseData.data.bookByTitle);
        callback(responseData.data.bookByTitle);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }


};

export function UpdateBook(bookId, title, author, ibsn, image, description, rating, quantity, in_stock, price, tag) {

    return fetch('/api/updateBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "bookId": bookId,
            "title": title,
            "author": author,
            "IBSN": ibsn,
            "image": image,
            "description": description,
            "rating": rating,
            "quantity": quantity,
            "in_stock": in_stock,
            "price": price,
            "tag": tag
        }),
    })

}