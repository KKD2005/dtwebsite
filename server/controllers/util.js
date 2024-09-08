// Note: This file must be kept in sync with the same util file in client.
const addHours = require('date-fns/add_hours');
const addDays = require('date-fns/add_days');
const startOfDay = require('date-fns/start_of_day');

const Show = require('../models/Show.js');

// Default dates. The month and day are ignored for processing for weekly scheduling. 
// Hardcoded to a random day that starts on Sunday.
const weekStartDate = new Date(2019, 8, 1);
const weekDays = 8; 
const weekStartHour = 12; // 12pm
const weekEndHour = 26.5; // 10:30 pm will be the last time slot rendered.

// SEAN: I DID A HACKY THING HERE PLEASE FIX IT TODO
// SEE DATETIME BUG IN WEBMASTER DOC

// TODO fall dates November 23-26, and December 1-2 2019.
const prodStartDate = new Date(2019, 10, 23);
const prodDays = 10;
const prodStartHour = 9;
const prodEndHour = 23.5;

getActiveShow = () => {
  return Show.findOne({isActive: true}).then(show => {
    return show;
  });
}

getWeekTimes = () => {
  const startTime = startOfDay(weekStartDate);
  var times = [];
  for (var d = 0; d < weekDays; d++) {
    var currentDay = [];
    for (var h = weekStartHour; h <= weekEndHour; h += 0.5) {
      currentDay.push(addHours(addDays(startTime, d), h));
    }
    times.push(currentDay);
  }
  return times;
}

getWeekStartEnd = () => {
  return { startTime: weekStartHour, endTime: weekEndHour }
}

getProdTimes = () => {
  const startTime = startOfDay(prodStartDate);
  var times = [];
  for (var d = 0; d < prodDays; d++) {
    var currentDay = [];
    for (var h = prodStartHour; h <= prodEndHour; h += 0.5) {
      currentDay.push(addHours(addDays(startTime, d), h));
    }
    times.push(currentDay);
  }
  return times;
}

getProdStartEnd = () => {
  return { startTime: prodStartHour, endTime: prodEndHour }
}

module.exports = {
  getActiveShow,
  getWeekTimes,
  getWeekStartEnd,
  getProdTimes,
  getProdStartEnd,
  weekStartDate,
  weekDays, 
  weekStartHour,
  weekEndHour,
  prodStartDate,
  prodDays,
  prodStartHour,
  prodEndHour
};
