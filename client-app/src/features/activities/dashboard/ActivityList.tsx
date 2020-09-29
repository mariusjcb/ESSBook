import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";

const ActivityList = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesSortedByDate: activities,
    selectActivity,
    deleteActivity,
    buttonTarget: target,
    submitting,
  } = activityStore;
  return (
    <Item.Group divided>
      {activities.map((activity) => (
        <Segment key={activity.id} clearing>
          <Item>
            <Item.Content verticalAlign="middle">
              <Item.Header as="h1">
                <Link to={`/activities/${activity.id}`}>{activity.title}</Link>
              </Item.Header>
              <Item.Meta>
                {activity.date} | {activity.city}, {activity.venue}
              </Item.Meta>
              <Item.Description style={{ marginTop: 20 }}>
                {activity.description}
              </Item.Description>
              <Item.Extra>
                <div className="ui three buttons" style={{ marginTop: 20 }}>
                  <Button basic color="grey">
                    More {activity.category}
                  </Button>
                  <Button
                    name={activity.id}
                    loading={target === activity.id && submitting}
                    basic
                    color="red"
                    onClick={(e) => deleteActivity(e, activity.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    basic
                    color="blue"
                    onClick={() => selectActivity(activity.id)}
                  >
                    Show Details
                  </Button>
                </div>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Segment>
      ))}
    </Item.Group>
  );
};

export default observer(ActivityList);
