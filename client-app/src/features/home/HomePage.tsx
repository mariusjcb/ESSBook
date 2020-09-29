import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export const HomePage = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text style={{padding: 80}}>
        <Header as='h2' inverted content='Hello' style={{paddingBottom: 15}}/>
        <Button as={Link} to='/login' size='huge' inverted>
          Open tha app!
        </Button>
      </Container>
    </Segment>
  );
};
