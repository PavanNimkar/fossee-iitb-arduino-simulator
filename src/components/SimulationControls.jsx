import React from 'react';

const SimulationControls = ({ isSimulating, onStart, onStop, disabled }) => {
  return (
    <div style={styles.controls}>
      <button
        onClick={onStart}
        disabled={disabled || isSimulating}
        style={{
          ...styles.button,
          ...styles.startButton,
          ...(disabled || isSimulating ? styles.disabled : {})
        }}
      >
        ▶ Start Simulation
      </button>
      <button
        onClick={onStop}
        disabled={!isSimulating}
        style={{
          ...styles.button,
          ...styles.stopButton,
          ...(!isSimulating ? styles.disabled : {})
        }}
      >
        ⏹ Stop Simulation
      </button>
      {disabled && (
        <div style={styles.hint}>
          Add Arduino, LED, and Push Button to enable simulation
        </div>
      )}
    </div>
  );
};

const styles = {
  controls: {
    display: 'flex',
    gap: '10px',
    padding: '15px',
    backgroundColor: '#ecf0f1',
    borderRadius: '8px',
    alignItems: 'center',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  startButton: {
    backgroundColor: '#27ae60',
    color: 'white'
  },
  stopButton: {
    backgroundColor: '#e74c3c',
    color: 'white'
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  hint: {
    fontSize: '12px',
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginLeft: '10px'
  }
};

export default SimulationControls;
