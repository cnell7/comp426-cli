/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <Christian Nell>
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
  let returnHTML = $(
    "<div style = 'text-align: center; background-color: " +
      hero.backgroundColor +
      "' class = 'column is-one-quarter' data-id = '" +
      hero.id +
      "'></div>"
  );
  let img = $("<img src = '" + hero.img + "'></img>");
  let firstName = $("<h1 style='color:" + hero.color + "'></h1>")
    .append("Identity = " + hero.first)
    .append(" " + hero.last);
  let heroName = $("<span style='color:grey'></span>").append(
    "Hero = " + hero.name
  );
  let firstSeen = $("<h2></h2>").append(
    hero.firstSeen.getMonth() +
      "/" +
      hero.firstSeen.getDate() +
      "/" +
      hero.firstSeen.getFullYear()
  );
  let heroDesc = $("<p style='color: white'></p>").append(hero.description);
  let button = $(
    "<button class = 'button edit is-dark' data-id = '" +
      hero.id +
      "'>Edit</button>"
  );
  returnHTML
    .append(img)
    .append(firstName)
    .append(heroName)
    .append(firstSeen)
    .append(heroDesc)
    .append(button);
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
  //hero.first
  //hero.last
  // hero.name
  //hero.description
  //hero.firstSeen - The month and year of the first comic book issue in which the hero appears, stored as a JavaScript Date object
  let $form = $("<form class = 'form' data-id = '" + hero.id + "'></form>");
  let $first = $("<div class = 'field'></div>")
    .append($("<label class = 'label'>First Name</label>"))
    .append($('<div class = "control"></div>'))
    .append(
      $(
        '<input id = "first" class = "input" type="text" value=' +
          hero.first +
          "></input>"
      )
    );
  let $last = $("<div class = 'field'></div>")
    .append($("<label class = 'label'>Last Name</label>"))
    .append($('<div class = "control"></div>'))
    .append(
      $(
        '<input id = "last" class = "input" type="text" value="' +
          hero.last +
          '"></input>'
      )
    );
  let $name = $("<div class = 'field'></div>")
    .append($("<label class = 'label'>Hero Name</label>"))
    .append($('<div class = "control"></div>'))
    .append(
      $(
        '<input id = "name" class = "input" type="text" value="' +
          hero.name +
          '"></input>'
      )
    );
  let $desc = $("<div class = 'field'></div>")
    .append($("<label class = 'label'>Description</label>"))
    .append($('<div class = "control"></div>'))
    .append(
      $(
        "<textarea id = 'desc' class = 'textarea'>" +
          hero.description +
          "</textarea>"
      )
    );
  let $firstSeen = $("<div class = 'field'></div>")
    .append($("<label class = 'label'>First Seen</label>"))
    .append($('<div class = "control"></div>'))
    .append(
      $(
        "<input id = 'firstSeen' class = 'input firstSeen' value = " +
          hero.firstSeen.getMonth() +
          "/" +
          hero.firstSeen.getFullYear() +
          "></input>"
      )
    );
  let $save = $("<div class = 'field'></div>")
    .append($('<div class = "control conSave"></div>'))
    .append(
      $(
        "<button class='button save' type = 'submit' data-id = '" +
          hero.id +
          "'>Save</button>"
      )
    );
  let $cancel = $("<div class = 'field'></div>")
    .append($('<div class = "control conCancel"></div>'))
    .append(
      $(
        "<button class='button cancel' type = 'button' data-id = '" +
          hero.id +
          "'>Cancel</button>"
      )
    );
  $form
    .append($first)
    .append($last)
    .append($name)
    .append($desc)
    .append($firstSeen)
    .append($save)
    .append($cancel);
  return $form;
};

/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
  // TODO: Render the hero edit form for the clicked hero and replace the
  //       hero's card in the DOM with their edit form instead
  let heroEdit = findHero(event.target.dataset.id);
  let heroEditRemove = findHeroDiv(heroEdit.id);
  $(heroEditRemove).remove();
  $("#root").append(renderHeroEditForm(heroEdit));
  return true;
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
  // TODO: Render the hero card for the clicked hero and replace the
  //       hero's edit form in the DOM with their card instead
  let heroEdit = findHero(event.target.dataset.id);
  let heroFormRemove = findHeroForm(heroEdit.id);
  $(heroFormRemove).remove();
  insertBack(heroEdit);
  return true;
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
  // TODO: Render the hero card using the updated field values from the
  //       submitted form and replace the hero's edit form in the DOM with
  //       their updated card instead
  let heroEdit = findHero(event.target.dataset.id);
  heroEdit["first"] = $("#first").val();
  heroEdit["last"] = $("#last").val();
  heroEdit["name"] = $("#name").val();
  heroEdit["description"] = $("#desc").val();
  let fSeen = $("#firstSeen").val();
  fSeen = fSeen.split("/");
  heroEdit["firstSeen"] = new Date(fSeen[1], fSeen[0]);
  let heroFormRemove = findHeroForm(heroEdit.id);
  $(heroFormRemove).remove();
  insertBack(findHero(heroEdit.id));
  return true;
};

/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
  let firstClick = true;
  // Grab a jQuery reference to the root HTML element
  const $root = $("#root");

  // TODO: Generate the heroes using renderHeroCard()
  //       NOTE: Copy your code from a04 for this part
  let loadedHeroes = loadAllHeroes(heroes);
  // TODO: Append the hero cards to the $root element
  //       NOTE: Copy your code from a04 for this part
  $root.append(loadedHeroes);
  // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
  //       clicking the edit button
  $root.on("click", ".edit", function (e) {
    if (firstClick) {
      firstClick = false;
      handleEditButtonPress(e);
    }
    firstClick = true;
  });
  // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
  //       submitting the form
  $root.on("click", ".save", function (e) {
    e.preventDefault();
    handleEditFormSubmit(e);
  });
  // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
  //       clicking the cancel button
  $root.on("click", ".cancel", function (e) {
    handleCancelButtonPress(e);
  });
};

export const loadAllHeroes = function (heroes) {
  let $div1 = $("<div class = 'section'></div>");
  let $col = $("<div class='columns is-multiline'></div>").appendTo($div1);
  for (let i = 0; i < heroes.length; i++) {
    $col.append(renderHeroCard(heroes[i]));
  }
  return $div1;
};

export const findHero = function (id) {
  let heroEdit;
  heroicData.forEach((element) => {
    if (element.id == id) {
      heroEdit = element;
    }
  });
  return heroEdit;
};

export const findHeroDiv = function (id) {
  return $(".column").filter(function () {
    return $(this).data("id") === id;
  })[0];
};

export const findHeroForm = function (id) {
  return $("form").filter(function () {
    return $(this).data("id") === id;
  })[0];
};

export const findNextHero = function (id) {
  for (let i = 0; i < heroicData.length - 1; i++) {
    if (heroicData[i].id == id) {
      return heroicData[i + 1];
    }
  }
  return false;
};

export const insertBack = function (heroEdit) {
  let nextHero = findNextHero(heroEdit.id);
  if (nextHero == false) {
    $(".columns").append(renderHeroCard(heroEdit));
  } else {
    let nextHeroDiv = findHeroDiv(nextHero.id);
    renderHeroCard(heroEdit).insertBefore(nextHeroDiv);
    return true;
  }
};
/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
  loadHeroesIntoDOM(heroicData);
});
