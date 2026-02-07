// Arduino code generator

export const generateArduinoCode = (ledPin, buttonPin) => {
  return `// Auto-generated Arduino code
// LED Pin: ${ledPin}
// Button Pin: ${buttonPin}

const int LED_PIN = ${ledPin};
const int BUTTON_PIN = ${buttonPin};

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
}`;
};

export default generateArduinoCode;
