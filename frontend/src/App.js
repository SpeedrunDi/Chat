import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Chat from "./containers/Chat/Chat";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Chat}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Switch>
    </Layout>
  );
}

export default App;
