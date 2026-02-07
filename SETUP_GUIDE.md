# Arduino Simulator - Quick Start Guide

## Prerequisites

Before you begin, ensure you have:
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd arduino-simulator
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React 18.2.0
- React DOM 18.2.0
- React Scripts 5.0.1
- All other required dependencies

### Step 3: Start Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to: **http://localhost:3000**

## Using the Application

### Complete Workflow (As Required by Task)

#### 1. Add Components to Canvas

**Step 1: Add Arduino Uno**
- Look at the left sidebar (Component Palette)
- Find "Arduino Uno" (🔲 icon)
- Click and drag it to the white canvas area in the center
- Release to drop it

**Step 2: Add LED**
- Find "LED" (💡 icon) in the component palette
- Drag it to the canvas
- It will automatically wire to **Digital Pin 10** (default)
- A dropdown will appear below the LED to change the pin

**Step 3: Add Push Button**
- Find "Push Button" (🔘 icon) in the component palette
- Drag it to the canvas
- It will automatically wire to **Digital Pin 2** (default)
- A dropdown will appear below the button to change the pin

#### 2. View Auto-Generated Code

- Click the **"Code View"** button in the top toolbar
- The right side will show the automatically generated Arduino code
- The circuit remains visible on the left

**Generated Code Structure:**
```cpp
// Auto-generated Arduino code
// LED Pin: 10
// Button Pin: 2

const int LED_PIN = 10;
const int BUTTON_PIN = 2;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  
  if (buttonState == HIGH) {
    digitalWrite(LED_PIN, HIGH);  // Turn LED on
  } else {
    digitalWrite(LED_PIN, LOW);   // Turn LED off
  }
}
```

#### 3. Change Pin Assignments

**To Change LED Pin:**
- Find the dropdown under the LED component
- Currently shows: "D10"
- Click to see available pins (D2-D13)
- Select a different pin (e.g., D11)
- **Code updates automatically!**

**To Change Button Pin:**
- Find the dropdown under the Push Button component
- Currently shows: "D2"
- Click to see available pins
- Note: Pins already used by LED are excluded
- Select a different pin (e.g., D3)
- **Code updates automatically!**

**Pin Conflict Prevention:**
- If LED is on D10, D10 won't appear in Button's dropdown
- If Button is on D2, D2 won't appear in LED's dropdown
- Only pins 2-13 are available (Arduino digital pins)

#### 4. Run Simulation

**Start Simulation:**
- Click the green **"▶ Start Simulation"** button
- A green status bar appears: "🟢 Simulation Running"
- Instructions appear: "Click and hold the push button to turn the LED ON/OFF"

**Test the Circuit:**
- **Click and HOLD** the red push button component
- LED turns **RED** (ON state)
- **Release** the push button
- LED turns **DARK GRAY** (#333) (OFF state)

**Stop Simulation:**
- Click the red **"⏹ Stop Simulation"** button
- Simulation stops
- LED returns to OFF state

## Features Demonstrated

### ✅ Task 1 Requirements

1. **Component Palette** ✓
   - Left sidebar with draggable components
   - Arduino Uno, LED, Push Button

2. **Central Canvas** ✓
   - Drop zone for components
   - Visual component placement
   - Circuit building area

3. **View Toggle** ✓
   - Switch between Circuit View and Code View
   - Circuit remains visible in Code View

4. **Simulation Controls** ✓
   - Start button
   - Stop button
   - Status indicators

### ✅ Auto-Wiring Features

- **Default Assignments:**
  - LED → D10
  - Button → D2

- **Pin Configuration:**
  - Dropdown selectors for each component
  - Pins 2-13 available
  - No duplicate assignments
  - Dynamic filtering

### ✅ Code Generation

- **Automatic Generation:**
  - Generated on component placement
  - Uses pinMode(), digitalRead(), digitalWrite()
  
- **Auto Updates:**
  - Changes when pins are modified
  - No manual editing needed

### ✅ Simulation

- **Logic-Level:**
  - Button press = GPIO HIGH
  - LED ON when button pressed
  - LED OFF when button released

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Stop the current process or use a different port
PORT=3001 npm start
```

### Dependencies Not Installing
```bash
# Clear npm cache and retry
npm cache clean --force
npm install
```

### Wokwi Elements Not Loading
- Check your internet connection (Wokwi elements load from CDN)
- Refresh the browser page
- Clear browser cache

### Components Not Dragging
- Ensure you're using a modern browser
- Try refreshing the page
- Check browser console for errors (F12)

### Simulation Not Working
- Ensure all three components are placed (Arduino, LED, Button)
- Check that pins are properly assigned
- Click Start Simulation button

## Demo Video Recording Tips

### What to Show:

1. **Initial State**
   - Empty canvas
   - Component palette visible

2. **Adding Components**
   - Drag Arduino → canvas
   - Drag LED → canvas (show it auto-wires to D10)
   - Drag Button → canvas (show it auto-wires to D2)

3. **Code View**
   - Click Code View button
   - Show generated code
   - Point out LED Pin: 10, Button Pin: 2

4. **Pin Changes**
   - Change LED pin to D11
   - Show code updates (LED_PIN = 11)
   - Change Button pin to D3
   - Show code updates (BUTTON_PIN = 3)

5. **Simulation**
   - Click Start Simulation
   - Show status indicator
   - Press and hold button → LED turns red
   - Release button → LED turns gray
   - Click Stop Simulation

### Recording Tools:
- **Windows:** Xbox Game Bar (Win + G), OBS Studio
- **Mac:** QuickTime, built-in screen recording (Cmd + Shift + 5)
- **Linux:** SimpleScreenRecorder, OBS Studio
- **Online:** Loom, Screencast-O-Matic

## Project Structure

```
arduino-simulator/
├── public/
│   └── index.html          # Loads Wokwi elements from CDN
├── src/
│   ├── components/
│   │   ├── Canvas.jsx              # Circuit building area
│   │   ├── CodeView.jsx            # Code display
│   │   ├── ComponentPalette.jsx    # Draggable components
│   │   ├── SimulationControls.jsx  # Start/Stop buttons
│   │   └── Toolbar.jsx             # View switcher
│   ├── constants/
│   │   └── pins.js                 # Pin configurations
│   ├── utils/
│   │   └── codeGenerator.js        # Code generation logic
│   ├── App.js              # Main application
│   ├── App.css             # Styles
│   └── index.js            # Entry point
├── package.json
└── README.md
```

## Next Steps

After completing Task 1, you can:
1. Record your demo video
2. Test all functionality thoroughly
3. Submit through the official form
4. Prepare for Tasks 2 and 3 (if applicable)

## Support

For issues or questions:
- Check the browser console (F12) for errors
- Review the README.md for detailed documentation
- Ensure all files are in the correct locations
- Verify Node.js and npm are properly installed

## Success Criteria

Your implementation is successful if you can:
- ✅ Drag all three components to canvas
- ✅ See default pin assignments (LED:D10, Button:D2)
- ✅ View auto-generated Arduino code
- ✅ Change pin assignments via dropdowns
- ✅ See code update automatically
- ✅ Start simulation successfully
- ✅ Control LED with button press/release
- ✅ Stop simulation

Good luck with your FOSSEE OSHW internship application! 🚀
