import React, { useState } from "react";
import "./FixedComponents.css";

export default function NavBar() {
  const sections = [
    { title: "About Me", link: "#myprofile" },
    { title: "Projects", link: "#myworks" },
    { title: "Resume", link: "#myresume" },
  ];
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
        {sections.map(({ title, link }, vi) => (
          <li key={vi}>
            <a
              href={link}
              onClick={activateBtn}
              className={`navbtn${
                title.localeCompare(active) === 0 ? " navactive" : ""
              }`}
            >
              {/* {title} */ "."}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
