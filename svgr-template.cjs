const path = require('path');

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map(({ path: filePath, originalPath }) => {
    const name = path.basename(filePath, path.extname(filePath));

    return `export { default as Icon${name} } from './${name}'`;
  });
  return exportEntries.join('\n');
}

module.exports = defaultIndexTemplate;
