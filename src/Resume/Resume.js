import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as Work } from "../data/icons/Work.svg";
import { ReactComponent as School } from "../data/icons/School.svg";
import "./Resume.scss";
import PageBackground from "../SiteBackground/PageBackground";

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
            {/* <span className="bullet">&gt;</span> */}
            {" " + position} at{" "}
            <span className="organization">{organization}</span>
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
  console.log("new");
  return (
    <div>
      <span>{type === "school" ? <School /> : <Work />}</span>
      <p className="mono primary">{durationToDate(duration)}</p>

      <h2>
        {type === "school" ? "Went to school at " : "Worked at "}
        <a className="primary orglink" href={link}>
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

//Timeline functions
function indicateTimeline(year, duration) {
  const msPerYear = 1000 * 60 * 60 * 24 * 365;
  let yearDate = new Date(year, 1);
  let range = [
    1 - Math.min(Math.max(0, (duration[0] - yearDate) / msPerYear), 1),
    1 - Math.min(Math.max(0, (duration[1] - yearDate) / msPerYear), 1),
  ];
  return range;
}

function TimelineSingle({ idx, x, yearRange, currRange, rl, vi }) {
  return (
    <line
      className={`indicator group-${idx + 1} ${rl ? "right" : "left"}`}
      x1={`${x}%`}
      y1={`${parseInt(
        10 + vi * (80 / yearRange) + 3 + (80 / yearRange - 6) * currRange[1]
      )}%`}
      x2={`${x}%`}
      y2={`${parseInt(
        10 + vi * (80 / yearRange) + 3 + (80 / yearRange - 6) * currRange[0]
      )}%`}
      style={{
        strokeWidth: "5px",
        stroke: "var(--primary-color)",
        strokeLinecap: "round",
      }}
    />
  );
}

function ResumeTimelineBeta({ timeranges }) {
  const yearRange = 5;
  const years = [2018, 2019, 2020, 2021, 2022].reduce(
    (total, v, vi) => [v, ...total],
    []
  );

  return (
    <div className="resumetimeline">
      <svg height="100%" width="100%">
        {Array.from(Array(yearRange).keys()).map((v, vi) => {
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
              {timeranges.map((y, yi) => {
                let currRange = indicateTimeline(years[vi], y);
                return currRange[0] - currRange[1] === 0 ? (
                  ""
                ) : (
                  <g key={yi}>
                    <TimelineSingle
                      idx={yi}
                      rl={true}
                      x={52}
                      yearRange={yearRange}
                      currRange={currRange}
                      vi={vi}
                    />
                    <TimelineSingle
                      idx={yi}
                      rl={false}
                      x={42}
                      yearRange={yearRange}
                      currRange={currRange}
                      vi={vi}
                    />
                  </g>
                );
              })}

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

/*function ResumeTimeline({ timerange, hoverTimerange, hovIsMain }) {
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
          if (hoverTimerange !== undefined) {
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
                    ...(hovIsMain
                      ? {
                          filter:
                            "drop-shadow(2px 0 3px var(--primary-color)) brightness(1.5)",
                        }
                      : {}),
                  }}
                />
              )}
              {hoverTimerange === undefined ||
              hvRange[0] - hvRange[1] === 0 ||
              hovIsMain ? (
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
                    strokeLinecap: "round",
                    filter:
                      "drop-shadow(2px 0 3px var(--primary-color)) brightness(1.5)",
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
}*/
//......................

export default function Resume() {
  const [mainEntry, setMainEntry] = useState(0);
  //const [hoverEntry, setHoverEntry] = useState(undefined);

  const updateTimelines = useCallback(
    (hoverEntry) => {
      //setting the visible timelines
      const timelines = document.querySelectorAll("svg line.indicator");
      timelines.forEach((v) => {
        if (v.classList.contains("right")) {
          if (v.classList.contains(`group-${mainEntry + 1}`)) {
            if (mainEntry === hoverEntry) {
              v.classList.add("glow");
            } else {
              v.classList.remove("glow");
            }
            v.classList.add("visible");
          } else {
            v.classList.remove("visible");
          }
        } else if (v.classList.contains("left")) {
          if (
            v.classList.contains(`group-${hoverEntry + 1}`) &&
            mainEntry !== hoverEntry
          ) {
            v.classList.add("visible");
          } else {
            v.classList.remove("visible");
          }
        }
      });
    },
    [mainEntry]
  );

  useEffect(() => {
    let hoverEntry = undefined;

    const mybuttons = document.querySelectorAll("div.resumelist > .resumecard");
    mybuttons.forEach((v, vi) => {
      if (
        Array.from(v.parentElement.children).filter((v) =>
          v.classList.contains("resumecard")
        ).length -
          1 -
          vi ===
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
        //setHoverEntry(
        hoverEntry =
          Array.from(e.target.parentElement.children).filter((v) =>
            v.classList.contains("resumecard")
          ).length -
          1 -
          Array.from(e.target.parentElement.children)
            .filter((v) => v.classList.contains("resumecard"))
            .indexOf(e.target);
        //);
        /*e.target.querySelectorAll(".cls-1,.cls-2,.cls-3").forEach((v) => {
          v.style.stroke = "var(--primary-color)";
          v.style.strokeWidth = "16px";
          v.style.filter = "drop-shadow(0 0 5px white) brightness(1.5)";
        });*/
      } else if (e.type === "mouseleave") {
        //setHoverEntry(undefined);
        hoverEntry = undefined;
        /*e.target.querySelectorAll(".cls-1,.cls-2,.cls-3").forEach((v) => {
          v.style.stroke = "white";
          v.style.strokeWidth = "10px";
          v.style.filter = "";
        });*/
      }
      updateTimelines(hoverEntry);
    };

    updateTimelines(hoverEntry);
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
  }, [mainEntry, updateTimelines]);

  const resume = [
    /*{
      organization: "Strathmore University",
      link: "https://strathmore.edu/",
      type: "school",
      description: "Completed the first 3 courses (ACCA)",
      position: "student",
      duration: [new Date(2018, 3), new Date(2018, 6)],
    },*/
    {
      organization: "Strathmore University",
      link: "https://strathmore.edu/",
      type: "school",
      description:
        "Earned a bachelors degree in Informatics and Computer Science",
      position: "Student",
      duration: [new Date(2018, 7), new Date(2022, 2)],
    },
    {
      organization: "Smart Data Analytical Ltd",
      link: "https://home.smartd.co.ke/",
      type: "work",
      description:
        "Developed a wide variety of wordpress based websites with custom php plugins",
      position: "Web Developer",
      duration: [new Date(2020, 1), new Date(2020, 4)],
    },
    {
      organization: "Iansoft Limited",
      link: "https://www.iansoftltd.com/",
      type: "work",
      description:
        "Assisted senior programmers in building enterprise software solutions over the course of a 3 month long internship",
      position: "Intern",
      duration: [new Date(2021, 2), new Date(2021, 4)],
    },
    {
      organization: "Microhouse Technologies",
      link: "https://microhouse.co.ke/",
      type: "work",
      description:
        "Managed, cleaned and analyzed a large SQL database of user data in a team with 2 other engineers",
      position: "Data Analyst",
      duration: [new Date(2022, 2), new Date(2022, 7)],
    },
  ];
  return (
    <div id="myresume">
      <div className="resumebox">
        <PageBackground
          codeSnippet={"displayResume() // #2."}
          parentid={"myresume"}
        />
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
        {/* <ResumeTimeline
        timerange={resume[mainEntry].duration}
        hoverTimerange={
          !isNaN(hoverEntry) ? resume[hoverEntry].duration : undefined
        }
        hovIsMain={hoverEntry === mainEntry}
      /> */}
        <ResumeTimelineBeta timeranges={resume.map((v) => v.duration)} />
        <div className="resumedetail">
          {mainEntry === undefined ? (
            <div className="empty"></div>
          ) : (
            <ResumeDetail data={resume[mainEntry || 0]} />
          )}
        </div>
      </div>
    </div>
  );
}
