import React, { Component} from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import Root from "./Root";
// import AWS from "aws-sdk";
// import { endpoint, secretAccessKey, accessKeyId, agentBucketID } from "./config/config";
import ReduxThunk from 'redux-thunk';
import  "@fortawesome/fontawesome-free/css/all.css";
import  "./css/style.css";
import { ToastProvider} from 'react-toast-notifications'
//Banners


import Reducer from './reducers';
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)




class App extends Component {
  componentDidMount(){
    // const spacesEndpoint = new AWS.Endpoint(endpoint);

    // const s3 = new AWS.S3({
    //     endpoint: spacesEndpoint,
    //     accessKeyId,
    //     secretAccessKey
    // });

    // s3.createBucket({ Bucket: agentBucketID }, function (err, data) {
    //   if (!err) {
    //       console.log('datat o', data);
    //   } else {
    //       console.log('errror', err)
    //   }
    // })
  }
  render(){
    return (
      <ToastProvider>
        <div className="">
          <Provider store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
            
              <Root />
          </Provider>

        </div>
      </ToastProvider>
    );
  }
}



export default App;
