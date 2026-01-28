import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export class BookingDataGenerator {
  /**
   * Generate request body for booking API
   * Pass any value you want to customize, rest will be auto-generated
   */
  static getRequestBody(options = {}) {
    // Set default values using faker and luxon
    const firstname = options.firstname || faker.person.firstName();
    const lastname = options.lastname || faker.person.lastName();
    const totalprice =
      options.totalprice || faker.number.int({ min: 100, max: 1000 });
    const depositpaid =
      options.depositpaid !== undefined ? options.depositpaid : true;
    const checkin = options.checkin || DateTime.now().toFormat('yyyy-MM-dd');
    const daysToStay = options.daysToStay || 5;
    const checkout =
      options.checkout ||
      DateTime.fromFormat(checkin, 'yyyy-MM-dd')
        .plus({ days: daysToStay })
        .toFormat('yyyy-MM-dd');
    const additionalneeds =
      options.additionalneeds ||
      faker.helpers.arrayElement([
        'Breakfast',
        'Lunch',
        'Dinner',
        'Extra pillows',
      ]);

    // Return request body
    const requestBody = {
      firstname,
      lastname,
      totalprice,
      depositpaid,
      bookingdates: {
        checkin,
        checkout,
      },
      additionalneeds,
    };

    return requestBody;
  }
}
