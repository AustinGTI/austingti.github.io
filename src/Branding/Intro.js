import React, { useEffect } from "react";

import "./Intro.scss";
import { ReactComponent as LogoIcon } from "../data/icons/Logo/Logo.svg";

export default function Intro({ launchSite }) {
  const codeSnippet = "node ./site.js";
  const prefix = "$ ";

  useEffect(() => {
    const animSettings = {
      perFrame: 10,
      tFrame: 0,
      pFrame: 0,
      tSpeed: 7 / 1000, //chars per ms
      pSpeed: 75 / 1000, //% per ms
      tAnim: undefined,
      pAnim: undefined,
    };
    const logoKeys = Array.from(document.querySelectorAll("svg rect.keyBtn"));
    const enterKey = document.querySelector("svg rect.enterBtn");
    const codeBox = document.querySelector("div.code");
    const progressBar = document.querySelector("div.progressbar");
    const indicator = document.querySelector("svg circle.cls-2");

    //progress bar animation code
    const pAnimFunc = (ams, ttFrames, elem) => {
      ams.pFrame++;
      if (ams.pFrame + 1 > ttFrames) {
        ams.pFrame = 0;
        elem.style.width = `100%`;
        clearInterval(ams.pAnim);
        document.querySelector("#intro").classList.add("vanish");
        setTimeout(launchSite, 1000);
        return;
      }
      elem.style.width = `${((ams.pFrame / ttFrames) * 100).toFixed(3)}%`;
    };

    //type command animation code
    const tAnimFunc = (ams, ttFrames, elem) => {
      ams.tFrame++;
      if (ams.tFrame + 1 > ttFrames) {
        ams.tFrame = 0;
        elem.innerText = prefix + codeSnippet;
        clearInterval(ams.tAnim);

        //instantiate the progress bar animation
        let pttFrames = 100 / ams.pSpeed / ams.perFrame;
        setTimeout(() => {
          enterKeyPress();
          indicator.style.fill = "#31C456";
          indicator.style.filter = "drop-shadow(0 0 5px #31C456)";
          setTimeout(() => {
            ams.pAnim = setInterval(
              pAnimFunc,
              ams.perFrame,
              ams,
              pttFrames,
              progressBar
            );
          }, 500);
        }, 1000);

        return;
      }
      let currTxt = elem.innerText.slice();
      elem.innerText =
        prefix +
        codeSnippet.slice(
          0,
          parseInt((ams.tFrame / ttFrames) * codeSnippet.length)
        );
      if (elem.innerText !== currTxt) {
        randKeyPress(1);
      }
    };

    //type a random key on the keyboard.
    const keyPress = (
      keyElem,
      delay,
      pressDuration,
      pressColor = "#0BB7A3",
      defaultColor = "#1c326e"
    ) => {
      setTimeout(() => {
        keyElem.style.fill = pressColor;
        setTimeout(() => {
          keyElem.style.fill = defaultColor;
        }, pressDuration);
      }, delay);
    };

    const randKeyPress = (chance = 0.3) => {
      if (Math.random() < chance) {
        let key = logoKeys[Math.floor(Math.random() * logoKeys.length)];
        keyPress(key, 50, 100);
      }
    };

    const enterKeyPress = () => {
      keyPress(enterKey, 100, 200, "var(--primary-color)");
    };

    //animate site intro
    //type animation
    let typettFrames =
      codeSnippet.length / animSettings.tSpeed / animSettings.perFrame;
    animSettings.tAnim = setInterval(
      tAnimFunc,
      animSettings.perFrame,
      animSettings,
      typettFrames,
      codeBox
    );
  });
  return (
    <div id="intro">
      <div className="introBox">
        <div className="progressBox">
          <div className="progressbar"></div>
        </div>

        <LogoIcon />
        <div className="code ubuntu"></div>
      </div>
    </div>
  );
}
