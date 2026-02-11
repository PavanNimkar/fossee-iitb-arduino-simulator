# Minimal Web-Based Arduino Simulator

A minimal web-based Arduino simulator that allows users to visually create a simple Arduino experiment using an **LED** and a **Push Button**, with **auto-wiring**, **configurable pin assignments**, **automatic Arduino code generation**, and **logic-level simulation**.

This project is built as part of the **FOSSEE OSHW Semester Internship Screening Task**.

---

## 🚀 Features

- Component Selection interface for:
  - Arduino Uno
  - LED
  - Push Button
- Automatic wiring with default pin mapping:
  - LED → Digital Pin 10
  - Push Button → Digital Pin 2
- Configurable digital pins (D2–D13) with conflict prevention
- Automatic Arduino code generation:
  - `pinMode()`
  - `digitalRead()`
  - `digitalWrite()`
- Live code updates when pin assignments change
- Logic-level simulation:
  - Button HIGH → LED ON
  - Button LOW → LED OFF
- Start / Stop simulation controls
- Toggle between circuit view and code view

---

## 🛠 Tech Stack

- Frontend: JavaScript and Tailwind CSS
- Framework/Tooling: Vite and React
- UI Components: Wokwi Elements
- Simulation Logic: avr8js and wokwi api

---

## 📂 Project Structure

<img src="/public/image.png">

---

## ⚙️ Setup & Installation

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PavanNimkar/fossee-iitb-arduino-simulator
```

### 2️⃣ Navigate to the Project Directory

```bash
cd FOSSEE IITB
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

The application will start locally at `http://localhost:5173`.

---

## 🧪 How to Use

1. Select Arduino Uno onto the canvas
2. Select LED and Push Button
3. Components are auto-wired by default:
   * LED → D10
   * Button → D2
4. View auto-generated Arduino code using View Code Button
5. Change pin assignments from the dropdown
   * Code updates automatically
   * Invalid pin conflicts are prevented
6. Click Start Simulation
7. Press the button → LED turns ON/OFF

---

## Netlify Link

https://pavan-nimkar-webarduinosimulator.netlify.app/

## Demo Video Link

https://drive.google.com/file/d/1Mh-_2J9g5BOsd5S-QeOlKXvqEpZFPjf3/view?usp=drive_link

## Snapshots

### Interface
<img src="/public/image-1.png">

### Auto Wiring
<img src="/public/image-2.png">

### Auto Code Generation
<img src="/public/image-3.png">

### Pin Reassignment by user
<img src="/public/image-4.png">

### Simulation
<img src="/public/image-5.png">

## 🙌 Acknowledgements

* FOSSEE, IIT Bombay – OSHW Project
* Wokwi & open-source simulation references