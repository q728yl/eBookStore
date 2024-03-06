import {data} from "browserslist";
import {error} from "bfj/src/events";

export function postRequest(url,body,callback){
    let opts ={
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    };
    fetch(url,opts)
        .then(response => response.json())
        .then(data =>{
            callback(data);
        })
        .catch(error =>{
            console.log(error);
        })
}
export function postRequest1(url, body) {
    let opts = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    fetch(url, opts)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
}
