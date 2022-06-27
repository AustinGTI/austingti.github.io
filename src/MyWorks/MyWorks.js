import React, { useState } from "react";
import "./MyWorks.css";
import { ReactComponent as FirstSite } from "../data/icons/Site_1.svg";
import { ReactComponent as SecondSite } from "../data/icons/Site_2.svg";
import { ReactComponent as ThirdSite } from "../data/icons/Site_3.svg";
import { ReactComponent as FourthSite } from "../data/icons/Site_4.svg";
import { ReactComponent as FifthSite } from "../data/icons/Site_5.svg";
import { ReactComponent as GitIcon } from "../data/icons/Github.svg";
import { ReactComponent as SiteLinkIcon } from "../data/icons/SiteLink.svg";
import { ReactComponent as FullViewIcon } from "../data/icons/Expand.svg";

function Work({ data, pos }) {
  const ismain = pos === 1;
  const { id, title, description, icon: Icon } = data;

  return (
    <>
      <div
        className={`wk ${ismain ? "main" : ""}work workno${pos}`}
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
              {!ismain ? (
                <li>
                  <a href="/">
                    <FullViewIcon width="40px" />
                  </a>
                </li>
              ) : (
                <></>
              )}
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
          {!ismain ? <Icon className="logo" width="50px" /> : <></>}
        </div>
      </div>
    </>
  );
}

export default function MyWorks() {
  const [main, setMain] = useState(0);
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
            <Work key={wi} data={work} pos={wi} />
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
