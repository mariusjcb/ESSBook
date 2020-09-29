import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import { RootStoreContext } from '../../../app/stores/rootStore';
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {editMode, activity: selectedActivity, loadActivites, loadingInitial} = rootStore.activityStore;

  useEffect(() => {
    loadActivites();
  }, [loadActivites]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activities..." />;
  
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