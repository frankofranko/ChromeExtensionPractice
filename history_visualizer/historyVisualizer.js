$(function() {
  // console.log("1");
    $('.search').change(function() {
      $('#history_div').empty();
      // console.log($('#start_time').val());
      // console.log($('#end_time').val());
      searchHistory($('#start_time').val(), $('#end_time').val());
      // dumpBookmarks($('#search').val());
  });
});

function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}

function dumpHistory(historyItems) {
  var div_name = 'history_div';
  var div = document.getElementById(div_name);
  var ul = document.createElement('ul');
    div.appendChild(ul);
    for (var i = 0; i < historyItems.length; i++) {
      var a = document.createElement('a');
      a.href = historyItems[i].url;
      a.appendChild(document.createTextNode(historyItems[i].url));
      a.addEventListener('click', onAnchorClick);
      var title = document.createElement('p');
      title.appendChild(document.createTextNode(historyItems[i].title));
      var li = document.createElement('li');
      li.appendChild(title);
      li.appendChild(a);
      ul.appendChild(li);
    }
}


function searchHistory(num_of_start_days, num_of_end_days) {
  var start_day_in_milliseconds = Date.now() - num_of_start_days*1000*60*60*24;
  var end_day_in_milliseconds = Date.now() - num_of_end_days*1000*60*60*24;

  chrome.history.search({
      'text': '',              // Return every history item....
      'startTime': start_day_in_milliseconds,
      'endTime': end_day_in_milliseconds
      }, function(historyItems) {
        console.log(historyItems);
        dumpHistory(historyItems);
      });

  // chrome.history.search({
 //     'text': '',              // Return every history item....
 //     'startTime': days_in_microseconds  // that was accessed less than one week ago.
 //     },
 //     function(historyItems) {

 //       dumpHistory


          // For each history item, get details on all visits.
          // console.log(historyItems)
          // for (var i = 0; i < historyItems.length; ++i) {
            // var url = historyItems[i].url;
            // console("")
            // var processVisitsWithUrl = function(url) {
          //      // We need the url of the visited item to process the visit.
          //      // Use a closure to bind the  url into the callback's args.
          //      return function(visitItems) {
          //      processVisits(url, visitItems);
          //    };
          // };
          // chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
          // numRequestsOutstanding++;
        
        // if (!numRequestsOutstanding) {
          // onAllVisitsProcessed();
        // }
      // });
}