import { Divider} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { useEvent } from "../../contexts/EventContext";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { useBaseQuery } from "../../hooks/query/_Base";
import { getComments } from "../../services/uiServices/CommentService";
import { ICommentDto } from "../../services/uiServices/CommentService/types";
import { ICommentUI } from "../../models/uiModel/commentUIModel";
import CommentCards from "../../components/commenCards";
import { ITopicUI } from "../../models/uiModel/topicUIModel";
import { useEffect } from "react";
import { PinDto } from "../../models/uiModel/pin.dto";

const Comments = () => {
  const navigate = useNavigate();
  const { eventService } = useEvent();
  const location = useLocation();

  const topic = location.state.topic as ITopicUI;

  const { data: comments, isSuccess } = useBaseQuery<
    any,
    ICommentDto[],
    ICommentUI[]
  >({
    service: ({ queryKey }) => {
      return getComments(queryKey[0]);
    },
    queryKeys: [topic.id],
    select: (data) => {
      return data.map((x) => {
        return {
          ...x,
          element: x.element ? JSON.parse(x.element) : null,
        } as ICommentUI;
      });
    },
  });

  useEffect(() => {
    if (isSuccess && comments) {
      const data: PinDto[] =
        comments
          ?.filter((x) => x.element)
          .map((x) => {
            return {
              id: x.id,
              element: x.element!,
              createUserFullName: x.creatorUserName,
            };
          }) || [];

      eventService?.publishMessage(IFrameMessageTypes.PinData, data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, comments]);

  const handleAdd = () => {
    navigate("/createComment", {
      state: { topic: topic },
    });
    eventService?.publishMessage(IFrameMessageTypes.CardData, []);
    eventService?.publishMessage(IFrameMessageTypes.PinData, []);
  };

  return (
    <>
      <Navbar
        onBack={() => {
          navigate("/");
        }}
        onAdd={handleAdd}
      />
      <div style={{ padding: "0 12px" }}>
        <Divider orientation="left">{topic.title}</Divider>
        <CommentCards comments={comments!} />
      </div>
    </>
  );
};

export default Comments;
