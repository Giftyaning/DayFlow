$(document).ready(function () {
  // Display current day
  let today = dayjs().format("dddd, MMMM D YYYY, HH:mm");
  $("#currentDay").text(today);

  // Plan for workday
  let workDayTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM (Lunch)",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // Create time blocks
  let container = $(".container");
  workDayTimes.forEach(function (time) {
    let timeBlock = $('<div class="row time-block">');
    timeBlock.append('<div class="col-2 hour">' + time + "</div>");
    timeBlock.append('<textarea class="col-8 description"></textarea>');
    timeBlock.append(
      '<button class="col-2 saveBtn"><i class="far fa-save"></i></button>'
    );
    container.append(timeBlock);
  });

  // Apply color coding to time blocks
  setColorCode();

  // Save event on button click
  $(".saveBtn").on("click", handleSaveButtonClick);

  // Load events when the page is loaded
  loadEvents();
});

function setColorCode() {
  const now = new Date().getHours();

  $(".time-block").each(function () {
    const eventHour = parseInt($(this).find(".hour").text());
    const eventInput = $(this).find(".description");

    if (eventHour < now) {
      eventInput.addClass("past");
    } else if (eventHour === now) {
      eventInput.addClass("present");
    } else {
      eventInput.addClass("future");
    }
  });
}

function handleSaveButtonClick(event) {
  const timeblock = event.target.closest(".time-block");
  const eventInput = timeblock.find(".description");
  const eventText = eventInput.val();
  const eventHour = timeblock.find(".hour").text();

  // Save event in local storage using the hour as the key
  localStorage.setItem(eventHour, eventText);
}

function loadEvents() {
  $(".time-block").each(function () {
    const eventHour = $(this).find(".hour").text();
    const eventInput = $(this).find(".description");
    const savedEvent = localStorage.getItem(eventHour);

    if (savedEvent) {
      eventInput.val(savedEvent);
    }
  });
}
