# Arduino Simulator - FOSSEE OSHW Internship Screening Task

A web-based Arduino simulator built with React and Wokwi elements for the FOSSEE OSHW Semester Long Internship 2025.

## Features Implemented

### Task 1: Web-Based Interface & Component Handling ✅
- Component palette with Arduino Uno, LED, and Push Button
- Drag-and-drop functionality
- Central canvas for circuit building
- Toolbar to switch between Circuit View and Code View
- Start/Stop simulation controls

### Auto-Wiring & Pin Configuration ✅
- Default pin mappings:
  - LED → Digital Pin 10
  - Push Button → Digital Pin 2
- User-configurable pin assignments (Digital pins 2-13)
- Pin conflict prevention (one component per pin)
- Dynamic available pin filtering

### Auto Code Generation ✅
- Automatic Arduino code generation
- Code updates automatically when pins change
- Proper pinMode(), digitalRead(), digitalWrite() usage

### Logic-Level Simulation ✅
- Button press → GPIO HIGH
- LED ON when button pressed
- LED OFF when button released
- Real-time visual feedback

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

### Step-by-Step Workflow:

1. **Add Arduino Uno**
   - Drag the Arduino Uno component from the left palette to the canvas

2. **Add LED**
   - Drag the LED component to the canvas
   - It will automatically wire to Digital Pin 10

3. **Add Push Button**
   - Drag the Push Button component to the canvas
   - It will automatically wire to Digital Pin 2

4. **View Auto-Generated Code**
   - Click "Code View" in the toolbar to see the generated Arduino code
   - The circuit remains visible alongside the code

5. **Configure Pins (Optional)**
   - Use the dropdown selectors to change pin assignments
   - LED and Button pins: Digital 2-13
   - Pin conflicts are automatically prevented
   - Code updates automatically when pins change

6. **Run Simulation**
   - Click "Start Simulation" button
   - Click and hold the push button to turn the LED on
   - Release the button to turn the LED off
   - Click "Stop Simulation" to end

## Technical Implementation

### Technologies Used
- **React 18** - UI framework
- **Wokwi Elements** - Arduino component visualization
- **Native HTML5 Drag & Drop API** - Component dragging

### Project Structure
```
src/
├── components/
│   ├── Toolbar.jsx              # View mode switcher
│   ├── ComponentPalette.jsx     # Draggable components
│   ├── Canvas.jsx               # Circuit building area
│   ├── CodeView.jsx             # Arduino code display
│   └── SimulationControls.jsx   # Start/Stop buttons
├── utils/
│   └── codeGenerator.js         # Arduino code generation
├── constants/
│   └── pins.js                  # Pin mappings
├── App.js                       # Main application logic
└── index.js                     # Entry point
```

### Key Features

#### Automatic Wiring
- Components auto-connect to default pins on placement
- Visual indicators show active connections
- Wiring updates when pins are changed

#### Pin Management
- Dropdown selectors for each component
- Available pins filtered to prevent conflicts
- Disabled during simulation for safety

#### Code Generation
- Real-time code generation
- Updates automatically on any pin change
- Follows Arduino coding standards

#### Simulation Engine
- Logic-level simulation (HIGH/LOW states)
- Button events control LED state
- Visual feedback through Wokwi elements

## Scope & Constraints Met

✅ Controller: Arduino Uno only  
✅ Components: LED and Push Button  
✅ Default Pins: LED→D10, Button→D2  
✅ Pin Range: Digital pins 2-13  
✅ Pin Exclusivity: No conflicts allowed  
✅ Auto Code Generation: Updates on change  
✅ Simulation: Button controls LED  

## Demo Video Checklist

The application demonstrates:
- [x] Drag Arduino Uno to canvas
- [x] Drag LED to canvas (auto-wires to D10)
- [x] Drag Push Button to canvas (auto-wires to D2)
- [x] View generated Arduino code
- [x] Change LED pin assignment
- [x] Code updates automatically
- [x] Change Button pin assignment
- [x] Code updates automatically
- [x] Start simulation
- [x] Button press turns LED ON
- [x] Button release turns LED OFF
- [x] Stop simulation

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements (Out of Scope for Task 1)

- Additional components (resistors, sensors, etc.)
- More Arduino boards (Mega, Nano, etc.)
- Analog pin support
- Serial monitor
- Actual AVR8js compilation and execution

## Author

Developed for FOSSEE OSHW Semester Long Internship - 2025 Screening Task

## License

This project is created for educational purposes as part of the FOSSEE internship screening process.
