
import axios from "axios";

export const SendApiGetSiteData = ()=>{
    return axios.get("http://49.12.193.231:8000/api/get_site_data");
}

export const SendApiContact = (name, email, message)=>{
   return axios.get("http://49.12.193.231:8000/api/contact_us", { params: { name: name, email: email, message: message} });
}

export const SendApiNewsLetter = (email)=>{
    return axios.get("http://49.12.193.231:8000/api/newsletter", { params : {email: email} });
}

export const SendApiConnectWallet = (address, type) =>{
    return axios.get("http://49.12.193.231:8000/api/connect_wallet", { params: {address: address, wallet_type: type} });
}

export const SendApiVerifyTwitter = (tweet_url, address) =>{
    return axios.get("http://49.12.193.231:8000/api/verify_twitter", {params: {tweet_url: tweet_url, address: address } });
}

export const SendApiCheckTwitter = ( tweet_url, address, invitedId="") =>{
    return axios.get("http://49.12.193.231:8000/api/check_twitter", { params: {tweet_url: tweet_url, address: address, invitedId: invitedId } });
}

export const SendApiRegisterInvitedUser = (user, friend) => {
    return axios.get("http://49.12.193.231:8000/api/set_relation", {params: {user: user, friend: friend}});
}


export const SendApiRefferals = (index , address ) =>{ 
    return axios.get("http://49.12.193.231:8000/api/request_withdrawal", {params: {index: index, address: address}})
}


