import {httpService} from './http.service.js';

const ENDPOINT = 'toy';

async function getToys(filterBy) {
  return await httpService.get(ENDPOINT, filterBy);
}

async function getToyById(toyId) {
  return await httpService.get(`${ENDPOINT}/${toyId}`);
}

async function removeToy(toyId) {
  return await httpService.delete(`${ENDPOINT}/${toyId}`);
}

async function saveToy(toy) {
  var toy = JSON.parse(JSON.stringify(toy));
  if (toy._id) {
    return await httpService.put(`${ENDPOINT}/${toy._id}`, toy);
  } else {
    if (!toy.name) toy.name = 'Unknown';
    return await httpService.post(ENDPOINT, toy);
  }
}

// async function addReview(toyId, review) {
//     return await httpService.post(`${ENDPOINT}/${toyId}/review`, review);
// }

function getEmptyToy() {
  var emptyToy = {
    name: '',
    price: 0,
    type: null,
    inStock: true,
    reviews: [],
  };
  return emptyToy;
}

export const toyService = {
  getToys,
  getToyById,
  getEmptyToy,
  removeToy,
  saveToy,
  // addReview
};
