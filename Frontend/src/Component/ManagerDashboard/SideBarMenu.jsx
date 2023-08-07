import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManagementIcon from '@mui/icons-material/Settings';
import { CreditCard } from "@mui/icons-material";
import Loan from '@mui/icons-material/Money';
import Locker from '@mui/icons-material/LockRounded';
import AboutUs from '@mui/icons-material/Info';
import ContactUs from '@mui/icons-material/ContactPage';

function ManagerSideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu" style={{display: 'flex'}}>
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Profile",
              key: "/apnabank/manager/profile",
            icon: <UserOutlined />,
          },
          {
            label: "Customer Status",
            key: "/apnabank/manager/customerStatus",
            icon: <PersonSearchIcon />,
          },
          {
            label: "Customer Management",
              key: "/apnabank/manager/customerManagement",
            icon: <ManagementIcon/>,
          },
          {
            label: "Loan Management",
              key: "/apnabank/manager/loanManagement",
            icon: <Loan/>,
          },
          {
            label: "Credit Card Management",
              key: "/apnabank/manager/creditCardManagement",
            icon: <CreditCard/>,
          },{
            label: "Locker Management",
              key: "/apnabank/manager/lockerManagement",
            icon: <Locker/>,
          },
          {
            label: "AboutUs",
            key: "/apnabank/manager/aboutUs",
            icon: <AboutUs/>,
          },
          {
            label: "ContactUs",
            key: "/apnabank/manager/contactUs",
            icon: <ContactUs/>,
          }

        ]}
      ></Menu>
      <Outlet/>
    </div>
  );
}
export default ManagerSideMenu;