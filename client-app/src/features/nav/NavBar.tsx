import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import { Container, Menu, Dropdown, Image, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar = () => {
  const rootStore = useContext(RootStoreContext);
  const {openCreateForm} = rootStore.activityStore;
  const {user, logout} = rootStore.userStore;
  
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={Link} to={"/"}>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}></img>
            Home
        </Menu.Item>
        {user && <Menu.Item  as={Link} to={"/activities"} name="Activities" />}
        {user && <Route exact path={"/activities"} render={() => (
          <Menu.Item>
              <Button onClick={openCreateForm} positive content="Create Activity" />
          </Menu.Item>
        )} />}
        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);