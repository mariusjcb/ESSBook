import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import { Container, Menu, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";

export const NavBar = () => {
  const activityStore = useContext(ActivityStore);
  
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={Link} to={"/"}>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}></img>
            Home
        </Menu.Item>
        <Menu.Item  as={Link} to={"/activities"} name="Activities" />
        <Route
          exact
          path={"/activities"}
          render={() => (
            <Menu.Item>
                <Button onClick={activityStore.openCreateForm} positive content="Create Activity" />
            </Menu.Item>
          )} />
      </Container>
    </Menu>
  );
};
