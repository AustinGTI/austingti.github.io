import React, { useEffect, useState } from "react";
import "./MyWorksBeta.scss";
import { ReactComponent as FirstSite } from "../data/icons/Site_1.svg";
import { ReactComponent as SecondSite } from "../data/icons/Site_2.svg";
import { ReactComponent as ThirdSite } from "../data/icons/Site_3.svg";
import { ReactComponent as FourthSite } from "../data/icons/Site_4.svg";
import { ReactComponent as FifthSite } from "../data/icons/Site_5.svg";
import { ReactComponent as GitIcon } from "../data/icons/Github.svg";
import { ReactComponent as SiteLinkIcon } from "../data/icons/Link.svg";
import { ReactComponent as NextIcon } from "../data/icons/Next.svg";

import { easeInOut } from "../auxFuncs/motion";

function Pillar({ side, data }) {
  if (side === "left") {
    data = data.reduce((t, v) => [v, ...t], []);
  }

  return (
    <div className={`pillar ${side}pillar static mono`} title>
      <div className="numberBox">
        <div className="numberSlider pillarslidercarrier">
          <div className="slider edge">
            <span>.</span>
          </div>{" "}
          {data.map((v, vi) => (
            <div key={vi} className="slider mono">
              <span>{`0${v.id}`}</span>
            </div>
          ))}
          <div className="slider edge">
            <span>.</span>
          </div>
        </div>
      </div>
      <div className="bgBox">
        <NextIcon />

        <div className="bgSlider pillarslidercarrier">
          <div className="slider edge">
            <svg>
              <line
                x1={`50%`}
                x2={`50%`}
                y1={`10%`}
                y2={`90%`}
                style={{
                  stroke: "white",
                  strokeWidth: "4",
                  strokeLinecap: "round",
                }}
              />
            </svg>
          </div>
          {data.map((v, vi) => (
            <div
              key={vi}
              className="slider"
              style={{
                backgroundImage: `url(${require("../data/images/works_screenshots/" +
                  v.id.toString() +
                  ".jpg")})`,
              }}
            ></div>
          ))}
          <div className="slider edge">
            <svg>
              <line
                x1={`50%`}
                x2={`50%`}
                y1={`10%`}
                y2={`90%`}
                style={{
                  stroke: "white",
                  strokeWidth: "4",
                  strokeLinecap: "round",
                }}
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="titleBox">
        <div className="mono primary"></div>
      </div>
    </div>
  );
}

export default function MyWorksBeta() {
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
        "A website that allows a user to create flashcards and use them to memorize facts through smart repition...",
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

  //set the width of the sitecarriers to a multiple of the number of works
  useEffect(() => {
    //preseting the carrier widths and transforms...
    const carriers = document.querySelectorAll(
      "div.slidecarrier:not(.btncarrier)"
    );

    const lsliders = document.querySelectorAll(
      "div.leftpillar .pillarslidercarrier"
    );
    const rsliders = document.querySelectorAll(
      "div.rightpillar .pillarslidercarrier"
    );

    const lpillar = document.querySelector("div.leftpillar");
    const rpillar = document.querySelector("div.rightpillar");

    const ltitleBox = lpillar.querySelector("div.titleBox div");
    const rtitleBox = rpillar.querySelector("div.titleBox div");

    ltitleBox.innerText = "";
    rtitleBox.innerText = worksData[1].title;
    rpillar.classList.add("canNext");

    carriers.forEach((v) => {
      v.style.width = `${worksData.length * 100}%`;
      v.style.transform = `translateX(0%)`;
      v.querySelectorAll("div.slider").forEach((s) => {
        s.style.flexBasis = `${(100 / worksData.length).toFixed(3)}%`;
      });
    });

    //setting the original slider positions and dimensions
    lsliders.forEach((v) => {
      v.style.height = `${(worksData.length + 2) * 100}%`;
      v.querySelectorAll("div.slider").forEach((v) => {
        v.style.height = `${(100 / (worksData.length + 2)).toFixed(3)}%`;
      });
      v.style.transform = `translateY(-${
        (100 / (worksData.length + 2)).toFixed(3) * (worksData.length + 1)
      }%)`;
    });

    rsliders.forEach((v) => {
      v.style.height = `${(worksData.length + 2) * 100}%`;
      v.querySelectorAll("div.slider").forEach((v) => {
        v.style.height = `${(100 / (worksData.length + 2)).toFixed(3)}%`;
      });
      v.style.transform = `translateY(-${
        (100 / (worksData.length + 2)).toFixed(3) * 2
      }%)`;
    });
    //...........................................

    //animating the carrier motion between the slides
    const animationData = {
      perFrame: 30,
      duration: 500,
      carrierTranslation: { animWindow: [0, 1], animId: undefined },
    };

    function scrollCarouselRaw(e, offset = undefined) {
      let pillarCarriers = [...lsliders, ...rsliders];

      //currposition
      let pattern = /[\d\.-]+/g;
      let currPosition = parseInt(carriers[0].style.transform.match(pattern));

      //targetposition
      let rawPosition = undefined;
      if (offset == undefined) {
        rawPosition =
          Array.from(
            e.target.parentElement.parentElement.parentElement.children
          ).indexOf(e.target.parentElement.parentElement) + 1;
      } else {
        rawPosition = Math.max(
          0,
          Math.min(
            worksData.length,
            parseInt(-currPosition / (100 / worksData.length)) + offset + 1
          )
        );
      }
      let position =
        -((Math.max(Math.min(rawPosition, worksData.length), 1) - 1) * 100) /
        worksData.length;

      //set pillar status to dynamic
      lpillar.classList.remove("static");
      rpillar.classList.remove("static");
      //set attributes of pillars
      setTimeout(() => {
        if (rawPosition > 1) {
          ltitleBox.innerText = worksData[rawPosition - 2].title;
          lpillar.classList.add("canNext");
        } else {
          ltitleBox.innerText = "";
          lpillar.classList.remove("canNext");
        }
        if (rawPosition < worksData.length) {
          rtitleBox.innerText = worksData[rawPosition].title;
          rpillar.classList.add("canNext");
        } else {
          rtitleBox.innerText = "";
          rpillar.classList.remove("canNext");
        }
      }, 500);

      //translation
      let translation = position - currPosition;

      //animating the scroll
      let animPerFrame =
        translation / (animationData.duration / animationData.perFrame);
      let frameCounter = 0;
      let currTranslation = 0;

      animationData.carrierTranslation.animId = setInterval(() => {
        frameCounter++;

        if (
          frameCounter >=
          animationData.duration / animationData.perFrame //the multiplication by animPerFrame makes sure that the rhs value is usually higher than the lhs
        ) {
          carriers.forEach((v) => {
            v.style.transform = `translateX(${(
              currPosition + translation
            ).toFixed(3)}%)`;
          });
          pillarCarriers.forEach((v, vi) => {
            let offset = 0;
            if (vi > 1) offset = 2;
            v.style.transform = `translateY(${
              (
                (vi <= 1
                  ? -(100 / (worksData.length + 2)) * (worksData.length + 1)
                  : 0) +
                ((vi <= 1 ? -1 : 1) *
                  (worksData.length * (currPosition + translation))) /
                  (worksData.length + 2) +
                offset * (-100 / (worksData.length + 2))
              ).toFixed(3)
              //this formula translates the slider translation to pillar translation
            }%)`;
          });
          setToggleSizes(rawPosition);
          lpillar.classList.add("static");
          rpillar.classList.add("static");
          clearInterval(animationData.carrierTranslation.animId);

          return;
        }
        //currTranslation += animPerFrame;
        currTranslation =
          translation *
          easeInOut(
            frameCounter / (animationData.duration / animationData.perFrame)
          );
        carriers.forEach((v) => {
          v.style.transform = `translateX(${(
            currPosition + currTranslation
          ).toFixed(3)}%)`;
        });
        pillarCarriers.forEach((v, vi) => {
          let offset = 0;
          if (vi > 1) offset = 2;
          v.style.transform = `translateY(${
            (
              (vi <= 1
                ? -(100 / (worksData.length + 2)) * (worksData.length + 1)
                : 0) +
              ((vi <= 1 ? -1 : 1) * //this line accounts for the opposite translation of the left pillar
                (worksData.length * (currPosition + currTranslation))) /
                (worksData.length + 2) +
              offset * (-100 / (worksData.length + 2))
            ).toFixed(3)
            //this formula translates the slider translation to pillar translation
          }%)`;
        });
        setToggleSizes(
          (-(currPosition + currTranslation) + 100 / worksData.length) /
            (100 / worksData.length)
        );
      }, animationData.perFrame);
    }

    //I will never forgive myself for making me write code this ugly and inefficient...
    //should have been a useState variable controlling slider position not buttons...
    //3 functions for the same thing... ffs.. at least we live and learn..
    function scrollCarousel(e) {
      scrollCarouselRaw(e);
    }
    function scrollCarouselMinus(e) {
      scrollCarouselRaw(e, -1);
    }
    function scrollCarouselPlus(e) {
      scrollCarouselRaw(e, 1);
    }
    //...........................................................

    //.......................................

    //animating the toggle growth and shrinkage based on proximity to position
    const siteToggles = document.querySelectorAll(
      "div.selector .slider svg.logo"
    );

    function setToggleSizes(position) {
      siteToggles.forEach((v, vi) => {
        let dist = Math.sqrt(1 / (Math.abs(position - (vi + 1)) + 1));
        v.style.transform = `scale(${dist.toFixed(3)})`;
      });
    }
    //.......................................

    //placing and removing the onclick listener from the buttons...
    //setting the initial button sizes
    siteToggles.forEach((v, vi) => {
      v.addEventListener("click", scrollCarousel);
    });
    setToggleSizes(1);

    lpillar.addEventListener("click", scrollCarouselMinus);
    rpillar.addEventListener("click", scrollCarouselPlus);

    //reveal the main display on hover
    const imagedisplay = document.querySelector("div.siteimage");
    const textdisplay = document.querySelector("div.sitetext");
    function revealOnHover(e) {
      if (e.type == "mouseenter") {
        textdisplay.classList.add("hidden");
      } else if (e.type == "mouseleave") {
        textdisplay.classList.remove("hidden");
      }
    }
    imagedisplay.addEventListener("mouseenter", revealOnHover);
    imagedisplay.addEventListener("mouseleave", revealOnHover);

    return () => {
      siteToggles.forEach((v, vi) => {
        v.removeEventListener("click", scrollCarousel);
      });
      document
        .querySelector("div.leftpillar")
        .removeEventListener("click", scrollCarouselMinus);
      document
        .querySelector("div.rightpillar")
        .removeEventListener("click", scrollCarouselPlus);
      imagedisplay.removeEventListener("mouseenter", revealOnHover);
      imagedisplay.removeEventListener("mouseleave", revealOnHover);
    };
  }, [worksData.length]);

  //change the position of the siteimage flex and the sitetext flex and the sitetoggle flex on change of loosescroller

  return (
    <div id="myworksbeta">
      <div className="carousel">
        <Pillar data={worksData} side={"left"} />
        <div className="maindisplay">
          <div className="sitenumber">
            <div className="slidecarrier numbercarrier">
              {worksData.map((v, vi) => (
                <div key={vi} className="slider">
                  <span className="mono">{`0${vi + 1}`}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="siteimage">
            <div className="sitelinks">
              <div className="linkicons">
                <SiteLinkIcon />
                <GitIcon />
              </div>
            </div>
            <div className="slidecarrier imgcarrier">
              {worksData.map((v, vi) => (
                <div
                  key={vi}
                  className="slider"
                  style={{
                    backgroundImage: `url(${require("../data/images/works_screenshots/" +
                      v.id.toString() +
                      ".jpg")})`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="sitetext">
            <div className="slidecarrier txtcarrier">
              {worksData.map((v, vi) => (
                <div key={vi} className="slider">
                  <h2 className="mono primary">{/*`0${vi + 1}|`*/}</h2>
                  <h2 className="mono primary">{v.title}</h2>
                  <p>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Pillar data={worksData} side={"right"} />
      </div>
      <div className="selector">
        <div className="slidecarrier btncarrier">
          {worksData.map(({ icon: Icon }, vi) => (
            <div key={vi} className="slider">
              <div className="sitetoggle">
                <Icon className="logo" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
