import React, { useEffect, useState } from "react";
import "./FixedComponents.scss";
import { ReactComponent as EmailIcon } from "../data/icons/Email.svg";
import { ReactComponent as LinkedInIcon } from "../data/icons/Linkedin.svg";
import { ReactComponent as GithubIcon } from "../data/icons/Github.svg";
import { ReactComponent as CVIcon } from "../data/icons/CV.svg";
import { IconBrace, IconLineup } from "./NavBar";

export default function LinkBar() {
  const links = [
    { image: "email", link: "www.gmail.com", icon: EmailIcon },
    { image: "linkedin", link: "www.linkedin.com", icon: LinkedInIcon },
    { image: "github", link: "www.github.com", icon: GithubIcon },
    { image: "cv", link: "www.pdf.com", icon: CVIcon },
  ];

  //offset and icons size constants..
  const bottomOffset = 20;
  const perIconHeight = 58;
  const perIconWidth = 30;
  const leftOffset = 15;
  const dropDist = 350;
  //...

  //set brace ratio
  const [braceRatio, setRatio] = useState(1);

  useEffect(() => {
    //IT HURTS ME IN MY BONES TO KILL THIS BUT UNFORTUNATELY IT JUST DOESN'T LOOK AS GOOD AS i HAD HOPED.
    const mynavbar = document.querySelector(".linkbar");
    const mybts = mynavbar.querySelectorAll("li");
    mybts.forEach((v, vi, li) => {
      v.style.left = "15px";

      if (!v.querySelector("svg").classList.contains("icon")) {
        v.style.height = `${parseInt(perIconHeight / 2)}px`;
      }
    });
    const scrollLimit = [1350, 1800];
    const scrollRange = scrollLimit[1] - scrollLimit[0];
    /*const aspectRatio = 0.8;
    const stretchFactor = 3;
    const navOffsetLeft =
      (document.body.scrollWidth - scrollRange * stretchFactor - 100) /
      (2 * scrollRange * stretchFactor);
    const navOffsetBottom = 0.3;
    const btStats = [
      scrollRange * (1 + navOffsetLeft),
      scrollRange * (2 / 3 + navOffsetLeft),
      scrollRange * (1 / 3 + navOffsetLeft),
      scrollRange * navOffsetLeft,
    ];*/
    const scrollFunc = (e) => {
      let y = window.scrollY;

      y = Math.max(y, scrollLimit[0]);
      y = scrollRange - (Math.min(y, scrollLimit[1]) - scrollLimit[0]);
      setRatio(y / scrollRange);

      mybts.forEach((v, vi, li) => {
        //dropping icons according to y
        v.style.bottom = `${parseInt(
          ((perIconHeight * 2) / 3) * Math.floor((li.length - vi) / 2) +
            perIconHeight * Math.ceil((li.length - vi) / 2) -
            25 -
            (1 - y / scrollRange) * dropDist
        )}px`;
      });
      //setting the dimensions of the navdiv
    };
    scrollFunc();
    window.addEventListener("scroll", scrollFunc);

    return () => window.removeEventListener("scroll", scrollFunc);
  }, []);
  return (
    <div
      className="linkbar"
      style={{
        width: `${perIconWidth + leftOffset * 2}px`,
        height: `${bottomOffset * 2 + perIconHeight * links.length}px`,
      }}
    >
      <IconLineup
        length={(1 - braceRatio) * dropDist}
        inv={true}
        height={410}
      />

      <ul>
        {links.map(({ link, icon: Icon }, li) => (
          <React.Fragment key={li}>
            <li
              style={{
                left: `${leftOffset}px`,
              }}
            >
              <a href={link}>
                <Icon className="icon" />
              </a>
            </li>
            <IconBrace width={Math.max(0, braceRatio - 0.5) * 200} height={0} />
            <div className="curtains">
              <svg width="60px">
                <line
                  x1={`${
                    50 -
                    parseInt(
                      Math.min(1, (1 - Math.abs(0.5 - braceRatio) * 2) * 2) * 40
                    )
                  }%`}
                  y1="5%"
                  x2={`${
                    50 +
                    parseInt(
                      Math.min(1, (1 - Math.abs(0.5 - braceRatio) * 2) * 2) * 40
                    )
                  }%`}
                  y2="5%"
                  style={{
                    stroke: "white",
                    strokeWidth: "4px",
                    strokeLinecap: "round",
                  }}
                />
              </svg>
            </div>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
