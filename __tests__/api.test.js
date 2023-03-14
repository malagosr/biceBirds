import {getItems, getInfo} from '../app/api';

test('fetches items from API', async () => {
  const mockData = {
    _links: {
      parent: 'link-1',
      self: 'link-2',
    },
    images: {
      full: 'image-1',
      main: 'image-2',
      thumb: 'image-3',
    },
    name: {
      english: 'Magellanic Penguin',
      latin: 'Spheniscus magellanicus',
      spanish: 'Pingüino de Magallanes',
    },
    sort: 215,
    uid: '10-spheniscus-magellanicus',
  };
  fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({data: mockData}),
    }),
  );

  const response = await getItems();
  expect(response.data).toEqual(mockData);
});

test('fetches info from API for one bird', async () => {
  const mockInfo = {
    _links: {
      parent: 'https://aves.ninjas.cl/api/birds',
      self: 'https://aves.ninjas.cl/api/birds/46-lophonetta-specularioides',
    },
    audio: {
      author: 'Guillermo Egli',
      file: 'https://aves.ninjas.cl/api/site/assets/files/3104/09092018083807.wav'
    },
    didyouknow: '',
    dimorphism: false,
    habitat: '',
    images: {
      gallery: [],
      main: 'https://aves.ninjas.cl/api/site/assets/files/3102/18082018072023pato_juarjual_pedro_valencia_web.jpg'
    },
    iucn: {},
    map: {
      image: 'https://aves.ninjas.cl/api/site/assets/files/3103/map.svg',
      title: 'Entre la Región de Tarapacá y la Región de Magallanes',
    },
    migration: false,
    name: {
      english: 'Crested Duck',
      latin: 'Lophonetta specularioides',
      spanish: 'Pato Juarjual',
    },
    order: 'Anseriformes',
    size: '51 - 61 cm.',
    sort: 1,
    species: 'Nativa',
    uid: '46-lophonetta-specularioides',
  };
  fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({data: mockInfo}),
    }),
  );

  const response = await getInfo('46-lophonetta-specularioides');
  expect(response.data).toEqual(mockInfo);
});
