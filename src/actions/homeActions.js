import { FETCH_USER } from "./types";

export const fetchUser = () => {
    const user = localStorage.getItem('azonta-user')
    const likes = 0
    const cart = 0
    let userData = null
    let anonynmousUser = {}

    //if there is no authenticated user, check if there is userdata stored in localstorage
    //this enables user to carry out operation without registering or logging
    if(!user)
        anonynmousUser = localStorage.getItem('anonynmous-azonta-user')
    //if there is an authenticated user get the cart and the likes  
    if(user){
        cart = user.cart
        likes = user.cart
        userData = user;
    }
    // if there is no authenticated user, get the user data for anonynmous user from localstorage
    else if(anonynmousUser){
        cart = anonynmousUser.cart
        likes = anonynmousUser.cart
        userData = anonynmousUser;
    }

    

    return {type: FETCH_USER, payload: {userData, likes, cart}}
}