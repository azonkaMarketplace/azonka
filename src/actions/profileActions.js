import { UNSUCCESSFUL_REGISTRATION, UPDATE_ACCOUNT } from "./types";
import axios from "axios";

export const updateUserProfile = userData => {
    const phoneNumber = `${userData.phoneNumber}`
    const data = {...userData, phoneNumber: phoneNumber[0] === '0' ?
         phoneNumber.substr(1, userData.phoneNumber.length - 1): phoneNumber}
    return async (dispatch) => {
        try{
            if(data.newPassword  && data.currentPassword){
                if(data.newPassword.trim() !== '' &&  data.currentPassword.trim() !== ''){
                    axios.all([updatePassword(data), updateProfile(data)])
                    .then(axios.spread(function(response1, response2){
                        if(response1.data.success && response2.data.success){
                            const user = response2.data.user[0]
                            localStorage.setItem('azonta-user', JSON.stringify(user))
                            return dispatch({type: UPDATE_ACCOUNT, payload: {userData: user, 
                                likes: user.likes ? user.likes: [] , cart: user.cart ? user.cart : [] }})
                        }
                        
                    }))
                    .catch(error => {
                        console.log('error', error.response)
                        return dispatch({type:UNSUCCESSFUL_REGISTRATION, payload: error.response.data.message})
                    })
                }
                
            }else{
                axios.all([updateProfile(data)])
                    .then(axios.spread(function(response){
                        const user = response.data.user[0]
                        localStorage.setItem('azonta-user', JSON.stringify(user))
                        dispatch({type: UPDATE_ACCOUNT, payload: {userData: user, 
                            likes: user.likes ? user.likes: [] , cart: user.cart ? user.cart : [] }})
                    }))
                    .catch(error => {
                        console.log('errorr', error.response)
                    })
            }
            dispatch({type: '', payload: ''})
            
        }catch(error){
            console.log('eeror', error.response.data)
            if(error.response.data.status === 404){
                dispatch({
                    type: UNSUCCESSFUL_REGISTRATION, payload:'Not found'
                })
            }
            dispatch({
                type: UNSUCCESSFUL_REGISTRATION, payload:'Some errors were encountered'
            })
        }
    }
}

const updateProfile = data => {
    return axios.put('/api/v1/user/update-my-account', {...data}, {
        headers: {
            'x-access-token': localStorage.getItem('x-access-token')
        }
    })
}

const updatePassword = data => {
    console.log(data.currentPassword, data.newPassword)
    return axios.post('/api/v1/user/change-password', {...data}, {
        headers: {
            'x-access-token': localStorage.getItem('x-access-token')
        }
    })
}