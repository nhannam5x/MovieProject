import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/setting";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  FileOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import Logo from "../../assets/images/logo/logo.svg";
import "./_AdminTemplate.scss";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
  //path, exact, Component

  const { Component, ...restProps } = props;
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    // console.log(collapsed);
    setCollapsed(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to='/' />;
  }

  if (userLogin.maLoaiNguoiDung == "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to='/' />;
  }

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          {" "}
          {/* Profile */}
          <button
            className='mr-3'
            onClick={() => {
              history.push("/profile");
            }}
          >
            {" "}
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className='text-2xl ml-5 rounded-full bg-red-200 admin__logo'
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
          </button>{" "}
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(ACCESS_TOKEN);
              history.push("/home");
              window.location.reload();
            }}
            className='admin__dangxuat'
          >
            Đăng xuất
          </button>{" "}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location,props.history,props.match

        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className='logo p-5'>
                  <img src={Logo} alt='logo' />
                </div>
                <Menu
                  theme='dark'
                  defaultSelectedKeys={["1"]}
                  mode='inline'
                  className='admin__menu'
                >
                  {/* Quản lý người dùng */}
                  <SubMenu
                    key='sub1'
                    icon={<UserOutlined />}
                    title='Quản Lý Người Dùng'
                  >
                    <Menu.Item key='10' icon={<UnorderedListOutlined />}>
                      <NavLink to='/admin/users'>Danh Sách Người Dùng</NavLink>
                    </Menu.Item>
                    <Menu.Item key='11' icon={<PlusOutlined />}>
                      <NavLink to='/admin/users/addusers'>
                        Thêm Người Dùng
                      </NavLink>
                    </Menu.Item>
                  </SubMenu>
                  {/* Quản lý phim */}
                  <SubMenu
                    key='sub2'
                    icon={<FileOutlined />}
                    title='Quản Lý Phim'
                  >
                    <Menu.Item key='10' icon={<UnorderedListOutlined />}>
                      <NavLink to='/admin/films'>Danh Mục Phim</NavLink>
                    </Menu.Item>
                    <Menu.Item key='11' icon={<PlusOutlined />}>
                      <NavLink to='/admin/films/addnew'>Thêm Phim</NavLink>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout className='site-layout'>
                <Header className='bg-opacity-40' style={{ padding: 0 }}>
                  <div className='text-right pr-10 pt-1'>{operations}</div>
                </Header>
                <Content>
                  <Breadcrumb></Breadcrumb>
                  <div
                    className='site-layout-background'
                    style={{ padding: 10, minHeight: "85vh" }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
