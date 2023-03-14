import {jest} from '@jest/globals';

jest.unstable_mockModule('node:child_process', () => ({
  fetch: jest.fn(),
  // etc.
}));

const {fetch} = await import('node:child_process');

// etc.

beforeAll(() => {
  fetch.resetMocks();
});

test('fetches data from the API', async () => {
  fetch.mockResponseOnce(JSON.stringify({data: '12345'}));

  const response = await getItems();
  expect(response.data).toEqual('12345');
});
