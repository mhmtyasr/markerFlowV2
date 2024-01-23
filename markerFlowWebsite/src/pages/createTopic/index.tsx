/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../contexts/EventContext";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import CreateTopicForm from "../../components/createTopicForm";


const CreateTopic = () => {
  let navigate = useNavigate();
  const { eventService } = useEvent();

  const handleCancel = () => {
    eventService?.publishMessage(IFrameMessageTypes.DeleteAnnotation, {});
    navigate("/");
  };



  return (
    <div>
        <Navbar onBack={handleCancel} />
        <div>
          <CreateTopicForm
            onCancel={handleCancel}
          />
        </div>
    </div>
  );
};

export default CreateTopic;
