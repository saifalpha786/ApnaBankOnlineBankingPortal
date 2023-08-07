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

function EmployeeSideMenu() {
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
              key: "/apnabank/employee/profile",
            icon: <UserOutlined />,
          },
          {
            label: "Transaction Status",
            key: "/apnabank/employee/transactionStatus",
            icon: <PersonSearchIcon />,
          },
          {
            label: "Transaction Management",
              key: "/apnabank/employee/transactionManagement",
            icon: <ManagementIcon/>,
          },
          {
            label: "AboutUs",
            key: "/apnabank/employee/aboutUs",
            icon: <AboutUs/>,
          },
          {
            label: "ContactUs",
            key: "/apnabank/employee/contactUs",
            icon: <ContactUs/>,
          }

        ]}
      ></Menu>
      <Outlet/>
    </div>
  );
}
export default EmployeeSideMenu;