import { Button, Form, Input, Modal, Row, Tooltip } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBaseMutation } from "../../hooks/query/_Base";
import { ILoginFormValues } from "./types";
import { Authenticate } from "../../services/uiServices/AuthService";
import { useAuth } from "../../contexts/AuthContext";
import { CurrentUserInfo } from "../../services/uiServices/ProfileServie";
import { IUserUIModel } from "../../models/uiModel/userUIModel";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const { handleLogin, handleSetCurrentUser } = useAuth();

  const { mutate, isLoading } = useBaseMutation({
    service: Authenticate,
    onSuccess: {
      callback: (data) => {
        handleLogin(data.accessToken, true);
        currentUserMutate({});
      },
    },
  });

  const { mutate: currentUserMutate } = useBaseMutation({
    service: CurrentUserInfo,
    onSuccess: {
      callback: (data) => {
        const _data: IUserUIModel = {
          tenant: data.tenant,
          user: data.user,
        };

        handleSetCurrentUser(_data);
        navigate("/");
      },
    },
  });

  const onFinish = async (value: ILoginFormValues) => {
    mutate({
      password: value.password,
      userNameOrEmailAddress: value.userNameOrEmailAddress,
      tenancyName: value.tenancyName,
    });
  };

  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Form
      style={{ marginTop: "200px", padding: "0 12px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      initialValues={{
        tenancyName: "Default",
        tempTenancyName: "Default",
      }}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Row justify={"center"} style={{ marginBottom: "50px" }}>
        <span className="text-muted text-primary" onClick={modalToggle}>
          Tenancy Name :
          <Tooltip title="Change Tenant">
            <Link to={"#"}>{form.getFieldValue("tenancyName")}</Link>
          </Tooltip>
        </span>
      </Row>
      <Form.Item name="userNameOrEmailAddress" rules={[{ required: true }]}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Row justify={"space-between"}>
        <Button
          className="loginButton btn btn-block w-100"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Login
        </Button>
        <span style={{ lineHeight: "36px" }}>
          Forgot your password?
          <Link to={"#"}> Reset it here</Link>
        </span>
      </Row>
      <Row justify={"center"} style={{ marginTop: "50px" }}>
        <span className="text-muted">
          <Link to={"/signup"}> Create new account</Link>
        </span>
      </Row>
      <Modal
        title="Tenancy Name"
        open={modalVisible}
        onCancel={modalToggle}
        onOk={() => {
          form.setFieldsValue({
            tenantName: form.getFieldValue("tempTenancyName"),
          });
          modalToggle();
        }}
      >
        <Form.Item name="tempTenancyName">
          <Input placeholder="Tenancy Name" />
        </Form.Item>
      </Modal>
      <Form.Item
        name="tenancyName"
        rules={[{ required: false }]}
        hidden
      ></Form.Item>
    </Form>
  );
};

export default LoginForm;
