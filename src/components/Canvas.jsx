import React, { Fragment, useEffect, useRef } from "react";
import "@wokwi/elements";
import {
  runCode,
  stopCode,
  handleButtonPress,
  handleButtonRelease,
} from "../constants/runCode";

const Canvas = ({
  canvasComponent,
  toggleState,
  setAllPresent,
  unoCode,
  ledState,
  setLedState,
  buttonPressed,
  setButtonPressed,
  isSimulationRunning,
  setIsSimulationRunning,
  setButtonPin,
  setLedPin,
  buttonPin,
  ledPin,
}) => {
  const Components = [...new Set(canvasComponent)];
  const buttonRef = useRef(null);

  const hasUno = Components.includes("wokwi-arduino-uno");
  const hasLed = Components.includes("wokwi-led");
  const hasButton = Components.includes("wokwi-pushbutton");

  const showLedWiring = hasUno && hasLed;
  const showButtonWiring = hasUno && hasButton;

  const allPresent = showButtonWiring && showLedWiring;

  // All available Arduino pins
  const allPins = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];

  // LED wire configurations based on pin number
  const getLedWireConfig = (pin) => {
    const configs = {
      2: { rotation: "-rotate-51", height: "h-36" },
      3: { rotation: "-rotate-48", height: "h-34" },
      4: { rotation: "-rotate-45", height: "h-32" },
      5: { rotation: "-rotate-42", height: "h-31" },
      6: { rotation: "-rotate-39", height: "h-29" },
      7: { rotation: "-rotate-34", height: "h-27" },
      8: { rotation: "-rotate-28", height: "h-26" },
      9: { rotation: "-rotate-22", height: "h-25" },
      10: { rotation: "-rotate-17", height: "h-24" },
      11: { rotation: "-rotate-11", height: "h-23" },
      12: { rotation: "-rotate-5", height: "h-23" },
      13: { rotation: "rotate-1", height: "h-23" },
    };
    return configs[pin] || configs["10"];
  };

  // Button wire configurations based on pin number
  const getButtonWireConfig = (pin) => {
    const configs = {
      2: { rotation: "rotate-2", height: "h-26" },
      3: { rotation: "rotate-6", height: "h-26" },
      4: { rotation: "rotate-12", height: "h-26" },
      5: { rotation: "rotate-17", height: "h-27" },
      6: { rotation: "rotate-22", height: "h-28" },
      7: { rotation: "rotate-27", height: "h-29" },
      8: { rotation: "rotate-33", height: "h-31" },
      9: { rotation: "rotate-37", height: "h-32" },
      10: { rotation: "rotate-40", height: "h-33" },
      11: { rotation: "rotate-43", height: "h-35" },
      12: { rotation: "rotate-46", height: "h-37" },
      13: { rotation: "rotate-48", height: "h-38" },
    };
    return configs[pin] || configs["2"];
  };

  const ledWireConfig = getLedWireConfig(ledPin);
  const buttonWireConfig = getButtonWireConfig(buttonPin);

  // Get available pins for LED (exclude button pin)
  const getAvailableLedPins = () => {
    return allPins.filter((pin) => pin !== buttonPin);
  };

  // Get available pins for Button (exclude LED pin)
  const getAvailableButtonPins = () => {
    return allPins.filter((pin) => pin !== ledPin);
  };

  // Update allPresent immediately when components change
  useEffect(() => {
    setAllPresent(allPresent);
  }, [allPresent, setAllPresent, hasUno, hasLed, hasButton]);

  // Restart simulation when pins change
  useEffect(() => {
    if (isSimulationRunning && unoCode) {
      stopCode();
      setLedState(false);
      setButtonPressed(false);

      // Restart after a brief delay
      setTimeout(async () => {
        const success = await runCode(unoCode, setLedState, buttonPin, ledPin);
        if (!success) {
          setIsSimulationRunning(false);
        }
      }, 100);
    }
  }, [buttonPin, ledPin]);

  // Set up button event listeners
  useEffect(() => {
    if (buttonRef.current) {
      const buttonElement = buttonRef.current;

      const handlePress = (e) => {
        if (isSimulationRunning) {
          setButtonPressed(true);
          handleButtonPress(parseInt(buttonPin));
        } else {
          console.log("Not running");
        }
      };

      const handleRelease = (e) => {
        if (isSimulationRunning) {
          setButtonPressed(false);
          handleButtonRelease(parseInt(buttonPin));
        } else {
          console.log("Simulation not running");
        }
      };

      // Add event listeners for button press/release
      buttonElement.addEventListener("button-press", handlePress);
      buttonElement.addEventListener("button-release", handleRelease);

      return () => {
        buttonElement.removeEventListener("button-press", handlePress);
        buttonElement.removeEventListener("button-release", handleRelease);
      };
    }
  }, [isSimulationRunning, setButtonPressed, buttonPin]);

  const handleStart = async () => {
    if (!allPresent) {
      alert(
        "Please add all components (Arduino Uno, LED, and Push Button) first!",
      );
      return;
    }

    if (!unoCode) {
      alert("No code available. Please wait for code generation.");
      return;
    }

    if (buttonPin === ledPin) {
      alert("Error: LED and Button cannot use the same pin!");
      return;
    }

    if (isSimulationRunning) {
      return;
    }
    setIsSimulationRunning(true);
    const success = await runCode(unoCode, setLedState, buttonPin, ledPin);
    if (!success) {
      setIsSimulationRunning(false);
    }
  };

  const handleStop = () => {
    if (isSimulationRunning) {
      setIsSimulationRunning(false);
      stopCode();
      setLedState(false);
      setButtonPressed(false);
    }
  };

  const handleLedPinChange = (e) => {
    if (isSimulationRunning) {
      alert("Please stop the simulation before changing pins!");
      return;
    }

    const newPin = e.target.value;

    // Check if the new pin is already used by button
    if (newPin === buttonPin) {
      alert(
        `Pin ${newPin} is already used by the Button. Please select a different pin.`,
      );
      return;
    }

    setLedPin(newPin);
  };

  const handleButtonPinChange = (e) => {
    if (isSimulationRunning) {
      alert("Please stop the simulation before changing pins!");
      return;
    }

    const newPin = e.target.value;

    // Check if the new pin is already used by LED
    if (newPin === ledPin) {
      alert(
        `Pin ${newPin} is already used by the LED. Please select a different pin.`,
      );
      return;
    }

    setButtonPin(newPin);
  };

  const availableLedPins = getAvailableLedPins();
  const availableButtonPins = getAvailableButtonPins();

  return (
    <div className="relative h-full bg-gray-50">
      {showLedWiring && (
        <Fragment>
          {/* LED Ground wire (black) */}
          <div
            className={`bg-black origin-top absolute z-10 w-1 h-23 top-30 ml-4 ${toggleState ? "left-66" : "left-118"}`}
          ></div>

          {/* LED Signal wire (red) */}
          <div
            className={`bg-red-500 absolute origin-top ${ledWireConfig.rotation} ${ledWireConfig.height} z-10 w-1 top-30 ml-4 ${toggleState ? "left-69" : "left-121"}`}
          ></div>

          {/* LED Pin selector */}
          <div
            className={`absolute top-8 text-sm w-24 h-auto ${toggleState ? "left-64" : "left-105"}`}
          >
            <label className="block text-xs font-semibold mb-1">LED Pin</label>
            <select
              name="ledPin"
              id="ledPin"
              value={ledPin}
              onChange={handleLedPinChange}
              disabled={isSimulationRunning}
              className={`w-[60%] px-2 py-1 border rounded text-xs ${
                isSimulationRunning
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white cursor-pointer"
              }`}
            >
              {allPins.map((pin) => (
                <option
                  key={pin}
                  value={pin}
                  disabled={pin === buttonPin}
                  className={pin === buttonPin ? "text-gray-400" : ""}
                >
                  {pin} {pin === buttonPin ? "(Used by Button)" : ""}
                </option>
              ))}
            </select>
          </div>
        </Fragment>
      )}

      {showButtonWiring && (
        <Fragment>
          {/* Button Ground wire (black) */}
          <div
            className={`bg-black absolute origin-top rotate-[4.5deg] z-10 top-27 w-1 h-72 ml-4 ${toggleState ? "right-63" : "right-114"}`}
          ></div>

          {/* Button Signal wire (red) */}
          <div
            className={`bg-red-500 absolute origin-top ${buttonWireConfig.rotation} ${buttonWireConfig.height} z-10 top-27 w-1 ml-4 ${toggleState ? "right-51" : "right-102"}`}
          ></div>

          {/* Button Pin selector */}
          <div
            className={`absolute top-8 w-24 text-sm h-auto ${toggleState ? "right-46" : "right-85"}`}
          >
            <label className="block text-xs font-semibold mb-1">
              Button Pin
            </label>
            <select
              name="buttonPin"
              id="buttonPin"
              value={buttonPin}
              onChange={handleButtonPinChange}
              disabled={isSimulationRunning}
              className={`w-[60%] px-2 py-1 border rounded text-xs ${
                isSimulationRunning
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white cursor-pointer"
              }`}
            >
              {allPins.map((pin) => (
                <option
                  key={pin}
                  value={pin}
                  disabled={pin === ledPin}
                  className={pin === ledPin ? "text-gray-400" : ""}
                >
                  {pin} {pin === ledPin ? "(Used by LED)" : ""}
                </option>
              ))}
            </select>
          </div>
        </Fragment>
      )}

      {Components.map((ComponentElement, index) => {
        const Component = ComponentElement;
        return (
          <Fragment key={index}>
            {(() => {
              const positions = {
                "wokwi-arduino-uno":
                  "absolute w-full top-50 flex justify-center items-center",
                "wokwi-led": `absolute top-20 ${toggleState ? "left-67" : "left-119"}`,
                "wokwi-pushbutton": `absolute top-20 scale-75 ${toggleState ? "right-49" : "right-100"}`,
              };

              return (
                <div className={positions[Component]}>
                  {Component === "wokwi-led" ? (
                    <Component value={ledState} color="red" />
                  ) : Component === "wokwi-pushbutton" ? (
                    <Component
                      ref={buttonRef}
                      pressed={buttonPressed}
                      color="red"
                    />
                  ) : (
                    <Component />
                  )}
                </div>
              );
            })()}
          </Fragment>
        );
      })}

      <div className="absolute top-120 flex gap-5 bg-white rounded-2xl w-full justify-center text-white px-4 py-2">
        <button
          className={`py-2 px-6 rounded-xl font-semibold transition-all ${
            isSimulationRunning ||
            !allPresent ||
            !unoCode ||
            buttonPin === ledPin
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"
          }`}
          onClick={handleStart}
          disabled={
            isSimulationRunning ||
            !allPresent ||
            !unoCode ||
            buttonPin === ledPin
          }
        >
          Start
        </button>
        <button
          className={`py-2 px-6 rounded-xl font-semibold transition-all ${
            !isSimulationRunning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 cursor-pointer"
          }`}
          onClick={handleStop}
          disabled={!isSimulationRunning}
        >
          Stop
        </button>
      </div>

      {!allPresent && (
        <div className="absolute top-140 w-full text-center text-gray-600 text-sm">
          Add Arduino Uno, LED, and Push Button to start
        </div>
      )}

      {allPresent && !unoCode && (
        <div className="absolute top-140 w-full text-center text-yellow-600 text-sm">
          Click on "View Code" to generate code and then run the simulation by
          pressing "Start" button.
        </div>
      )}

      {allPresent && unoCode && buttonPin === ledPin && (
        <div className="absolute top-140 w-full text-center text-red-600 text-sm font-semibold">
          ⚠️ Error: LED and Button cannot use the same pin!
        </div>
      )}

      {isSimulationRunning && (
        <div className="absolute top-5 left-5 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <span className="animate-pulse">●</span> Running (LED: Pin {ledPin},
          Button: Pin {buttonPin})
        </div>
      )}
    </div>
  );
};

export default Canvas;
