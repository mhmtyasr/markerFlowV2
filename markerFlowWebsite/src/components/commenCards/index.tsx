import React, { useEffect, useRef } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Button,
  Avatar,
  Tooltip,
} from "antd";
import moment from "moment";
import { ICommentUI } from "../../models/uiModel/commentUIModel";
import "./index.scss";
import { FaTrash } from "react-icons/fa";
import { DrawLineDto } from "../../models/uiModel/drawLine.dto";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { useEvent } from "../../contexts/EventContext";
import { ExtensionMessageTypes } from "../../enums/ExtensionMessageTypes";
import usePubSub from "../../contexts/PubSubHook";
const { Text } = Typography;

type CommentCardProps = {
  comments: ICommentUI[];
};

const CommentCards: React.FC<CommentCardProps> = ({ comments }) => {
  const { eventService } = useEvent();
  const elRefs = useRef<any>([]);

  const sendCardData = () => {
    const cardDataToPost: DrawLineDto[] = [];
    elRefs.current.forEach((el: HTMLElement, i: number) => {
      if (el) {
        if (comments[i].element) {
          const cardData = {
            cardLocation: {
              x: el.getBoundingClientRect().left,
              y: el.getBoundingClientRect().top - 14,
            },
            commentId: comments[i].id,
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
    if (comments && comments?.length > 0) {
      setTimeout(() => {
        sendCardData();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

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
      <Row gutter={[0, 16]}>
        {comments?.map((comment: ICommentUI, i: number) => {
          return (
            <Col
              span={24}
              key={i}
              ref={(element: any) => {
                elRefs.current[i] = element;
              }}
            >
              <CommentCardItem
                comment={comment}
                isError={notFoundIds.includes(comment.id)}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

type CommentItemProps = {
  comment: ICommentUI;
  isError?: boolean;
};

const CommentCardItem: React.FC<CommentItemProps> = ({ comment,isError }) => {
  const { eventService } = useEvent();
  return (
    <Card
      style={isError ? { border: "1px solid red" } : {}}
      className="commentCard"
      onMouseEnter={() => {
        if (comment.element)
          eventService?.publishMessage(IFrameMessageTypes.DrawLine, {
            commentId: comment.id,
          });
      }}
      onMouseLeave={() => {
        if (comment.element)
          eventService?.publishMessage(IFrameMessageTypes.DrawLine, {
            commentId: null,
          });
      }}
    >
      <Button
        className="deleteButton"
        icon={<FaTrash></FaTrash>}
        type="link"
        danger
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></Button>
      <Row>
        <Col span={24} style={{ textAlign: "left" }}>
          <Text>{comment.comment}</Text>
        </Col>
      </Row>
      <Divider style={{ margin: "4px 0" }}></Divider>
      <Row justify={"space-between"}>
        <Col>
          <Tooltip title={comment.creatorUserName}>
            <Avatar
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            >
              {comment.creatorUserName?.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        </Col>
        <Col>
          <Text>{moment(comment.creationTime).fromNow()}</Text>
        </Col>
      </Row>
    </Card>
  );
};
export default CommentCards;
