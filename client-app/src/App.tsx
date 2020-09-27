import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, Image, List } from "semantic-ui-react";

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((r) => {
      this.setState({
        values: r.data,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Header as="h2">
          <Image src={logo} circular />
          <Header.Content>
            ESBook Network
            <Header.Subheader>The demo socialnet.</Header.Subheader>
          </Header.Content>
        </Header>
        <List as='ul'>
          {this.state.values.map((value: any) => (
            <List.Item as="li" key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  } 
}

export default App;
