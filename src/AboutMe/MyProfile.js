import React from "react";
import "./AboutMe.scss";
import { ReactComponent as HtmlIcon } from "../data/icons/Stack/Html.svg";
import { ReactComponent as CssIcon } from "../data/icons/Stack/Css.svg";
import { ReactComponent as JsIcon } from "../data/icons/Stack/Javascript.svg";
import { ReactComponent as PythonIcon } from "../data/icons/Stack/Python.svg";
import { ReactComponent as DbIcon } from "../data/icons/Stack/Db.svg";

function BaseStack({ data }) {
  //const { base, icon: Icon, stack } = data;
  const { icon: Icon } = data;
  return (
    <div style={{ margin: "0 10px" }}>
      <Icon height="30px" />
    </div>
  );
}

export default function MyProfile() {
  const frontEnd = [
    {
      base: "HTML",
      icon: HtmlIcon,
      stack: [{ title: "Jinja", experience: 2 }],
    },
    {
      base: "CSS",
      icon: CssIcon,
      stack: [
        { title: "Sass", experience: 3 },
        { title: "Bootstrap", experience: 3 },
      ],
    },
    {
      base: "JS",
      icon: JsIcon,
      stack: [{ title: "React", experience: 4 }],
    },
  ];

  const backEnd = [
    {
      base: "Python",
      icon: PythonIcon,
      stack: [{ title: "django", experience: 4 }],
    },
    {
      base: "DB",
      icon: DbIcon,
      stack: [
        { title: "SQL", experience: 3 },
        { title: "SQLite", experience: 3 },
      ],
    },
  ];

  return (
    <div id="myprofile">
      <div id="profilebox">
        <div className="mono">
          <h1>Hi,</h1>
          <h1>My name is</h1>
          <h2>Austin Gathii.</h2>
          <h3>A Nairobi-based fullstack developer.</h3>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div id="btndiv">
          <div>
            <div>
              {
                //to be replaced with a real list with more data
                frontEnd.map((data, vi) => (
                  <BaseStack key={vi} data={data} />
                ))
              }
            </div>
            <div className="brace"></div>
          </div>

          <div></div>

          <div>
            <div>
              {backEnd.map((data, vi) => (
                <BaseStack key={vi} data={data} />
              ))}
            </div>
            <div className="brace"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
