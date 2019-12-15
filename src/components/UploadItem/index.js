import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import AdminLayout from '../HOC/AdminLayout';

class index extends Component {
      _initalState = {
        
    }
    constructor(props){
        super(props)
        this.state = {
            files: null,
        previewImage: null,
        subImages: [],
        model: '',
        inValidElments: [],
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
        this.uploadFileButton = React.createRef()
    }
    componentDidMount(){
        this.props.initiateRegistration();
        this.props._initUploadPage();
        this.props.switchActiveLink('uploadItem')
    }
    componentWillUnmount(){
        console.log('called')
        this.props.initForm()
    }
    hanldeFormUpdate = e => {
        e.preventDefault()
    }
    updateAction = () => {
        if(this.state.action === 'update'){
            const {
                brandName,sellingPrice,finalPrice,category,
                store,
                subCategory,
                description,
                width,
                height,
                length,
                unit,
                name,
                model,
                id,
                deliveryType,
                deliveryLocation,
                mainImageUrl
            } = this.props.product
            const {subCategories} =  this.props;
            const subCategoryId = `${subCategory.id}`
            const categoryId = `${category.id}`
            const storeId = `${store.id}`
            const fileterSubCategories = subCategories
                                            .filter(category => parseInt(category.parentCategory) === parseInt(category.id))
            this.setState({
                name,model,
                 brandName, sellingPrice, finalPrice,selectedId: id,action:null,
                 description, width, height, length,unit,
                deliveryType, deliveryLocation, previewImage: mainImageUrl, subCategory: subCategoryId,
                category: categoryId, store: storeId, filteredSubCategory: [...fileterSubCategories] 
            })
        }
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.resetForm){
            
            return {...state, files: null,
                previewImage: null,
                subImages: [],
                model: '',
                inValidElments: [],
                validationMessage: [],
                name: '',
                mainImageIndex: 0,
                brandName:'',
                sellingPrice:'',
                finalPrice: '',
                category: '',
                store:'',
                subCategory: '',
                description: '',
                width: '',
                height:'',
                length:'',
                unit: '',
                deliveryType: '',
                deliveryLocation:'',
                filteredSubCategory: []}
        }
        
        if(nextProps.product){
            const {
                brandName,sellingPrice,finalPrice,category,
                store,
                subCategory,
                description,
                width,
                height,
                length,
                unit,
                name,
                model,
                id,
                deliveryType,
                deliveryLocation,
                mainImageUrl
            } = nextProps.product
            const {subCategories} =  nextProps
            const subCategoryId = `${subCategory.id}`
            const categoryId = `${category.id}`
            const storeId = `${store.id}`
            const fileterSubCategories = subCategories
                                            .filter(category => parseInt(category.parentCategory) === parseInt(category.id))
            
            return {...state,name,model,
                 brandName, sellingPrice, finalPrice,selectedId: id,action:'update',
                 description, width, height, length,unit,
                deliveryType, deliveryLocation, previewImage: mainImageUrl, subCategory: subCategoryId,
                category: categoryId, store: storeId, filteredSubCategory: [...fileterSubCategories] }
        }
        return {...state}
    }
    renderImage = () => {
        if(!this.state.previewImage){
            return <img className="col-md-12 col-sm-12 " src="https://via.placeholder.com/400?text=Upload+Photo" alt="upload item" 
                 />
        }
        return <img className="col-md-12 col-sm-12 " src={this.state.previewImage} alt="upload item" 
         />
    }
    uploadButton = e => {
        e.preventDefault()
        this.uploadFileButton.current.click()
    }
    readImages = (files) => {
        return new Promise((resolve, reject) => {
            const subImages = [];
            for(let i = 0; i < files.length; i++){
                let file = files[i];
                let reader = new FileReader();
                reader.addEventListener('load', (e) => {

                    subImages.push(e.target.result)
                    if(subImages.length === files.length){
                        resolve(subImages)
                    }
                })
                reader.readAsDataURL(file)
            }
            
        })
    }
    sellerPreference = preference => {
        // this.setState({
        //     [preference.target]: preference.value
        // }
        this.props.handleItemChangeAction(preference)
    }
    validateFormData = (formdata) => {
        const { name, brandName, sellingPrice, finalPrice, deliveryLocation,
        deliveryType, category, subCategory, model, description} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if((name.trim() === '')){
            isValid = false
            inValidElments.push('name')
            
            validationMessage['name'] = 'Please provide item name'
        }
        if(brandName.trim() === ''){
            isValid = false;
            inValidElments.push('brandName')
            validationMessage['brandName'] = 'Please provide brand name'
        }
        if(!(category.trim() !== '')){
            isValid = false
            inValidElments.push('category')
            validationMessage['category'] = 'Please select item category'
        }
        if((subCategory.trim() === '')){
            isValid = false
            inValidElments.push('subCategory')
            validationMessage['subCategory'] = 'Please select sub category'
        }
        if((finalPrice.trim() === '')){
            isValid = false
            inValidElments.push('finalPrice')
            validationMessage['finalPrice'] = 'Please provide final price'
        }
        if((sellingPrice.trim() === '')){
            isValid = false
            inValidElments.push('sellingPrice')
            validationMessage['sellingPrice'] = 'Please provide selling price'
        }
        if((deliveryLocation.trim() === '')){
            isValid = false
            inValidElments.push('deliveryLocation')
            validationMessage['deliveryLocation'] = 'Please provide delivery location'
        }
        if(!(deliveryType.trim() !== '')){
            isValid = false;
            inValidElments.push('deliveryType')
            validationMessage['deliveryType'] = 'Please provide delivery type'
        }
        if(!(model.trim() !== '')){
            isValid = false;
            inValidElments.push('model')
            validationMessage['model'] = 'Please provide stock model'
        }
        if(!(description.trim() !== '')){
            isValid = false;
            inValidElments.push('description')
            validationMessage['description'] = 'Please provide stock description'
        }
        return {
            isValid,
            validationMessage,
            inValidElments,
            formdata
        }
    }
    handleInputChange = e => {
        e.preventDefault();
        this.props.handleItemChangeAction(e)
        // const {target: {name, value}} = e;
        // const index = this.state.inValidElments.indexOf(name)
        // let newInvalidElements = []
        // if(index !== -1){
        //     this.state.inValidElments.splice(index, 1)
        // }

        // newInvalidElements = [...this.state.inValidElments]
        // this.setState({
        //     [name]: value,
        //     inValidElments: [...newInvalidElements]
        // },() => {
        //     if(name === 'category'){
        //         const subcatgeories = this.props.subCategories
        //                                 .filter(category => parseInt(category.parentCategory)  === parseInt(value))

        //         this.setState({
        //             filteredSubCategory: subcatgeories
        //         })
        //     }
        // } )
    }
    handleFileSelect = async (e) => {
        this.props.initiateRegistration();
        const files = []
        //limit selection to 5 images
        for(let i = 0; i< e.target.files.length; i++){
            
            files.push(e.target.files[i])
            if(i === 4){
                break;
            }
        }
        let subImages = [];
        // read the file as blob
        subImages = await this.readImages(files)
        this.props.stopImageLoading()
        this.setState({
            files,
            previewImage: subImages[0],
            subImages
        })
    }
    
    changePreviewPhoto = index => {
        this.setState({
            previewImage: this.state.subImages.find((item, i) => i === index),
            mainImageIndex: index
        })
    }
    renderSmallImage = () => {
        if(this.state.files){
            
            return this.state.subImages.map((item, i) => {
               return (
                    <div className="small-image-conatainer" onClick={() => this.changePreviewPhoto(i)} key={i}>
                        <img src={item} className="small-responsive-image"  alt="items" />
                    </div>
                )
            })
        }
        return null
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.props.validateFormData(this.props)
        // const {isValid, inValidElments, validationMessage} = this.props.validateFormData()
        // if(!isValid){
            
        //     return this.setState({
        //         inValidElments,
        //         validationMessage
        //     }, () => {
        //         if(inValidElments.includes('deliveryType')){
        //              this.props.renderError('Please select delivery type')
        //         }
        //         if(inValidElments.includes('deliveryLocation')){
        //              this.props.renderError('Please select delivery location')
        //         }
        //         // return this.props.renderError('Incomplete details provided,please check and try again')
        //     })
            
            
        // }
        // if(!this.state.files){
        //    return this.props.renderError('Please select image to upload')
        // }
        // let discount = false
        // if(parseInt(this.state.finalPrice) < parseInt(this.state.sellingPrice)){
        //     discount = true
        // }
        
        // this.props.initiateRegistration()
        // this.props.createItem({...this.state, discount})
        
    }
    render() {
        
        return (
            <AdminLayout>
                <div className="headline buttons primary">
                    <h4>Upload Item</h4>
                </div>
            <div className="container-fluid" style={{marginBottom: 40}}>
                <div className="row">
                    <div className="col-sm-8 col-md-3">
                        <div className="row">
                                {/* <div className="image-preview-large">
                                    
                                </div> */}
                                {this.renderImage()}
                            <div className="col-sm-12 col-md-12">
                                <div style={{marginTop:20, marginBottom: 40, 
                                        display: 'flex', justifyContent:'center', width: '100%', alignItems:'center'}}>
                                        <input accept="image/*" multiple onChange={this.handleFileSelect} type="file" ref={this.uploadFileButton} className="real-file btn btn-warning" hidden="hidden" />
                                        {
                                            this.state.action === 'save' ?
                                            (
                                                <button onClick={this.uploadButton} type="button" className="button mid secondary">Select Photo</button>
                                            ):
                                            <button onClick={this.uploadButton} type="button" className="button mid secondary">Change Photo</button>
                                        }
                                </div>
                            </div>
                            
                        </div>
                        <div className="row" style={{marginBottom: 20}}>
                            <div className="col-sm-12 col-md-12 ">
                                <div className="small-images" style={{marginBottom: 20}}>
                                    {this.renderSmallImage()}
                                </div>
                                <div className="form-box-item full">
                                    <h4>Upload Guidelines</h4>
                                    <hr className="line-separator"/>
                                    <div className="plain-text-box">
                                        <div className="plain-text-box-item">
                                            <p className="text-header">File Upload:</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-9 add-margin-top">
                        <div className="item-form-conatainer card">
                            <fieldset>
                                <form>
                                    <h4>Item Specifications</h4>
					                <hr className="line-separator" />
                                    <div className="row add-margin-item">
                                        <div className="col-md-6 col-sm-12 add-margin-sm-device">
                                            <label htmlFor="name" className="rl-label">Item Name</label>
                                            <input type="text" id="name" 
                                            className={`${this.props.inValidElments.includes('name') ? 'invalid' : '' }`} 
                                            value={this.props.name} onChange={this.handleInputChange} 
                                            name="name" placeholder="Item Name" />
                                            {
                                                    this.props.inValidElments.includes('name') ?
                                                    (
                                                        <div className="error-message required">
                                                            {this.props.validationMessage['name']}
                                                        </div>
                                                    ): null 
                                            }
                                        </div>
                                        <div className="col-md-6 col-sm-12 add-margin-sm-device">
                                            <label htmlFor="brandName" className="rl-label">Brand Name</label>
                                            <input type="text" id="brandName" 
                                            className={`${this.props.inValidElments.includes('brandName') ? 'invalid' : '' }`} 
                                            value={this.props.brandName} onChange={this.handleInputChange} 
                                            name="brandName" placeholder="Brand Name" />
                                            {
                                                    this.props.inValidElments.includes('brandName') ?
                                                    (
                                                        <div className="error-message required">
                                                            {this.props.validationMessage['brandName']}
                                                        </div>
                                                    ): null 
                                            }
                                        </div>
                                    </div>
                                    <div className="row add-margin-item">
                                        <div className="col-md-6 col-sm-12 add-margin-sm-device">
                                            <label htmlFor="sellingPrice" className="rl-label">Selling Price</label>
                                            <input type="text" id="sellingPrice" 
                                            className={`${this.props.inValidElments.includes('sellingPrice') ? 'invalid' : '' }`} 
                                            value={this.props.sellingPrice} onChange={this.handleInputChange} 
                                            name="sellingPrice" placeholder="Selling Price" />
                                            {
                                                    this.props.inValidElments.includes('sellingPrice') ?
                                                    (
                                                        <div className="error-message required">
                                                            {this.props.validationMessage['sellingPrice']}
                                                        </div>
                                                    ): null 
                                            }
                                        </div>
                                        <div className="col-md-6 col-sm-12 add-margin-sm-device">
                                            <label htmlFor="finalPrice" className="rl-label">FInal Price</label>
                                            <input type="text" id="finalPrice" 
                                            className={`${this.props.inValidElments.includes('finalPrice') ? 'invalid' : '' }`} 
                                            value={this.props.finalPrice} onChange={this.handleInputChange} 
                                            name="finalPrice" placeholder="Final Price" />
                                            {
                                                    this.props.inValidElments.includes('finalPrice') ?
                                                    (
                                                        <div className="error-message required">
                                                            {this.props.validationMessage['finalPrice']}
                                                        </div>
                                                    ): null 
                                            }
                                        </div>
                                    </div>
                                    <div className="row add-margin-item">
                                        <div className="col-md-6 col-sm-12 add-margin-sm-device">
                                            <label htmlFor="store" className="rl-label">Select Store</label>
                                            <select name="store" 
                                                    className={`${this.props.inValidElments.includes('store') ? 'invalid' : '' }`}
                                                    value={this.props.store} onChange={this.handleInputChange}>
                                                    <option value="">Select Store</option>
                                                    {
                                                        this.props.stores ?
                                                        this.props.stores.map(store => (
                                                            <option key={store.id} value={store.id}>{store.name}</option>
                                                        ))
                                                        : null
                                                    }
                                                </select>
                                            {
                                                    this.props.inValidElments.includes('store') ?
                                                    (
                                                        <div className="error-message required">
                                                            {this.props.validationMessage['store']}
                                                        </div>
                                                    ): null 
                                            }
                                        </div>
                                        <div className="col-md-6 col-sm-12 add-margin-sm-device">
                                            <label htmlFor="category" className="rl-label">Select Category</label>
                                            <select name="category" 
                                                    className={`${this.props.inValidElments.includes('category') ? 'invalid' : '' }`}
                                                    value={this.props.category} onChange={this.handleInputChange}>
                                                    <option value="">Select Category</option>
                                                    {
                                                        this.props.categories ?
                                                        this.props.categories.map(category => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ) )
                                                        : null
                                                    }
                                                </select>
                                            {
                                                    this.props.inValidElments.includes('category') ?
                                                    (
                                                        <div className="error-message required">
                                                            {this.props.validationMessage['category']}
                                                        </div>
                                                    ): null 
                                            }
                                        </div>
                                    </div>
                                    <div className="row add-margin-item add-margin-sm-device">
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="subCategory" className="rl-label">Select sub-category</label>
                                            <select name="subCategory" 
                                                    className={`${this.props.inValidElments.includes('subCategory') ? 'invalid' : '' }`}
                                                    value={this.props.subCategory} onChange={this.handleInputChange}>
                                                    <option value="">Select sub-category</option>
                                                    {
                                                        
                                                        this.props.filteredSubCategory.map(category => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            {
                                                    this.props.inValidElments.includes('subCategory') ?
                                                    (
                                                        <div className="error-message required">
                                                            {this.props.validationMessage['subCategory']}
                                                        </div>
                                                    ): null 
                                            }
                                        </div>
                                        <div className="col-md-6 col-sm-12 add-margin-sm-device">
                                                <label htmlFor="model" className="rl-label">Model</label>
                                                <input type="text" name="model"
                                                    className={`${this.props.inValidElments.includes('model') ? 'invalid' : '' }`}
                                                    value={this.props.model} onChange={this.handleInputChange}
                                                />
                                                {
                                                        this.props.inValidElments.includes('model') ?
                                                        (
                                                            <div className="error-message required">
                                                                {this.props.validationMessage['model']}
                                                            </div>
                                                        ): null 
                                                }
                                        </div>
                                        
                                        
                                    </div>
                                    <div className="row add-margin-item add-margin-sm-device">
                                        <div className="col-md-12 col-sm-12 add-margin-sm-device">
                                            <label htmlFor="description" className="rl-label">Item Description</label>
                                            <textarea name="description"
                                                 className={`${this.props.inValidElments.includes('description') ? 'invalid' : '' }`}
                                                 value={this.props.description} onChange={this.handleInputChange}
                                            ></textarea>
                                            {
                                                    this.props.inValidElments.includes('description') ?
                                                    (
                                                        <div className="error-message required">
                                                            {this.props.validationMessage['description']}
                                                        </div>
                                                    ): null 
                                            }
                                        </div>
                                    </div>
                                    <h4>Item Dimensions</h4>
					                <hr className="line-separator" />
                                    <div className="row add-margin-item">
                                        <div className="item-dimension">
                                            <div className="dim-unit">
                                                <div className="number-unit">
                                                    <label htmlFor="width" className="rl-label">Width</label>
                                                    <input type="number" name="width" className="dimension" />
                                                </div>
                                                <div className="sperator">
                                                <span className="dimension-separator">
                                                    &times;
                                                </span>
                                                </div>
                                            </div>
                                            <div className="dim-unit">
                                                <div className="number-unit">
                                                    <label htmlFor="height" className="rl-label">Height</label>
                                                    <input type="number" name="height" className="dimension" />
                                                </div>
                                                <div className="sperator">
                                                <span className="dimension-separator">
                                                    &times;
                                                </span>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="length" className="rl-label">length</label>
                                                <input type="number" name="length" className="dimension" />
                                            </div>
                                            <div>
                                                <label htmlFor="unit" className="rl-label">Unit</label>
                                                <select name="unit"
                                                    className={`dimension dimension-unit ${this.props.inValidElments.includes('unit') ? 'invalid' : ''}`}
                                                    value={this.props.unit} onChange={this.handleInputChange}>
                                                    <option value="cm">CM</option>
                                                    <option value="mm">MM</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="add-margin-top">Delivery Location</h4>
					                <hr className="line-separator" />
                                    <div className="row add-margin-item">
                                        <div className="delivery-location-container">
                                            <div className="delivery-location">
                                                <input type="checkbox" id="agreeTo"
                                                    name="agree" value="sellers" onChange={this.sellerPreference} checked={this.props.deliveryLocation === 'state'} />
                                                <label className="label-check" onClick={(event) => this.sellerPreference({target:{name:'deliveryLocation', value:'state'}})}>
                                                    <span className="checkbox primary"><span></span></span>
                                                    Within Store State 
                                                </label>
                                            </div>
                                            <div className="delivery-location">
                                                <input type="checkbox" id="agreeToTerms"
                                                    name="agree" value="sellers" onChange={this.sellerPreference}  checked={this.props.deliveryLocation === 'everywhere'} />
                                                <label className="label-check " onClick={(event) => this.sellerPreference({target:{name:'deliveryLocation', value:'everywhere'}})}>
                                                    <span className="checkbox primary"><span></span></span>
                                                    Available Everywhere
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="add-margin-top">Delivery Type</h4>
					                <hr className="line-separator" />
                                    <div className="row add-margin-item">
                                        <div className="delivery-location-container">
                                            <div className="delivery-location">
                                                <input type="checkbox" id="agreeToTer"
                                                    name="iagree" value="sellers" onChange={this.sellerPreference}  checked={this.props.deliveryType === 'pick-up'} />
                                                <label className="label-check color-black" onClick={(event) => this.sellerPreference({target:{name:'deliveryType', value:'pick-up'}})}>
                                                    <span className="checkbox primary"><span></span></span>
                                                    Pick Up
                                                </label>
                                            </div>
                                            <div className="delivery-location">
                                                <input type="checkbox" id="agreeoTems"
                                                    name="iagree" value="sellers" onChange={this.sellerPreference}  checked={this.props.deliveryType === 'home-delivery'} />
                                                <label className="label-check color-black" onClick={(event) => this.sellerPreference({target:{name:'deliveryType', value:'home-delivery'}})}>
                                                    <span className="checkbox primary"><span></span></span>
                                                    Home Delivery
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-margin-top" style={{width: '100%'}}>
                                        {
                                            this.props.action === 'save' ?
                                            (
                                                <button style={{width:'100%'}} onClick={this.handleFormSubmit} className="button mid secondary">Submit for Review</button>
                                            ) :
                                            (
                                                <button style={{width:'100%'}} onClick={this.hanldeFormUpdate} className="button mid secondary">Update Item</button>
                                            )
                                        }
                                    </div>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
                
            </div>
            </AdminLayout>
        );
    }
}

const mapStateToProps = state => {
    const {inventory: {subCategories, categories,product, stores,resetForm,
        
        files,
    previewImage,
    subImages,
    model,
    inValidElments,
    validationMessage,
    name,
    selectedId,
    mainImageIndex,
    brandName,
    sellingPrice,
    finalPrice,
    category,
    store,
    subCategory,
    description,
    width,
    action,
    height,
    length,
    unit,
    deliveryType,
    deliveryLocation,
    filteredSubCategory
    
    }} = state;
    return {subCategories, categories, stores,product, resetForm,
    
        files,
        previewImage,
        subImages,
        model,
        inValidElments,
        validationMessage,
        name,
        selectedId,
        mainImageIndex,
        brandName,
        sellingPrice,
        finalPrice,
        category,
        store,
        subCategory,
        description,
        width,
        action,
        height,
        length,
        unit,
        deliveryType,
        deliveryLocation,
        filteredSubCategory
    }
}

export default connect(mapStateToProps, actions)(index);