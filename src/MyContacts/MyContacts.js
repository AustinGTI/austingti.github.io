import React, { useState } from "react";

import { ReactComponent as EmailIcon } from "../data/icons/Email.svg";
import { ReactComponent as LinkedInIcon } from "../data/icons/Linkedin.svg";
import { ReactComponent as GithubIcon } from "../data/icons/Github.svg";
import { ReactComponent as CVIcon } from "../data/icons/CV.svg";

import "./MyContacts.scss";

export default function MyContacts() {
  const links = [
    {
      title: "email",
      link: "www.gmail.com",
      icon: EmailIcon,
      quotes: ["Say Hello..."],
    },
    {
      title: "linkedin",
      link: "www.linkedin.com",
      icon: LinkedInIcon,
      quotes: ["Take a look at my linkedIn page..."],
    },
    {
      title: "github",
      link: "www.github.com",
      icon: GithubIcon,
      quotes: ["Go through my code..."],
    },
    {
      title: "CV",
      link: "www.pdf.com",
      icon: CVIcon,
      quotes: ["Download my CV..."],
    },
  ];
  const [mainLink, setLink] = useState(0);

  return (
    <>
      <div className="mycontacts">
        <h1 className="mono">Get in touch.</h1>
        <h2 className="primary mono">{links[mainLink].quotes[0]}</h2>
        <div className="icons">
          {links.map(({ title, icon: Icon, link }, vi) => (
            <a href={link} key={vi}>
              <div className="icon">
                <Icon />
                <h3>{title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="footer">
        <p className="mono">&gt; Built &amp; designed by Austin Gathii &lt;</p>
      </div>
    </>
  );
}
