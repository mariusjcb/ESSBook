import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Grid, Icon, Image, Segment } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityChat from "./ActivityChat";
import ActivitySmartDetails from "./ActivitySmartDetails";

interface IDetailParams {
  id: string;
  isPage: boolean;
}

interface IDetailPageParams {
  id: string;
}

const _ActivityDetails: React.FC<IDetailParams> = ({ id, isPage }) => {
  const rootStore = useContext(RootStoreContext);
  const { editMode, setEditMode, loadingInitial } = rootStore.activityStore;
  const { activity, loadActivity } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading activity..." />;

    if (!activity)
      return <h1>Missing activity</h1>

  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" />
      <Card.Content>
        <Card.Header>
          <Link to={`/activities/${activity!.id}`}>{activity!.title}</Link>
        </Card.Header>
        <Card.Meta>
          <span className="date">{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group className="ui two buttons">
          <Button
            color="red"
            as={isPage ? Link : Button}
            to={`/activities/${id}/edit`}
            content={editMode ? "Cancel" : "Edit"}
            onClick={() => {
              if (!isPage) setEditMode(!editMode);
            }}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

const _ActivityDetailsPage: React.FC<RouteComponentProps<
  IDetailPageParams
>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial } = rootStore.activityStore;
  const { activity, loadActivity } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activity..." />;

    if (!activity)
      return <h1>Missing activity</h1>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetails id={match.params.id} isPage={true} />
        <Segment.Group>
          <Segment attached="top">
            <Grid>
              <Grid.Column width={1}>
                <Icon size="large" color="teal" name="info" />
              </Grid.Column>
              <Grid.Column width={15}>
                <p>{activity?.description}</p>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={1}>
                <Icon name="calendar" size="large" color="teal" />
              </Grid.Column>
              <Grid.Column width={15}>
                <span>{activity?.date}</span>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivitySmartDetails activity={activity} />
        <Button.Group vertical fluid={true}>
          <Button color="green">Join Event</Button>
          <Button color="grey">Cancel Attendance</Button>
        </Button.Group>
        <ActivityChat />
      </Grid.Column>
    </Grid>
  );
};

const ActivityDetails = observer(_ActivityDetails);
export default ActivityDetails;
export const ActivityDetailsPage = observer(_ActivityDetailsPage);
