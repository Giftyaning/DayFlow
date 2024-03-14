$(document).ready(function () {
  // Display current day at the top of the calendar
  function displayCurrentDay() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  // Generate time blocks for standard business hours
  function generateTimeBlocks() {
    var businessHours = [
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
    ];
    var container = $(".container");

    for (var i = 0; i < businessHours.length; i++) {
      var timeBlock = $("<div>").addClass("time-block row");
      var hourColumn = $("<div>")
        .addClass("hour col-md-1")
        .text(businessHours[i]);
      var eventColumn = $("<textarea>").addClass("description col-md-10");
      var saveButton = $("<button>").addClass("saveBtn col-md-1").text("Save");

      timeBlock.append(hourColumn, eventColumn, saveButton);
      container.append(timeBlock);
    }
  }

  // Color-code time blocks based on past, present, and future times
  function updateColorCoding() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).find(".hour").text().split(" ")[0]);

      if (blockHour < currentHour) {
        $(this).find(".description").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).find(".description").addClass("present");
      } else {
        $(this).find(".description").addClass("future");
      }
    });
  }

  // Save event to local storage
  $(".saveBtn").on("click", function () {
    var eventText = $(this).siblings(".description").val();
    var eventHour = $(this).siblings(".hour").text();

    localStorage.setItem(eventHour, eventText);
  });

  // Load events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var eventHour = $(this).find(".hour").text();
      var savedEvent = localStorage.getItem(eventHour);

      if (savedEvent !== null) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  displayCurrentDay();
  generateTimeBlocks();
  updateColorCoding();
  loadEvents();
});
