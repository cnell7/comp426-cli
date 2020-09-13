import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
  let returnAr = [];
  let goodHorse = [];
  let goodTorque = [];
  for (let i = 0; i < car_data.length; i++) {
    if (car_data[i].horsepower >= minHorsepower) {
      goodHorse.push(car_data[i]);
    }
  }

  for (let i = 0; i < car_data.length; i++) {
    if (car_data[i].torque >= minTorque) {
      goodTorque.push(car_data[i]);
    }
  }
  for (let i = 0; i < goodHorse.length; i++) {
    if (goodTorque.includes(goodHorse[i])) {
      returnAr.push(goodHorse[i]);
    }
  }
  returnAr = returnAr.sort((make_1, make_2) => {
    return make_2["horsepower"] - make_1["horsepower"];
  });
  return returnAr;
}

/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
  let goodHwyMpg = [];
  let goodCityMpg = [];
  let returnAr = [];
  for (let i = 0; i < car_data.length; i++) {
    if (car_data[i].highway_mpg >= minHighway) {
      goodHwyMpg.push(car_data[i]);
    }
    if (car_data[i].city_mpg >= minCity) {
      goodCityMpg.push(car_data[i]);
    }
  }
  for (let i = 0; i < goodHwyMpg.length; i++) {
    if (goodCityMpg.includes(goodHwyMpg[i])) {
      returnAr.push(goodHwyMpg[i]);
    }
  }
  returnAr = returnAr.sort((make_1, make_2) => {
    return make_2["highway_mpg"] - make_1["highway_mpg"];
  });
  return returnAr;
}

/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  return car_data
    .filter((car) => {
      return car["id"].toLowerCase().indexOf(searchTerm) > -1;
    })
    .sort((car1, car2) => {
      car2["id"].toLowerCase().indexOf(searchTerm) -
        car1["id"].toLowerCase().indexOf(searchTerm);
    });
}

/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
  let returnAr = [];
  for (let i = 0; i < car_data.length; i++) {
    if (years.includes(car_data[i].year)) {
      returnAr.push(car_data[i]);
    }
  }
  returnAr = returnAr.sort((make_1, make_2) => {
    return make_2["year"] - make_1["year"];
  });
  return returnAr;
}
