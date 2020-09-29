import { observer } from "mobx-react-lite";
import React, { FormEvent, useContext, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { UUID } from "../../../app/helpers/UUIDGenerator";
import { IActivity } from "../../../app/models/activity";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  id: string;
  isPage: boolean;
}

interface IPageProps {
  id: string;
}

const _ActivityForm: React.FC<IProps> = ({ id, isPage }) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      const initialValue: IActivity = {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
        comments: []
      };
      return initialValue;
    }
  };

  const rootStore = useContext(RootStoreContext);
  const {
    activity: initialFormState,
    createActivity,
    editActivity,
    setEditMode,
    submitting,
  } = rootStore.activityStore;
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: UUID.shared.uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button
          name={activity.id}
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={isPage ? Link : Button}
          to={`/activities/${activity.id}/edit`}
          onClick={() => {
            if (!isPage) setEditMode(false);
          }}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

const _ActivityFormPage: React.FC<RouteComponentProps<IPageProps>> = ({
  match,
}) => {
  return <ActivityForm id={match.params.id} isPage={true} />;
};

const ActivityForm = observer(_ActivityForm);
export default ActivityForm;
export const ActivityFormPage = observer(_ActivityFormPage);
