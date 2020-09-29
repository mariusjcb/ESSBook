import React, { useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import { HomePage } from "../../features/home/HomePage";
import { ActivityDetailsPage } from "../../features/activities/details/ActivityDetails";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoginForm from "../../features/user/LoginForm";
import { history } from '../../index';

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const {token, setAppLoaded, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded)
    return <LoadingComponent content="Loading App..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact history={history} path="/" component={HomePage} />
          <Route exact history={history} path="/activities/:id/edit" component={ActivityForm} />
          <Route exact history={history} path="/activities" component={ActivityDashboard} />
          <Route exact history={history} path="/activities/:id" component={ActivityDetailsPage} />
          <Route exact path="/login" component={LoginForm} />
          <Route history={history} component={HomePage} />
        </Switch>
        <ToastContainer position="bottom-right" />
      </Container>
    </Fragment>
  );
};

export default observer(App);
