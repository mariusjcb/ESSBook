import { action, computed, configure, observable, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import { ActivitiesApi } from "../api/activitesApi";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activity: IActivity | undefined;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable editMode = false;
  @observable buttonTarget = "";

  @computed get activities() {
    return Array.from(this.activityRegistry.values());
  }

  @computed get activitiesSortedByDate() {
    return this.activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  getActivity(id: string) {
    return this.activityRegistry.get(id);
  }

  @action setEditMode = (enabled: boolean) => {
    runInAction(() => {
      this.editMode = enabled;
    });
  };

  @action openCreateForm = () => {
    runInAction(() => {
      this.activity = undefined;
      this.editMode = true;
    });
  };

  @action selectActivity = (id: string) => {
    runInAction(() => {
      this.activity = this.activityRegistry.get(id);
      this.editMode = false;
    });
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      runInAction(() => {
        this.activity = activity;
      });
    } else {
      this.loadingInitial = true;
      try {
        const activity = await ActivitiesApi.details(id);
        runInAction(() => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  @action loadActivites = async () => {
    runInAction(() => {
      this.loadingInitial = true;
    });
    try {
      const activities = await ActivitiesApi.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  @action createActivity = async (activity: IActivity) => {
    runInAction(() => {
      this.submitting = true;
    });
    try {
      await ActivitiesApi.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    runInAction(() => {
      this.submitting = true;
    });
    try {
      await ActivitiesApi.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    runInAction(() => {
      this.submitting = true;
      this.buttonTarget = e.currentTarget.name;
    });
    try {
      await ActivitiesApi.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.activity = undefined;
        this.submitting = false;
        this.editMode = false;
        this.buttonTarget = "";
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
        this.buttonTarget = "";
      });
    }
  };
}

export default createContext(new ActivityStore());
