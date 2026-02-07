import React from 'react';
import { COMPONENT_TYPES } from '../constants/pins';

const ComponentPalette = ({ onDragStart, arduinoPlaced }) => {
  const components = [
    { 
      type: COMPONENT_TYPES.ARDUINO, 
      label: 'Arduino Uno',
      disabled: arduinoPlaced 
    },
    { 
      type: COMPONENT_TYPES.LED, 
      label: 'LED',
      disabled: false 
    },
    { 
      type: COMPONENT_TYPES.PUSH_BUTTON, 
      label: 'Push Button',
      disabled: false 
    }
  ];

  const handleDragStart = (e, componentType) => {
    e.dataTransfer.setData('componentType', componentType);
    onDragStart(componentType);
  };

  return (
    <div style={styles.palette}>
      <h3 style={styles.title}>Components</h3>
      <div style={styles.componentList}>
        {components.map((component) => (
          <div
            key={component.type}
            draggable={!component.disabled}
            onDragStart={(e) => handleDragStart(e, component.type)}
            style={{
              ...styles.componentItem,
              ...(component.disabled ? styles.disabled : {})
            }}
          >
            <div style={styles.icon}>
              {component.type === COMPONENT_TYPES.ARDUINO && '🔲'}
              {component.type === COMPONENT_TYPES.LED && '💡'}
              {component.type === COMPONENT_TYPES.PUSH_BUTTON && '🔘'}
            </div>
            <div style={styles.label}>{component.label}</div>
          </div>
        ))}
      </div>
      <div style={styles.instructions}>
        <h4>Instructions:</h4>
        <ol style={styles.instructionList}>
          <li>Drag Arduino Uno to canvas</li>
          <li>Drag LED to canvas</li>
          <li>Drag Push Button to canvas</li>
          <li>Components will auto-wire</li>
          <li>Configure pins if needed</li>
          <li>Click Start to simulate</li>
        </ol>
      </div>
    </div>
  );
};

const styles = {
  palette: {
    width: '250px',
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRight: '2px solid #bdc3c7',
    overflowY: 'auto'
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    color: '#2c3e50',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px'
  },
  componentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '30px'
  },
  componentItem: {
    padding: '15px',
    backgroundColor: 'white',
    border: '2px solid #bdc3c7',
    borderRadius: '8px',
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s',
    userSelect: 'none'
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    backgroundColor: '#d5d8dc'
  },
  icon: {
    fontSize: '24px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2c3e50'
  },
  instructions: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#d5f4e6',
    borderRadius: '8px',
    fontSize: '12px'
  },
  instructionList: {
    margin: '10px 0 0 0',
    paddingLeft: '20px'
  }
};

export default ComponentPalette;
