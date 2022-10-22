
((global) => {
  const timeout = 10;

  const _async = (fn, cb) => {
    setTimeout(() => {
      cb(fn());
    }, timeout * Math.random());
  };

  const Folder = function (a = []) {
    if (!new.target) {
      return new Folder(a);
    }

    this.read = (index, cb) => _async(() => a[index], cb);
    this.size = (cb) => _async(() => a.length, cb);
  };

  Object.freeze(Folder);
  global.Folder = Folder;
})(typeof window === 'undefined' ? global : window);

const input = Folder([
  'file', 
  'ffffile',
  Folder([
    'file',
  ]),
  Folder([
    'fiiile',
  ]),
  Folder([
    {},
    null,
    'file',
    'ffiillee',
    'ffiillee',
  ]),
  Folder([
    Folder([
      'filllle',
      'file',
      null,
    ]),
    {},
    Folder([])
  ]),
]);

// проверка решения
solution(input).then(result => {
  const answer = ['ffffile', 'ffiillee', 'ffiillee', 'fiiile', 'filllle'];
  const isEqual = String(answer) === String(result);

  if (isEqual) {
    console.log('OK');
  } else {
    console.log('WRONG');
  }
});

async function solution(input) {
  let brokenFiles = [];
  let unresolvedFiles = [input];

  let analyzeFile = (file) => {
    if (file == null || file == undefined) {
      return false;
    } else if (typeof file == 'string' && file.length != 4) {
      brokenFiles.push(file);

      return false;
    } else if (!file.size) {
      return false;
    }

    return true;
  }

  while (unresolvedFiles.length > 0) {
    let file = unresolvedFiles.shift();
    let unresolvedPromises = [];

    if (analyzeFile(file)) {
      let folder = file;

      let gettingSize = new Promise(async function(resolve, reject) {
        folder.size(async (size) => {
          if (!size) {
            resolve();
          }

          let innerPromises = [];
    
          for (let i = 0; i < size; i++) {
            let readingFile = new Promise((resolve, reject) => {
              folder.read(i, (inner_file) => {
                unresolvedFiles.push(inner_file);

                resolve();
              });
            });

            innerPromises.push(readingFile);
          }

          await Promise.all(innerPromises);

          resolve();
        });
      })
      
      unresolvedPromises.push(gettingSize);
    }

    await Promise.all(unresolvedPromises);
  }

  brokenFiles = brokenFiles.sort();

  return brokenFiles;
}
