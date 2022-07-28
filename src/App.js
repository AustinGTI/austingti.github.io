import MyProfile from "./AboutMe/MyProfile";
import LinkBar from "./FixedComponents/LinkBar";
import NavBar from "./FixedComponents/NavBar";
import Resume from "./Resume/Resume";
import "./App.css";
import MyContacts from "./MyContacts/MyContacts";
import MyWorksBeta from "./MyWorks/MyWorksBeta";
import { useEffect, useReducer } from "react";

import { easeInOut, transitionLinearGradient } from "./auxFuncs/motion";
import Logo from "./Branding/Logo";
import Intro from "./Branding/Intro";

//OUR PALLETE
//https://coolors.co/palette/131515-2b2c28-339989-7de2d1-fffafb

/*function Bg({ width, height, maxRadius, respRadius, color }) {
  let circles = [];
  for (let h = 0; h < height / maxRadius; h++) {
    for (let w = 0; w < width / maxRadius; w++) {
      circles.push({
        position: [
          w * maxRadius + maxRadius / 2 - ((h % 2) * maxRadius) / 2,
          h * maxRadius + maxRadius / 2,
        ],
        multiplier: 0.25,
        fill: color,
      });
    }
  }

  return (
    <svg width={`${width}px`} height={`${height}px`}>
      <g>
        {circles.map(({ position, fill, multiplier }, vi) => (
          <circle
            key={vi}
            cy={`${Math.abs(position[1])}px`}
            cx={`${Math.abs(position[0])}px`}
            r={`${Math.abs(maxRadius * multiplier)}px`}
            fill={`${fill}`}
            opacity={`${multiplier}`}
          />
        ))}
      </g>
    </svg>
  );
}*/

function App() {
  const [intro, initSite] = useReducer(() => false, true);
  useEffect(() => {
    if (intro) {
      return;
    }
    const retData = {
      debounceDuration: 500,
      animSpeed: 400 / 1000, //100 px per s
      perFrame: 10,
      tmId: undefined,
      animId: undefined,
      currFrame: 0,
    };
    const bgData = {
      vanishDuration: 2 / 1000, //1 opacity per second
      appearDelay: 1000,
      appearTm: undefined,
      appearDuration: 0.5 / 1000,
      perFrame: 10,
      vFrame: 0,
      vAnim: undefined,
      aFrame: 0,
      aAnim: undefined,
      tFrame: 0,
      tAnim: undefined,
      typeDuration: 10 / 1000, //chars per ms
      isVanished: true,
    };
    const pages = Array.from(
      document.querySelectorAll("#root > div.main > div")
    ).slice(0, 4);
    const logoKeys = Array.from(
      document.querySelectorAll("#root > div.logo rect.keyBtn")
    );
    const enterKey = document.querySelector("#root > div.logo rect.enterBtn");
    const snapToPage = (e) => {
      if (retData.animId !== undefined) {
        return;
      }
      clearTimeout(retData.tmId);
      clearInterval(retData.animId);
      retData.currFrame = 0;

      retData.tmId = setTimeout(
        (data) => {
          const pageStarts = pages.map((v) => v.getBoundingClientRect().y);
          const u = window.scrollY;
          const vec = pageStarts.reduce(
            (t, v) => (t === undefined || Math.abs(v) < Math.abs(t) ? v : t),
            undefined
          );
          if (Math.abs(vec) < 10) {
            return;
          }
          let ttFrames = Math.abs(
            vec /
              (data.animSpeed *
                Math.sqrt((Math.abs(vec) + 10) / window.innerHeight)) /
              data.perFrame
          );

          //console.log(u, v, vec, duration, ttFrames);
          data.animId = setInterval(
            (data, u, vec, ttFrames) => {
              data.currFrame++;

              if (data.currFrame + 1 >= ttFrames) {
                window.scrollTo(0, u + vec);
                data.currFrame = 0;
                clearInterval(data.animId);
                data.animId = undefined;
                return;
              }

              window.scrollTo(
                0,
                u + parseInt(vec * easeInOut(data.currFrame / ttFrames))
              );
            },
            data.perFrame,
            data,
            u,
            vec,
            ttFrames
          );
        },
        retData.debounceDuration,
        retData
      );
    };

    //refresh opacity functions
    const resetKey = (key) => {
      key.style.fill = "#1c326e";
    };
    const typeBg = (data, ttFrames, page, codesnippet) => {
      data.tFrame += 1;
      if (data.tFrame + 1 > ttFrames || data.isVanished) {
        data.tFrame = 0;
        clearInterval(data.tAnim);
        page.querySelector("div.code").innerText = codesnippet;
        enterKey.style.fill = "var(--primary-color)";

        setTimeout(resetKey, 300, enterKey);
        return;
      }
      let currTxt = page.querySelector("div.code").innerText.slice();

      page.querySelector("div.code").innerText = codesnippet.slice(
        0,
        parseInt((data.tFrame / ttFrames) * codesnippet.length)
      );

      if (currTxt !== page.querySelector("div.code").innerText) {
        let key = logoKeys[Math.floor(Math.random() * logoKeys.length)];
        key.style.fill = "var(--primary-color-lite)";
        setTimeout(resetKey, 100, key);
      }
    };
    const appearBg = (data, ttFrames, currOp, vecOp, page) => {
      data.aFrame += 1;
      if (data.aFrame + 1 > ttFrames || data.isVanished) {
        data.aFrame = 0;
        clearInterval(data.aAnim);

        page.style.opacity = Math.max(0, currOp + vecOp);
        //type anim data
        let codesnippet = page.getAttribute("mycode");
        let typeFrames = codesnippet.length / data.typeDuration / data.perFrame;
        data.tAnim = setInterval(
          typeBg,
          data.perFrame,
          data,
          typeFrames,
          page,
          codesnippet
        );
        return;
      }

      page.style.opacity = Math.max(
        0,
        currOp + easeInOut(data.aFrame / ttFrames) * vecOp
      );
    };
    const disappearBg = (data, ttFrames, currOp, vecOp, page) => {
      data.vFrame += 1;
      if (data.vFrame + 1 > ttFrames) {
        data.vFrame = 0;
        clearInterval(data.vAnim);

        page.style.opacity = 0;
        data.vAnim = undefined;
        page.querySelector("div.code").innerText = "";
        return;
      }

      page.style.opacity = Math.max(
        0,
        currOp - easeInOut(data.vFrame / ttFrames) * vecOp
      );
    };

    const refreshOpacity = function (e) {
      if (bgData.isVanished) {
        //check for completion

        clearTimeout(bgData.appearTm);
        let currPage = pages
          .reduce(
            (t, v) =>
              t === undefined ||
              Math.abs(v.getBoundingClientRect().y) <
                Math.abs(t.getBoundingClientRect().y)
                ? v
                : t,
            undefined
          )
          .querySelector("div.pageBg");
        let currOpacity = parseFloat(
          window.getComputedStyle(currPage).getPropertyValue("opacity")
        );
        let targetOpacity = 0.7;

        let mFrames = Math.abs(
          (targetOpacity - currOpacity) /
            bgData.appearDuration /
            bgData.perFrame
        );
        bgData.appearTm = setTimeout(
          (data, ttFrames, currOp, vecOp) => {
            clearInterval(bgData.vAnim);
            bgData.vFrame = 0;

            data.isVanished = false;

            data.aAnim = setInterval(
              appearBg,
              data.perFrame,
              data,
              ttFrames,
              currOp,
              vecOp,
              currPage
            );
          },
          bgData.appearDelay,
          bgData,
          mFrames,
          currOpacity,
          targetOpacity - currOpacity
        );
        return;
      }
      let currPage = pages
        .reduce(
          (t, v) =>
            t === undefined ||
            Math.abs(v.getBoundingClientRect().y) <
              Math.abs(t.getBoundingClientRect().y)
              ? v
              : t,
          undefined
        )
        .querySelector("div.pageBg");
      let currOpacity = parseFloat(
        window.getComputedStyle(currPage).getPropertyValue("opacity")
      );
      console.log(currOpacity);
      let targetOpacity = 0;

      let mFrames =
        (currOpacity - targetOpacity) / bgData.vanishDuration / bgData.perFrame;
      bgData.isVanished = true;

      bgData.vAnim = setInterval(
        disappearBg,
        bgData.perFrame,
        bgData,
        mFrames,
        currOpacity,
        currOpacity - targetOpacity,
        currPage
      );
    };
    refreshOpacity();
    let elem = document.querySelector("div.main");
    transitionLinearGradient(elem, "to bottom", 30, 20 / 1000);
    window.addEventListener("scroll", snapToPage);
    window.addEventListener("scroll", refreshOpacity);

    return () => {
      window.removeEventListener("scroll", snapToPage);
      window.removeEventListener("scroll", refreshOpacity);
    };
  }, [intro]);
  return (
    <>
      {intro ? (
        <Intro launchSite={initSite} />
      ) : (
        <>
          <Logo />
          <NavBar />
          <div className="main">
            <MyProfile />
            <Resume />
            {/* <MyWorksBeta /> */}
            <MyContacts />
          </div>
          <LinkBar />
        </>
      )}
    </>
  );
}

export default App;
