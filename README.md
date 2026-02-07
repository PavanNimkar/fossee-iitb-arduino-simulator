# Arduino Simulator – FOSSEE OSHW Internship Screening Task (2025)

A web-based Arduino simulator built using **React (Vite)** that demonstrates **auto-wiring, pin configuration, automatic Arduino code generation, and logic-level simulation**, developed for the **FOSSEE OSHW Semester Long Internship – 2025 screening task**.

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

---

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

---

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

## Installation & Setup (Vite)

### Prerequisites
- Node.js **v16+**
- npm **v8+**

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Open in browser
```
http://localhost:5173
```

---

## How to Use (Mandatory End-to-End Flow)

1. Drag **Arduino Uno** from the component palette to the canvas
2. Drag **LED** to the canvas (auto-wired to **D10**)
3. Drag **Push Button** to the canvas (auto-wired to **D2**)
4. Click **Code View** to see the auto-generated Arduino code (circuit remains visible)
5. Optionally change pin numbers using dropdowns (D2–D13)
6. Click **Start Simulation**
7. Press and hold the push button → LED turns **ON**
8. Release the button → LED turns **OFF**
9. Click **Stop Simulation** to end

---

## Technical Implementation

### Technologies Used
* **React 18**
* **Vite** (development & build tool)
* **HTML5 Drag & Drop API**
* **CSS-in-JS styling**
* **Logic-level GPIO simulation**

---

### Project Structure
```
src/
├── components/
│   ├── Toolbar.jsx
│   ├── ComponentPalette.jsx
│   ├── Canvas.jsx
│   ├── CodeView.jsx
│   └── SimulationControls.jsx
├── constants/
│   └── pins.js
├── utils/
│   └── codeGenerator.js
├── App.jsx
├── main.jsx
└── App.css
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

* [x] Drag Arduino Uno to canvas
* [x] Drag LED (auto-wired to D10)
* [x] Drag Push Button (auto-wired to D2)
* [x] Auto-generated Arduino code visible
* [x] Change LED pin → code updates automatically
* [x] Change Button pin → code updates automatically
* [x] Start simulation
* [x] Button press → LED ON
* [x] Button release → LED OFF
* [x] Stop simulation

---

## Browser Compatibility

Tested on:
* Chrome 90+
* Firefox 88+
* Edge 90+
* Safari 14+

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