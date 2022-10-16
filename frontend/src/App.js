import {Route, Switch} from "react-router-dom";

import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Login/Login";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login}/>
      </Switch>
    </Layout>
  );
}

export default App;
