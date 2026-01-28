import { test, expect } from '@playwright/test';
import env from '../../src/config/index.js';
import bookingDetails from '../../src/testData/booking-details.json' with { type: 'json' };
import { BookingDataGenerator } from '../../src/testData/BookingDataGenerator.js';

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
  const requestBody = BookingDataGenerator.getRequestBody({
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    checkin: '2023-06-01',
    checkout: '2023-06-15',
    additionalneeds: 'Breakfast',
  });

  const response = await request.post(`${env.apiBaseUrl}/booking`, {
    data: requestBody,
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.booking).toHaveProperty('firstname', requestBody.firstname);
  expect(responseBody.booking).toHaveProperty('lastname', requestBody.lastname);
  expect(responseBody.booking).toHaveProperty('totalprice', requestBody.totalprice);
  expect(responseBody.booking).toHaveProperty('depositpaid', requestBody.depositpaid);
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
  const requestBody = BookingDataGenerator.getRequestBody();

  const response = await request.post(`${env.apiBaseUrl}/booking`, {
    data: requestBody,
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.booking).toHaveProperty('firstname', requestBody.firstname);
  expect(responseBody.booking).toHaveProperty('lastname', requestBody.lastname);
});

test.describe.serial('CRUD operations on a booking', () => {
  let bookingId;

  test('CREATE - should be able to create a new booking', async ({
    request,
  }) => {

    // // you can pass full body
    // const requestBody = BookingDataGenerator.getRequestBody({
    //   firstname: 'John',
    //   lastname: 'Doe',
    //   totalprice: 500,
    //   checkin: '2024-01-01',
    //   checkout: '2024-01-10',
    //   additionalneeds: 'Lunch',
    // });

    
    // // or you can pass partial data to override only specific fields
    // const requestBody = BookingDataGenerator.getRequestBody({
    //   firstname: 'Rahul',
    //   lastname: 'Patidar',
    // });

    // or you can generate fully random data
    const requestBody = BookingDataGenerator.getRequestBody();


    const createResponse = await request.post(`${env.apiBaseUrl}/booking`, {
      data: requestBody,
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
    const getResponse = await request.get(
      `${env.apiBaseUrl}/booking/${bookingId}`
    );
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
    const getBody = await getResponse.json();
    expect(getBody).toHaveProperty('firstname', 'John');
    expect(getBody).toHaveProperty('lastname', 'Doe');
  });

  test('UPDATE - should be able to update the booking', async ({ request }) => {
    const requestBody = BookingDataGenerator.getRequestBody({
      firstname: 'Rahul',
      lastname: 'Jones',
      totalprice: 691,
      depositpaid: false,
      checkin: '2020-11-15',
      checkout: '2025-01-18',
      additionalneeds: 'Breakfast',
    });

    const updateResponse = await request.put(
      `${env.apiBaseUrl}/booking/${bookingId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token}`,
        },
        data: requestBody,
      }
    );
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    expect(updateBody).toHaveProperty('firstname', requestBody.firstname);
    expect(updateBody).toHaveProperty('lastname', requestBody.lastname);
    expect(updateBody).toHaveProperty('totalprice', requestBody.totalprice);
    expect(updateBody).toHaveProperty('depositpaid', requestBody.depositpaid);
    expect(updateBody.bookingdates).toHaveProperty('checkin', requestBody.bookingdates.checkin);
    expect(updateBody.bookingdates).toHaveProperty('checkout', requestBody.bookingdates.checkout);
    expect(updateBody).toHaveProperty('additionalneeds', requestBody.additionalneeds);
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
