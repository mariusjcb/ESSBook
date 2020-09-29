import { observer } from "mobx-react-lite";
import React, { FormEvent, Fragment, useContext, useEffect, useState } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { IComment } from "../../../app/models/activity";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    connectHub,
    disconnectHub,
    addComment,
    submitting,
    activity,
  } = rootStore.activityStore;

  const [state, setState] = useState("");

  useEffect(() => {
    connectHub();
    return () => {
      disconnectHub();
    };
  }, [connectHub, disconnectHub]);

  const handleSubmit = () => {
    console.log(state);
    addComment(state);
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    console.log(value);
    setState(value);
  };

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src="/assets/user.png" />
                <Comment.Content>
                  <Comment.Author as="a">{comment.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          <Form onSubmit={handleSubmit}>
            <Form.Input 
              onChange={handleInputChange} 
              placeholder="Your message..." />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
              loading={submitting}
            />
          </Form>
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityChat);
