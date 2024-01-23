/* eslint-disable jsx-a11y/anchor-is-valid */
import "./index.scss";
import React, { FC, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useEvent } from "../../contexts/EventContext";
import { IFrameMessageTypes } from "../../enums/IFrameMessageTypes";
import { PlusOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Typography,
  Space,
  Button,
  Tooltip,
} from "antd";
import { CiLogout } from "react-icons/ci";
import { RiSideBarFill } from "react-icons/ri";
import { AiOutlineLeft } from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

type NavbarProps = {
  onBack?: () => void;
  onAdd?: () => void;
};
const Navbar: FC<NavbarProps> = ({ onBack, onAdd }) => {
  const { eventService } = useEvent();
  const { currentUser, handleLogout } = useAuth();
  const [direction, setDirection] = useState<"rtl" | "ltr">("ltr");

  const handleChangeDirection = () => {
    eventService?.publishMessage(IFrameMessageTypes.ToggleDirection, null);
    setDirection(direction === "ltr" ? "rtl" : "ltr");
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout} icon={<CiLogout />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="navbar">
      <Space>
        {onBack && (
          <Button shape="round" onClick={onBack} icon={<AiOutlineLeft />}>
            Back
          </Button>
        )}
        {onAdd && (
          <Button
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAdd}
          ></Button>
        )}
      </Space>

      <Space>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ marginRight: 4 }}>
            {currentUser?.user.name} {currentUser?.user.surname}{" "}
          </Text>
          <Tooltip title="Change Direction">
            <Button
              shape="circle"
              style={{
                transform:
                  direction !== "rtl" ? "rotate(180deg)" : "rotate(0deg)",
              }}
              icon={
                <RiSideBarFill
                  size={24}
                  style={{ backgroundColor: "#f6f6f6" }}
                />
              }
              onClick={handleChangeDirection}
            />
          </Tooltip>
        </div>

        <Dropdown
          overlay={menu}
          trigger={"click" as any}
          placement="bottomRight"
        >
          <Avatar
            style={{ backgroundColor: "#42dcc8" }}
            icon={<UserOutlined />}
          />
        </Dropdown>
        <Button
          onClick={() => {
            eventService?.publishMessage(IFrameMessageTypes.CloseSidebar, null);
          }}
          className="closeButton"
          shape="circle"
        >
          <span>X</span>
        </Button>
      </Space>
    </Header>
  );
};

export default Navbar;
