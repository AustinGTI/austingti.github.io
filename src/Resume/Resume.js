import React, { useState, useLayoutEffect } from "react";
import "./Resume.css";

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
            {position} at{" "}
            <a href={link} target="_blank" rel="noreferrer">
              {organization}
            </a>
          </span>
          <span className="tag">{type}</span>
        </div>
      </button>
      <br />
    </>
  );
}

function ResumeDetail({ data }) {
  const { organization, link, type, description, duration } = data;
  return (
    <div>
      <p className="mono primary">{duration}</p>
      <span>icon</span>
      <br />
      <h2>
        {type === "school" ? "went to school at " : "worked at "}
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
      >
        {Array.from(Array(3).keys()).map((v, vi) => (
          <li key={vi} style={{ padding: "0 5px" }}>
            tag
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Resume() {
  const [mainEntry, setMainEntry] = useState(undefined);
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
      duration: "March 2018 - June 2018",
    },
    {
      organization: "Strathmore University",
      link: "https://strathmore.edu/",
      type: "school",
      description:
        "Earned a bachelors degree in Informatics and Computer Science",
      position: "student",
      duration: "July 2018 - February 2022",
    },
    {
      organization: "Microhouse Technologies",
      link: "https://microhouse.co.ke/",
      type: "work",
      description:
        "Developed a wide variety of wordpress websites over a 3 month long internship",
      position: "intern",
      duration: "February 2020 - April 2020",
    },
    {
      organization: "Iansoft Limited",
      link: "https://www.iansoftltd.com/",
      type: "work",
      description:
        "Helped build enterprise software solutions over a 3 month long internship",
      position: "intern",
      duration: "February 2021 - April 2021",
    },
  ];
  return (
    <div id="myresume">
      <div className="resumelist">
        <button
          className="contract"
          onClick={() => setMainEntry(undefined)}
        ></button>
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
