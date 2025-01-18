import React, {
    useEffect,
    useMemo,
    useCallback,
    useReducer,
    useRef,
    useState,
} from "react";

import {ReactComponent as EmailIcon} from "../data/icons/Email.svg";
import {ReactComponent as LinkedInIcon} from "../data/icons/Linkedin.svg";
import {ReactComponent as GithubIcon} from "../data/icons/Github.svg";
import {ReactComponent as CVIcon} from "../data/icons/CV.svg";

import "./MyContacts.scss";
import PageBackground from "../SiteBackground/PageBackground";

export const links = [
    {
        title: "email",
        link: "mailto:gathiiaustin@gmail.com",
        icon: EmailIcon,
        quotes: ["Say Hello..."],
    },
    {
        title: "linkedin",
        link: "https://linkedin.com/in/austingti",
        icon: LinkedInIcon,
        quotes: ["Take a look at my linkedIn page..."],
    },
    {
        title: "github",
        link: "https://github.com/AustinGTI",
        icon: GithubIcon,
        quotes: ["Go through my code..."],
    },
    {
        title: "CV",
        link: require("../data/contacts/cv_2025.pdf"),
        icon: CVIcon,
        quotes: ["Download my CV..."],
    },
];

export default function MyContacts() {
    const [mainLink, setLink] = useReducer(
        (state, action) =>
            action.type === "inc" ? (
                state + 1
            ) % links.length : action.val,
        0
    );
    const [randVal, rerenderComp] = useState(0.5);
    let animActive = useMemo(() => true, []);
    let linkCanChange = useRef(true);
    let activeAnim = useRef(undefined);
    let invTm = useRef(undefined);

    const transitionElem = useCallback(
        function (to) {
            const animSettings = {
                animId: undefined,
                duration: 30 / 1000, //chars per ms
                perFrame: 30,
                currFrame: 0,
            };
            if (document.visibilityState === "hidden" || animActive === false) {
                return;
            }

            //transition the quote
            const quoteElem = document.querySelector("div.contactsbox > h2");

            let myQuote = links[to].quotes[0]; //0 for now soon will be randomized...
            let prevQuote = quoteElem.innerText;
            let ttLen = myQuote.length + prevQuote.length;

            if (prevQuote === myQuote) {
                return;
            }

            clearInterval(activeAnim.current);

            //transition the brace
            const mybrace = document.querySelector("div.bracespace > div");

            const noReg = /[\d.-]+/;
            let currPos = parseFloat(mybrace.style.left.match(noReg));
            let toPos = 100 / links.length / 2 + (
                100 / links.length
            ) * to;

            let ttFrames = ttLen / animSettings.duration / animSettings.perFrame;

            animSettings.animId = setInterval(
                (ams, ttf) => {
                    ams.currFrame++;
                    if (ams.currFrame > ttf) {
                        mybrace.style.left = `${toPos}%`;
                        clearInterval(ams.animId);
                        return;
                    }
                    quoteElem.innerText =
                        prevQuote.slice(
                            0,
                            Math.max(
                                0,
                                prevQuote.length - parseInt((
                                    ams.currFrame / ttf
                                ) * ttLen)
                            )
                        ) +
                        myQuote.slice(
                            0,
                            Math.max(
                                0,
                                parseInt((
                                    ams.currFrame / ttf
                                ) * ttLen) - prevQuote.length
                            )
                        );
                    mybrace.style.left = `${
                        currPos + (
                            toPos - currPos
                        ) * (
                            ams.currFrame / ttf
                        )
                    }%`;
                },
                animSettings.perFrame,
                animSettings,
                ttFrames
            );
            activeAnim.current = animSettings.animId;
        },
        [activeAnim, animActive] //i have no idea why these 2 variables have the same name..
    );

    const resetTimeout = useCallback((t = 5 * 1000) => {
        return setTimeout(() => {
            if (
                document.visibilityState === "visible" &&
                document.querySelector("#mycontacts").getBoundingClientRect().y < 10 &&
                linkCanChange.current
            ) {
                setLink({type: "inc"});
            }
        }, t);
    }, []);

    useEffect(() => {
        const resetAnim = (delay) => {
            setTimeout(() => {
                const iconDivs = document.querySelectorAll(
                    "div.contactsbox > div.icons > a > div.icon"
                );
                iconDivs.forEach((v, vi) => {
                    v.classList.remove("main");
                });
                document.querySelector("div.contactsbox > h2").innerText = "          ";
            }, delay);
        };

        const print = (entries, observer) => {
            if (entries[0].isIntersecting) {
                setLink({type: "set", val: 0});
                rerenderComp(Math.random());
            } else {
                resetAnim(1000);
            }
        };

        let contactspage = document.querySelector("#mycontacts");
        const observer = new IntersectionObserver(print, {
            root: null,
            rootMargin: "0px",
            threshold: "0.9",
        });
        observer.observe(contactspage);

        const resetMainLink = (e) => {
            if (document.visibilityState === "visible") {
                setLink({type: "set", val: 0});
            } else {
                resetAnim(200);
            }
        };
        //onhover change quote
        const onHover = function (e) {
            const idx = Array.from(
                e.target.parentElement.parentElement.children
            ).indexOf(e.target.parentElement);
            setLink({type: "set", val: idx});
            linkCanChange.current = false;
            clearTimeout(invTm.current);
        };

        const onLeave = function (e) {
            linkCanChange.current = true;
            invTm.current = resetTimeout();
        };

        //add onhover to icons
        //display mainquote indicator
        const iconDivs = document.querySelectorAll(
            "div.contactsbox > div.icons > a > div.icon"
        );

        iconDivs.forEach((v) => {
            v.addEventListener("mouseenter", onHover);
            v.addEventListener("mouseleave", onLeave);
        });

        document.addEventListener("visibilitychange", resetMainLink);
        return () => {
            document.removeEventListener("visibilitychange", resetMainLink);
            iconDivs.forEach((v) => {
                v.removeEventListener("mouseenter", onHover);
                v.removeEventListener("mouseleave", onLeave);
            });
        };
    }, [resetTimeout]);

    useEffect(() => {
        transitionElem(mainLink);
        if (mainLink === links.length - 1) {
            invTm.current = resetTimeout(20 * 1000);
        } else {
            invTm.current = resetTimeout(5 * 1000);
        }

        //display mainquote indicator
        const iconDivs = document.querySelectorAll(
            "div.contactsbox > div.icons > a > div.icon"
        );
        iconDivs.forEach((v, vi) => {
            if (vi === mainLink) {
                v.classList.add("main");
            } else {
                if (v.classList.contains("main")) {
                    v.classList.remove("main");
                }
            }
        });
        return () => {
            clearTimeout(invTm.current);
        };
    }, [mainLink, transitionElem, randVal, resetTimeout]);

    return (
        <>
            <div id="mycontacts">
                <div className="contactsbox">
                    <PageBackground
                        codeSnippet={"displayContacts() // #3."}
                        parentid={"mycontacts"}
                    />
                    <h1 className="mono">Get in touch.</h1>
                    <h2 className="primary mono">Quote</h2>
                    <div className="bracespace">
                        <div className="brace"></div>
                    </div>
                    <div className="icons">
                        {links.map(({title, icon: Icon, link}, vi) => (
                            <a href={link} rel="noreferrer" key={vi} target="_blank">
                                <div className="icon">
                                    <Icon/>
                                    <div className="title">
                                        <h3>{title}</h3>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <div className="mono">
                        <div>
                            <a
                                rel="noreferrer"
                                href={
                                    links.find((v) => v.title === "github").link + "/austingti.github.io"
                                }
                                target="_blank"
                            >
                                Built &amp; designed
                            </a>
                        </div>
                        {" "}
                        by{" "}
                        <div className="myname">
                            <a
                                rel="noreferrer"
                                href={links.find((v) => v.title === "linkedin").link}
                                target="_blank"
                            >
                                Austin Gathii
                            </a>
                        </div>
                        <br/>
                        gathiiaustin@gmail.com
                    </div>
                </div>
            </div>
        </>
    );
}
