import React, { useEffect } from "react";
import "./PageBackground.scss";

export default function PageBackground({
  parentid,
  codeSnippet,
  xSize = 30,
  ySize = 30,
  lwidth = 20,
}) {
  useEffect(() => {
    const myBg = document.querySelector(`div.${parentid}Bg`);
    myBg.setAttribute("mycode", codeSnippet);
    const braceBackground = (e) => {
      let bgw = parseInt(myBg.getBoundingClientRect().width);
      let bgh = parseInt(myBg.getBoundingClientRect().height);

      let edgeOff = parseInt(lwidth / 2);

      let xLen = parseInt(bgw * (xSize / 100));
      let yLen = parseInt(bgh * (ySize / 100));

      let bdRad = 30; //border radius

      //set the coordinates of the polylines
      //rounded path coords ... m(xLen),(edgeOff) h(-(xLen - edgeOff - bdRad)) a(bdRad) (bdRad) 0 0 0 (edgeOff) (edgeOff+bdRad) v(edgeOff) (yLen)

      let pathtl = myBg.querySelector("path.topleft");
      let pathbr = myBg.querySelector("path.bottomright");

      pathtl.setAttribute(
        "d",
        `M ${xLen} ${edgeOff} h ${-(
          xLen -
          edgeOff -
          bdRad
        )} a ${bdRad} ${bdRad} 0 0 0 ${-bdRad} ${bdRad} v${
          yLen - edgeOff - bdRad
        }`
      );

      pathbr.setAttribute(
        "d",
        `M ${bgw - xLen} ${bgh - edgeOff} h ${
          xLen - edgeOff - bdRad
        } a ${bdRad} ${bdRad} 0 0 0 ${bdRad} ${-bdRad} v${-(
          yLen -
          edgeOff -
          bdRad
        )}`
      );
    };
    braceBackground();
    window.addEventListener("resize", braceBackground);

    return () => {
      window.removeEventListener("resize", braceBackground);
    };
  });
  return (
    <div className={`pageBg ${parentid}Bg`}>
      <div className="codeSnippet ubuntu">
        <div className="code"></div>
        <div className="caret"></div>
      </div>
      <div className="borders">
        <svg>
          <path
            className="topleft"
            style={{
              fill: "none",
              stroke: "var(--primary-color-lite)",
              strokeWidth: "15px",
              strokeLinecap: "round",
            }}
          />
          <path
            className="bottomright"
            style={{
              fill: "none",
              stroke: "var(--primary-color-lite)",
              strokeWidth: "15px",
              strokeLinecap: "round",
            }}
          />
        </svg>
      </div>
      {/* <div className="keyboard">
        <KeyboardIcon />
      </div> */}
    </div>
  );
}
