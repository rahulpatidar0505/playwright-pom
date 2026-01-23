import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import env from '../../src/config/index.js';
import bookingDetails from '../../src/testData/booking-details.json' with { type: 'json' };

// eslint-disable-next-line no-unused-vars
let token = '';

test.beforeEach('Create authentication token', async ({ request }) => {
  const response = await request.post(`${env.apiBaseUrl}/auth`, {
    data: {
      username: env.apiCredentials.username,
      password: env.apiCredentials.password,
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('token');
  token = responseBody.token;
});

test('should be able to create a booking', async ({ request }) => {
  const response = await request.post(`${env.apiBaseUrl}/booking`, {
    data: {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2023-06-01',
        checkout: '2023-06-15',
      },
      additionalneeds: 'Breakfast',
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.booking).toHaveProperty('firstname', 'Jim');
  expect(responseBody.booking).toHaveProperty('lastname', 'Brown');
  expect(responseBody.booking).toHaveProperty('totalprice', 111);
  expect(responseBody.booking).toHaveProperty('depositpaid', true);
});

test('should be able to create a booking with dynamic data', async ({
  request,
}) => {
  const response = await request.post(`${env.apiBaseUrl}/booking`, {
    data: bookingDetails,
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.booking).toHaveProperty(
    'firstname',
    bookingDetails.firstname
  );
  expect(responseBody.booking).toHaveProperty(
    'lastname',
    bookingDetails.lastname
  );
  expect(responseBody.booking).toHaveProperty(
    'totalprice',
    bookingDetails.totalprice
  );
  expect(responseBody.booking).toHaveProperty(
    'depositpaid',
    bookingDetails.depositpaid
  );
});

test('should be able to create a booking with faker data', async ({
  request,
}) => {
  const randomFirstName = faker.person.firstName();
  const randomLastName = faker.person.lastName();
  const randomNumber = faker.number.int({ min: 100, max: 1000 });
  const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
  const currentDatePlusFive = DateTime.now()
    .plus({ days: 5 })
    .toFormat('yyyy-MM-dd');

  const response = await request.post(`${env.apiBaseUrl}/booking`, {
    data: {
      firstname: randomFirstName,
      lastname: randomLastName,
      totalprice: randomNumber,
      depositpaid: true,
      bookingdates: {
        checkin: currentDate,
        checkout: currentDatePlusFive,
      },
      additionalneeds: 'Breakfast',
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.booking).toHaveProperty('firstname', randomFirstName);
  expect(responseBody.booking).toHaveProperty('lastname', randomLastName);
});
