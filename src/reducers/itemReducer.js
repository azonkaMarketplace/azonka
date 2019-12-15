import { ITEMS_FETCHED_SUCCESSFULLY, STOP_LOADING, PRODUCTS_FETCED_SUCCESSFULLY, EDIT_ITEM, INIT_FORM, ITEM_CHANGE_ACTION, VALIDATE_FORM_DATA, INVALIDE_FORM_DATA } from "../actions/types";

const INTIAL_STATE = {
    stores: [],
    subCategories: [],
    categories: [],
    resetForm: false,
    products: [],
    product: null,
        files: null,
    previewImage: null,
    subImages: [],
    model: '',
    inValidElments: [],
    formIsValid: false,
    validationMessage: [],
    name: '',
    selectedId: null,
    mainImageIndex: 0,
    brandName:'',
    sellingPrice:'',
    finalPrice: '',
    category: '',
    store:'1',
    subCategory: '1',
    description: '',
    width: '',
    action:'save',
    height:'',
    length:'',
    unit: '',
    deliveryType: '',
    deliveryLocation:'',
    filteredSubCategory: []
    
}

export default (state= INTIAL_STATE, actions) => {
    switch(actions.type){
        case ITEMS_FETCHED_SUCCESSFULLY:
            const {stores, categories, subCategories} = actions.payload;
            return {...state, stores, categories, subCategories, resetForm: false}
        case STOP_LOADING:
            return {...state, resetForm: true}
        case PRODUCTS_FETCED_SUCCESSFULLY:
            return {...state, products: actions.payload}
        case EDIT_ITEM:
            
            return {...state, product: {...actions.payload}}
        case INIT_FORM:
            return {...state,product: null}
        case ITEM_CHANGE_ACTION:
            return handleItemChangeAction(state, actions.payload)
        case VALIDATE_FORM_DATA:
            return validateData(state)
        case INVALIDE_FORM_DATA:
            const {validationMessage, inValidElments} = actions.payload
            return {...state, validationMessage, inValidElments}
        default: 
            return {...state}
    }
}

const handleItemChangeAction = (state, e) => {
    const {target: {name, value}} = e;
    const index = state.inValidElments.indexOf(name)
    let newInvalidElements = []
    if(index !== -1){
        state.inValidElments.splice(index, 1)
    }

    newInvalidElements = [...state.inValidElments]
    if(name === 'category'){
        const subcatgeories = state.subCategories
                                    .filter(category => parseInt(category.parentCategory)  === parseInt(value))
        return {...state, [name]:value, inValidElments: [...newInvalidElements],
            filteredSubCategory:subcatgeories
       
        }
    }
    return {...state, [name]:value, inValidElments: [...newInvalidElements] }
    // this.setState({
    //     [name]: value,
    //     inValidElments: [...newInvalidElements]
    // },() => {
    //     if(name === 'category'){
    //         const subcatgeories = state.subCategories
    //                                 .filter(category => parseInt(category.parentCategory)  === parseInt(value))

    //         this.setState({
    //             filteredSubCategory: subcatgeories
    //         })
    //     }
    // } )
}

const validateData = state => {


}