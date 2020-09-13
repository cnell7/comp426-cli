/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */

/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function (hero) {
  // TODO: Generate HTML elements to represent the hero
  // TODO: Return these elements as a string, HTMLElement, or jQuery object
  // Example: return `<div>${hero.name}</div>`;
  let returnHTML = $("<div class = 'column is-one-quarter'</div>");
  let img = $("<img src = '" + hero.img + "'>");
  let firstName = $("<h1></h1>").append(hero.first);
  let lastName = $("<h2></h2>").append(hero.last);
  let heroName = $("<h3></h3>").append(hero.name);
  returnHTML.append(img).append(firstName).append(lastName).append(heroName);
  return returnHTML;
};

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
  // TODO: Generate HTML elements to represent the hero edit form
  // TODO: Return these elements as a string, HTMLElement, or jQuery object
  // Example: return `<form>${hero.name}</form>`;
};

/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
  // Grab a jQuery reference to the root HTML element
  const $root = $("#root");
  let $col = $("<div class='columns is-multiline'></div>").appendTo($root);
  // TODO: Generate the heroes using renderHeroCard()
  // TODO: Append the hero cards to the $root element
  for (let i = 0; i < heroes.length; i++) {
    $col.append(renderHeroCard(heroes[i]));
  }
  // Pick a hero from the list at random
  const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

  // TODO: Generate the hero edit form using renderHeroEditForm()

  // TODO: Append the hero edit form to the $root element
};

/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
  loadHeroesIntoDOM(heroicData);
});
