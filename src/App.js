import React from 'react'
import './App.css';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {connectSuccess} from './redux/LogIn/action'
import {Provider} from 'react-redux'
import store from './redux/store'
import Landing from './pages/Landing'


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  const decode = jwt_decode(localStorage.jwtToken)
  store.dispatch(connectSuccess(decode))
}

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Landing />
      </div>
    </Provider>
  );
}

export default App;
