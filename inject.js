// this is the code which will be injected into a given page...

(function() {

	try{chrome.storage.sync.get(["websites"],function(){})}catch(err){
		alert('Setup needed, right-click on the extension and press options.');
		return;
	}

	var success = false;
	var finishTime = localStorage.getItem('myTime');
	var timeLeft = (finishTime - new Date());
	var minTimeLeft = Math.max(timeLeft/1000,0);
	var reblock = false;

	if (minTimeLeft > 0) {
		//reblock
		reblock = true;
	}else{
		if (confirm("Are you sure?") == false) {return;}
	}

	chrome.storage.sync.get([ "minutes"], function(items) {
	    var allValues = Object.values(items);
	    if (reblock) {
		    location.reload();
		    localStorage.setItem('myTime', ((new Date()).getTime()));
            finishTime = localStorage.getItem('myTime');

          	chrome.storage.sync.set({'finishTime': finishTime}, function() {
              	console.log('Settings saved');
            });
	    }else{
		    localStorage.setItem('myTime', ((new Date()).getTime() + allValues * 60000));
		    success = true;
	    }
	    console.log('got minutes');
    });


    checkFlag();

    function checkFlag() {
        if(success == false) {
           window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
        } else {
          	try{document.getElementById('blockedWebsite').style = 'display:none;';}catch(err){console.log(err.message);}
          	document.body.style = 'overflow:initial;'

          	var finishTime; var timeoutID; var timesZero = 0;

            finishTime = localStorage.getItem('myTime');

          	chrome.storage.sync.set({'finishTime': finishTime}, function() {
              	console.log('Settings saved');
            });

          	if(localStorage.getItem('myTime')){
          		console.log(localStorage.getItem('myTime'));
          	}
            if (timeoutID != undefined) window.clearTimeout(timeoutID);
            Update();
        }
    }


    console.log("Time Left: " + Math.max((finishTime - new Date())/1000,0));

	function Update() {

	    finishTime = localStorage.getItem('myTime');
	    var timeLeft = (finishTime - new Date());
	    var minTimeLeft = Math.max(timeLeft/1000,0);

	    if (reblock == true) {
	    	window.scrollTo(0, 0);
	    }

	    timeoutID = window.setTimeout(Update, 1000);

	    if (minTimeLeft == 0) {
	    	alert('You\'re out of time!');
	    	clearTimeout(timeoutID);
	    }
	}

})();