$(document).ready(function() {
  
  // array of channels
  var streamers = ["freecodecamp", "monstercat", "carusaustralis", "sky_mp3", "LegendOfGamer", "h3h3productions", "jennajulien", "deadmau5"];
  // user-entered search input
  var searchInput;
  // channel name
  var name;
  // channel icon
  var channelIcon;
  // channel link
  var link;
  // stream value
  var streaming;
  // Twitch channel url
  var channelURL;
  // stream status url
  var streamURL;
  
  var onlineStreams = []; // array of online streamers
  var offlineStreams = []; // array of offline streamers

function displayChannel(channel) {
  // display channel list    
    channelURL = "https://wind-bow.glitch.me/twitch-api/channels/" + channel;
    
    
    $.getJSON(channelURL, function(channelData) {
        name = channelData.display_name;
        link = channelData.url;
        
        if (channelData.logo === null) {
          channelIcon = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png";    
        } else {
          channelIcon = channelData.logo;  
        }
      
        $("#channels").prepend('<a class="channel-link ' + channel + '" href="' + link + '" target="_blank"><li><img class="channel-icon" src="' + channelIcon + '"><h4 class="title">' + name + '</h4><i id="' + channel + '" class="glyphicon"></i></li></a>');
      
      streamURL = "https://wind-bow.glitch.me/twitch-api/streams/" + channel;
      
      // ADD CLASS TO <a> FOR BUTTONS
      $.getJSON(streamURL, function(streamData) {
        streaming = streamData.stream;
      
        if (streaming === null) {
          // add glyphicon-remove and offline class
          $("#" + channel).addClass("glyphicon-remove");
          $("." + channel).addClass("offline");
          offlineStreams.push(channel);
        } else {
          // add glyphicon-ok and online class
          $("#" + channel).addClass("glyphicon-ok");
          $("." + channel).addClass("online");
          onlineStreams.push(channel);
        }
      
      
      }); // end JSON call for stream status
      
    }); // end JSON call for channels
    
    
 } // end displayChannel function

// display default channels
streamers.forEach(function(channel) {
  displayChannel(channel);
}); // end forEach loop
  
  // on click show all streamers
  $("#all").click(function() {
    $(".channel-link").show();
  });
  
  // on click show live streamers
  $("#online").click(function() {
    $(".offline").hide();
    $(".online").show();
  });
  
  // on click show offline streamers
  $("#offline").click(function() {
    $(".online").hide();
    $(".offline").show();
  });
  
  // on enter to search
  $("#search-box").on("keyup", function(event) {
        if (event.which === 13) {
          // set value of search input
          searchInput = $("#search-box").val().toLowerCase();
          
          // display desired streamer from search
          streamers.forEach(function(item) {
            if (item == searchInput) {
              $("." + item).show();
            } else {
              $("." + item).hide();
            }
          }); // end forEach
            
        } // end if enter
  }); // end search enter
  
  // click plus icon to add a channel to the list
  $(".add").click(function () {
    // set value of search input
    searchInput = $("#search-box").val().toLowerCase();
    
    // if channel is already on the list, reset variable
    streamers.forEach(function(item) {
      if (item == searchInput) {
        searchInput = "";
      } // end if 
     }); // end forEach
    
    // add new channel to array
    streamers.push(searchInput);
    // display new channel on the list
    displayChannel(searchInput);
    // show all channels with new one added
    $(".channel-link").show();
    
  }); // end add channel
  
}); // document ready


/*

Streamers: freecodecamp, monstercat, carusaustralis, sky_mp3, LegendOfGamer, h3h3productions

name = data.display_name;
channelIcon = data.logo;
link = data.url;

streaming = data.stream;

Format:
<a class="channel-link" href="https://www.twitch.tv/monstercat" target="_blank"><li><img class="channel-icon" src="https://static-cdn.jtvnw.net/jtv_user_pictures/monstercat-profile_image-3e109d75f8413319-300x300.jpeg"><h4 class="title">Monstercat</h4><i class="glyphicon glyphicon-ok"></i></li></a>

*/
