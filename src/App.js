import MyProfile from "./AboutMe/MyProfile";
import LinkBar from "./FixedComponents/LinkBar";
import NavBar from "./FixedComponents/NavBar";
import Resume from "./Resume/Resume";
import "./App.css";
import MyContacts from "./MyContacts/MyContacts";
import MyWorksBeta from "./MyWorks/MyWorksBeta";

//OUR PALLETE
//https://coolors.co/palette/131515-2b2c28-339989-7de2d1-fffafb

function App() {
  console.log("done");
  return (
    <>
      <NavBar />
      <div className="main">
        {/* <svg>
          <g>
            {Array.from(Array(100).keys()).map((v) => (
              <circle
                cy={`${10 * Math.floor(v / 10)}%`}
                cx={`${10 * (v % 10)}%`}
                r={"20px"}
                fill={"inherit"}
              />
            ))}
          </g>
        </svg> */}
        <MyProfile />
        <Resume />
        <MyWorksBeta />
        <MyContacts />
      </div>
      <LinkBar />
    </>
  );
}

export default App;
