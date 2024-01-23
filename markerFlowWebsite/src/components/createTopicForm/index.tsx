import { useEvent } from "../../contexts/EventContext";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { usePubSub } from "../../contexts/PubSubHook";
import { ExtensionMessageTypes } from "../../enums/ExtensionMessageTypes";
import { BsFillGeoAltFill } from "react-icons/bs";
import { HiAtSymbol } from "react-icons/hi";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";
import { IElementData } from "../../models/common/ElementData";
import { CreateTopicFormProps, CreateTopicFormValues } from "./types";
import "./index.scss";
import { useBaseMutation } from "../../hooks/query/_Base";
import { createTopic } from "../../services/uiServices/TopicService";
import { ICreateTopicDto } from "../../services/uiServices/TopicService/types";
import { useCommon } from "../../contexts/CommonContext";
const { TextArea } = Input;

const CreateTopicForm = ({ initialValues, onCancel }: CreateTopicFormProps) => {
  const { eventService } = useEvent();
  const { pageInfo, userList } = useCommon();
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
    const formValues = await form.validateFields();
    const newTopic: ICreateTopicDto = {
      comment: formValues.comment,
      element: elementData ? JSON.stringify(elementData) : null,
      pageIconUrl: `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${pageInfo?.url}/&size=32`,
      pageUrl: pageInfo?.url || "",
      title: formValues.title,
      mentionUserIds: formValues.mentionUser?.map((x: string) => {
        return parseInt(x);
      }),
    };
    mutate(newTopic);
  };

  const { mutate } = useBaseMutation({
    service: createTopic,
    onSuccess: {
      callback: (data) => {
        onCancel();
      },
    },
  });


  return (
    <div className="newTopicContainer">
      <Divider orientation="left">Create Topic</Divider>
      <Card>
        <Form<CreateTopicFormValues>
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          initialValues={initialValues}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            id="title"
            label=""
            name="title"
            rules={[{ required: true, message: "Please input title of title" }]}
          >
            <Input placeholder="Topic title" />
          </Form.Item>

          <Form.Item
            id="comment"
            name="comment"
            label=""
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input comment" }]}
          >
            <TextArea rows={3} placeholder="Description "></TextArea>
          </Form.Item>
          <Form.Item name="mentionUser" label="Mention Users">
            <Select
              mode="multiple"
              placeholder="Select users"
              options={userList.map((x) => {
                return {
                  value: x.id.toString(),
                  label: x.userName,
                  key: x.id.toString(),
                };
              })}
            ></Select>
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
                  Add Markr
                </Button>
              )}

              {elementData && (
                <Button
                  danger
                  onClick={() => {
                    setElementData(null);
                    eventService?.publishMessage(
                      IFrameMessageTypes.DeleteAnnotation,
                      {
                        commentId: "new",
                      }
                    );
                  }}
                  onMouseEnter={() => {
                    if (elementData) {
                      eventService?.publishMessage(
                        IFrameMessageTypes.DrawAnnotation,
                        {
                          commentId: "new",
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
            <Col span={3}>
              <Button
                style={{ padding: "0px", marginLeft: "10px" }}
                type="link"
                onClick={() => {
                  const data = form.getFieldValue("comment");
                  form.setFieldValue("comment", `${data ? data : ""}@`);
                }}
              >
                <HiAtSymbol />
              </Button>
            </Col>
            <Col span={5} offset={2}>
              <Button
                block
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
              <Button htmlType="submit" block type="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTopicForm;
