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

  // Function to color code rows
  function colorRow(time) {
    let currentTime = parseInt(dayjs().format("H"));
    let hour = parseInt(time.split(":")[0]);
    if (hour < currentTime) {
      return "past";
    } else if (hour === currentTime) {
      return "present";
    } else {
      return "future";
    }
  }

  // Apply color coding to time blocks
  $(".time-block").each(function (index) {
    $(this).addClass(colorRow(workDayTimes[index]));
  });

  // Save event on button click
  $(".saveBtn").on("click", function () {
    let index = $(".saveBtn").index(this);
    let description = $(this).siblings(".description").val();

    localStorage.setItem("event_" + index, description);
    alert("Event saved!");
  });

  // Load events from local storage
  function loadEvents() {
    $(".description").each(function (index) {
      let event = localStorage.getItem("event_" + index);
      if (event !== null) {
        $(this).val(event);
      }
    });
  }

  // Load events when the page is loaded
  loadEvents();
});
