import React, { useState } from "react";
import "./MyWorks.css";

function Work({ data, ismain }) {
  const { id, title, description } = data;

  console.log(id);
  return (
    <div
      className={`wk ${ismain ? "main" : ""}work`}
      style={{
        backgroundImage: `url(${require("../data/images/works_screenshots/" +
          id.toString() +
          ".jpg")})`,
      }}
    >
      <div className="bddiv">
        <div className="spandiv">
          <span>{id}</span>
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
              <a href="/">Git</a>
            </li>
            <li>
              <a href="/">Site</a>
            </li>
            {!ismain ? (
              <li>
                <a href="/">Full View</a>
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
      </div>
    </div>
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
    },
    {
      id: 2,
      title: "scribe.io",
      description:
        "A website that uses machine learning to analyze users typing habits and train them to type faster...",
    },
    {
      id: 3,
      title: "abode.me",
      description:
        "A website that tracks vital real estate factors across the country to determine the best value for money housing...",
    },
    {
      id: 4,
      title: "mindstream.io",
      description:
        "A website that allows a user to create memory flashcards and use them to quickly memorize facts through smart repition...",
    },
    {
      id: 5,
      title: "99shades.io",
      description:
        "A website that provides an interface for selecting and iterating over every possible visible color..",
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
            <Work key={wi} data={work} ismain={wi === 1} />
          ))}
        </div>
        <div className="scroller">
          <ul>
            {carouselData.map((work, wi) => (
              <button
                key={wi}
                onClick={() => {
                  setMain(work.id - 1);
                }}
              >
                {work.title.slice(0, 3)}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
