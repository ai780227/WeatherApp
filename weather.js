$(document).ready(function() {
  var location;
  location = "http://ip-api.com/json";
  $.getJSON(location, function(data) {
    var city = data.city;
    $("#city").val(city);
    getWeather();
  });

  $("#submitCity").click(function() {
    return getWeather();
  });

  $(".prev").click(function(){
    plusSlides(-1);
  });

  $(".next").click(function(){
      console.log("AAA");
    plusSlides(1);
  });
});

function getWeather() {
  var city = $("#city").val();

  if (city != "") {
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&APPID=73a4e77e764803ae83557ce1db52a25a",
      type: "GET",
      datatype: "jsonp",
      success: function(data) {
        console.log(data);
        var widget = showResults(data);

        $("#showWeather").html(widget);

        showWidget(data);
      }
    });
  } else {
    $("#error").html(
      "<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>"
    );
  }
}

function showResults(data) {
  return (
    "<h2 style='font-weight:bold; font-size:30px;padding-top:30px;' class='text-center'>Current Weather for " +
    data.name +
    ", " +
    data.sys.country +
    "</h3>" +
    "<h3 style='padding-left:40px;'>Weather: " +
    data.weather[0].main +
    " </h3>" +
    "<h3 style='padding-left:40px;'>Weather Description: <img src='http://openweathermap.org/img/w/" +
    data.weather[0].icon +
    ".png'/>" +
    data.weather[0].description +
    "</h3>" +
    "<h3 style='padding-left:40px;'>Temperature: " +
    data.main.temp +
    " &deg;C</h3>" +
    "<h3 style='padding-left:40px;'>Pressure: " +
    data.main.pressure +
    " hpa</h3>" +
    "<h3 style='padding-left:40px;'>Humidity: " +
    data.main.humidity +
    " %</h3>" +
    "<h3 style='padding-left:40px;'>Min Temperature: " +
    data.main.temp_min +
    " &deg;C</h3>" +
    "<h3 style='padding-left:40px;'>Max Temperature: " +
    data.main.temp_max +
    " &deg;C</h3>" +
    "<h3 style='padding-left:40px;'>Wind Speed: " +
    data.wind.speed +
    " m/s</h3>" +
    "<h3 style='padding-left:40px;padding-bottom:30px;'>Wind Direction: " +
    data.wind.deg +
    "</h3>"
  );
}

/**Weather widget js */

function showWidget(data) {
  console.log(data);
  //  var appID, lat, lon;
  //  lat = data.lat;
  //  lon = data.lon;
  //  appID = "73a4e77e764803ae83557ce1db52a25a";
  //  $.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`, function(data) {
  var cDescription, description, icon, icon_replace, temp;
  // Our Data
  icon = data.weather[0].icon;
  icon_replace = $(".weather-app_main__information--icon").attr("src");
  console.log(data.main);
  $(".city").html(`${data.name}<span class='fa fa-chevron-down arrow'></span>`);
  $(".fa fa-minus").html(`${data.main.temp}`);
  temp = Math.round(data.main.temp);
  if (temp < 273.15) {
    $(".background").css("background-color", "#A0CAE3");
  } else if (temp < 290 && temp > 273.15) {
    $(".background").css("background-color", "#E3D892");
  } else {
    $(".background").css("background-color", "#EA8F85");
  }
  description = data.weather[0].description;
  cDescription = description.charAt(0).toUpperCase() + description.slice(1);
  // Apply Data To Page
  // $('.weather-app_main__information--icon').attr 'src', icon_replace.replace('#', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217538/' + icon + '.png')
  $(".actual").html(`${temp}<span class='degree'> &deg;</span>`);
  $(".weather-app_main__information--description").html(cDescription);
  //  });
}
