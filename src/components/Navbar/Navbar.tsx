import React, { useState } from "react";
import Truck from "../assets/icons/Truck";
import FaceBook from "../assets/icons/FaceBook";
import LinkedIn from "../assets/icons/LinkedIn";
import Twitter from "../assets/icons/Twitter";
import Insta from "../assets/icons/Insta";
import "./Navbar.css";
import Star from "../assets/icons/Star";
import ExpandMenu from "../assets/icons/ExpandMenu";
import Cross from "../assets/icons/Cross";
import heroImg from "../assets/imgs/heroImg.png";
import LinkArrow from "../assets/icons/LinkArrow";

// array for making navbars links
const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  {
    name: "Our Products",
    id: "product",
    child: [
      { name: "Product 1", id: "p1" },
      { name: "Product 2", id: "p2" },
      { name: "Product 3", id: "p3" },
      { name: "Product 4", id: "p4" },
    ],
  },
  { name: "Contact Us", id: "contact" },
];

const Navbar = () => {
  // state for handeling the active link
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isExapndable, setIsExpandable] = useState<boolean>(false);

  //   Method for handeling the click of link
  const openLink = (id: string) => {
    if (activeLink === id) {
      setActiveLink(null);
    } else setActiveLink(id);
  };

  return (
    <>
      <div className="announcement--bar">
        <span className="truck--container">
          <Truck /> Free Delivery |{" "}
          <a href="#" className="link">
            Return Policy
          </a>
        </span>
        <div className="right--container">
          <a href="#" className="link login">
            Login
          </a>
          <div className="links--container">
            <a href="#" className="link follow">
              Follow US
            </a>
            <a href="#" className="link">
              <FaceBook />
            </a>
            <a href="#" className="link">
              <LinkedIn />
            </a>
            <a href="#" className="link">
              <Twitter />
            </a>
            <a href="#" className="link">
              <Insta />
            </a>
          </div>
        </div>
      </div>
      <div className="main--container">
        <div className="heading--container">
          <div className="heading--container--left">
            <h2>ShopKart</h2>
          </div>
          <div className="heading--container--right">
            <h4>WISHLIST (0) </h4>
            <h4>BAG (0) </h4>
          </div>
          <div
            className="expandable--column"
            onClick={() => {
              setIsExpandable(!isExapndable);
            }}
          >
            {!isExapndable ? <ExpandMenu /> : <Cross />}
          </div>
        </div>
        <div className="designer--break">
          <div className="star--container">
            <Star />
          </div>
        </div>
        <div
          className={`${
            isExapndable
              ? "navbar--expandable--conatiner"
              : "navbar--links--container"
          }`}
        >
          {navLinks.map((item) => (
            <div
              key={item.id}
              className={`${
                activeLink === item.id
                  ? "active--navbar--links"
                  : "navbar--links"
              }`}
            >
              <div
                className={`${activeLink === item.id ? "active--link" : ""}`}
                onClick={() => openLink(item.id)}
              >
                {item.name.toLocaleUpperCase()}
              </div>
              {item.child && activeLink === item.id && (
                <div className="sublink--container">
                  {item.child.map((sublink) => (
                    <div key={sublink.id} className="navbar--sublinks">
                      {sublink.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hero--image--section">
          <div className="hero--image--heading--container">
            <h1 className="image--heading">Fresh</h1>
            <h1 className="image--heading hollow--design">2022</h1>
            <h1 className="image--heading">Look</h1>
          </div>
          <div className="hero--image--container">
            <img src={heroImg} className="hero--image" alt="heroimg.png" />
          </div>
        </div>
        <div className="see--more--container">
          <a
            href="#"
            className="link"
            style={{ fontSize: "18px", color: "#FFF", cursor: "pointer",margin:"auto" }}
          >
            See more <LinkArrow />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
