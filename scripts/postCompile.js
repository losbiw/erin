const { promisify } = require('util');
const { copyFile, rm } = require('fs/promises');
const { join } = require('path');
const { exec: _exec } = require('child_process');

const exec = promisify(_exec);

const copyEnv = async (os) => {
  const src = join(__dirname, '../electron/.env');
  const dest = join(__dirname, '../build/.env');

  if (os === 'darwin') {
    await exec(`chflags nohidden ${src}`);
  }

  await copyFile(src, dest);
};

const removeTemp = async () => {
  const temp = join(__dirname, '../ts-temp');
  rm(temp, { recursive: true });
};

const runPostCompilation = async () => {
  const os = process.platform;

  await copyEnv(os);
  await removeTemp();
};

runPostCompilation();
