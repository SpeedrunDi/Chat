import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import Chat from "./containers/Chat/Chat";
import Login from "./containers/Login/Login";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Chat}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </Layout>
  );
}

export default App;
