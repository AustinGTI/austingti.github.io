import React, { useState, useLayoutEffect, useEffect } from "react";
import { ReactComponent as Work } from "../data/icons/Work.svg";
import { ReactComponent as School } from "../data/icons/School.svg";
import "./Resume.scss";

function setGrow(num) {
  let resdiv = document.getElementsByClassName("resumedetail")[0];
  resdiv.style.flexGrow = num;
  if (num === 0) resdiv.style.display = "none";
  else resdiv.style.display = "block";
}

function ResumeCard({ data, setMain, id }) {
  const { organization, position, link, type } = data;

  return (
    <>
      <button
        onClick={() => {
          setMain(id);
        }}
        className="resumecard"
      >
        <div>
          <span className="title mono">
            <span className="bullet">&gt;</span>
            {" " + position} at{" "}
            <a href={link} target="_blank" rel="noreferrer">
              {organization}
            </a>
          </span>
          <span className="tag">
            {type === "school" ? <School /> : <Work />}
          </span>
        </div>
      </button>
    </>
  );
}

function durationToDate(duration) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let from = `${monthNames[duration[0].getMonth()]}${
    duration[0].getFullYear() === duration[1].getFullYear()
      ? ""
      : " " + duration[0].getFullYear()
  }`;
  let to = `${monthNames[duration[1].getMonth()]} ${duration[1].getFullYear()}`;
  return `${from} - ${to}`;
}

function ResumeDetail({ data }) {
  const { organization, link, type, description, duration } = data;
  return (
    <div>
      <span>{type === "school" ? <School /> : <Work />}</span>
      <p className="mono primary">{durationToDate(duration)}</p>

      <h2>
        {type === "school" ? "Went to school at " : "Worked at "}
        <a className="primary" style={{ textDecoration: "none" }} href={link}>
          {organization}
        </a>
      </h2>
      <ul>
        <li>{description}</li>
      </ul>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          listStyleType: "none",
        }}
      ></ul>
    </div>
  );
}

function indicateTimeline(year, duration) {
  const msPerYear = 1000 * 60 * 60 * 24 * 365;
  let yearDate = new Date(year, 1);
  let range = [
    1 - Math.min(Math.max(0, (duration[0] - yearDate) / msPerYear), 1),
    1 - Math.min(Math.max(0, (duration[1] - yearDate) / msPerYear), 1),
  ];
  return range;
}

function ResumeTimeline({ timerange, hoverTimerange }) {
  const yearRange = 5;
  const years = [2018, 2019, 2020, 2021, 2022].reduce(
    (total, v, vi) => [v, ...total],
    []
  );
  return (
    <div className="resumetimeline">
      <svg height="100%" width="100%">
        {Array.from(Array(yearRange).keys()).map((v, vi) => {
          let currRange = indicateTimeline(years[vi], timerange);
          let hvRange = undefined;
          if (hoverTimerange != undefined) {
            hvRange = indicateTimeline(years[vi], hoverTimerange);
          }
          return (
            <g key={vi}>
              <line
                x1="47%"
                y1={`${parseInt(10 + vi * (80 / yearRange) + 3)}%`}
                x2="47%"
                y2={`${parseInt(10 + (vi + 1) * (80 / yearRange) - 3)}%`}
                style={{
                  stroke: "white",
                  strokeWidth: "5px",
                  strokeLinecap: "round",
                }}
              />
              {currRange[0] - currRange[1] === 0 ? (
                ""
              ) : (
                <line
                  className="indicator"
                  x1="52%"
                  y1={`${parseInt(
                    10 +
                      vi * (80 / yearRange) +
                      3 +
                      (80 / yearRange - 6) * currRange[1]
                  )}%`}
                  x2="52%"
                  y2={`${parseInt(
                    10 +
                      vi * (80 / yearRange) +
                      3 +
                      (80 / yearRange - 6) * currRange[0]
                  )}%`}
                  style={{
                    strokeWidth: "5px",
                    stroke: "white",
                    strokeLinecap: "round",
                  }}
                />
              )}
              {hoverTimerange === undefined || hvRange[0] - hvRange[1] === 0 ? (
                ""
              ) : (
                <line
                  className="indicator"
                  x1="42%"
                  y1={`${parseInt(
                    10 +
                      vi * (80 / yearRange) +
                      3 +
                      (80 / yearRange - 6) * hvRange[1]
                  )}%`}
                  x2="42%"
                  y2={`${parseInt(
                    10 +
                      vi * (80 / yearRange) +
                      3 +
                      (80 / yearRange - 6) * hvRange[0]
                  )}%`}
                  style={{
                    strokeWidth: "5px",
                    stroke: "rgb(255,255,255,0.1)",
                    filter:
                      "drop-shadow(0 0 3px var(--primary-color)) brightness(1.5)",
                    strokeLinecap: "round",
                  }}
                />
              )}
              <text
                x="42%"
                y={`${parseInt(10 + (vi + 1) * (80 / yearRange) + 1)}%`}
                fill="white"
                className="mono"
                style={{ fontSize: "12px" }}
              >
                {years[vi]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Resume() {
  const [mainEntry, setMainEntry] = useState(0);
  const [hoverEntry, setHoverEntry] = useState(undefined);

  useEffect(() => {
    const mybuttons = document.querySelectorAll("div.resumelist > .resumecard");
    mybuttons.forEach((v, vi) => {
      if (
        Array.from(v.parentElement.children).filter((v) =>
          v.classList.contains("resumecard")
        ).length -
          1 -
          vi ==
        mainEntry
      ) {
        v.querySelectorAll(".cls-1,.cls-2,.cls-3").forEach((v) => {
          v.style.stroke = "var(--primary-color)";
          v.style.strokeWidth = "16px";
          v.style.filter = "drop-shadow(0 0 5px white) brightness(1.5)";
        });
        v.style.backgroundColor = "#111b38";
      } else {
        v.querySelectorAll(".cls-1,.cls-2,.cls-3").forEach((v) => {
          v.style.stroke = "white";
          v.style.strokeWidth = "10px";
          v.style.filter = "";
        });
        v.style.backgroundColor = "inherit";
      }
    });
    const lineOnHover = function (e) {
      if (e.type === "mouseenter") {
        setHoverEntry(
          Array.from(e.target.parentElement.children).filter((v) =>
            v.classList.contains("resumecard")
          ).length -
            1 -
            Array.from(e.target.parentElement.children)
              .filter((v) => v.classList.contains("resumecard"))
              .indexOf(e.target)
        );
        e.target.querySelectorAll(".cls-1,.cls-2,.cls-3").forEach((v) => {
          v.style.stroke = "var(--primary-color)";
          v.style.strokeWidth = "16px";
          v.style.filter = "drop-shadow(0 0 5px white) brightness(1.5)";
        });
      } else if (e.type === "mouseleave") {
        setHoverEntry(undefined);
        e.target.querySelectorAll(".cls-1,.cls-2,.cls-3").forEach((v) => {
          v.style.stroke = "white";
          v.style.strokeWidth = "10px";
          v.style.filter = "";
        });
      }
    };

    mybuttons.forEach((v) => {
      v.addEventListener("mouseenter", lineOnHover);
      v.addEventListener("mouseleave", lineOnHover);
    });

    return () => {
      mybuttons.forEach((v) => {
        v.removeEventListener("mouseenter", lineOnHover);
        v.removeEventListener("mouseleave", lineOnHover);
      });
    };
  }, [mainEntry]);
  useLayoutEffect(() => {
    if (mainEntry === undefined) setGrow(0);
    else setGrow(1);
  }, [mainEntry]);
  const resume = [
    {
      organization: "Strathmore University",
      link: "https://strathmore.edu/",
      type: "school",
      description: "Completed a 3 month accounting course (ACCA)",
      position: "student",
      duration: [new Date(2018, 3), new Date(2018, 6)],
    },
    {
      organization: "Strathmore University",
      link: "https://strathmore.edu/",
      type: "school",
      description:
        "Earned a bachelors degree in Informatics and Computer Science",
      position: "student",
      duration: [new Date(2018, 7), new Date(2022, 2)],
    },
    {
      organization: "Microhouse Technologies",
      link: "https://microhouse.co.ke/",
      type: "work",
      description:
        "Developed a wide variety of wordpress websites over a 3 month long internship",
      position: "intern",
      duration: [new Date(2020, 2), new Date(2020, 4)],
    },
    {
      organization: "Iansoft Limited",
      link: "https://www.iansoftltd.com/",
      type: "work",
      description:
        "Helped build enterprise software solutions over a 3 month long internship",
      position: "intern",
      duration: [new Date(2021, 2), new Date(2021, 4)],
    },
  ];
  return (
    <div id="myresume">
      <div className="resumelist">
        {/* <button
          className="contract"
          onClick={() => setMainEntry(undefined)}
        ></button> */}
        <br />
        {resume
          .reduce((target, val) => [val, ...target], [])
          .map((val, vi) => (
            <ResumeCard
              data={val}
              key={vi}
              id={resume.length - vi - 1}
              setMain={setMainEntry}
            />
          ))}
      </div>
      <ResumeTimeline
        timerange={resume[mainEntry].duration}
        hoverTimerange={
          !isNaN(hoverEntry) ? resume[hoverEntry].duration : undefined
        }
      />
      <div className="resumedetail">
        {mainEntry === undefined ? (
          <div className="empty"></div>
        ) : (
          <ResumeDetail data={resume[mainEntry || 0]} />
        )}
      </div>
    </div>
  );
}