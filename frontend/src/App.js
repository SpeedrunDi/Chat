import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import Chat from "./containers/Chat/Chat";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Chat}/>
      </Switch>
    </Layout>
  );
}

export default App;
