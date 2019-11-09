import axios from 'axios'
import { GET_BANKS, UNSUCCESSFUL_REGISTRATION,UNAUTHORIZED_USER, ACCOUNT_ADDED_SUCCESSFULLY,GET_SAVED_ACCOUNTS } from "./types";

export const getBanks = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('https://api.paystack.co/bank' )
            dispatch({type: GET_BANKS, payload: response.data.data})
        }catch(error){
            console.log('error in: => ', error.response)
        }
    }
}

export const saveBank = (details) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/user/bank-account/create', {
                                ...details}, {
                                    headers:{
                                'x-access-token': localStorage.getItem('x-access-token')
                            }})
            if(response.data.success){
                const accounts = await getUserAccount()
                dispatch({type: ACCOUNT_ADDED_SUCCESSFULLY, payload: accounts})
            }
        }catch(error){
            if(error.response.status === 401){
               return  dispatch({type:UNAUTHORIZED_USER, payload: 'Account deactivated, please contact admininstrator' })
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encounterd'})
        }
    }
}

export const getSavedBanks = (lastCount = 0, numOfRecords = 10) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`/api/v1/user/bank-account/get/${lastCount}/${numOfRecords}`, {
                                    headers:{
                                        'x-access-token': localStorage.getItem('x-access-token')
                                    }
                                })
            console.log('banksssssss')
            return dispatch({type: GET_SAVED_ACCOUNTS, payload:response.data.bankAccounts})
        }catch(error){
            console.log('called o')
            if(error.response.status === 401){
              return  dispatch({type:UNAUTHORIZED_USER, payload: 'Account deactivated, please contact admininstrator' })
            }
            dispatch({type: UNSUCCESSFUL_REGISTRATION, payload: 'Some errors were encounterd'})
        }
    }
}

const getUserAccount = async (lastCount = 0, numOfRecords = 10) => {
    try{
        const response = await axios.get(`/api/v1/user/bank-account/get/${lastCount}/${numOfRecords}`, {
                                headers:{
                                    'x-access-token': localStorage.getItem('x-access-token')
                                }
                            })
        return response.data.bankAccounts
    }catch(error){
        console.log(error.response)
    }
}