import {
  Card,
  Row,
  Col,
  Avatar,
  Tooltip,
  Typography,
  Badge,
  Modal,
  Button,
} from "antd";
import React, { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { ITopicUI } from "../../models/uiModel/topicUIModel";
import { FaTrash } from "react-icons/fa";
import moment from "moment";
import { DrawLineDto } from "../../models/uiModel/drawLine.dto";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { useEvent } from "../../contexts/EventContext";
import { debounce } from "lodash";
import { useCommon } from "../../contexts/CommonContext";
import { ExtensionMessageTypes } from "../../enums/ExtensionMessageTypes";
import usePubSub from "../../contexts/PubSubHook";
import { useAuth } from "../../contexts/AuthContext";
const { confirm } = Modal;
const { Title, Text } = Typography;

interface TopicCardsProps {
  topics: ITopicUI[];
  handleDelete: (id: string) => void;
}

const TopicCards: FC<TopicCardsProps> = ({ topics, handleDelete }) => {
  const { eventService } = useEvent();
  const { pageInfo } = useCommon();
  const elRefs = useRef<any>([]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      debounce(() => {
        sendCardData();
      }, 200)
    );
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics]);

  const sendCardData = () => {
    const cardDataToPost: DrawLineDto[] = [];
    elRefs.current.forEach((el: HTMLElement, i: number) => {
      if (el) {
        if (topics[i].element && topics[i].pageUrl === pageInfo?.url) {
          const cardData = {
            cardLocation: {
              x: el.getBoundingClientRect().left,
              y: el.getBoundingClientRect().top - 14,
            },
            commentId: topics[i].id,
          };
          cardDataToPost.push(cardData);
        }
      }
    });
    if (cardDataToPost.length > 0) {
      eventService?.publishMessage(IFrameMessageTypes.CardData, cardDataToPost);
    }
  };

  useEffect(() => {
    if (topics && topics?.length > 0) {
      setTimeout(() => {
        sendCardData();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics]);

  const [notFoundIds] = usePubSub<number[]>(
    ExtensionMessageTypes.NOTFOUNDIDS,
    [],
    (e: any, param: any) => {
      return e.ids;
    },
    true,
    []
  );

  return (
    <>
      {topics.map((item: ITopicUI, i: number) => {
        return (
          <Col
            span={24}
            key={i}
            ref={(element: any) => {
              elRefs.current[i] = element;
            }}
          >
            <TopicCardItems
              item={item}
              handleDelete={handleDelete}
              isError={notFoundIds.includes(item.id)}
            />
          </Col>
        );
      })}
    </>
  );
};

interface TopicCardItemsProps {
  item: ITopicUI;
  handleDelete: (id: string) => void;
  isError?: boolean;
}
const TopicCardItems: FC<TopicCardItemsProps> = ({
  item,
  handleDelete,
  isError,
}) => {
  const { eventService } = useEvent();
  const { currentUser } = useAuth();
  const { userList, pageInfo } = useCommon();
  const navigate = useNavigate();

  const handleRedirection = (url: string) => {
    eventService?.publishMessage(IFrameMessageTypes.RedirectTo, url);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure to delete this topic?",
      content: "All comments under the topic will be deleted with the topic.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        handleDelete(item.id.toString());
      },
      onCancel() {},
    });
  };

  const handleScroolToMarker = (id: number) => {
    eventService?.publishMessage(IFrameMessageTypes.ScrollTo, {
      commentId: id,
    });
  };

  return (
    <Tooltip mouseEnterDelay={1} title="Click for all comments">
      <Card
        className="topicCard"
        style={isError ? { border: "1px solid red" } : {}}
        onClick={() => {
          eventService?.publishMessage(IFrameMessageTypes.DrawLine, {
            commentId: null,
          });
          navigate("/comments", {
            state: { topic: item },
          });
        }}
        onMouseEnter={() => {
          if (item.element)
            eventService?.publishMessage(IFrameMessageTypes.DrawLine, {
              commentId: item.id,
            });
        }}
        onMouseLeave={() => {
          if (item.element)
            eventService?.publishMessage(IFrameMessageTypes.DrawLine, {
              commentId: null,
            });
        }}
      >
        <Badge
          styles={{
            root: {
              color: "white",
              position: "absolute",
              top: "-10px",
              right: "10px",
            },
          }}
          count={item.commentCount - 1}
          style={{ backgroundColor: "#f56a00" }}
        ></Badge>

        {item.creatorUserId === currentUser?.user.id && (
          <Button
            className="deleteButton"
            icon={<FaTrash></FaTrash>}
            type="link"
            danger
            onClick={(e) => {
              e.stopPropagation();
              showDeleteConfirm();
            }}
          ></Button>
        )}

        <Row align={"middle"} justify={"space-between"}>
          <Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img height={32} src={item.pageIconUrl} alt="" />
              <Title style={{ margin: "0 8px" }} level={5}>
                {item.title}
              </Title>
            </div>
          </Col>
          <Col>
            <Text style={{ textAlign: "end", marginRight: "24px" }}>
              {moment(item.creationTime).fromNow()}
            </Text>
          </Col>
        </Row>
        <Row style={{ margin: "12px 0" }}>
          <Col offset={3}>{item.comment}</Col>
        </Row>

        <Row justify={"space-between"} gutter={[0, 12]}>
          <Col span={16} style={{ textAlign: "left" }}>
            {item.mentionUserIds && (
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              >
                {item.mentionUserIds?.map((mentionUserId: number) => {
                  const userName = userList.find(
                    (x) => x.id === mentionUserId
                  )?.userName;
                  return (
                    <Tooltip title={userName}>
                      <Avatar
                        style={{ backgroundColor: "#f56a00" }}
                        shape="circle"
                        key={userName}
                        src={userName}
                        alt={"avatar"}
                      >
                        {userName?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            )}
          </Col>
          {item.pageUrl === pageInfo?.url ? (
            <Col span={8}>
              <Button
                type="link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleScroolToMarker(item.id);
                }}
              >
                Go to Marker
              </Button>
            </Col>
          ) : (
            <Col span={8}>
              <Button
                type="link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRedirection(item.pageUrl);
                }}
              >
                Go to Page
              </Button>
            </Col>
          )}
        </Row>
      </Card>
    </Tooltip>
  );
};

export default TopicCards;
