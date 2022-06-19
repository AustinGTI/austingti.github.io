import React from "react";
import "./FixedComponents.scss";
import { ReactComponent as EmailIcon } from "../data/icons/Email.svg";
import { ReactComponent as LinkedInIcon } from "../data/icons/Linkedin.svg";
import { ReactComponent as GithubIcon } from "../data/icons/Github.svg";
import { ReactComponent as CVIcon } from "../data/icons/CV.svg";

export default function LinkBar() {
  const links = [
    { image: "email", link: "www.gmail.com", icon: EmailIcon },
    { image: "linkedin", link: "www.linkedin.com", icon: LinkedInIcon },
    { image: "github", link: "www.github.com", icon: GithubIcon },
    { image: "cv", link: "www.pdf.com", icon: CVIcon },
  ];
  return (
    <div className="linkbar">
      <ul>
        {links.map(({ link, icon: Icon }, li) => (
          <li key={li}>
            <a href={link}>
              <Icon width="70%" height="auto" />
              <br />
              <p>.</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
