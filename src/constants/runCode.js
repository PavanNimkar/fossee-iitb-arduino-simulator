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
  }

  async execute(callback) {
    this.stopped = false;

    for (;;) {
      avrInstruction(this.cpu);
      this.cpu.tick();

      if (this.cpu.cycles % 50000 === 0) {
        callback(this.cpu);
        await new Promise((resolve) => setTimeout(resolve, 0));
        if (this.stopped) {
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

    if (stderr && stderr.includes("error")) {
      alert("Compilation failed:\n" + stderr);
      return false;
    }

    if (!hex) {
      alert("Compilation failed: No hex output");
      return false;
    }

    // Create AVR runner instance
    runner = new AVRRunner(hex);

    // Get button pin port info
    const buttonPinInfo = getPinPort(buttonPin);
    const buttonPort = buttonPinInfo.port === "B" ? runner.portB : runner.portD;
    const buttonBit = buttonPinInfo.bit;

    // Initialize button pin to LOW (not pressed in logic-level simulation)
    buttonPort.setPin(buttonBit, false);

    // Get LED pin port info
    const ledPinInfo = getPinPort(ledPin);
    const ledPort = ledPinInfo.port === "B" ? runner.portB : runner.portD;
    const ledBit = ledPinInfo.bit;

    // Monitor the LED port
    ledPort.addListener((value) => {
      const ledOn = (value & (1 << ledBit)) !== 0;

      setLedState(ledOn);
    });

    // Monitor the button port for debugging
    buttonPort.addListener((value) => {
      const buttonState = (value & (1 << buttonBit)) !== 0;
    });

    // Execute the program
    runner.execute((cpu) => {
      // Log cycles periodically
      if (cpu.cycles % 1000000 === 0) {
        console.log("CPU cycles:", cpu.cycles / 1000000, "M");
      }
    });

    return true;
  } catch (error) {
    alert("Error: " + error.message);
    return false;
  }
};

const stopCode = () => {
  if (runner) {
    runner.stop();
    runner = null;
  }
};

const handleButtonPress = (pinIndex) => {
  if (runner) {
    const pinInfo = getPinPort(pinIndex);
    const port = pinInfo.port === "B" ? runner.portB : runner.portD;

    // Set pin HIGH when button is pressed (logic-level simulation)
    port.setPin(pinInfo.bit, true);
  } else {
    console.warn("Cannot press button");
  }
};

const handleButtonRelease = (pinIndex) => {
  if (runner) {
    const pinInfo = getPinPort(pinIndex);
    const port = pinInfo.port === "B" ? runner.portB : runner.portD;

    // Set pin LOW when button is released (logic-level simulation)
    port.setPin(pinInfo.bit, false);
  } else {
    console.warn("Cannot release button");
  }
};

export { runCode, stopCode, handleButtonPress, handleButtonRelease };
