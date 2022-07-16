import React, { useEffect, useState } from "react";
import "./FixedComponents.scss";

import { IconBrace, IconLineup } from "./NavBar";
import { links } from "../MyContacts/MyContacts";
import { transitionLinearGradient } from "../auxFuncs/motion";

export default function LinkBar() {
  //offset and icons size constants..
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
      } else {
        v.classList.add("iconBtn");
      }
    });
    const scrollLimit = [1426, 1800];
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
    transitionLinearGradient(mynavbar, "to bottom", 30);
    window.addEventListener("scroll", scrollFunc);

    return () => window.removeEventListener("scroll", scrollFunc);
  }, []);

  return (
    <div
      className="linkbar"
      style={{
        width: `${perIconWidth + leftOffset * 2}px`,
        height: `450px`,
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
              <a href={link} rel="noreferrer" target="_blank">
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
