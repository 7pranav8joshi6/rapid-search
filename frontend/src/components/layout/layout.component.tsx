import { Avatar, Dropdown, Layout, Menu, MenuProps, Spin } from "antd";
import { Key, ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from "react-router-dom";
import { RouteMenu } from "../../contants/routes.constant";
import authService from "../../service/auth.service";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { AtomLoggedUser } from "../../store/auth.store";
import SubscriptionModal from "../subscriptionModal/subscriptionModal.component";
import { SubscriptionDTO } from "../../Model/userDetails.model";
import SubscriptionService from "../../service/subscribe.service";
import { AtomSubscriptionList } from "../../store/global.store";
import { UserOutlined } from "@ant-design/icons";
import { BiArrowToBottom, BiArrowToTop, BiLogOut } from "react-icons/bi";
import { isSubHelper } from "../../helper/auth.helper";

type Props = {
  children?: ReactNode;
};
type MenuItem = Required<MenuProps>["items"][number];

const PageLayout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const resetUser = useResetRecoilState(AtomLoggedUser);
  const navigate = useNavigate();
  const { LogoutService } = authService();
  const { subscribePlan } = SubscriptionService();
  const [loggedUser, setLoggedUser] = useRecoilState(AtomLoggedUser);
  const subscriptions = useRecoilValue(AtomSubscriptionList);
  const [paymentType, setPaymentType] = useState(
    "SUBSCRIBE" || "UPGRADE" || "DOWNGRADE"
  );

  useEffect(() => {
    if (Object.keys(loggedUser)?.length > 0 && !loggedUser?.isSubscribed) {
      const _open = isSubHelper(loggedUser, setLoading);
      setOpen(_open);
    }
  }, [loggedUser]);

  function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    onClick?: any
  ): MenuItem {
    return {
      key,
      icon,
      label,
      onClick,
    } as MenuItem;
  }

  const handleCardClick = (subscriptionPlan: SubscriptionDTO) => {
    subscribePlan({
      loggedUser,
      setOpen,
      subscriptionPlan,
      setLoggedUser,
      paymentType: paymentType ?? "SUBSCRIBE",
    });
  };

  const { Header, Content, Footer, Sider } = Layout;

  const sidebarItems: MenuItem[] = RouteMenu.map((item) => {
    return getItem(item.label, item.key, item.icon, () => {
      navigate(item.route);
    });
  });

  const items: MenuProps["items"] = [
    {
      key: "updatePlan",
      icon: <BiArrowToTop size={20} />,
      label: "Upgrade Plan",
      onClick: () => upgradePlan(),
      disabled: loggedUser.searchCount === null ? true : false,
    },
    {
      key: "downGradePlan",
      icon: <BiArrowToBottom size={20} />,
      label: "Downgrade plan",
      onClick: () => downGradePlan(),
    },
  ];

  const LogoutItem: MenuProps["items"] = [
    {
      key: "Logout",
      icon: <BiLogOut size={20} />,
      label: "Logout",
      onClick: () => LogoutService({ resetUser }),
    },
  ];

  const upgradePlan = () => {
    setOpen(true);
    console.log("upGrade Plan Event");
    setCloseIcon(true);
    setPaymentType("UPGRADE");
  };

  const downGradePlan = () => {
    setOpen(true);
    console.log("upGrade Plan Event");
    setCloseIcon(true);
    setPaymentType("DOWNGRADE");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Spin spinning={loading}>
      <Layout style={{ minHeight: "100vh", padding: "0" }}>
        <ToastContainer />
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu theme="dark" mode="inline" items={sidebarItems} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0 1rem",
              background: "#9ab6ed",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h1>Rapid Api Response</h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  height: "2rem",
                }}
              >
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                >
                  <div
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    Search Count :{" "}
                    <span style={{ fontWeight: 700 }}>
                      {loggedUser?.searchCount === null
                        ? "Unlimited search"
                        : loggedUser.searchCount}
                    </span>
                  </div>
                </Dropdown>

                <Dropdown
                  menu={{ items: LogoutItem }}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      height: "2rem",
                    }}
                  >
                    <Avatar size={50} icon={<UserOutlined />} />
                    <h3>{loggedUser?.name}</h3>
                  </div>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <>
              {!loading && open ? (
                <SubscriptionModal
                  closeIcon={closeIcon}
                  open={open}
                  loading={loading}
                  handleCardClick={handleCardClick}
                  subscriptions={subscriptions}
                  onClose={handleClose}
                  loggedUser={loggedUser}
                />
              ) : (
                ""
              )}
              {children}
              <Outlet />
            </>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default PageLayout;
