import MyProfile from "./AboutMe/MyProfile";
import LinkBar from "./FixedComponents/LinkBar";
import NavBar from "./FixedComponents/NavBar";
import MyWorks from "./MyWorks/MyWorks";
import Resume from "./Resume/Resume";
import "./App.css";

//OUR PALLETE
//https://coolors.co/palette/131515-2b2c28-339989-7de2d1-fffafb

function App() {
  return (
    <>
      <NavBar />
      <div className="main">
        <MyProfile />
        <Resume />
        <MyWorks />
      </div>
      <LinkBar />
    </>
  );
}

export default App;
