import React, { useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import { useContext } from "react";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import { Link, Route, Switch } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import { HomePage } from "../../features/home/HomePage";
import { ActivityDetailsPage } from "../../features/activities/details/ActivityDetails";
import { ToastContainer } from "react-toastify";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivites();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/activities/:id/edit" component={ActivityForm} />
          <Route exact path="/activities" component={ActivityDashboard} />
          <Route exact path="/activities/:id" component={ActivityDetailsPage} />
          <Route component={HomePage} />
        </Switch>
        <ToastContainer position="bottom-right" />
      </Container>
    </Fragment>
  );
};

export default observer(App);
