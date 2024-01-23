import { Button, Form, Input, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";

const LoginForm = () => {
  const onFinish = async () => {};

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Form
      style={{ marginTop: "200px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true, tenantName: "Default" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="registrationKey" rules={[{ required: false }]}>
        <Input
          id="plugin-name-input"
          placeholder="Registration Key"
          suffix={
            <Tooltip title="This code for Tenant Account.">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
      </Form.Item>
      <Form.Item name="Email" rules={[{ required: true }]}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="Password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Row justify={"space-between"}>
        <Button
          className="loginButton btn btn-block w-100"
          type="primary"
          htmlType="submit"
        >
          Sign Up
        </Button>
        <span className="text-muted">
          Do you have an account
          <Link to={"/login"}> Login it here</Link>
        </span>
      </Row>
    </Form>
  );
};

export default LoginForm;
