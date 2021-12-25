const apps = [
  'Maps',
  'Messages',
  'Find My',
  'Photo Booth',
  'Voice Memos',
  'Books',
  'Face Time',
  'Cisco Jabber',
  'Text Edit',
  'Calendar',
  'Reminder',
  'Notes',
  'Music',
  'QuickTime Player'
];

interface UpdateApp {
  setUpdatingApp: (name: string) => void,
}

export const updateApps = async ({
  setUpdatingApp
}: UpdateApp) => {
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];

    setUpdatingApp(app);

    await updateApp(app);
  }
}

const updateApp = async (appName: string) => {
  const timeToUpdate = Math.floor(Math.random() * 10 * 1000 + 2 * 1000);

  await sleep(timeToUpdate);
}

const sleep = (ms: number) => { 
  return new Promise(resolve => setTimeout(resolve, ms)); 
}