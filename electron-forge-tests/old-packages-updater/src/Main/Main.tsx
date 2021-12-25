import React, { useState } from 'react';
import styles from './Main.module.css';
import { updateApps } from './updaterSimulator';

export const Main: React.FC<unknown> = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [updatingApp, setIsUpdatingApp] = useState<string>('');

  const startUpdatingApps = () => {    
    setIsProcessing(true);
    
    window.electronAPI.loadPreferences()

    updateApps({
      setUpdatingApp: (appName: string) => setIsUpdatingApp(appName),
    });
  }

  return (
    <>
      <h2>Looking for old packages</h2>
      <p>Welcome to your Electron application.</p>
      {
        updatingApp && (
          <p>Updating { updatingApp }...</p>
        )
      }
      {
        isProcessing && (
          <div className={styles.progressBar}>
            <div className={styles.progressBarBlick}></div>
          </div>
        )
      }
      {
        !isProcessing && (
          <button className={styles.button} onClick={() => {
            startUpdatingApps()
          }}>Search for old packages</button>
        )
      }
    </>
  );

}