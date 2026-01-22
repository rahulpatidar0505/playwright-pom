import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

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
 * Get formatted date string
 * @param {number} daysFromNow - Number of days from today
 * @param {string} format - Date format (default: yyyy-MM-dd)
 * @returns {string} Formatted date string
 */
function getFormattedDate(daysFromNow = 0, format = 'yyyy-MM-dd') {
  return DateTime.now().plus({ days: daysFromNow }).toFormat(format);
}

/**
 * Generate random booking data for API tests
 * @param {Object} options - Optional overrides
 * @returns {Object} Booking data object
 */
function generateBookingData(options = {}) {
  const checkinDate = options.checkin || getFormattedDate(0);
  const checkoutDate = options.checkout || getFormattedDate(5);

  return {
    firstname: options.firstname || faker.person.firstName(),
    lastname: options.lastname || faker.person.lastName(),
    totalprice: options.totalprice || faker.number.int({ min: 100, max: 1000 }),
    depositpaid: options.depositpaid ?? true,
    bookingdates: {
      checkin: checkinDate,
      checkout: checkoutDate,
    },
    additionalneeds: options.additionalneeds || 'Breakfast',
  };
}

/**
 * Generate random user data for testing
 * @returns {Object} User data object
 */
function generateUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password({ length: 12 }),
  };
}

/**
 * Wait for a specified duration
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export {
  readJsonFile,
  getFormattedDate,
  generateBookingData,
  generateUser,
  wait,
};
