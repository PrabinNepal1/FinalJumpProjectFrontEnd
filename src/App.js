import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from './component/route/privateRoute';

import {AuthProvider} from "./context/AuthContext";


import Header from "./component/header/header";
import Footer from './component/footer/footer';
import Login from './component/login/login';
import Signup from './component/signup/signup';
import User from './component/user/user';
import Resturant from './component/restaurant/restaurant';

function App() {
  return (


    <Router>
      <AuthProvider>
        <Switch>
          <div className="App">

          <Header/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <PrivateRoute exact path='/user' component={User}/>
          <Route exact path='/resturant' component={Resturant}/>
          <Footer/>
      
      

          </div>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;