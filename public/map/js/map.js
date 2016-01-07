/*
 * 5 ways to customize the infowindow
 * 2015 - en.marnoto.com
 http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html
 */

// You can get the query string in location.search, then you can split everything after the question mark:

var params = {};

if (location.search) {
  console.log("location.search="+location.search);
  var parts = location.search.substring(1).split('&');

  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}

// Now you can get the parameters you want like so:
var mLatitude =parseFloat(params.lat);
var mLongitude = parseFloat(params.lon);
var mStationName=params.sna;
var mday=params.mday;
console.log("mLatitude="+mLatitude);
console.log("mLongitude="+mLongitude);
var mday_v2="&nbsp;&nbsp;"+mday.substring(4, 6) +"/"+mday.substring(6, 8)+"<br> "+mday.substring(8, 10)+":"+mday.substring(10, 12)+":"+ mday.substring(12, 14);
var stationName=decodeURIComponent(params.sna);

var snaen=params.snaen;



// map center
var center = new google.maps.LatLng(mLatitude, mLongitude);

// marker position
var factory = new google.maps.LatLng(mLatitude, mLongitude);

function initialize() {
  var mapOptions = {
    center: center,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);


  var adj_title=decodeURIComponent(params.sna);
  // adj_title="&nbsp&nbsp&nbsp&nbsp"+adj_title;


  // InfoWindow content
  var content = '<div id="iw-container">' ;
  content +=             '<div class="iw-title">'+adj_title+'</div>' ;
  content +=           '<div class="iw-content">' ;
  // content +=         '<div class="iw-subTitle">'+'History</div>' ;
      // content += "<h3>可借車數："+params.sbi+"</h3>";
      // content += "<h3>可還格數："+params.bemp+"</h3>";
      content += '  <i class="material-icons">&#xE52F;</i>';// bike
      content += "&nbsp;：<b>"+params.sbi+"</b><br>";
    //  content += "<b>可借："+params.sbi+"</b><br>";
    //  content+='<br<i class="material-icons">lock</i>';
    content += '<br> <i class="material-icons">&#xE897;</i>';//lock

       content += "：<b>"+params.bemp+"</b><br><br>";
      content += ""+mday_v2+"";
      // content += "<br>資料時間：<br>"+mday_v2+"";

  // content +=         '<img src="images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' ;
  // content +=         '<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.</p>' ;
  // content +=           '<div class="iw-subTitle">Contacts</div>' ;
  // content +=           '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>';
  // content +=            '<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>';
  content +=          '</div>' ;
  content +=          '<div class="iw-bottom-gradient"></div>' ;
  content +=        '</div>';

  // A new Info Window is created and set content
  var infowindow = new google.maps.InfoWindow({
    content: content,

    // Assign a maximum value for the width of the infowindow allows
    // greater control over the various content elements
    maxWidth: 350
  });

  // marker options
  var marker = new google.maps.Marker({
    position: factory,
    map: map,
    title:adj_title
  });

  // This event expects a click on a marker
  // When this event is fired the Info Window is opened.
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  // Event that closes the Info Window with a click on the map
  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });


  // by Mark, 1/6 15:31, Let it open when open this map page
  infowindow.open(map,marker);
  // *
  // START INFOWINDOW CUSTOMIZE.
  // The google.maps.event.addListener() event expects
  // the creation of the infowindow HTML structure 'domready'
  // and before the opening of the infowindow, defined styles are applied.
  // *
  google.maps.event.addListener(infowindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
     */
     var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // by Mark, 1/6 17:28 fix unnecessary shifting
    // Moves the infowindow 115px to the right.
    // iwOuter.parent().parent().css({left: '115px'});

    // Moves the shadow of the arrow 76px to the left margin.
    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Moves the arrow 76px to the left margin.
    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
