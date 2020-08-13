import api from "./api";
import { time } from "console";

export async function login() {
    const timestamp = Date.now()/1000;
    await api.post('login', {}).then(({data}) => {
        localStorage.setItem('token', JSON.stringify({ 
            token: data.access_token,
            expires_in: data.expires_in,
            created_at: timestamp
        }));
    });
};

export async function logout() {
    await api.post('logout', {}).then(() => {

        localStorage.removeItem('token');
    });
};

export function isLoggedIn() {
    const timestamp = Date.now()/1000;
    const token = localStorage.getItem('token');
    if(token == null) {
        return false;
    }

    const tokenPayload = JSON.parse(token);
    if((timestamp - tokenPayload.created_at) <= tokenPayload.expires_in)
    {
        
        return true;
    }
    return true;
}

export async function getAccessToken() {
    
    if(!isLoggedIn()){
        await login();
    }

    const token = localStorage.getItem('token');
    if(token == null) {
        return false;
    }
    const tokenPayload = JSON.parse(token);

    return tokenPayload.token;
}