import React, { useEffect, useRef, useState } from "react";
import { COMPONENT_TYPES, AVAILABLE_PINS } from "../constants/pins";

const Canvas = ({
  components,
  onDrop,
  pinAssignments,
  onPinChange,
  isSimulating,
  buttonPressed,
  ledState,
  setButtonPressed,
  children,
}) => {
  const canvasRef = useRef(null);
  const arduinoRef = useRef(null);
  const ledRef = useRef(null);
  const buttonRef = useRef(null);

  // Track positions for wire drawing
  const [wirePositions, setWirePositions] = useState({
    led: null,
    button: null,
  });

  // Update wire positions when components are placed or pins change
  useEffect(() => {
    const updateWirePositions = () => {
      const arduino = arduinoRef.current;
      const led = ledRef.current;
      const button = buttonRef.current;

      if (arduino && led) {
        const arduinoRect = arduino.getBoundingClientRect();
        const ledRect = led.getBoundingClientRect();
        const canvasRect = canvasRef.current.getBoundingClientRect();

        setWirePositions((prev) => ({
          ...prev,
          led: {
            start: {
              x: arduinoRect.right - canvasRect.left,
              y: arduinoRect.top + arduinoRect.height / 2 - canvasRect.top,
            },
            end: {
              x: ledRect.left - canvasRect.left,
              y: ledRect.top + ledRect.height / 2 - canvasRect.top,
            },
            color: ledState ? "#e74c3c" : "#3498db", // Red when active, blue when inactive
            pin: pinAssignments.LED,
          },
        }));
      }

      if (arduino && button) {
        const arduinoRect = arduino.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const canvasRect = canvasRef.current.getBoundingClientRect();

        setWirePositions((prev) => ({
          ...prev,
          button: {
            start: {
              x: arduinoRect.right - canvasRect.left,
              y: arduinoRect.bottom - arduinoRect.height / 3 - canvasRect.top,
            },
            end: {
              x: buttonRect.left - canvasRect.left,
              y: buttonRect.top + buttonRect.height / 2 - canvasRect.top,
            },
            color: buttonPressed ? "#27ae60" : "#9b59b6", // Green when pressed, purple when not
            pin: pinAssignments.PUSH_BUTTON,
          },
        }));
      }
    };

    // Update wire positions after component render
    const timer = setTimeout(updateWirePositions, 100);
    return () => clearTimeout(timer);
  }, [components, pinAssignments, ledState, buttonPressed]);

  // Update LED state when simulation changes
  useEffect(() => {
    if (ledRef.current && isSimulating) {
      ledRef.current.color = ledState ? "red" : "#333";
    }
  }, [ledState, isSimulating]);

  // Handle button interactions
  useEffect(() => {
    if (buttonRef.current && isSimulating) {
      buttonRef.current.pressed = buttonPressed;
    }
  }, [buttonPressed, isSimulating]);

  const handleDrop = (e) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType) {
      onDrop(componentType);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getAvailablePins = (componentType) => {
    return AVAILABLE_PINS.filter((pin) => {
      // Exclude pins already in use by other components
      for (const [type, assignedPin] of Object.entries(pinAssignments)) {
        if (type !== componentType && assignedPin === pin) {
          return false;
        }
      }
      return true;
    });
  };

  const hasArduino = components.includes(COMPONENT_TYPES.ARDUINO);
  const hasLED = components.includes(COMPONENT_TYPES.LED);
  const hasButton = components.includes(COMPONENT_TYPES.PUSH_BUTTON);

  // Draw curved wire between two points
  const drawWire = (start, end, color, label) => {
    if (!start || !end) return null;

    // Calculate control points for curved line
    const midX = (start.x + end.x) / 2;
    const curve = 50; // Curve amount

    const path = `M ${start.x} ${start.y} Q ${midX} ${start.y + curve}, ${end.x} ${end.y}`;

    return (
      <g key={label}>
        {/* Wire shadow for depth */}
        <path
          d={path}
          fill="none"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="4"
          strokeLinecap="round"
          transform="translate(2, 2)"
        />
        {/* Main wire */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          className="wire-animated"
        />
        {/* Wire label showing pin number */}
        <text
          x={midX}
          y={start.y + curve - 10}
          fill={color}
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          style={{
            backgroundColor: "white",
            padding: "2px 4px",
            borderRadius: "3px",
          }}
        >
          {label}
        </text>
        {/* Dots at connection points */}
        <circle cx={start.x} cy={start.y} r="4" fill={color} />
        <circle cx={end.x} cy={end.y} r="4" fill={color} />
      </g>
    );
  };

  return (
    <div
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={styles.canvas}
    >
      {/* SVG overlay for wires */}
      <svg style={styles.wireOverlay}>
        {wirePositions.led &&
          drawWire(
            wirePositions.led.start,
            wirePositions.led.end,
            wirePositions.led.color,
            `D${wirePositions.led.pin}`,
          )}
        {wirePositions.button &&
          drawWire(
            wirePositions.button.start,
            wirePositions.button.end,
            wirePositions.button.color,
            `D${wirePositions.button.pin}`,
          )}
      </svg>

      <div style={styles.circuitArea}>
        {!hasArduino && (
          <div style={styles.placeholder}>Drag Arduino Uno here to start</div>
        )}

        {hasArduino && (
          <div style={styles.componentContainer}>
            {/* Arduino Uno */}
            <div style={styles.component}>
              <wokwi-arduino-uno ref={arduinoRef}></wokwi-arduino-uno>
              <div style={styles.label}>Arduino Uno</div>
              <div style={styles.pinInfo}>
                <div style={styles.pinBadge}>Pin {pinAssignments.LED}: LED</div>
                <div style={styles.pinBadge}>
                  Pin {pinAssignments.PUSH_BUTTON}: Button
                </div>
              </div>
            </div>

            {/* LED with pin selector */}
            {hasLED && (
              <div style={styles.component}>
                <div style={styles.componentWrapper}>
                  <wokwi-led
                    ref={ledRef}
                    color={isSimulating && ledState ? "red" : "#333"}
                  ></wokwi-led>
                  <div style={styles.pinSelector}>
                    <label style={styles.pinLabel}>LED Pin:</label>
                    <select
                      value={pinAssignments.LED}
                      onChange={(e) =>
                        onPinChange("LED", parseInt(e.target.value))
                      }
                      style={styles.select}
                      disabled={isSimulating}
                    >
                      {getAvailablePins("LED").map((pin) => (
                        <option key={pin} value={pin}>
                          D{pin}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={styles.label}>
                  LED → Digital Pin {pinAssignments.LED}
                </div>
                <div style={styles.wireStatus}>
                  {isSimulating && ledState
                    ? "🔴 Active (HIGH)"
                    : "⚫ Inactive (LOW)"}
                </div>
              </div>
            )}

            {/* Push Button with pin selector */}
            {hasButton && (
              <div style={styles.component}>
                <div style={styles.componentWrapper}>
                  <div
                    onMouseDown={() => isSimulating && setButtonPressed(true)}
                    onMouseUp={() => isSimulating && setButtonPressed(false)}
                    onMouseLeave={() => isSimulating && setButtonPressed(false)}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: buttonPressed ? "#27ae60" : "#bdc3c7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: isSimulating ? "pointer" : "not-allowed",
                      border: "3px solid #2c3e50",
                    }}
                  >
                    🔘
                  </div>

                  <div style={styles.pinSelector}>
                    <label style={styles.pinLabel}>Button Pin:</label>
                    <select
                      value={pinAssignments.PUSH_BUTTON}
                      onChange={(e) =>
                        onPinChange("PUSH_BUTTON", Number(e.target.value))
                      }
                      disabled={isSimulating}
                      style={styles.select}
                    >
                      {getAvailablePins("PUSH_BUTTON").map((pin) => (
                        <option key={pin} value={pin}>
                          D{pin}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={styles.label}>
                  Push Button → Digital Pin {pinAssignments.PUSH_BUTTON}
                </div>

                <div style={styles.wireStatus}>
                  {buttonPressed ? "🟢 HIGH" : "⚪ LOW"}
                </div>
              </div>
            )}

            {/* Connection info panel */}
            {hasLED && hasButton && (
              <div style={styles.connections}>
                <div style={styles.connectionInfo}>
                  <strong>🔌 Active Wiring Configuration:</strong>
                  <div style={styles.wiringList}>
                    <div style={styles.wiringItem}>
                      <span
                        style={{
                          ...styles.wireDot,
                          backgroundColor: "#3498db",
                        }}
                      ></span>
                      LED connected to Digital Pin {pinAssignments.LED} (Output)
                    </div>
                    <div style={styles.wiringItem}>
                      <span
                        style={{
                          ...styles.wireDot,
                          backgroundColor: "#9b59b6",
                        }}
                      ></span>
                      Button connected to Digital Pin{" "}
                      {pinAssignments.PUSH_BUTTON} (Input)
                    </div>
                  </div>
                  <div style={styles.wireNote}>
                    💡 Visual wires update automatically when pins change
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={styles.canvasControls}>{children}</div>
    </div>
  );
};

const styles = {
  canvas: {
    flex: 1,
    backgroundColor: "#fdfefe",
    border: "2px solid #d5d8dc",
    borderRadius: "6px",
    position: "relative",
    minHeight: "600px",
    boxShadow: "inset 0 0 8px rgba(0,0,0,0.08)",
  },
  canvasControls: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#ecf0f1",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "2px solid #bdc3c7",
    zIndex: 10,
  },
  wireOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1,
  },
  circuitArea: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  placeholder: {
    fontSize: "24px",
    color: "#95a5a6",
    textAlign: "center",
    padding: "40px",
  },
  componentContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "60px",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "1000px",
  },
  component: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    backgroundColor: "#ecf0f1",
    borderRadius: "12px",
    border: "2px solid #bdc3c7",
    minWidth: "150px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  componentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
  },
  pinInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "10px",
  },
  pinBadge: {
    fontSize: "11px",
    padding: "4px 8px",
    backgroundColor: "#3498db",
    color: "white",
    borderRadius: "4px",
    textAlign: "center",
    fontWeight: "bold",
  },
  pinSelector: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    alignItems: "center",
    marginTop: "10px",
  },
  pinLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#34495e",
  },
  select: {
    padding: "5px 10px",
    borderRadius: "4px",
    border: "2px solid #3498db",
    fontSize: "14px",
    fontWeight: "bold",
    backgroundColor: "white",
    cursor: "pointer",
  },
  wireStatus: {
    fontSize: "11px",
    padding: "4px 8px",
    backgroundColor: "#d5f4e6",
    borderRadius: "4px",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "5px",
  },
  connections: {
    width: "100%",
    marginTop: "20px",
  },
  connectionInfo: {
    padding: "15px",
    backgroundColor: "#e8f8f5",
    borderRadius: "8px",
    border: "2px solid #27ae60",
    fontSize: "13px",
    lineHeight: "1.8",
  },
  wiringList: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  wiringItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px",
    backgroundColor: "white",
    borderRadius: "6px",
    fontSize: "12px",
  },
  wireDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
  },
  wireNote: {
    marginTop: "10px",
    fontSize: "11px",
    fontStyle: "italic",
    color: "#27ae60",
    textAlign: "center",
  },
};

export default Canvas;
