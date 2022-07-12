import React, { useEffect, useMemo, useCallback, useReducer } from "react";

import { ReactComponent as EmailIcon } from "../data/icons/Email.svg";
import { ReactComponent as LinkedInIcon } from "../data/icons/Linkedin.svg";
import { ReactComponent as GithubIcon } from "../data/icons/Github.svg";
import { ReactComponent as CVIcon } from "../data/icons/CV.svg";

import "./MyContacts.scss";

export const links = [
  {
    title: "email",
    link: "mailto:gathiiaustin@gmail.com",
    icon: EmailIcon,
    quotes: ["Say Hello..."],
  },
  {
    title: "linkedin",
    link: "https://linkedin.com/in/austin-gathii",
    icon: LinkedInIcon,
    quotes: ["Take a look at my linkedIn page..."],
  },
  {
    title: "github",
    link: "https://github.com/AustinGTI",
    icon: GithubIcon,
    quotes: ["Go through my code..."],
  },
  {
    title: "CV",
    link: require("../data/contacts/cv_2022.pdf"),
    icon: CVIcon,
    quotes: ["Download my CV..."],
  },
];

export default function MyContacts() {
  const [mainLink, setLink] = useReducer(
    (state, action) =>
      action.type == "inc" ? (state + 1) % links.length : action.val,
    0
  );

  const transitionElem = useCallback(function (to) {
    const animSettings = {
      animId: undefined,
      duration: 1000,
      perFrame: 30,
      currFrame: 0,
    };
    //transition the quote
    const quoteElem = document.querySelector("div#mycontacts > h2");

    let myQuote = links[to].quotes[0]; //0 for now soon will be randomized...
    let prevQuote = quoteElem.innerText;
    let ttLen = myQuote.length + prevQuote.length;

    //transition the brace
    const mybrace = document.querySelector("div.bracespace > div");

    const noReg = /[\d.-]+/;
    let currPos = parseFloat(mybrace.style.left.match(noReg));
    let toPos = 100 / links.length / 2 + (100 / links.length) * to;

    animSettings.animId = setInterval(
      (ams) => {
        ams.currFrame++;
        if (ams.currFrame > ams.duration / ams.perFrame) {
          mybrace.style.left = `${toPos}%`;
          clearInterval(ams.animId);
        }
        quoteElem.innerText =
          prevQuote.slice(
            0,
            Math.max(
              0,
              prevQuote.length -
                parseInt(
                  (ams.currFrame / (ams.duration / ams.perFrame)) * ttLen
                )
            )
          ) +
          myQuote.slice(
            0,
            Math.max(
              0,
              parseInt(
                (ams.currFrame / (ams.duration / ams.perFrame)) * ttLen
              ) - prevQuote.length
            )
          );
        mybrace.style.left = `${
          currPos +
          (toPos - currPos) * (ams.currFrame / (ams.duration / ams.perFrame))
        }%`;
      },
      animSettings.perFrame,
      animSettings
    );
  }, []);

  //set a timeout to refresh the quote in 10 seconds

  useEffect(() => {
    transitionElem(mainLink);

    const incLink = setTimeout(() => {
      setLink({ type: "inc" });
    }, 20 * 1000);

    //onhover change quote
    const onHover = function (e) {
      const idx = Array.from(
        e.target.parentElement.parentElement.children
      ).indexOf(e.target.parentElement);
      setLink({ type: "set", val: idx });
    };

    //add onhover to icons
    //display mainquote indicator
    const iconDivs = document.querySelectorAll(
      "div#mycontacts > div.icons > a > div.icon"
    );
    iconDivs.forEach((v, vi) => {
      v.addEventListener("mouseenter", onHover);
      if (vi === mainLink) {
        v.classList.add("main");
      } else {
        if (v.classList.contains("main")) {
          v.classList.remove("main");
        }
      }
    });

    return () => {
      clearTimeout(incLink);
      iconDivs.forEach((v) => {
        v.removeEventListener("mouseenter", onHover);
      });
    };
  }, [mainLink, transitionElem]);

  return (
    <>
      <div id="mycontacts">
        <h1 className="mono">Get in touch.</h1>
        <h2 className="primary mono">Quote</h2>
        <div className="bracespace">
          <div className="brace"></div>
        </div>
        <div className="icons">
          {links.map(({ title, icon: Icon, link }, vi) => (
            <a href={link} key={vi} target="_blank">
              <div className="icon">
                <Icon />
                <div className="title">
                  <h3>{title}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="footer">
        <p className="mono">&gt; Built &amp; designed by Austin Gathii &lt;</p>
      </div>
    </>
  );
}
