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
import GiftCard from '@mui/icons-material/CardGiftcard';
import AboutUs from '@mui/icons-material/Info';
import ContactUs from '@mui/icons-material/ContactPage';
import Weather from '@mui/icons-material/Newspaper';
function CustomerSideMenu() {
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
              key: "/apnabank/customer/profile",
            icon: <UserOutlined />,
          },
          {
            label: "Account Management",
            key: "/apnabank/customer/accountManagement",
            icon: <PersonSearchIcon />,
          },
          {
            label: "Credit Card",
              key: "/apnabank/customer/creditCard",
            icon: <CreditCard/>,
          },
          {
            label: "Loan",
              key: "/apnabank/customer/loanManagement",
            icon: <Loan/>,
          },
          {
            label: "Gift Card",
            key: "/apnabank/customer/giftCard",
            icon: <GiftCard/>,
          },
          {
            label: "Locker",
            key: "/apnabank/customer/locker",
            icon: <Locker/>,
          },
          {
            label: "AboutUs",
            key: "/apnabank/customer/aboutUs",
            icon: <AboutUs/>,
          },
          {
            label: "ContactUs",
            key: "/apnabank/customer/contactUs",
            icon: <ContactUs/>,
          },
          {
            label: "Weather & News",
            key: "/apnabank/customer/news",
            icon: <Weather/>,
          }

        ]}
      ></Menu>
      <Outlet/>
    </div>
  );
}
export default CustomerSideMenu; 