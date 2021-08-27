module.exports = {
  '*.ts': (filenames) => [`eslint ${filenames.join(' ')}`, 'tsc -p tsconfig.json --noEmit']
}