import React, { useEffect, useState } from 'react';
import styles from './Main.module.css';
import { updateApps } from './updaterSimulator';

export const Main: React.FC<unknown> = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [updatingApp, setIsUpdatingApp] = useState<string>('');
  const [isAlreadyUpdated, setIsAlreadyUpdated] = useState(false);

  const startUpdatingApps = () => {    
    setIsProcessing(true);

    window.electronAPI.sendData()

    updateApps({
      setUpdatingApp: (appName: string | null) => {
        if (!appName) {
          setIsProcessing(false);
          setIsAlreadyUpdated(true);

          return;
        }

        setIsUpdatingApp(appName)
      },
    });
  }

  return (
    <>
      <h2>♻️ Old packages updater</h2>
      {
        isProcessing && updatingApp && (
          <p className={styles.updating}>Updating { updatingApp }...</p>
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
        !isProcessing && !isAlreadyUpdated && (
          <>
            <p>To check for updates click the button</p>
            <button className={styles.button} onClick={() => {
              startUpdatingApps()
            }}>Search for old packages</button>
          </>
        )
      }
      {
        isAlreadyUpdated && (
          <p>✨ All packages are udpated</p>
        )
      }
    </>
  );

}