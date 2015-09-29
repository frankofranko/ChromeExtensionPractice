$(function() {
	// console.log("1");
  	$('#search').change(function() {
    	$('#history_div').empty();
    	searchHistory($('#search').val());
    	// console.log("here");
    	// dumpBookmarks($('#search').val());
	});
});

function dumpHistory(historyItems) {
	var div_name = 'history_div';
	var div = document.getElementById(div_name);
	var ul = document.createElement('ul');
  	div.appendChild(ul);
  	for (var i = 0; i < historyItems.length; i++) {
	    var a = document.createElement('a');
	    a.href = historyItems[i].url;
	    a.appendChild(document.createTextNode(historyItems[i].url));
	    // a.addEventListener('click', onAnchorClick);
	    var li = document.createElement('li');
	    li.appendChild(a);
	    ul.appendChild(li);
  	}
}


function searchHistory(num_of_days) {
	var days_in_microseconds = num_of_days*1000*60*60*24

	chrome.history.search({
    	'text': '',              // Return every history item....
  		'startTime': days_in_microseconds  // that was accessed less than one week ago.
    	}, function(historyItems) {
    		console.log(historyItems);
    		dumpHistory(historyItems);
    	});

	// chrome.history.search({
 //    	'text': '',              // Return every history item....
 //  		'startTime': days_in_microseconds  // that was accessed less than one week ago.
 //    	},
 //    	function(historyItems) {

 //    		dumpHistory


      		// For each history item, get details on all visits.
      		// console.log(historyItems)
      		// for (var i = 0; i < historyItems.length; ++i) {
        		// var url = historyItems[i].url;
        		// console("")
        		// var processVisitsWithUrl = function(url) {
          // 			// We need the url of the visited item to process the visit.
          // 			// Use a closure to bind the  url into the callback's args.
          // 			return function(visitItems) {
          //   		processVisits(url, visitItems);
          // 		};
        	// };
        	// chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
        	// numRequestsOutstanding++;
      	
      	// if (!numRequestsOutstanding) {
        	// onAllVisitsProcessed();
      	// }
    	// });
}