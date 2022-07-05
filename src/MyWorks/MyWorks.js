import React, { useEffect, useState } from "react";
import "./MyWorks.scss";
import { ReactComponent as FirstSite } from "../data/icons/Site_1.svg";
import { ReactComponent as SecondSite } from "../data/icons/Site_2.svg";
import { ReactComponent as ThirdSite } from "../data/icons/Site_3.svg";
import { ReactComponent as FourthSite } from "../data/icons/Site_4.svg";
import { ReactComponent as FifthSite } from "../data/icons/Site_5.svg";
import { ReactComponent as GitIcon } from "../data/icons/Github.svg";
import { ReactComponent as SiteLinkIcon } from "../data/icons/SiteLink.svg";
import { ReactComponent as FullViewIcon } from "../data/icons/Expand.svg";

function Work({ data, pos, origin }) {
  const ismain = pos === 1;
  const { id, title, description, icon: Icon } = data;
  let originStr;
  switch (origin) {
    case -1:
      originStr = "left";
      break;
    case 0:
      originStr = "";
      break;
    case 1:
      originStr = "right";
      break;
    default:
      throw Error("origin must be -1,0 or 1");
  }

  return (
    <>
      <div
        className={`wk ${
          ismain ? "main" : ""
        }work workno${pos} origin${originStr} ${id}`}
      >
        <div
          className="bgdiv"
          style={{
            backgroundImage: `url(${require("../data/images/works_screenshots/" +
              id.toString() +
              ".jpg")})`,
          }}
        >
          <div className="bddiv">
            <div className="spandiv">
              <span className="mono">{"0" + id.toString()}</span>
              {/* <img
          src={require("../data/images/works_screenshots/" +
            id.toString() +
            ".jpg")}
          alt={title}
        /> */}
            </div>

            <div className="linksdiv">
              <ul>
                <li>
                  <a href="/">
                    <GitIcon width="40px" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <SiteLinkIcon width="40px" />
                  </a>
                </li>
                {/* {!ismain ? (
                  <li>
                    <a href="/">
                      <FullViewIcon width="40px" />
                    </a>
                  </li>
                ) : (
                  <></>
                )} */}
              </ul>
            </div>

            {ismain ? (
              <div className="descdiv">
                <p>{description}</p>
              </div>
            ) : (
              <></>
            )}

            <div className="infodiv">
              <h2 className="mono">{title}</h2>
            </div>
            <Icon className="logo" width="50px" />
          </div>
        </div>
      </div>
    </>
  );
}

function retAnimation(from, to, duration = [0, 1], reverse = false) {
  return {
    from: reverse ? to : from,
    to: reverse ? from : to,
    curr: reverse ? to : from,
    duration: duration,
    animId: undefined,
  };
}

function runAnimation(
  setVarFunc,
  tg,
  animations,
  animDuration,
  startTime,
  perFrame,
  stopflag = false
) {
  const animFunc = function (target, thisAnims, thisAnimDuration) {
    let progress = thisAnims.map((v) => 0);
    thisAnims.forEach((thisAnim, ai) => {
      progress[ai] = Math.min(
        1.001,
        Math.max(
          0,
          (Date.now() - (startTime + thisAnim.duration[0] * thisAnimDuration)) /
            (thisAnimDuration * (thisAnim.duration[1] - thisAnim.duration[0]))
        )
      );

      thisAnim.curr =
        thisAnim.from + progress[ai] * (thisAnim.to - thisAnim.from);
    });

    setVarFunc(
      target,
      thisAnims.map((v) => v.curr)
    );
    if (
      thisAnims.every(
        (thisAnim, ai) =>
          progress[ai] > 1 ||
          (thisAnim.curr > thisAnim.to && thisAnim.to > thisAnim.from) ||
          (thisAnim.curr < thisAnim.to && thisAnim.to < thisAnim.from) ||
          stopflag
      )
    ) {
      clearInterval(animations[0].animId);
    }
  };
  animations[0].animId = setInterval(
    animFunc,
    perFrame,
    tg,
    animations,
    animDuration
  );
}

export default function MyWorks() {
  const [main, setMain] = useState(0);
  const [origin, setOrigin] = useState(0);
  const worksData = [
    {
      id: 1,
      title: "taifa.io",
      description:
        "A website that tracks the relationship between politics and development across the country...",
      icon: FirstSite,
    },
    {
      id: 2,
      title: "scribe.io",
      description:
        "A website that uses machine learning to analyze users typing habits and train them to type faster...",
      icon: SecondSite,
    },
    {
      id: 3,
      title: "abode.me",
      description:
        "A website that tracks vital real estate factors across the country to determine the best value for money housing...",
      icon: ThirdSite,
    },
    {
      id: 4,
      title: "mindstream.io",
      description:
        "A website that allows a user to create memory flashcards and use them to quickly memorize facts through smart repition...",
      icon: FourthSite,
    },
    {
      id: 5,
      title: "99shades.io",
      description:
        "A website that provides an interface for selecting and iterating over every possible visible color..",
      icon: FifthSite,
    },
  ];

  useEffect(() => {
    const mainWork = document.querySelector("div.workno1 > div.bgdiv");
    const leftWork = document.querySelector("div.workno0 > div.bgdiv");
    const rightWork = document.querySelector("div.workno2 > div.bgdiv");

    let toRect = leftWork.parentElement.getBoundingClientRect();
    let fromRect = mainWork.parentElement.getBoundingClientRect();
    let rightRect = rightWork.parentElement.getBoundingClientRect();
    const perFrame = 30;
    const animationConstants = {
      lrAnim: {
        duration: 400, //duration in ms
        startTime: undefined,
        0: {},
        1: {
          maindivWidth: retAnimation(toRect.width, fromRect.width, [0, 0.7]),
          maindivHeight: retAnimation(toRect.height, fromRect.height, [0.7, 1]),
          maindivTranslateY: retAnimation(toRect.y - fromRect.y, 0, [0.7, 1]),
          maindivTranslateX: retAnimation(toRect.x - fromRect.x, 0, [0, 0.7]),
          webiconTranslate: retAnimation(toRect.width * 0.8, 0),
          giticonTranslate: retAnimation(105, 0),
          linksdivTranslate: retAnimation(40, 0),
          titleTranslate: retAnimation(toRect.height * 1.25, 0, [0.5, 0.8]),
          titleFontSize: retAnimation(20, 40, [0.8, 1]),
          descriptionBlur: retAnimation(0, 4),
          descriptionBrightness: retAnimation(1, 0.5),
          descriptionText: retAnimation(0, 1, [0.5, 1]),
          logoVisibility: retAnimation(1, 0, [0, 0.7]),
        },
        2: {},
      },
      rlAnim: {
        0: {},
        1: {},
        2: {},
      },
    };

    if (origin === -1) {
      let title = mainWork.querySelector("div.infodiv"); //animate a return to the original title of the div
      let description = mainWork.querySelector("div.descdiv");
      let logo = mainWork.querySelector("svg.logo");
      let links = mainWork.querySelector("div.linksdiv");
      let [git, web] = links.querySelectorAll("li");
      let mainClassList = mainWork.parentElement.classList;

      animationConstants.lrAnim.startTime = Date.now();
      let lrAnim = animationConstants.lrAnim;
      const { 1: anim, duration, startTime } = lrAnim;
      const presetRunAnim = function (pfunc, ptg, panim) {
        runAnimation(pfunc, ptg, panim, duration, startTime, perFrame);
      };

      //mainWork.style.width = `${toRect.width}px`;
      presetRunAnim(
        (tg, v) => {
          tg.style.width = `${parseInt(v[0])}px`;
        },
        mainWork,
        [anim.maindivWidth]
      );

      //mainWork.style.height = `${toRect.height}px`;
      presetRunAnim(
        (tg, v) => {
          tg.style.height = `${parseInt(v[0])}px`;
        },
        mainWork,
        [anim.maindivHeight]
      );

      //mainWork.style.transform = `translate(${toRect.x - fromRect.x}px,${toRect.y - fromRect.y}px)`;

      presetRunAnim(
        (tg, v) => {
          tg.style.transform = `translate(${parseInt(v[0])}px,${parseInt(
            v[1]
          )}px)`;
        },
        mainWork,
        [anim.maindivTranslateX, anim.maindivTranslateY]
      );

      //web.style.transform = `translateX(-${parseInt(toRect.width * 0.8)}px)`; //animate back to translate 0
      presetRunAnim(
        (tg, v) => {
          tg.style.transform = `translateX(-${parseInt(v[0])}px)`;
        },
        web,
        [anim.webiconTranslate]
      );
      //git.style.transform = `translateY(-${parseInt(105)}%)`; //animate back to translate 0
      presetRunAnim(
        (tg, v) => {
          tg.style.transform = `translateY(-${parseInt(v[0])}%)`;
        },
        git,
        [anim.giticonTranslate]
      );
      //links.style.transform = `translateY(${40}%)`; //animate back to translate 0
      presetRunAnim(
        (tg, v) => {
          tg.style.transform = `translateY(${parseInt(v[0])}%)`;
        },
        links,
        [anim.linksdivTranslate]
      );
      //title.style.transform = `translateY(${toRect.height * 1.25}px)`; //animate back to translate 0
      presetRunAnim(
        (tg, v) => {
          tg.style.transform = `translateY(${parseInt(v[0])}px)`;
        },
        title,
        [anim.titleTranslate]
      );
      //title.style.fontSize = "20px"; // animate back to font size 40
      presetRunAnim(
        (tg, v) => {
          tg.style.fontSize = `${parseInt(v[0])}px`;
        },
        title,
        [anim.titleFontSize]
      );

      //title.style.color = "white"; // animate back to color var(--primary-color)

      //description.style.backdropFilter = "blur(0px) brightness(1)"; //animate a return to blur(4px) brightness(0.5)
      presetRunAnim(
        (tg, v) => {
          tg.style.backdropFilter = `blur(${parseInt(v[0])}px) brightness(${
            v[1]
          })`;
        },
        description,
        [anim.descriptionBlur, anim.descriptionBrightness]
      );

      //description.querySelector("p").innerText = ""; //animate a return to original description of the div
      presetRunAnim(
        (tg, v) => {
          let dsc =
            worksData[parseInt(mainClassList[mainClassList.length - 1]) - 1]
              .description;

          tg.innerText = dsc.slice(0, parseInt(v[0] * dsc.length));
        },
        description,
        [anim.descriptionText]
      );

      //logo.style.visibility = "visible"; //animate to hidden during animation
      presetRunAnim(
        (tg, v) => {
          tg.style.opacity = `${v[0]}`;
        },
        logo,
        [anim.logoVisibility]
      );
    }
  });

  let carouselData;
  if (main === 0)
    carouselData = [worksData[worksData.length - 1], ...worksData.slice(0, 2)];
  else if (main === worksData.length - 1)
    carouselData = [...worksData.slice(worksData.length - 2), worksData[0]];
  else carouselData = worksData.slice(main - 1, main + 2);

  return (
    <div id="myworks">
      <div id="worksbox">
        <div className="carousel">
          {carouselData.map((work, wi) => (
            <Work key={wi} data={work} pos={wi} origin={origin} />
          ))}
        </div>
        <div className="scroller">
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              listStyleType: "none",
            }}
          >
            {carouselData.map(({ id, icon: Icon }, wi) => (
              <li
                key={wi}
                onClick={() => {
                  setMain(id - 1);
                  setOrigin(wi - 1); //-1 if the first is clicked, 0 if the second is clicked, 1 if the third is clicked
                }}
                style={{ padding: "0 5px" }}
              >
                <Icon width={["30px", "20px", "10px"][Math.abs(1 - wi)]} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
