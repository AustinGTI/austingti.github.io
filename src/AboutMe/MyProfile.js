import React, {useEffect} from "react";
import "./AboutMe.scss";

import PageBackground from "../SiteBackground/PageBackground";

/*function BaseStack({ data }) {
  //const { base, icon: Icon, stack } = data;
  const { icon: Icon, stack } = data;
  return (
    <div className="icon" style={{ margin: "0 10px" }}>
      <Icon className="headicon" height="30px" />
      {stack.map((v, vi) => (
        <div className="lang mono primary" key={vi}>
          {v.title}
          
        </div>
      ))}
    </div>
  );
}*/

export default function MyProfile() {
    /*const frontEnd = [
      {
        base: "HTML",
        icon: HtmlIcon,
        stack: [
          { title: "HTML", experience: 4 },
          { title: "Jinja", experience: 3 },
        ],
      },
      {
        base: "CSS",
        icon: CssIcon,
        stack: [
          { title: "CSS", experience: 4 },
          { title: "SCSS", experience: 3 },
          { title: "Bootstrap", experience: 3 },
        ],
      },
      {
        base: "JS",
        icon: JsIcon,
        stack: [
          { title: "JavaScript", experience: 4 },
          { title: "React", experience: 4 },
        ],
      },
    ];

    const backEnd = [
      {
        base: "Python",
        icon: PythonIcon,
        stack: [
          { title: "Python", experience: 5 },
          { title: "Django", experience: 4 },
          { title: "Flask", experience: 3 },
        ],
      },
      {
        base: "DB",
        icon: DbIcon,
        stack: [
          { title: "SQL", experience: 3 },
          { title: "SQLite", experience: 3 },
        ],
      },
    ];*/

    const frontEnd = [
        {title: "react", experience: 4},
        {title: "typescript", experience: 3},
    ];

    const backEnd = [
        {title: "fastapi", experience: 4},
        {title: "php", experience: 2},
        {title: "laravel", experience: 2},
        // {title: "node.js", experience: 1},
    ];

    useEffect(() => {
        const childDivs = document.querySelectorAll(
            "#btndiv > div:not(.seperator)"
        );
        const animationConstants = {
            braceVars: {
                duration: 300,
                maxDrop: 100,
                maxWidth: 70,
                minWidth: 10,
                minDrop: 0,
                0: {
                    animId: {enter: undefined, leave: undefined},
                    drop: 0,
                    width: 0,
                },
                2: {
                    animId: {enter: undefined, leave: undefined},
                    drop: 0,
                    width: 0,
                },
            },
            iconDivVars: {
                duration: 200,
                maxDrop: 40,
                minDrop: 0,
                maxPerIconWidth: 80,
                minPerIconWidth: 35,
                0: {
                    animId: {enter: undefined, leave: undefined},
                    drop: undefined,
                    perIconWidth: undefined,
                    title: "Front End",
                    titleExt: 0,
                    langs: [
                        {html: 4, jinja: 3},
                        {css: 4, scss: 4, bootstrap: 3},
                        {javascript: 4, react: 4},
                    ],
                    langsExt: 0,
                },
                2: {
                    animId: {enter: undefined, leave: undefined},
                    drop: undefined,
                    perIconWidth: undefined,
                    title: "Back End",
                    titleExt: 0,
                    langs: [
                        {python: 5, django: 4, flask: 2},
                        {sql: 4, sqlite: 4, postgresql: 2},
                    ],
                    langsExt: 0,
                },
            },
        };
        const perFrame = 10;

        //ANIMATION FUNCTIONS.....
        const dropExpand = function (target, targetId, intervalId) {
            const myVars = animationConstants.braceVars[targetId];
            const {duration, maxDrop, maxWidth, minWidth} =
                animationConstants.braceVars;

            if (myVars.drop === 0) {
                target.style.animationName = "none";
            }
            if (myVars.drop < maxDrop) {
                target.style.transform = `translateY(${parseInt(
                    (
                        myVars.drop += maxDrop / (
                            (
                                duration * 0.5
                            ) / perFrame
                        )
                    )
                )}px)`;
            }
            //stop animation when maxmyVars.drop reached
            else {
                if (myVars.width >= maxWidth) {
                    myVars.width = maxWidth;
                    myVars.drop = maxDrop;
                    clearInterval(intervalId);
                }
                target.style.transform = `translateY(${maxDrop}px)`;
                target.style.width = `${parseInt(
                    (
                        myVars.width +=
                            (
                                maxWidth - minWidth
                            ) / (
                                (
                                    duration * 0.5
                                ) / perFrame
                            )
                    )
                )}px`;
            }
        };

        const contractRise = function (target, targetId, intervalId) {
            const myVars = animationConstants.braceVars[targetId];
            const {duration, minDrop, maxDrop, minWidth, maxWidth} =
                animationConstants.braceVars;
            if (myVars.width > minWidth) {
                target.style.width = `${parseInt(
                    (
                        myVars.width -=
                            (
                                maxWidth - minWidth
                            ) / (
                                (
                                    duration * 0.5
                                ) / perFrame
                            )
                    )
                )}px`;
            } else {
                if (myVars.drop <= minDrop) {
                    myVars.width = minWidth;
                    myVars.drop = minDrop;
                    target.style.animationName = "oscillate";
                    clearInterval(intervalId);
                }
                target.style.width = `${minWidth}px`;
                target.style.transform = `translateY(${parseInt(
                    (
                        myVars.drop -= maxDrop / (
                            (
                                duration * 0.5
                            ) / perFrame
                        )
                    )
                )}px)`;
            }
        };

        const divGrowShrink = function (target, targetId, intervalId, grow = true) {
            const {maxDrop, minDrop, maxPerIconWidth, minPerIconWidth, duration} =
                animationConstants.iconDivVars;
            const myVars = animationConstants.iconDivVars[targetId];
            if (myVars.drop === undefined || myVars.perIconWidth === undefined) {
                myVars.drop = minDrop;
                myVars.perIconWidth = minPerIconWidth;
            }

            if (grow) {
                if (myVars.drop < maxDrop || myVars.perIconWidth < maxPerIconWidth) {
                    target.style.transform = `translateY(${parseInt(
                        (
                            myVars.drop += (
                                maxDrop - minDrop
                            ) / (
                                duration / perFrame
                            )
                        )
                    )}px)`;
                    myVars.perIconWidth +=
                        (
                            maxPerIconWidth - minPerIconWidth
                        ) / (
                            duration / perFrame
                        );
                    target.querySelectorAll(":scope > div").forEach((v) => {
                        v.style.width = `${parseInt(myVars.perIconWidth)}px`;
                    });
                    //expand the text
                    target.parentElement.querySelector("div.head").innerText =
                        myVars.title.slice(
                            0,
                            parseInt(
                                (
                                    myVars.titleExt += myVars.title.length / (
                                        duration / perFrame
                                    )
                                )
                            )
                        );

                    //expand the langs
                    if (myVars.drop - minDrop > (
                        maxDrop - minDrop
                    ) * 0.4) {
                        myVars.langsExt += 2.1 / (
                            (
                                duration * 0.5
                            ) / perFrame
                        );
                    }

                    target.querySelectorAll(":scope > div").forEach((v) => {
                        let langs = v.querySelectorAll("div.lang");
                        langs.forEach((l, li) => {
                            li < myVars.langsExt
                                ? (
                                    l.style.visibility = "visible"
                                )
                                : (
                                    l.style.visibility = "hidden"
                                );
                        });
                    });
                } else {
                    target.style.transform = `translateY(${maxDrop}px)`;
                    target.querySelectorAll(":scope > div").forEach((v) => {
                        v.style.width = `${maxPerIconWidth}px`;
                    });
                    target.parentElement.querySelector("div.head").innerText =
                        myVars.title;
                    myVars.titleExt = myVars.title.length;
                    target.querySelectorAll(":scope > div").forEach((v) => {
                        let langs = v.querySelectorAll("div.lang");
                        langs.forEach((l) => (
                            l.style.display = "block"
                        ));
                    });
                    myVars.langsExt = 2.1;
                    clearInterval(intervalId);
                }
            } else {
                if (myVars.drop > minDrop || myVars.perIconWidth > minPerIconWidth) {
                    target.style.transform = `translateY(${parseInt(
                        (
                            myVars.drop -= (
                                maxDrop - minDrop
                            ) / (
                                duration / perFrame
                            )
                        )
                    )}px)`;
                    myVars.perIconWidth -=
                        (
                            maxPerIconWidth - minPerIconWidth
                        ) / (
                            duration / perFrame
                        );
                    target.querySelectorAll(":scope > div").forEach((v) => {
                        v.style.width = `${parseInt(myVars.perIconWidth)}px`;
                    });
                    //contract the text
                    target.parentElement.querySelector("div.head").innerText =
                        myVars.title.slice(
                            0,
                            parseInt(
                                (
                                    myVars.titleExt -= myVars.title.length / (
                                        duration / perFrame
                                    )
                                )
                            )
                        );
                    //contract the langs
                    if (myVars.drop - minDrop < (
                        maxDrop - minDrop
                    ) * 0.6) {
                        myVars.langsExt -= 2.1 / (
                            (
                                duration * 0.5
                            ) / perFrame
                        );
                    }

                    target.querySelectorAll(":scope > div").forEach((v) => {
                        let langs = v.querySelectorAll("div.lang");
                        langs.forEach((l, li) => {
                            li < myVars.langsExt
                                ? (
                                    l.style.display = "block"
                                )
                                : (
                                    l.style.visibility = "hidden"
                                );
                        });
                    });
                } else {
                    target.style.transform = `translateY(${minDrop}px)`;
                    target.querySelectorAll(":scope > div").forEach((v) => {
                        v.style.width = `${minPerIconWidth}px`;
                    });
                    target.parentElement.querySelector("div.head").innerText = "";
                    myVars.titleExt = 0;

                    target.querySelectorAll(":scope > div").forEach((v) => {
                        let langs = v.querySelectorAll("div.lang");
                        langs.forEach((l) => (
                            l.style.visibility = "hidden"
                        ));
                    });
                    myVars.langsExt = 0;
                    clearInterval(intervalId);
                }
            }
        };
        //ANIMATION FUNCTIONS.....

        //EVENT LISTENER FUNCTIONS....
        const animFactory = function (
            animConstantsPack,
            animTargetSelector,
            enterFunc,
            leaveFunc = undefined
        ) {
            if (!leaveFunc) {
                leaveFunc = enterFunc;
            }
            const newAnim = (e) => {
                const targetId = Array.from(e.target.parentElement.children).indexOf(
                    e.target
                );
                //when the mouse enters the, dom element
                if (e.type === "mouseenter") {
                    //drop and expand the brace
                    clearInterval(animConstantsPack[targetId].animId.leave);

                    animConstantsPack[targetId].animId.enter = setInterval(function () {
                        enterFunc(
                            e.target.querySelector(animTargetSelector),
                            targetId,
                            animConstantsPack[targetId].animId.enter,
                            true
                        );
                    }, perFrame);
                } else if (e.type === "mouseleave") {
                    //contract and lift the brace
                    clearInterval(animConstantsPack[targetId].animId.enter);

                    animConstantsPack[targetId].animId.leave = setInterval(function () {
                        leaveFunc(
                            e.target.querySelector(animTargetSelector),
                            targetId,
                            animConstantsPack[targetId].animId.leave,
                            false
                        );
                    }, perFrame);
                }
            };
            return newAnim;
        };

        /*const braceAnim = function (e) {
          const targetId = Array.from(e.target.parentElement.children).indexOf(
            e.target
          );
          //when the mouse enters the, dom element
          if (e.type === "mouseenter") {
            //drop and expand the brace
            clearInterval(animationConstants.braceVars[targetId].animId.leave);

            animationConstants.braceVars[targetId].animId.enter = setInterval(
              function () {
                dropExpand(
                  e.target.querySelector("div.brace"),
                  targetId,
                  animationConstants.braceVars[targetId].animId.enter
                );
              },
              perFrame
            );
          } else if (e.type === "mouseleave") {
            //contract and lift the brace
            clearInterval(animationConstants.braceVars[targetId].animId.enter);

            animationConstants.braceVars[targetId].animId.leave = setInterval(
              function () {
                contractRise(
                  e.target.querySelector("div.brace"),
                  targetId,
                  animationConstants.braceVars[targetId].animId.leave
                );
              },
              perFrame
            );
          }
        };*/

        const braceAnim = animFactory(
            animationConstants.braceVars,
            "div.brace",
            dropExpand,
            contractRise
        );
        const divIconAnim = animFactory(
            animationConstants.iconDivVars,
            "div:nth-child(2)",
            divGrowShrink
        );

        //EVENT LISTENER FUNCTION....

        const completeAnimation = function (e) {
            braceAnim(e);
            divIconAnim(e);
        };

        childDivs.forEach((v, vi) => {
            v.addEventListener("mouseenter", completeAnimation);
            v.addEventListener("mouseleave", completeAnimation);
        });
        return () => {
            childDivs.forEach((v, vi) => {
                v.removeEventListener("mouseenter", completeAnimation);
                v.removeEventListener("mouseleave", completeAnimation);
            });
        };
    }, []);

    return (
        <div id="myprofile">
            <div id="profilebox">
                <PageBackground
                    parentid={"myprofile"}
                    codeSnippet={"displayProfile() // #1."}
                />
                <div className="mono">
                    <h1>Hi,</h1>
                    <h1>My name is</h1>
                    <h2>Austin Gathii.</h2>
                    <h3>A Nairobi-based software engineer.</h3>
                </div>

                <p>I am a software engineer currently working as a front-end developer, specializing in React and
                    TypeScript. My
                    primary passion is machine learning and associated technologies which I have expressed through
                    python-based
                    personal projects.
                    I am passionate about the future of computer technology and I enjoy working in organizations where I
                    can
                    meaningfully contribute to that future.</p>
                {/* <div id="btndiv">
          <div>
            <div className="head mono"></div>

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

          <div className="seperator"></div>

          <div>
            <div className="head mono"></div>

            <div>
              {backEnd.map((data, vi) => (
                <BaseStack key={vi} data={data} />
              ))}
            </div>
            <div className="brace"></div>
          </div>
        </div> */}
                <div className="langsBox mono">
                    <div className="frontEnd endBox" endname="frontEnd">
                        {frontEnd.map((v, vi) => (
                            <div key={vi} className="langdiv">
                                {v.title}
                            </div>
                        ))}
                    </div>

                    <div className="backEnd endBox" endname="backEnd">
                        {backEnd.map((v, vi) => (
                            <div key={vi} className="langdiv">
                                {v.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
