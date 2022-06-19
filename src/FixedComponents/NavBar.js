import React, { useEffect, useState } from "react";
import "./FixedComponents.scss";
import { ReactComponent as AboutMeIcon } from "../data/icons/AboutMe.svg";
import { ReactComponent as ProjectsIcon } from "../data/icons/Projects.svg";
import { ReactComponent as ExpIcon } from "../data/icons/Work.svg";

export default function NavBar() {
  const sections = [
    {
      title: "About Me",
      link: "#myprofile",
      icon: AboutMeIcon,
    },
    {
      title: "Projects",
      link: "#myworks",
      icon: ProjectsIcon,
    },
    {
      title: "Resume",
      link: "#myresume",
      icon: ExpIcon,
    },
  ];
  useEffect(() => {
    const changeToRed = (e) => {
      let mynavbar = document.getElementsByClassName("navbar")[0];
      window.scrollY === 0
        ? (mynavbar.style.backgroundColor = "red")
        : (mynavbar.style.backgroundColor = "blue");
    };
    window.addEventListener("scroll", changeToRed);

    return () => window.removeEventListener("scroll", changeToRed);
  }, []);
  const [active, setActive] = useState("About Me");
  const activateBtn = (e) => {
    e.preventDefault();
    setActive(e.target.innerText);
    let scrollTo =
      document
        .getElementById(e.target.href.match(/#\w+/gi)[0].slice(1))
        .getBoundingClientRect().y + document.documentElement.scrollTop;
    window.scrollTo(0, scrollTo);
    console.log(scrollTo);
  };
  return (
    <div className="navbar">
      <ul>
        {sections.map(({ title, link, icon: Icon }, vi) => (
          <li key={vi}>
            <a
              href={link}
              onClick={activateBtn}
              className={`navbtn${
                title.localeCompare(active) === 0 ? " navactive" : ""
              }`}
            >
              {/* {title} */}
              <Icon width="70%" height="auto" />
              <br />
              <p>.</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
