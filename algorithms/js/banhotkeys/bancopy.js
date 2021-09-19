const hashedPassword = '606da531d82b99c7e4c29b6084e7d1d7c67e26bfe4d18c09924d1dbc9772c46b';
const storagePasswordKey = 'unbanCopyPassword';
const storage = window.localStorage;
const enteredPassword = storage.getItem(storagePasswordKey);
const body = document.querySelector('body');

/**
 * Hashing a string using sha256
 * 
 * @param {string} message - string you will hash
 * @returns {string} - a hash
 */
async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

/**
 * Compare a password with hash
 * 
 * @param {string} password - password to compare
 * @returns {boolean}
 */
async function isValidPassword(password) {
  const hash = await sha256(password);

  return hash === hashedPassword;
}

/**
 * Listeners for banning some hotkeys
 * 
 * @param {string} event - keydown event
 * @returns {boolean}
 */
function keydownListener(event) {
  if (event.key === 'S' && event.ctrlKey) return false;

  return true;
}

/**
 * Actions to prohibit the user from copying anything
 */
function banCopy() {
  document.addEventListener('keydown', keydownListener);
  body.style.userSelect = 'none';
}

/**
 * Cancels the ban on copying
 */
function unbanCopy() {
  document.removeEventListener('keydown', keydownListener);
  body.style.userSelect = 'auto';
}

/**
 * A small button that allows the user to remove the copy ban by entering a password
 */

function createPrompt() {
  const container = document.createElement('div');
  container.innerHTML = '<svg height="20px" viewBox="-40 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="m271 512h-191c-44.113281 0-80-35.886719-80-80v-271c0-44.113281 35.886719-80 80-80h191c44.113281 0 80 35.886719 80 80v271c0 44.113281-35.886719 80-80 80zm-191-391c-22.054688 0-40 17.945312-40 40v271c0 22.054688 17.945312 40 40 40h191c22.054688 0 40-17.945312 40-40v-271c0-22.054688-17.945312-40-40-40zm351 261v-302c0-44.113281-35.886719-80-80-80h-222c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h222c22.054688 0 40 17.945312 40 40v302c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm0 0"/></svg>';
  container.style = 'position: absolute; width: 30px; height: 30px; cursor: pointer; background: #999; bottom: 4px; left: 4px; opacity: 0.8; border-radius: 4px; display: flex; align-items: center; justify-content: center;';

  container.addEventListener('click', async (event) => {
    const password = window.prompt('Enter a password to get access to copying');
    const isValid = await isValidPassword(password);

    if (isValid) {
      alert('Now you can copy whatever you want');
      unbanCopy();
      storage.setItem(storagePasswordKey, password);
    } else if (password) {
      alert('Wrong password');
    }
  });

  body.appendChild(container);
}

/**
 * Initialize the module
 */
(async function main() {
  const isValid = await isValidPassword(enteredPassword);

  if (!isValid) {
    createPrompt();
    banCopy();
  }
})();

