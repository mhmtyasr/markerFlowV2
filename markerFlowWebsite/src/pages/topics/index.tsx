import React, { useCallback, useEffect } from "react";
import Navbar from "../../components/navbar";
import { Col, Divider,  Empty, Radio, Row } from "antd";
import TopicCards from "../../components/topicCards";
import { useBaseMutation, useBaseQuery } from "../../hooks/query/_Base";
import { deleteTopic, getTopics } from "../../services/uiServices/TopicService";
import { ITopicDto } from "../../services/uiServices/TopicService/types";
import { ITopicUI } from "../../models/uiModel/topicUIModel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { useEvent } from "../../contexts/EventContext";
import { PinDto } from "../../models/uiModel/pin.dto";
import { useCommon } from "../../contexts/CommonContext";

enum FilterType {
  allTopic = 0,
  myTopic = 1,
  mentionWithMe = 2,
  thisPage,
}

const Topics = () => {
  const navigate = useNavigate();
  const { eventService } = useEvent();
  const { currentUser } = useAuth();
  const { pageInfo } = useCommon();
  const [filterType, setFilterType] = React.useState<FilterType>(
    FilterType.allTopic
  );
  const {
    data: topics,
    isSuccess,
    refetch,
  } = useBaseQuery<any, ITopicDto[], ITopicUI[]>({
    service: getTopics,
    queryKeys: ["getTopics"],
    select: (data) => {
      return data.map((item) => {
        return {
          ...item,
          element: item.element ? JSON.parse(item.element) : null,
        };
      });
    },
  });

  const { mutate: handleDelete } = useBaseMutation({
    service: deleteTopic,
    onSuccess: {
      callback: (data) => {
        refetch();
      },
    },
  });

  const handleAdd = () => {
    navigate("/createTopic");
    eventService?.publishMessage(IFrameMessageTypes.CardData, []);
    eventService?.publishMessage(IFrameMessageTypes.PinData, []);
  };

 

  const filterTopics = useCallback(() => {
    switch (filterType) {
      case FilterType.allTopic:
        return topics;
      case FilterType.myTopic:
        return topics!.filter((x) => x.creatorUserId === currentUser?.user.id);
      case FilterType.mentionWithMe:
        return topics!.filter((x) =>
          x.mentionUserIds?.includes(currentUser?.user.id!)
        );
      case FilterType.thisPage:
        return topics!.filter((x) => x.pageUrl === pageInfo?.url);

      default:
        return topics;
    }
  }, [filterType, topics, currentUser?.user.id]);

  useEffect(() => {
    if (isSuccess && topics) {
      const data: PinDto[] =
        filterTopics()
          ?.filter((x) => x.element)
          .map((x) => {
            return {
              id: x.id,
              element: x.element!,
              createUserFullName: x.createUserFullName,
            };
          }) || [];

      eventService?.publishMessage(IFrameMessageTypes.PinData, data);
    }
  }, [filterType, isSuccess, topics]);

  return (
    <>
      <Navbar onAdd={handleAdd} />
      <Divider orientation="left">All Topics</Divider>
      <Row justify={"center"}>
        <Col span={21}>
          <Radio.Group
            size="small"
            options={[
              { value: FilterType.allTopic, label: "All Topic" },
              { value: FilterType.myTopic, label: "My Topic" },
              { value: FilterType.mentionWithMe, label: "Mention with me" },
              { value: FilterType.thisPage, label: "This Page" },
            ]}
            optionType="button"
            buttonStyle="solid"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row style={{ padding: "0 12px", marginTop: "12px" }} gutter={[0, 16]}>
        {(topics || []).length > 0 ? (
          <TopicCards topics={filterTopics()!} handleDelete={handleDelete} />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Row>
    </>
  );
};

export default Topics;
