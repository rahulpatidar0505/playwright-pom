const fs = require('fs');
const path = require('path');

/**
 * Read JSON file and return parsed object
 * @param {string} filePath - Path to JSON file
 * @returns {Object} Parsed JSON object
 */
function readJsonFile(filePath) {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
}

/**
 * Write object to JSON file
 * @param {string} filePath - Path to JSON file
 * @param {Object} data - Data to write
 */
function writeJsonFile(filePath, data) {
  const absolutePath = path.resolve(filePath);
  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));
}

/**
 * Check if file exists
 * @param {string} filePath - Path to file
 * @returns {boolean} True if file exists
 */
function fileExists(filePath) {
  return fs.existsSync(path.resolve(filePath));
}

/**
 * Get file extension
 * @param {string} filename - File name
 * @returns {string} File extension
 */
function getFileExtension(filename) {
  return path.extname(filename).toLowerCase();
}

/**
 * Create directory if it doesn't exist
 * @param {string} dirPath - Directory path
 */
function ensureDirectoryExists(dirPath) {
  const absolutePath = path.resolve(dirPath);
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
  }
}

/**
 * Delete file if it exists
 * @param {string} filePath - Path to file
 */
function deleteFileIfExists(filePath) {
  const absolutePath = path.resolve(filePath);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

/**
 * Get downloaded file path from Playwright download
 * @param {import('@playwright/test').Download} download - Playwright download object
 * @param {string} savePath - Path to save file
 * @returns {Promise<string>} Saved file path
 */
async function saveDownloadedFile(download, savePath) {
  const absolutePath = path.resolve(savePath);
  ensureDirectoryExists(path.dirname(absolutePath));
  await download.saveAs(absolutePath);
  return absolutePath;
}

module.exports = {
  readJsonFile,
  writeJsonFile,
  fileExists,
  getFileExtension,
  ensureDirectoryExists,
  deleteFileIfExists,
  saveDownloadedFile,
};
