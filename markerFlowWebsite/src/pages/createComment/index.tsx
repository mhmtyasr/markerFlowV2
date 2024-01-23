import React from "react";
import Navbar from "../../components/navbar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEvent } from "../../contexts/EventContext";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { ITopicUI } from "../../models/uiModel/topicUIModel";
import CreateCommentForm from "../../components/createCommentForm";

const CreateComment = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const topic = location.state.topic as ITopicUI;

  const { eventService } = useEvent();

  if (!topic) {
    return <Navigate to={`/`} state={{ from: location }} replace />;
  }

  const handleBack = () => {
    eventService?.publishMessage(IFrameMessageTypes.DeleteAnnotation, {});
    navigate("/comments", {
      state: { topic: topic },
    });
  };

  const handleAdd = () => {
    eventService?.publishMessage(IFrameMessageTypes.DeleteAnnotation, {});
    navigate("/");
  };

  return (
    <div>
      <Navbar onBack={handleBack} onAdd={handleAdd} />
      <div>
        <CreateCommentForm onCancel={handleBack} topicId={topic.id} />
      </div>
    </div>
  );
};

export default CreateComment;
