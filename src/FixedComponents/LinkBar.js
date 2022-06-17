import React from "react";

export default function LinkBar() {
  const links = [
    { image: "email", link: "www.gmail.com" },
    { image: "linkedin", link: "www.linkedin.com" },
    { image: "github", link: "www.github.com" },
    { image: "cv", link: "www.pdf.com" },
  ];
  return (
    <div className="linkbar">
      <ul>
        {links.map((link, li) => (
          <li key={li}>
            <a href={link.link}>{/*link.image*/ "."}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
