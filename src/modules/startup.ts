const { ipcRenderer } = window.require('electron');

const set = (isEnabled: boolean): void => {
  ipcRenderer.send('set-autolaunch', isEnabled);
};

export default { set };
