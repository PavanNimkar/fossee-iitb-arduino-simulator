import React, { useEffect, useMemo } from "react";
import { Fragment } from "react";

const CodeView = ({ allPresent, setUnoCode, buttonPin, ledPin }) => {
  const generatedCode = useMemo(
    () => `
const int ledPin = ${ledPin};
const int buttonPin = ${buttonPin};

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
  
  delay(10);
}
`,
    [ledPin, buttonPin],
  );

  useEffect(() => {
    if (allPresent) {
      setUnoCode(generatedCode);
    }
  }, [allPresent, generatedCode, setUnoCode]);

  return (
    <div className="flex flex-col bg-gray-100 w-full h-full text-black">
      <h3 className="font-bold px-4 py-3 bg-green-100 text-black border-b">
        Auto Generated Code
      </h3>
      <div className="code-container p-4 overflow-auto flex-1">
        {allPresent ? (
          <pre className="text-sm font-mono bg-gray-900 text-green-400 p-4 rounded">
            <code>{generatedCode}</code>
          </pre>
        ) : (
          <div className="text-gray-500 text-center mt-8">
            <p>Add all components to generate code:</p>
            <ul className="mt-4 text-left inline-block">
              <li>✓ Arduino Uno</li>
              <li>✓ LED</li>
              <li>✓ Push Button</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeView;
