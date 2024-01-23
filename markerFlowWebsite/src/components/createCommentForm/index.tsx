import { useEvent } from "../../contexts/EventContext";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { usePubSub } from "../../contexts/PubSubHook";
import { ExtensionMessageTypes } from "../../enums/ExtensionMessageTypes";
import { BsFillGeoAltFill } from "react-icons/bs";
import { Button, Card, Col, Divider, Form,  Mentions, Row, message } from "antd";
import { IElementData } from "../../models/common/ElementData";
import { CreateCommentFormProps, CreateCommentFormValues } from "./types";
import { useBaseMutation } from "../../hooks/query/_Base";
import { createComment } from "../../services/uiServices/CommentService";
import { ICreateCommentDto } from "../../services/uiServices/CommentService/types";
import "./index.scss";

const CreateCommentForm = ({
  initialValues,
  onCancel,
  topicId,
}: CreateCommentFormProps) => {
  const { eventService } = useEvent();
  const [elementData, setElementData] = usePubSub<IElementData | null>(
    ExtensionMessageTypes.SelectAnnotationElement,
    null,
    (e: any, param: any) => {
      return e;
    },
    true
  );
  const [form] = Form.useForm();


  const onFinish = async () => {
    const formValues: CreateCommentFormValues = await form.validateFields();

    if(!elementData){
      message.error("Please select annotation");
      return;
    }

    const data: ICreateCommentDto = {
      comment: formValues.comment,
      element: elementData ? JSON.stringify(elementData) : null,
      mentionUserIds: [],
      topicId,
    };
    mutate(data);
  };

  const { mutate } = useBaseMutation({
    service: createComment,
    onSuccess: {
      callback: (data) => {
        onCancel();
      },
    },
  });
  return (
    <div className="newCommentContainer">
      <Divider orientation="left">Create Comment</Divider>
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          initialValues={initialValues}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            id="comment"
            name="comment"
            label=""
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input comment" }]}
          >
            <Mentions
              rows={3}
              placeholder="Type something"
            ></Mentions>
          </Form.Item>

          <Row>
            <Col span={8}>
              {!elementData && (
                <Button
                  id={"markerFlow-annotation-new"}
                  onClick={() => {
                    if (!elementData) {
                      eventService?.publishMessage(
                        IFrameMessageTypes.CreateAnnotation,
                        {
                          commentId: "new",
                        }
                      );
                    }
                  }}
                >
                  <BsFillGeoAltFill
                    fill="#270a5c"
                    style={{ marginRight: "6px" }}
                  />
                  Add Marker
                </Button>
              )}
              {elementData && (
                <Button
                  danger
                  onMouseEnter={() => {
                    if (elementData) {
                      eventService?.publishMessage(
                        IFrameMessageTypes.DrawAnnotation,
                        {
                          commentId: "newComment",
                        }
                      );
                    }
                  }}
                  onMouseLeave={() => {
                    eventService?.publishMessage(
                      IFrameMessageTypes.DrawAnnotation,
                      null
                    );
                  }}
                >
                  X
                </Button>
              )}
            </Col>

            <Col span={5} offset={5}>
              <Button
                onClick={(e) => {
                  setElementData(null);
                  eventService?.publishMessage(
                    IFrameMessageTypes.DeleteAnnotation,
                    {
                      commentId: "new",
                    }
                  );
                  onCancel();
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col span={5} offset={1}>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateCommentForm;
