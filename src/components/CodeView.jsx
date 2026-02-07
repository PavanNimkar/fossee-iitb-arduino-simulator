import React from 'react';

const CodeView = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Generated Arduino Code</h3>
        <button onClick={copyToClipboard} style={styles.copyButton}>
          📋 Copy Code
        </button>
      </div>
      <pre style={styles.codeBlock}>
        <code>{code || '// No code generated yet\n// Add components to generate code'}</code>
      </pre>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#2c3e50',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#34495e',
    borderBottom: '2px solid #3498db'
  },
  title: {
    margin: 0,
    color: 'white',
    fontSize: '16px'
  },
  copyButton: {
    padding: '6px 12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  codeBlock: {
    margin: 0,
    padding: '20px',
    backgroundColor: '#1e272e',
    color: '#00ff00',
    fontSize: '13px',
    lineHeight: '1.6',
    overflow: 'auto',
    maxHeight: '400px',
    fontFamily: '"Courier New", Courier, monospace'
  }
};

export default CodeView;
