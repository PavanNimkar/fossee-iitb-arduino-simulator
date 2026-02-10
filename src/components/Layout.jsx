import React, { useState } from "react";
import { Fragment } from "react";

// Component
import Navbar from "./Navbar";
import ComponentPalette from "./ComponentPalette";
import Canvas from "./Canvas";
import CodeView from "./CodeView";
import { ArrowRightFromLine } from "lucide-react";

const Layout = () => {
  const [toggleState, setToggleState] = useState(false);
  const [canvasComponent, setCanvasComponent] = useState([]);
  const [allPresent, setAllPresent] = useState(false);
  const [unoCode, setUnoCode] = useState();
  const [ledState, setLedState] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [buttonPin, setButtonPin] = useState("2");
  const [ledPin, setLedPin] = useState("10");

  return (
    <Fragment>
      <div className="fixed top-0 left-0 w-full h-[3vh] z-10">
        <Navbar />
      </div>
      <div className="flex h-[97vh] w-screen mt-[3vh]">
        <div className="h-full w-1/4">
          <ComponentPalette addComponents={setCanvasComponent} />
        </div>
        <Fragment>
          <div className={toggleState ? "w-2/4" : "w-3/4 h-full"}>
            <Canvas
              canvasComponent={canvasComponent}
              toggleState={toggleState}
              setAllPresent={setAllPresent}
              unoCode={unoCode}
              ledState={ledState}
              setLedState={setLedState}
              buttonPressed={buttonPressed}
              setButtonPressed={setButtonPressed}
              isSimulationRunning={isSimulationRunning}
              setIsSimulationRunning={setIsSimulationRunning}
              setButtonPin={setButtonPin}
              setLedPin={setLedPin}
              buttonPin={buttonPin}
              ledPin={ledPin}
            />
          </div>
          {toggleState && (
            <div className="w-[35%]">
              <CodeView
                allPresent={allPresent}
                setUnoCode={setUnoCode}
                buttonPin={buttonPin}
                ledPin={ledPin}
              />
            </div>
          )}
        </Fragment>
      </div>
      <button
        className="absolute top-6 right-4 cursor-pointer bg-blue-300 py-1 px-3 rounded-xl text-white"
        onClick={() => {
          setToggleState(!toggleState);
        }}
      >
        {toggleState ? <ArrowRightFromLine className="m-1" /> : "View Code"}
      </button>
    </Fragment>
  );
};

export default Layout;
