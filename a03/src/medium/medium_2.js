import mpg_data from "./data/mpg_data.js";
import { getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

export function getMpg(array) {
  let sum = 0;
  let ci = array.forEach((element) => {
    sum += element.city_mpg;
  });
  ci = sum / array.length;
  sum = 0;
  let hi = array.forEach((element) => {
    sum += element.highway_mpg;
  });
  hi = sum / array.length;
  return { city: ci, highway: hi };
}

export function getYearStats(array) {
  let yearMade = [];
  array.forEach((element) => {
    yearMade.push(element.year);
  });
  return getStatistics(yearMade);
}

export function getHyRatio(array) {
  let count = 0;
  array.forEach((element) => {
    if (element.hybrid == true) {
      count++;
    }
  });
  return count / array.length;
}
export function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
export function getMakerHybrids(array) {
  let returnAr = [];
  let temp = groupBy(array, "hybrid");
  temp = groupBy(temp.true, "make");
  let keys = Object.keys(temp);

  keys.forEach((element) => {
    let hybrid1 = [];
    temp[element].forEach((element1) => {
      hybrid1.push(element1.id);
    });
    returnAr.push({ make: element, hybrids: hybrid1 });
  });

  return returnAr.sort((make_1, make_2) => {
    return make_2["hybrids"].length - make_1["hybrids"].length;
  });
}
export function getAvgMpgByYearAndHybrid(array) {
  let returnObj = {};
  let years = groupBy(array, "year");
  let yearKeys = Object.keys(years);
  yearKeys.forEach((element) => {
    let hyNotHy = { hybrid: null, notHybrid: null };
    let hybrids = groupBy(years[element], "hybrid");
    let hybridMPG = getMpg(hybrids[true]);
    let notHybridMPG = getMpg(hybrids[false]);
    hyNotHy.hybrid = hybridMPG;
    hyNotHy.notHybrid = notHybridMPG;
    returnObj[element] = hyNotHy;
  });
  return returnObj;
}
/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
  avgMpg: getMpg(mpg_data),
  allYearStats: getYearStats(mpg_data),
  ratioHybrids: getHyRatio(mpg_data),
};

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export const moreStats = {
  makerHybrids: getMakerHybrids(mpg_data),
  avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid(mpg_data),
};
