import { observer } from "mobx-react-lite";
import React, { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import ActivityDashboard from "../activities/dashboard/ActivityDashboard";

export const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { submitting, login, isLoggedIn } = rootStore.userStore;

  const [state, setState] = useState<IUserFormValues>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    login(state);
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setState({ ...state, [name]: value });
  };

  if(isLoggedIn)
    return <ActivityDashboard />

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              name="email"
              placeholder="E-mail address"
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              icon="lock"
              name="password"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={handleInputChange}
            />

            <Button loading={submitting} color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default observer(LoginForm);
