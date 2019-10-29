import axios from 'axios'
import { PAY_STACK_TEST_KEY } from "../config/config";
import { GET_BANKS, UNSUCCESSFUL_REGISTRATION, ACCOUNT_ADDED_SUCCESSFULLY,GET_SAVED_ACCOUNTS } from "./types";

export const getBanks = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('/bank', {}, {
                headers:{
                    'x-access-token': `Bearer ${PAY_STACK_TEST_KEY}`
                }
            })
            console.log(response)
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
            console.log(response)
            if(response.data.success){
                const accounts = await getUserAccount()
                dispatch({type: ACCOUNT_ADDED_SUCCESSFULLY, payload: accounts})
            }
        }catch(error){
            console.log(error.response)
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
            return dispatch({type: GET_SAVED_ACCOUNTS, payload:response.data.bankAccounts})
        }catch(error){
            console.log(error.response)
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