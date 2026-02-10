import { Buffer } from "buffer";
import {
  avrInstruction,
  AVRIOPort,
  AVRTimer,
  CPU,
  portBConfig,
  portDConfig,
  timer0Config,
} from "avr8js";

globalThis.Buffer = Buffer;

// ATmega328p params
const FLASH = 0x8000;

// Intel HEX loader function
function loadHex(source, target) {
  for (const line of source.split("\n")) {
    if (line[0] === ":" && line.substr(7, 2) === "00") {
      const bytes = parseInt(line.substr(1, 2), 16);
      const addr = parseInt(line.substr(3, 4), 16);
      for (let i = 0; i < bytes; i++) {
        target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16);
      }
    }
  }
}

class AVRRunner {
  constructor(hex) {
    this.program = new Uint16Array(FLASH);
    loadHex(hex, new Uint8Array(this.program.buffer));

    this.cpu = new CPU(this.program);
    this.timer0 = new AVRTimer(this.cpu, timer0Config);
    this.portB = new AVRIOPort(this.cpu, portBConfig);
    this.portD = new AVRIOPort(this.cpu, portDConfig);

    this.stopped = false;
    this.MHZ = 16e6;

    console.log("AVR Runner initialized");
  }

  async execute(callback) {
    this.stopped = false;
    console.log("Starting AVR execution...");

    for (;;) {
      avrInstruction(this.cpu);
      this.cpu.tick();

      if (this.cpu.cycles % 50000 === 0) {
        callback(this.cpu);
        await new Promise((resolve) => setTimeout(resolve, 0));
        if (this.stopped) {
          console.log("Execution stopped");
          break;
        }
      }
    }
  }

  stop() {
    this.stopped = true;
  }
}

let runner = null;

// Helper function to determine which port a pin belongs to
function getPinPort(pinNumber) {
  const pin = parseInt(pinNumber);
  if (pin >= 0 && pin <= 7) {
    return { port: "D", bit: pin };
  } else if (pin >= 8 && pin <= 13) {
    return { port: "B", bit: pin - 8 };
  }
  return null;
}

const runCode = async (generatedCode, setLedState, buttonPin, ledPin) => {
  console.log("Compiling code with pins:", { buttonPin, ledPin });

  try {
    // Compile the code
    const result = await fetch("https://hexi.wokwi.com/build", {
      method: "post",
      body: JSON.stringify({ sketch: generatedCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { hex, stderr, stdout } = await result.json();

    console.log("Compilation stdout:", stdout);
    console.log("Compilation stderr:", stderr);

    if (stderr && stderr.includes("error")) {
      console.error("Compilation error:", stderr);
      alert("Compilation failed:\n" + stderr);
      return false;
    }

    if (!hex) {
      console.error("No hex output");
      alert("Compilation failed: No hex output");
      return false;
    }

    console.log("Compilation successful, hex length:", hex.length);

    // Create AVR runner instance
    runner = new AVRRunner(hex);

    console.log("AVR Runner created");

    // Get button pin port info
    const buttonPinInfo = getPinPort(buttonPin);
    const buttonPort = buttonPinInfo.port === "B" ? runner.portB : runner.portD;
    const buttonBit = buttonPinInfo.bit;

    // Initialize button pin to LOW (not pressed in logic-level simulation)
    buttonPort.setPin(buttonBit, false);
    console.log(
      `Button pin ${buttonPin} (Port ${buttonPinInfo.port}, bit ${buttonBit}) initialized to LOW`,
    );

    // Get LED pin port info
    const ledPinInfo = getPinPort(ledPin);
    const ledPort = ledPinInfo.port === "B" ? runner.portB : runner.portD;
    const ledBit = ledPinInfo.bit;

    // Monitor the LED port
    ledPort.addListener((value) => {
      const ledOn = (value & (1 << ledBit)) !== 0;
      console.log(
        `PORT${ledPinInfo.port} changed:`,
        value.toString(2).padStart(8, "0"),
        `LED (pin ${ledPin}):`,
        ledOn,
      );
      setLedState(ledOn);
    });

    // Monitor the button port for debugging
    buttonPort.addListener((value) => {
      const buttonState = (value & (1 << buttonBit)) !== 0;
      console.log(
        `PORT${buttonPinInfo.port} changed:`,
        value.toString(2).padStart(8, "0"),
        `Button (pin ${buttonPin}):`,
        buttonState ? "HIGH" : "LOW",
      );
    });

    // Execute the program
    runner.execute((cpu) => {
      // Log cycles periodically
      if (cpu.cycles % 1000000 === 0) {
        console.log("CPU cycles:", cpu.cycles / 1000000, "M");
      }
    });

    console.log("Execution started");
    return true;
  } catch (error) {
    console.error("Error in runCode:", error);
    alert("Error: " + error.message);
    return false;
  }
};

const stopCode = () => {
  console.log("Stopping simulation...");
  if (runner) {
    runner.stop();
    runner = null;
  }
};

const handleButtonPress = (pinIndex) => {
  if (runner) {
    const pinInfo = getPinPort(pinIndex);
    const port = pinInfo.port === "B" ? runner.portB : runner.portD;
    console.log(
      `Button pressed - setting pin ${pinIndex} (Port ${pinInfo.port}, bit ${pinInfo.bit}) to HIGH`,
    );
    // Set pin HIGH when button is pressed (logic-level simulation)
    port.setPin(pinInfo.bit, true);
  } else {
    console.warn("Runner not initialized, cannot press button");
  }
};

const handleButtonRelease = (pinIndex) => {
  if (runner) {
    const pinInfo = getPinPort(pinIndex);
    const port = pinInfo.port === "B" ? runner.portB : runner.portD;
    console.log(
      `Button released - setting pin ${pinIndex} (Port ${pinInfo.port}, bit ${pinInfo.bit}) to LOW`,
    );
    // Set pin LOW when button is released (logic-level simulation)
    port.setPin(pinInfo.bit, false);
  } else {
    console.warn("Runner not initialized, cannot release button");
  }
};

export { runCode, stopCode, handleButtonPress, handleButtonRelease };
