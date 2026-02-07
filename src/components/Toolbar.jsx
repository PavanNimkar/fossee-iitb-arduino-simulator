import React from 'react';

const Toolbar = ({ viewMode, onViewChange }) => {
  return (
    <div style={styles.toolbar}>
      <div style={styles.title}>Arduino Simulator</div>
      <div style={styles.viewToggle}>
        <button
          style={{
            ...styles.button,
            ...(viewMode === 'circuit' ? styles.activeButton : {})
          }}
          onClick={() => onViewChange('circuit')}
        >
          Circuit View
        </button>
        <button
          style={{
            ...styles.button,
            ...(viewMode === 'code' ? styles.activeButton : {})
          }}
          onClick={() => onViewChange('code')}
        >
          Code View
        </button>
      </div>
    </div>
  );
};

const styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    borderBottom: '2px solid #34495e'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  viewToggle: {
    display: 'flex',
    gap: '10px'
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#34495e',
    color: 'white',
    fontSize: '14px',
    transition: 'background-color 0.3s'
  },
  activeButton: {
    backgroundColor: '#3498db'
  }
};

export default Toolbar;
