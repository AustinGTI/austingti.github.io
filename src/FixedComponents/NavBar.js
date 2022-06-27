import React, { useEffect, useState } from "react";
import "./FixedComponents.scss";
import { ReactComponent as AboutMeIcon } from "../data/icons/AboutMe.svg";
import { ReactComponent as ProjectsIcon } from "../data/icons/Projects.svg";
import { ReactComponent as ExpIcon } from "../data/icons/Work.svg";
import { ReactComponent as ContactIcon } from "../data/icons/ContactB.svg";

export function IconBrace({ width, height }) {
  //const [ratio, setRatio] = useEffect(1);
  const braceSize = 0.3;
  width = width * braceSize;
  height = height * braceSize;

  // useEffect(() => {
  //   let mybraces = document.querySelectorAll(".navbar svg.brace");
  // }, [ratio, setRatio]);
  return (
    <li>
      <svg className="brace" width="30px" height="30px">
        <line
          x1={`${parseInt(50 - width / 2)}%`}
          y1={`${parseInt(50 - height / 2)}%`}
          x2={`${parseInt(50 + width / 2)}%`}
          y2={`${parseInt(50 + height / 2)}%`}
          style={{
            stroke: "white",
            strokeWidth: "4px",
            strokeLinecap: "round",
          }}
        />
      </svg>
    </li>
  );
}

export function IconLineup({ length, inv = false, height = 300, width = 30 }) {
  return (
    <div className="lineup">
      <svg width={`${width}px`} height={`${height}px`}>
        <line
          x1="50%"
          y1={`${inv ? 10 : height - 10}px`}
          x2="50%"
          y2={`${inv ? 10 + length : height - 10 - length}px`}
          style={{
            stroke: "white",
            strokeLinecap: "round",
            strokeWidth: "4px",
          }}
        />
      </svg>
    </div>
  );
}

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
    {
      title: "Contact",
      link: "#mycontacts",
      icon: ContactIcon,
    },
  ];
  //constant values denoting the positioning of the navbar
  const topOffset = 20;
  const perIconHeight = 100;
  const perIconWidth = 40;
  const rightOffset = 15;
  //...

  //change the width and height of the bracers depending on position
  const [braceRatio, setRatio] = useState(1);

  //transform to slide from vertical to horizontal at the top of the page
  useEffect(() => {
    const mynavbar = document.querySelector(".navbar");
    const mybts = mynavbar.querySelectorAll("li");
    mybts.forEach((v, vi) => {
      v.style.width = "75px";

      if (vi % 2) {
        let titlediv = v.querySelector("div.title");
        titlediv.style.paddingTop = `${parseInt(
          40 - v.querySelector("svg").getBoundingClientRect().height
        )}px`;
      }
    });

    const scrollLimit = [100, 450];
    const scrollRange = scrollLimit[1] - scrollLimit[0];
    const aspectRatio = 0.9;
    const navOffsetRight = 0.15;
    const navOffsetTop = 0.05;

    const btStats = Array.from(Array(mybts.length).keys()).map(
      (v, vi, li) =>
        scrollRange * (1 - vi * (1 / (li.length - 1)) + navOffsetRight)
    );

    /*const btStats = [
      scrollRange * (1 + navOffsetRight),
      scrollRange * (0.5 + navOffsetRight),
      scrollRange * navOffsetRight,
    ];*/

    const scrollFunc = (e) => {
      let y = window.scrollY;

      y = Math.max(y, scrollLimit[0]);
      y = Math.min(y, scrollLimit[1]) - scrollLimit[0];
      setRatio(y / scrollRange);
      y *= 1 + navOffsetRight;
      var maxDims = [0, 0];

      mybts.forEach((v, vi) => {
        //set the title of the icon when at the top
        if (vi % 2) {
          let title = sections[Math.floor(vi / 2)].title;
          v.querySelector("div.title").innerText = title.slice(
            0,
            parseInt(
              (1 - y / (1 + navOffsetRight) / scrollRange) * title.length
            )
          );
        }

        //calculating top and right offsets
        if (y > btStats[vi]) {
          let ttRightOffset =
            scrollRange -
            vi * parseInt(scrollRange / (mybts.length - 1)) -
            btStats[vi] +
            rightOffset +
            parseInt(navOffsetRight * scrollRange);
          let ttTopOffset =
            (y - btStats[vi]) * aspectRatio +
            topOffset +
            Math.max(0, scrollRange - y / (1 + navOffsetRight)) * navOffsetTop;

          //setting top and right offsets
          v.style.right = `${parseInt(ttRightOffset)}px`;
          v.style.top = `${ttTopOffset}px`;

          //set the minimum dimensions of the enclosing div
          maxDims = maxDims.map((v, vi) =>
            Math.max(v, vi === 0 ? ttRightOffset : ttTopOffset)
          );
        } else {
          //calculating top and right offsets
          let ttRightOffset =
            scrollRange -
            y -
            vi * parseInt(scrollRange / (mybts.length - 1)) +
            rightOffset +
            parseInt(navOffsetRight * scrollRange);
          let ttTopOffset =
            topOffset +
            Math.max(0, scrollRange - y / (1 + navOffsetRight)) * navOffsetTop;

          //setting top and right offsets
          v.style.right = `${parseInt(ttRightOffset)}px`;
          v.style.top = `${ttTopOffset}px`;

          //set the minimum dimensions of the enclosing div
          maxDims = maxDims.map((v, vi) =>
            Math.max(v, vi === 0 ? ttRightOffset : ttTopOffset)
          );
        }
      });
      //setting the dimensions of the navdiv
      mynavbar.style.width = `${maxDims[0] + perIconWidth + rightOffset}px`;
      mynavbar.style.height = `${maxDims[1] + perIconHeight + topOffset}px`;
    };
    scrollFunc();
    window.addEventListener("scroll", scrollFunc);

    return () => window.removeEventListener("scroll", scrollFunc);
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
  };

  return (
    <div className="navbar">
      <ul>
        {sections.map(({ title, link, icon: Icon }, vi) => (
          <React.Fragment key={vi}>
            <IconBrace
              width={vi !== 0 ? Math.max(0, braceRatio - 0.5) * 200 : 0}
              height={vi !== 0 ? (1 - Math.min(1, braceRatio + 0.5)) * 200 : 0}
            />
            <li>
              <a
                href={link}
                onClick={activateBtn}
                className={`navbtn${
                  title.localeCompare(active) === 0 ? " navactive" : ""
                }`}
              >
                {/* {title} */}
                <Icon className="icon" />
                <div className="title mono primary"></div>
              </a>
            </li>
          </React.Fragment>
        ))}
      </ul>
      <IconLineup length={(1 - braceRatio) * 355} width={75} height={400} />
    </div>
  );
}
