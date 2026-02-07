import { useState, useMemo } from "react";
import Toolbar from "./components/Toolbar";
import ComponentPalette from "./components/ComponentPalette";
import Canvas from "./components/Canvas";
import CodeView from "./components/CodeView";
import SimulationControls from "./components/SimulationControls";
import { COMPONENT_TYPES, DEFAULT_PINS } from "./constants/pins";
import { generateArduinoCode } from "./utils/codeGenerator";
import "./App.css";

export default function App() {
  const [viewMode, setViewMode] = useState("circuit");
  const [components, setComponents] = useState([]);
  const [pinAssignments, setPinAssignments] = useState(DEFAULT_PINS);
  const [isSimulating, setIsSimulating] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const ledState = isSimulating && buttonPressed;

  const generatedCode = useMemo(() => {
    if (
      components.includes(COMPONENT_TYPES.LED) &&
      components.includes(COMPONENT_TYPES.PUSH_BUTTON)
    ) {
      return generateArduinoCode(
        pinAssignments.LED,
        pinAssignments.PUSH_BUTTON,
      );
    }
    return "";
  }, [components, pinAssignments]);

  const handleDrop = (type) => {
    if (!components.includes(type)) {
      setComponents([...components, type]);
    }
  };

  const handlePinChange = (type, pin) => {
    setPinAssignments((prev) => ({ ...prev, [type]: pin }));
  };

  const canSimulate =
    components.includes(COMPONENT_TYPES.ARDUINO) &&
    components.includes(COMPONENT_TYPES.LED) &&
    components.includes(COMPONENT_TYPES.PUSH_BUTTON);

  return (
    <div style={styles.app}>
      {/* Top toolbar */}
      <Toolbar viewMode={viewMode} onViewChange={setViewMode} />

      {/* Main horizontal layout */}
      <div style={styles.main}>
        {/* LEFT: Component Palette */}
        <ComponentPalette
          onDragStart={() => {}}
          arduinoPlaced={components.includes(COMPONENT_TYPES.ARDUINO)}
        />

        {/* CENTER + RIGHT: Canvas and Code */}
        <div style={styles.workspace}>
          <div style={styles.contentRow}>
            {/* Canvas ALWAYS visible */}
            <div style={styles.canvasWrapper}>
              <Canvas
                components={components}
                onDrop={handleDrop}
                pinAssignments={pinAssignments}
                onPinChange={handlePinChange}
                isSimulating={isSimulating}
                buttonPressed={buttonPressed}
                ledState={ledState}
                setButtonPressed={setButtonPressed}
              >
                {/* Start / Stop ON CANVAS */}
                <SimulationControls
                  isSimulating={isSimulating}
                  onStart={() => setIsSimulating(true)}
                  onStop={() => {
                    setIsSimulating(false);
                    setButtonPressed(false);
                  }}
                  disabled={!canSimulate}
                />
              </Canvas>
            </div>

            {/* Code view (only when toggled) */}
            {viewMode === "code" && (
              <div style={styles.codeWrapper}>
                <CodeView code={generatedCode} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
  },
  workspace: {
    flex: 1,
    padding: "16px",
    backgroundColor: "#f4f6f7",
  },
  contentRow: {
    display: "flex",
    gap: "16px",
    height: "100%",
  },
  canvasWrapper: {
    flex: 2,
    minWidth: 0,
  },
  codeWrapper: {
    flex: 1,
    minWidth: "380px",
  },
};
