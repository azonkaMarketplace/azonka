import React, { Component } from 'react';
import notifCloseIcon from "../../images/dashboard/notif-close-icon.png";
import Zoom from 'react-reveal/Zoom';
import SubscribeBanner from "../Banners/SubscribeBanner";
import logoHeader from "../../images/logo_header.png";
import {connect} from 'react-redux'
import * as actions from '../../actions';

class Home extends Component {
    state = { showPopUp: true}
    closePopup = (event) => {
        event.preventDefault();
        this.setState({
            showPopUp: false
        })
    }
    componentDidMount(){
        this.props.initiateRegistration()
        this.props.getProductCategorySubcategory()
        //remove popup after 5secs
        setTimeout(()=> {
            this.setState({
                showPopUp: false
            })
        }, 5000)
    }
    renderPopup(){
        return  (
            <Zoom right>
                <div className="survey xmalert alert-box" style={{visibility: `${this.state.showPopUp ? 'visible': 'hidden'}`, opacity: 1,
                    position: "fixed", zIindex: 100000, transition: "all 0.3s ease-in-out 0s", 
                    top: "auto", bottom: "30px", left: "auto", right: "30px"}} >							
                    <figure className="survey-img" >								
                        <img src={logoHeader} alt="survey-img"/>							
                    </figure>							
                    <p className="text-header">Alerts &amp; Notifications</p>							
                    <p className="info">We added alerts &amp; notifications to the template!.<br />
                    Try our previewer and code generator and use them in your page!</p>							
                    <p className="timestamp"></p>							
                    <a href="alerts-notifications.html" className="button mid secondary">Check it <span className="primary">out!</span></a>							
                        <img className="close-btn" src={notifCloseIcon} alt="close-icon" onClick={this.closePopup} />						
                    </div>
            </Zoom>
        ) 
    }
    render() {
        return (
            <div>
                <div className="home-main-content">

                </div>
                <SubscribeBanner />
                {this.renderPopup()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {home: {categories, subCategories}} = state;
    return {
        categories, subCategories
    }
}

export default connect(mapStateToProps, actions)(Home);