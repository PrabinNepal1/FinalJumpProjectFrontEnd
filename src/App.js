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
import Resturant from './component/pages/resturant/Resturant';
import CreateResturant from './component/curd/CreateResturant';
import CreateReview from './component/curd/CreateReview';

function App() {
  return (

<AuthProvider>
    
    <Router>
      
        <Switch>
          <div className="App">

          <Header/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <PrivateRoute exact path='/user' component={User}/>
          <Route exact path='/resturant' component={Resturant}/>
          <Route exact path='/resturant/add' component={CreateResturant}/>
          <Route exact path='/add/review/:id' component={CreateReview}/>
          <Footer/>
      
      

          </div>
        </Switch>
    </Router>
  </AuthProvider>
  );
}

export default App;