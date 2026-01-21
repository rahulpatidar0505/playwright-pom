const { faker } = require('@faker-js/faker');

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
    username: faker.internet.username(),
    password: faker.internet.password({ length: 12 }),
  };
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
 * Generate random address data
 * @returns {Object} Address object
 */
function generateAddress() {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
}

/**
 * Get formatted date string
 * @param {number} daysFromNow - Number of days from today
 * @param {string} format - Date format (default: yyyy-MM-dd)
 * @returns {string} Formatted date string
 */
function getFormattedDate(daysFromNow = 0, format = 'yyyy-MM-dd') {
  const { DateTime } = require('luxon');
  return DateTime.now().plus({ days: daysFromNow }).toFormat(format);
}

/**
 * Generate a random number within range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function getRandomNumber(min = 1, max = 100) {
  return faker.number.int({ min, max });
}

/**
 * Generate random string of specified length
 * @param {number} length - String length
 * @returns {string} Random string
 */
function getRandomString(length = 10) {
  return faker.string.alphanumeric(length);
}

module.exports = {
  generateUser,
  generateBookingData,
  generateAddress,
  getFormattedDate,
  getRandomNumber,
  getRandomString,
};
