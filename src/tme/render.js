const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const render = async (filename) => {
  const filePath = path.join(process.cwd(), filename);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usuable'
  });

  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener('DOOMContentLoaded', () => {
      resolve(dom);
    });
  });

};

module.exports = render;