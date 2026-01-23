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

test.describe.serial('CRUD operations on a booking', () => {
  let bookingId;

  test('CREATE - should be able to create a new booking', async ({
    request,
  }) => {
    const createResponse = await request.post(`${env.apiBaseUrl}/booking`, {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-01-01',
          checkout: '2024-01-10',
        },
        additionalneeds: 'Lunch',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    bookingId = createBody.bookingid;
    expect(bookingId).toBeDefined();
    console.log(`Created booking with ID: ${bookingId}`);
  });

  test('READ - should be able to get the created booking', async ({
    request,
  }) => {
    const getResponse = await request.get(`${env.apiBaseUrl}/booking/${bookingId}`);
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
    const getBody = await getResponse.json();
    expect(getBody).toHaveProperty('firstname', 'John');
    expect(getBody).toHaveProperty('lastname', 'Doe');
  });

  test('UPDATE - should be able to update the booking', async ({ request }) => {
    const updateResponse = await request.put(
      `${env.apiBaseUrl}/booking/${bookingId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token}`,
        },
        data: {
          firstname: 'Rahul',
          lastname: 'Jones',
          totalprice: 691,
          depositpaid: false,
          bookingdates: {
            checkin: '2020-11-15',
            checkout: '2025-01-18',
          },
          additionalneeds: 'Breakfast',
        },
      }
    );
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    expect(updateBody).toHaveProperty('firstname', 'Rahul');
    expect(updateBody).toHaveProperty('lastname', 'Jones');
    expect(updateBody).toHaveProperty('totalprice', 691);
    expect(updateBody).toHaveProperty('depositpaid', false);
    expect(updateBody.bookingdates).toHaveProperty('checkin', '2020-11-15');
    expect(updateBody.bookingdates).toHaveProperty('checkout', '2025-01-18');
    expect(updateBody).toHaveProperty('additionalneeds', 'Breakfast');
  });

  test('DELETE - should be able to delete the booking', async ({ request }) => {
    const deleteResponse = await request.delete(
      `${env.apiBaseUrl}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );
    expect(deleteResponse.status()).toBe(201);
  });

  test('VERIFY DELETE - should confirm booking is deleted', async ({
    request,
  }) => {
    const verifyResponse = await request.get(
      `${env.apiBaseUrl}/booking/${bookingId}`
    );
    expect(verifyResponse.status()).toBe(404);
  });
});
