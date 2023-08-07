import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

import bannerImage from "../Images/banner.jpg";
import Regi1 from "../Images/Regi1.jpg";
import { TiTick } from "react-icons/ti";
import {
  MdOutlineAccountBalance,
  MdBusinessCenter,
  MdCastForEducation,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import notification from "../Images/notification.jpg";
import Investment from "../Images/investment.jpg";
import Experience from "../Images/experience.jpg";
import Personalinfo from "../Images/personal-finance-removebg-preview.png";
import { AiOutlineCar, AiOutlineHome } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import GiftExperience from "../Images/gift-card.jpg";
import conceptLanding from "../Images/concept-landing-page.jpg";
// import  Yash from "../Images/yash.jpg"
const BackgroundBanner = () => {
  const [open, setOpen] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Simple.", "Transparent.", "Secure."];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const shouldShowImage = window.innerWidth >= 1000;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: shouldShowImage ? "50% 50%" : "100%",
          height: "622px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            style={{ color: "#055c2d", marginBottom: "2px" }}
          >
            {words.map((word, index) => (
              <span
                key={index}
                style={{
                  opacity: index <= currentWordIndex ? 1 : 0,
                  transition: "opacity 0.5s",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  marginBottom: "4px",
                  "@media (max-width: 470px)": {
                    display: index === 2 ? "block" : "inline-block",
                  },
                }}
              >
                {word}
              </span>
            ))}
            <br />
            <h1 style={{ color: "#0a1023" }}>Banking Solutions</h1>
          </Typography>
          <Typography
            variant="body1"
            component="p"
            style={{ color: "#0a1023", marginBottom: "20px" }}
          >
            Products and services designed to help you reach your financial
            goals.
          </Typography>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              href="/apnabank/signup"
              style={{
                width: "200px",
                borderRadius: "20px",
                backgroundColor: "#861f41",
                color: "#ffffff",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#9f2652",
                },
              }}
            >
              Open Account
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              style={{
                width: "200px",
                borderRadius: "20px",
                backgroundColor: "transparent",
                color: "#861f41",
                border: "2px solid #861f41",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "#861f41",
                  color: "#ffffff",
                },
              }}
            >
              Get in touch
            </Button>
          </div>
        </div>
        {shouldShowImage && (
          <div
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}
      </div>

      {/* Our Partner */}

      {/* Smart Banking */}
      <div className="d-flex justify-content-center mt-4 align-items-center">
        <div className="col-10 col-lg-6 p-3">
          <h3 className="fs-4">Smart Banking</h3>
          <br />
          <h1 className="fw-bold">Real time Notifications</h1>
          <br />
          <p className="fs-5">
            Your customer stay informed in real time with everything that’s
            happening on his account: payments, transfer, advice. Get visibility
            on your customers' flows to anticipate their needs.
          </p>
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle"
              style={{ backgroundColor: "green" }}
            >
              <TiTick color="white" size={24} />
            </div>
            <div>
              <h6> Cards that work all across the world.</h6>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 mt-2">
            <div
              className="rounded-circle "
              style={{ backgroundColor: "green" }}
            >
              <TiTick color="white" size={24} />
            </div>
            <div>
              {" "}
              <h6 className="">
                {" "}
                No ATM fees. No minimum balance. No overdrafts.
              </h6>
            </div>
          </div>
        </div>

        <div className="col-5 d-none d-lg-flex ">
          <img
            className="rounded-circle"
            style={{ width: "90%", height: "90%" }}
            src={notification}
          />
        </div>
      </div>

      {/* Safe Investment */}
      <div className="d-flex justify-content-center mt-4 align-items-center">
        <div className="col-5 d-none d-lg-flex ">
          <img
            className="rounded-circle"
            style={{ width: "90%", height: "90%" }}
            src={Investment}
          />
        </div>
        <div className="col-10 col-lg-6">
          <h3>Safe Investment</h3>
          <br />
          <h1 className="fw-bold">The Better Way to Save & Invest</h1>
          <br />
          <p>
            Bankio helps over 2 million customers achieve their financial goals
            by helping them save and invest with ease. Put that extra cash to
            use without putting it at risk with Bankio.
          </p>
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle"
              style={{ backgroundColor: "green" }}
            >
              <TiTick color="white" size={24} />
            </div>
            <div>
              <h6> Profitable to invest and Handy to manage</h6>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 mt-2">
            <div
              className="rounded-circle "
              style={{ backgroundColor: "green" }}
            >
              <TiTick color="white" size={24} />
            </div>
            <div>
              {" "}
              <h6 className=""> Highest Returns on your investments</h6>
            </div>
          </div>
        </div>
      </div>

      {/* solution */}
      <div className="container mb-4" style={{ maxWidth: "95%" }}>
        <div className="row">
          <div className="d-flex  mt-4 flex-column align-items-center">
            <div className="d-flex justify-content-center">
              <div>
                <h3>Open your account from anywhere in the world</h3>
                <h1 className="fw-bold">Solutions for Every Business Need.</h1>
                <p>
                  Power up your business with a full-stack online bank account
                  that fits your needs.
                </p>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              <div
                className="card d-flex justify-content-center shadow-sm col-lg-4 col-sm-12 "
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body ">
                  <div className="d-flex flex-column align-items-center">
                    <h5 className="card-title ">
                      <MdOutlineAccountBalance size="3rem" />
                    </h5>
                    <Link
                      className="card-subtitle mb-2 text-body-secondary"
                      to="/apnabank/signup"
                    >
                      Current Account
                    </Link>
                  </div>
                  <p className="card-text">
                    Choose from our checking options that allow you to earn
                    interest, avoid fees, and easily manage your account.
                  </p>
                  <a href="#">
                    Open Account <BsArrowRight />{" "}
                  </a>
                </div>
              </div>

              <div
                className="card d-flex justify-content-center shadow-sm col-lg-4 col-sm-12"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body ">
                  <div className="d-flex flex-column align-items-center">
                    <h5 className="card-title ">
                      <MdAccountBalanceWallet size="3rem" />
                    </h5>
                    <Link
                      className="card-subtitle mb-2 text-body-secondary"
                      to="/apnabank/signup"
                    >
                      Saving Account
                    </Link>
                  </div>
                  <p className="card-text">
                    Choose from our checking options that allow you to earn
                    interest, avoid fees, and easily manage your account.
                  </p>
                  <a href="#">
                    Open Account <BsArrowRight />{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banking */}

      <div className="d-flex justify-content-center mt-4 mb-5 align-items-center">
        <div className="col-10 col-lg-6">
          <h3>Banking at Your Fingertips</h3>
          <br />
          <h1 className="fw-bold">Your banking experience anytime, anywhere</h1>
          <br />
          <p>
            Get your money moving with our simple to use, accessible mobile app.
            As good as a bank branch within your phone!
          </p>
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle"
              style={{ backgroundColor: "green" }}
            >
              <TiTick color="white" size={24} />
            </div>
            <div>
              <h6> Funds Transfer ,QR Locker Service</h6>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 mt-2">
            <div
              className="rounded-circle"
              style={{ backgroundColor: "green" }}
            >
              <TiTick color="white" size={24} />
            </div>
            <div>
              <h6> Credit card payments and Loan Service</h6>
            </div>
          </div>
        </div>

        <div className="col-5 d-none d-lg-flex ">
          <img
            className="rounded-circle"
            style={{ width: "90%", height: "90%" }}
            src={Experience}
          />
        </div>
      </div>

      {/* Bankio Card */}
      <div className="container mb-4" style={{ maxWidth: "95%" }}>
        <div className="row g-3">
          <div className="d-lg-flex align-items-center">
            <div className="col-lg-6">
              <Carousel>
                <Carousel.Item>
                  <img
                    style={{ height: "400px", width: "100%" }}
                    className="d-block  "
                    src={GiftExperience}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    style={{ height: "400px", width: "100%" }}
                    className="d-block "
                    src={conceptLanding}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
              <div className="text-center mt-3">
                <Button
                  className="py-3"
                  variant="contained"
                  color="primary"
                  size="medium"
                  href="/apnabank/signup"
                  style={{
                    width: "200px",
                    borderRadius: "40px",
                    backgroundColor: "#861f41",
                    marginBottom: "10px",
                    color: "#ffffff",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#9f2652",
                    },
                  }}
                >
                  Get Started Now
                </Button>
              </div>
            </div>

            <div>
              <div className="text-center">
                <h3>Boost your savings with the right credit card</h3>
                <h1>Access Endless Possibilities with Apna Bank Card</h1>
                <p>
                  All your needs covered with a full range of credit and debit
                  cards.
                </p>
              </div>
              <div className="d-flex gap-2 justify-content-center mb-2">
                <Button
                  className="py-3"
                  variant="contained"
                  color="primary"
                  size="medium"
                  href="/apnabank/signIn"
                  style={{
                    width: "200px",
                    borderRadius: "40px",
                    backgroundColor: "#861f41",
                    color: "#ffffff",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#9f2652",
                    },
                  }}
                >
                  Credit Card
                </Button>
                <Button
                  className="py-3"
                  variant="contained"
                  color="primary"
                  size="medium"
                  href="/apnabank/signIn"
                  style={{
                    width: "200px",
                    borderRadius: "40px",
                    backgroundColor: "#861f41",
                    color: "#ffffff",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#9f2652",
                    },
                  }}
                >
                  Gift Card
                </Button>
              </div>
              <br />

              <div className="d-flex justify-content-lg-end flex-wrap gap-2 align-items-center">
                <div className="card mb-3 h-5 col-lg-5 col-12 shadow">
                  <div className="card-header text-center">
                    <AiOutlineHome size="3rem" />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Secure Card</h5>
                  </div>
                </div>

                <div className="card mb-3  col-lg-5 col-12 Card shadow" style={{background:''}}>
                  <div className="card-header text-center">
                    <AiOutlineCar size="3rem" />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Balance Tranfer</h5>
                  </div>
                </div>

                <div className="card mb-3 col-lg-5 col-12 Card shadow">
                  <div className="card-header text-center">
                    <MdCastForEducation size="3rem" />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Easily Connect</h5>
                  </div>
                </div>

                <div className="card mb-3 col-lg-5 col-12 Card shadow">
                  <div className="card-header text-center">
                    <MdBusinessCenter size="3rem" />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Cash</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Planning */}
      <div className="container mb-4" style={{ maxWidth: "95%" }}>
        <div className="row g-3">
          <div className="d-lg-flex align-items-center">
            <div className="col-lg-6">
              <h3 className="fs-4">Financial Planning</h3>
              <br />
              <h1 className="fw-bold">Let's plan your finances the right way</h1>
              <br />
              <p className="fs-5">
              Lending that doesn't weigh you down.We know how hard is it to start something new, that’s why we have the perfect plan for you.
              </p>
            </div>

            <div className="d-flex justify-content-lg-end flex-wrap gap-2 align-items-center">
              <div className="card mb-3 col-lg-5 col-12 shadow">
                <div className="card-header ">
                  <AiOutlineHome size="3rem" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Home Loan</h5>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      className="rounded-circle"
                      style={{ backgroundColor: "green" }}
                    >
                      <TiTick color="white" size={24} />
                    </div>
                    <div>
                      <h6> Fast Loan Processing</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      className="rounded-circle"
                      style={{ backgroundColor: "green" }}
                    >
                      <TiTick color="white" size={24} />
                    </div>
                    <div>
                      <h6> Fast Loan Processing</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3  col-lg-5 col-12 Card shadow">
                <div className="card-header">
                  <AiOutlineCar size="3rem" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Car Loan</h5>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      className="rounded-circle"
                      style={{ backgroundColor: "green" }}
                    >
                      <TiTick color="white" size={24} />
                    </div>
                    <div>
                      <h6> Competitive rates</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      className="rounded-circle"
                      style={{ backgroundColor: "green" }}
                    >
                      <TiTick color="white" size={24} />
                    </div>
                    <div>
                      <h6> 
Quick Easy</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3 col-lg-5 col-12 Card shadow">
                <div className="card-header">
                  <MdCastForEducation size="3rem" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Educational Loan</h5>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      className="rounded-circle"
                      style={{ backgroundColor: "green" }}
                    >
                      <TiTick color="white" size={24} />
                    </div>
                    <div>
                      <h6> Pay back conveniently</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      className="rounded-circle"
                      style={{ backgroundColor: "green" }}
                    >
                      <TiTick color="white" size={24} />
                    </div>
                    <div>
                      <h6> Fast Loan Processing</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3 col-lg-5 col-12 Card shadow">
                <div className="card-header">
                  <MdBusinessCenter size="3rem" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Business Loan</h5>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      className="rounded-circle"
                      style={{ backgroundColor: "green" }}
                    >
                      <TiTick color="white" size={24} />
                    </div>
                    <div>
                      <h6> Easy Approvals</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      className="rounded-circle"
                      style={{ backgroundColor: "green" }}
                    >
                      <TiTick color="white" size={24} />
                    </div>
                    <div>
                      <h6> Full Assistance</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Loan */}
      <div className="container mb-4" style={{ maxWidth: "95%" }}>
        <div className="row">
          <div className="d-lg-flex align-items-center">
            <div className=" d-none d-lg-flex">
              <img className="w-75" src={Personalinfo} />
            </div>
            <div className="d-flex flex-column justify-content-end">
              <h1>Need a Personalized </h1>
              <h1> Solution?</h1>
              <p>
                Get in touch with us, and we will help you to create the right
                one for your business or personal needs.
              </p>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                href="/apnabank/signup"
                style={{
                  width: "200px",
                  height: "60px",
                  borderRadius: "40px",
                  backgroundColor: "#861f41",
                  color: "#ffffff",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    background: "#1a4dbe",
                  },
                }}
              >
                Open an Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container" style={{ maxWidth: "95%" }}>
        <div className="text-center">
          <h3>Testimonials</h3>
          <h1>Don't take our word for it, take theirs</h1>
          <p>
            Take a look at our past customers success stories. Our goal is to
            help you grow
          </p>
        </div>
        <div className="row">
          <Carousel>
            <Carousel.Item>
              <div className="d-flex flex-lg-row flex-column align-items-center">
                <div className="col-lg-8">
                  <img
                    // style={{ height: "700px", width: "700px" }}
                    className="d-block testimonial_img  "
                    src="https://bankioo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestomonial.3a5eedeb.png&w=640&q=75"
                    alt="Second slide"
                  />
                </div>
                <div className="col-lg-4">
                  <h1 className="fs-1" style={{ color: "powderblue" }}>
                    “
                  </h1>
                  <h4>“ They're the one of the best Bank "Apna Bank”</h4>
                  <p>
                    “  This bank has an awesome team and a dedicated staff. I am very impressed by their vision, hard work, outstanding performance, and wonferful team-mates. Their reputation is well-earned.
                  </p>
                  <h3>Sophie Moore</h3>
                  <h3>United Kingdom</h3>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex flex-lg-row flex-column align-items-center">
                <div className="col-lg-8">
                  <img
                    // style={{ height: "700px", width: "700px" }}
                    className="d-block testimonial_img "
                    src="https://bankioo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftestomonial.3a5eedeb.png&w=640&q=75"
                    alt="Second slide"
                  />
                </div>
                <div className="col-lg-4">
                  <h1 className="fs-1" style={{ color: "powderblue" }}>
                    “
                  </h1>
                  <h4>“I love Apna Bank, they're the best”</h4>
                  <p>
                    “ It's been 2 years since I found Apna Bank, and it's such a
                    relief as a small business owner to not worry about
                    unnecessary fees. I lost my credit card once, and the
                    service was so prompt that I was back to work the next day!
                  </p>
                  <h3>Kanupriya Rathore</h3>
                  <h3>India</h3>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Frequently asked questions */}
      <div className="container mb-4" style={{ maxWidth: "95%" }}>
        <div className="row">
          <div className="d-flex flex-wrap mt-4 flex-column align-items-center">
            <h4>If you have question,we have answer</h4>
            <h1 className="fw-bold">Frequently asked</h1>
            <h1 className="fw-bold">questions</h1>
            <p>
              Get answers to all questions you have and boost your knowledge so
              you can save,
            </p>
            <p>invest and spend smarter. See all questions here!</p>
          </div>
          <div className="d-flex flex-wrap flex-column gap-4 align-items-center">
            <div
              style={{ borderRadius: "10px" }}
              className="border shadow p-3 col-lg-6 col-md-6 col-sm-12  "
            >
              <div className="d-flex  flex-row align-items-center justify-content-between">
                <div className="fw-bold">
                  How do i locate the nearesty branch or ATM ?
                </div>
                {open === 1 ? (
                  <button
                    onClick={() => setOpen(0)}
                    style={{
                      backgroundColor: "#1a4dbe",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  >
                    -
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "#1a4dbe",
                    }}
                    onClick={() => setOpen(1)}
                  >
                    +
                  </button>
                )}
              </div>

              {open === 1 && (
                <div className="">
                  If your card is missing, let us know immediately. We’ll block
                  your card right away send over a new one on the same day.To
                  report a lost or stolen card, call us at (406) 555-0120.
                </div>
              )}
            </div>
            <div
              style={{ borderRadius: "10px" }}
              className="border shadow p-3 col-lg-6 col-md-6 col-sm-12 "
            >
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="fw-bold">
                  What do I do If I lose My Card Or It Get Stolen ?
                </div>
                {open === 2 ? (
                  <button
                    onClick={() => setOpen(0)}
                    style={{
                      backgroundColor: "#1a4dbe",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  >
                    -
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "#1a4dbe",
                    }}
                    onClick={() => setOpen(2)}
                  >
                    +
                  </button>
                )}
              </div>

              {open === 2 && (
                <div className="">
                  If your card is missing, let us know immediately. We’ll block
                  your card right away send over a new one on the same day.To
                  report a lost or stolen card, call us at (406) 555-0120.
                </div>
              )}
            </div>

            <div
              style={{ borderRadius: "10px" }}
              className="border shadow p-3 col-lg-6 col-md-6 col-sm-12"
            >
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="fw-bold">
                  What Is Your Customer Service Number ?
                </div>
                {open === 3 ? (
                  <button
                    onClick={() => setOpen(0)}
                    style={{
                      backgroundColor: "#1a4dbe",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  >
                    -
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "#1a4dbe",
                    }}
                    onClick={() => setOpen(3)}
                  >
                    +
                  </button>
                )}
              </div>

              {open === 3 && (
                <div className="">
                  If your card is missing, let us know immediately. We’ll block
                  your card right away send over a new one on the same day.To
                  report a lost or stolen card, call us at (406) 555-0120.
                </div>
              )}
            </div>

            <div
              style={{ borderRadius: "10px" }}
              className="border shadow p-3 col-lg-6 col-md-6 col-sm-12 "
            >
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="fw-bold">
                  How Do I Reset My Pin for my Account ?
                </div>
                {open === 4 ? (
                  <button
                    onClick={() => setOpen(0)}
                    style={{
                      backgroundColor: "#1a4dbe",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  >
                    -
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "#1a4dbe",
                    }}
                    onClick={() => setOpen(4)}
                  >
                    +
                  </button>
                )}
              </div>

              {open === 4 && (
                <div className="">
                  Choose Forgot PIN or Regenerate ATM PIN option on the menu. You would be redirected to a screen to enter your registered mobile number, which triggers an OTP to that number. Enter the OTP on the screen, and you would be redirected to choose another PIN.
                </div>
              )}
            </div>

            <div
              style={{ borderRadius: "10px" }}
              className="border shadow p-3 col-lg-6 col-md-6 col-sm-12 "
            >
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="fw-bold">
                  What Is Required To Use Digital Banking ?
                </div>
                {open === 5 ? (
                  <button
                    onClick={() => setOpen(0)}
                    style={{
                      backgroundColor: "#1a4dbe",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  >
                    -
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "#1a4dbe",
                    }}
                    onClick={() => setOpen(5)}
                  >
                    +
                  </button>
                )}
              </div>

              {open === 5 && (
                <div className="">
                  Valid email address and phone number. Standard PC or Macintosh (at least 1-GHz processor and 1 GB of RAM) Available browser updates applied for improved security that provides anti-virus and spyware protection.
                </div>
              )}
            </div>

            <div
              style={{ borderRadius: "10px" }}
              className="border shadow p-3 col-lg-6 col-md-6 col-sm-12 "
            >
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="fw-bold">
                  Is Digital Banking Secure for the Peoples ?
                </div>
                {open === 6 ? (
                  <button
                    onClick={() => setOpen(0)}
                    style={{
                      backgroundColor: "#1a4dbe",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "white",
                    }}
                  >
                    -
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "5px",
                      fontSize: "1rem",
                      color: "#1a4dbe",
                    }}
                    onClick={() => setOpen(6)}
                  >
                    +
                  </button>
                )}
              </div>

              {open === 6 && (
                <div className="">
                  Digital Banks Offer End to End Encryptions and Firewall Protection. End-to-end encryption is a program that ensures no third party can steal your information.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Open Account */}
      <div
        className="container align-self-center d-flex mt-4 mb-4 justify-content-center"
        style={{
          height: "250px",
          borderRadius: "10px",
        }}
      >
        <div className="col-10 col-lg-6 align-self-center">
          <h2 className="fw-bold">Ready to get started?</h2>
          <br />
          <p className="fw-bold">
            It only takes a few minutes to register your FREE Apna Bank account.
          </p>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            href="/apnabank/signup"
            style={{
              width: "200px",
              height: "60px",
              borderRadius: "40px",
              backgroundColor: "#861f41",
              color: "#ffffff",
              transition: "background-color 0.3s",
              "&:hover": {
                background: "#1a4dbe",
              },
            }}
          >
            Open an Account
          </Button>
        </div>

        <div className="col-4 d-none d-lg-flex ">
          <img
            style={{ width: "100%", height: "110%" }}
            src="https://bankioo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fget-start.8356bb76.png&w=640&q=75"
          />
        </div>
      </div>
    </>
  );
};

export default BackgroundBanner;