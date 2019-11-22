import { ERROR_FETCHING_ITEMS, ITEMS_FETCHED_SUCCESSFULLY, STOP_LOADING, SUCCESS_ALERT, DISPLAY_ERROR } from "./types";
import {fileUpload} from "../components/util/FileUploader";
import async from 'async';
import axios from 'axios';

export const _initUploadPage = () => {
    return (dispatch) => {
        async.parallel({
            categories: function(callback){
                 axios.get('/api/v1/category/get-categories/0/0')
                        .then(response => {
                            const {data: {categories}} = response;
                            callback(null, categories)
                        })
                        .catch(error => {
                            callback(error, null)
                        }) 
                
            },
            subCategories:  function(callback) {
                axios.get('/api/v1/sub-category/get-sub-categories/0/0')
                    .then(response => {
                        const {data: {subCategories}} = response;
                        callback(null, subCategories)
                    })
                    .catch(error => {
                        callback(error, null)
                    })
                
            },
            stores: function(callback){
                axios.get('/api/v1/seller/store/get-stores/0/100', {
                    headers: {
                        'x-access-token': localStorage.getItem('x-access-token')
                    }
                })
                    .then(response => {
                        const {data: {stores}} = response;
                        callback(null, stores)
                    })
                    .catch(error => {
                        callback(error, null)
                    })
            }
        }, function(err, results){
            if(err){
                dispatch({type: ERROR_FETCHING_ITEMS, payload: ''})
                 return dispatch({type: STOP_LOADING, payload:''})
            }
            dispatch({type: STOP_LOADING, payload: ''})
            return dispatch({type: ITEMS_FETCHED_SUCCESSFULLY, payload: results})
        })
    }
}

export const createItem = (data) => {
    return async (dispatch) => {
        try{
            let response = null
            const mainImageResponse = await fileUpload(data.files[data.mainImageIndex],'storeItems')
            const mainImageUrl = mainImageResponse.Location;
            let otherImages = []
            for(let i = 0; i < data.files.length; i++){
                if(i === data.mainImageIndex){
                    continue
                }
                response = await fileUpload(data.files[i],'storeItems') 
                 otherImages.push(response.Location)
            }
            console.log('main response', mainImageUrl)
            let otherImageUrl1 = otherImages.length > 0 ? otherImages[0] : ''
            let otherImageUrl2 = otherImages.length > 1 ? otherImages[1] : ''
            let otherImageUrl3 = otherImages.length > 2 ? otherImages[2] : ''
            let otherImageUrl4 = otherImages.length > 3 ? otherImages[3] : ''
            const { filteredSubCategory, files,previewImage, subImages,
                validationMessage, inValidElments, ...rest} = data;
            console.log({
                ...rest, mainImageUrl, otherImageUrl1, otherImageUrl2,otherImageUrl3,
                otherImageUrl4
            })
            response = await axios.post('/api/v1/seller/product/create',{
                ...rest, mainImageUrl, otherImageUrl1, otherImageUrl2,otherImageUrl3,
                otherImageUrl4
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            dispatch({type: SUCCESS_ALERT, payload: 'Item created successfully'})
            dispatch({type: STOP_LOADING, payload: ''})
        }catch(error){
            console.log(error.response)
            dispatch({type: DISPLAY_ERROR, payload: 'Some errors were encountered'})
            dispatch({type: STOP_LOADING, payload: ''})
        }
    }
}