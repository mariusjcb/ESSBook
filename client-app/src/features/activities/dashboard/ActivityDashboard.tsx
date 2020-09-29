import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import ActivityStore from '../../../app/stores/activityStore';

const ActivityDashboard = () => {
  const activityStore = useContext(ActivityStore);
  const {editMode, activity: selectedActivity} = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && (
          <ActivityDetails id={selectedActivity!.id} isPage={false}/>
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity!.id) || 0}
            id={selectedActivity?.id ?? ""}
            isPage={false}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);