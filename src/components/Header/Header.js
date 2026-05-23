import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HomeRounded } from "@mui/icons-material";
import Button from "../Button/Button";
import resumeData from "../../utils/resumeData";
import Telegram from "@mui/icons-material/Telegram";
import { useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" sticky="top" className="header">
      <Nav.Link as={NavLink} to="/">
        <Navbar.Brand className="header_home">
          <HomeRounded />
        </Navbar.Brand>
      </Nav.Link>

      <Navbar.Toggle />

      <Navbar.Collapse className="pd-2">
        <Nav className="header_left">
          <Nav.Link
            as={NavLink}
            to="/"
            className={
              location.pathname === "/" ? "header_link_active" : "header_link"
            }
          >
            RESUME
          </Nav.Link>
          {/* <Nav.Link
            as={NavLink}
            to="/portfolio"
            className={
              location.pathname === "/portfolio"
                ? "header_link_active"
                : "header_link"
            }
          >
            PORTFOLIO
          </Nav.Link> */}
          {/* <Nav.Link
            as={NavLink}
            to="/blog"
            className={
              location.pathname === "/blog"
                ? "header_link_active"
                : "header_link"
            }
          >
            BLOG
          </Nav.Link> */}
          <Nav.Link
            as={NavLink}
            to="/contact"
            className={
              location.pathname === "/contact"
                ? "header_link_active"
                : "header_link"
            }
          >
            CONTACT
          </Nav.Link>
        </Nav>
        <div className="header_right">
          {Object.keys(resumeData.socials).map((key) => (
            <a
              href={resumeData.socials[key].link}
              target="_blank"
              rel="noreferrer"
              key={key}
            >
              {resumeData.socials[key].icon}
            </a>
          ))}
          <a href="mailto:syedghani001@gmail.com">
            <Button text={"Hire Me"} icon={<Telegram />} />
          </a>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
