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
import LockerIcon from '@mui/icons-material/LockPerson';
import GiftCard from '@mui/icons-material/CardGiftcard';
import AboutUs from '@mui/icons-material/Info';
import ContactUs from '@mui/icons-material/ContactPage';

function ContentWriterSideMenu() {
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
              key: "/apnabank/contentWriter/profile",
            icon: <UserOutlined />,
          },
          {
            label: "Add Content",
            icon: <HowToRegIcon />,
            key: "/apnabank/contentWriter/dashboard",
          },
          {
            label: "AboutUs",
              key: "/apnabank/contentWriter/aboutUs",
              icon: <AboutUs/>,
          },
          {
            label: "ContactUs",
              key: "/apnabank/contentWriter/contactUs",
              icon: <ContactUs/>,
          }
        ]}
      ></Menu>
      <Outlet/>
    </div>
  );
}
export default ContentWriterSideMenu;