import React from "react";
import "./AboutMe.css";

export default function MyProfile() {
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
          <ul
            style={{ display: "flex", flexDirection: "row", listStyle: "none" }}
          >
            {
              //to be replaced with a real list with more data
              ["flask", "django", "react", "vue"].map((v, vi) => (
                <li key={vi} style={{ margin: "0 10px" }}>
                  {v}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
