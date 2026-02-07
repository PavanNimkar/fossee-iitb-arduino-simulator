# Arduino Simulator – FOSSEE OSHW Internship Screening Task (2025)

A web-based Arduino simulator built using **React (Vite)** that demonstrates **auto-wiring, pin configuration, automatic Arduino code generation, and logic-level simulation**, developed for the **FOSSEE OSHW Semester Long Internship – 2025 screening task**.

---

## Quick Start

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation
```bash
# Navigate to project directory
cd arduino-simulator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Open in browser
```
http://localhost:5173
```

---

## Features Implemented

### Task 1: Web-Based Interface & Component Handling
- Component palette on the **left** containing:
  - Arduino Uno
  - LED
  - Push Button
- Drag-and-drop placement of components
- Central **canvas** for building the circuit
- Toolbar to switch between **Circuit View** and **Code View**
- **Start / Stop Simulation** controls embedded on the canvas

### Task 2: Auto-Wiring & Pin Configuration
- **Default pin mapping (mandatory initial state)**:
  - LED → Digital Pin **10**
  - Push Button → Digital Pin **2**
- Automatic wiring on component placement
- User-configurable digital pins (**2–13**)
- Pin conflict prevention:
  - One Arduino pin per component
  - Used pins excluded from other components
- Wiring updates automatically when pin assignments change

### Task 3: Auto Code Generation & Logic-Level Simulation
- Automatic Arduino code generation
- Code updates instantly when pin numbers change
- Generated code includes:
  - `pinMode()`
  - `digitalRead()`
  - `digitalWrite()`
- Logic-level simulation:
  - Button pressed → GPIO **HIGH**
  - Button released → GPIO **LOW**
  - LED turns **ON** when button is pressed
  - LED turns **OFF** when button is released
- No manual code editing required

---

## How to Use (Mandatory End-to-End Flow)

### 1. Add Components to Canvas

**Step 1: Add Arduino Uno**
- Look at the left sidebar (Component Palette)
- Find Arduino Uno (🔲 icon)
- Drag it to the central canvas
- Release to place it

**Step 2: Add LED**
- Drag LED (💡 icon) to the canvas
- It automatically wires to Digital Pin 10 (default)
- A dropdown appears below the LED to change the pin

**Step 3: Add Push Button**
- Drag Push Button (🔘 icon) to the canvas
- It automatically wires to Digital Pin 2 (default)
- A dropdown appears below the button to change the pin

### 2. View Auto-Generated Code

- Click **Code View** in the top toolbar
- The right panel displays the generated Arduino code
- The circuit remains visible on the canvas

**Example Generated Code:**
```cpp
// Auto-generated Arduino code

const int LED_PIN = 10;
const int BUTTON_PIN = 2;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == HIGH) {
    digitalWrite(LED_PIN, HIGH);   // Turn LED ON
  } else {
    digitalWrite(LED_PIN, LOW);    // Turn LED OFF
  }
}
```

### 3. Change Pin Assignments

**Change LED Pin:**
- Use the dropdown below the LED
- Default: D10
- Select any available pin between D2–D13
- Arduino code updates automatically

**Change Button Pin:**
- Use the dropdown below the Push Button
- Default: D2
- Pins already used by the LED are excluded
- Arduino code updates automatically

**Pin Conflict Prevention:**
- One pin per component
- LED and Button cannot share the same pin
- Only Arduino digital pins 2–13 are allowed

### 4. Run Simulation

**Start Simulation:**
- Click the green ▶ **Start Simulation** button (inside the canvas)
- Simulation status changes to Running

**Test the Circuit:**
- Click and HOLD the push button
  - Button GPIO → HIGH
  - LED turns ON (red)
- Release the push button
  - Button GPIO → LOW
  - LED turns OFF (dark gray)

**Stop Simulation:**
- Click ⏹ **Stop Simulation**
- Simulation stops and LED resets to OFF

---

## Technical Implementation

### Technologies Used
* **React 18**
* **Vite** (development & build tool)
* **HTML5 Drag & Drop API**
* **CSS-in-JS styling**
* **Logic-level GPIO simulation**

### Project Structure
```
arduino-simulator/
├── index.html
├── src/
│   ├── components/
│   │   ├── Canvas.jsx
│   │   ├── CodeView.jsx
│   │   ├── ComponentPalette.jsx
│   │   ├── SimulationControls.jsx
│   │   └── Toolbar.jsx
│   ├── constants/
│   │   └── pins.js
│   ├── utils/
│   │   └── codeGenerator.js
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
├── package.json
└── README.md
```

---

## Scope & Constraints Met

* ✔ Controller: **Arduino Uno only**
* ✔ Components: **LED, Push Button**
* ✔ Default Pins: LED → D10, Button → D2
* ✔ Pin Range: Digital Pins **2–13**
* ✔ Pin Exclusivity enforced
* ✔ Automatic code generation
* ✔ Automatic updates on pin change
* ✔ Button controls LED (logic-level simulation)

---

## Demo Video Checklist

* [x] Empty canvas
* [x] Drag Arduino Uno to canvas
* [x] Drag LED (auto-wired to D10)
* [x] Drag Push Button (auto-wired to D2)
* [x] Open Code View (code visible with circuit)
* [x] Change LED pin → code updates automatically
* [x] Change Button pin → code updates automatically
* [x] Start simulation
* [x] Button press → LED ON
* [x] Button release → LED OFF
* [x] Stop simulation

---

## Troubleshooting

### Development Server Not Starting
```bash
npm install
npm run dev
```

### Port Already in Use
Vite automatically selects a free port. Check the terminal output for the correct URL.

### Drag-and-Drop Not Working
- Use a modern browser
- Refresh the page
- Check console errors (F12)

### Simulation Not Working
- Ensure Arduino, LED, and Button are all placed
- Click Start Simulation
- Press and hold the button (not a single click)

---

## Browser Compatibility

Tested on:
* Chrome 90+
* Firefox 88+
* Edge 90+
* Safari 14+

---

## Success Criteria (FOSSEE)

Your implementation is successful if:
* ✅ All components can be dragged to canvas
* ✅ Default pins are correct (LED:D10, Button:D2)
* ✅ Arduino code is auto-generated
* ✅ Code updates when pins change
* ✅ Simulation starts and stops
* ✅ Button press controls LED correctly

---

## Future Enhancements (Out of Scope)

* Additional components (resistors, sensors)
* Multiple Arduino boards
* Analog pin support
* Serial monitor
* AVR8js-based execution

---

## Author

Developed for the **FOSSEE OSHW Semester Long Internship – 2025 Screening Task**

---

## License

This project is created for **educational and evaluation purposes only** as part of the FOSSEE OSHW internship screening process.