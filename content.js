var timeLeft;
var time = 0;

chrome.storage.sync.get(["finishTime"], function(items) {
    var allKeys = Object.keys(items);
    var allValues = Object.values(items);
    console.log(allKeys);
    console.log(allValues);


    var timeLeft = (allValues[0] - new Date());

    var message = '<div id="message532" style="z-index: 1;margin: auto;width: 100%;height: 30px;position: fixed;bottom: 50%;"><div id="notification" style="font-size: 14px;box-shadow: 0px 3px 6px;margin: auto;color: black;z-index: 100;position: relative;width: 200px;border-radius: 10px;padding: 4px 0px;background: lightgrey;text-align: center;font-family: monospace;top: 0;">'+ Math.ceil(Math.max(timeLeft/60000,0)) + " mins left"+'<button style=\"margin-left: 10px;border-radius: 14px;\">X</button></div></div>';


	var my_elem = document.body;

	var span = document.createElement('span');
	    span.innerHTML = message;
	    span.className = 'minutesLeft';
	    span.style = "z-index: 9999;position: absolute;";
	    span.setAttribute("onClick","this.style='display:none;'");



    var blockMessage = '<div id="blocked" style="position: absolute;height: 100%;width: 100%;top: 0px;background: white;"><h1 style="text-align: center;padding-top: 100px;">Website Locked</h1><div  style="text-align: center;">Press the extension icon to unlock the website.</div><div>';

    var blockWeb = document.createElement('span');
        blockWeb.innerHTML = blockMessage;
        blockWeb.setAttribute('id','blockedWebsite');
        blockWeb.style = "z-index: 9999;position: fixed; width:100%;height:100%; background:white;";


    	chrome.storage.sync.get([ "websites"], function(items) {
    	    var allValues = Object.values(items);
    	    websites = allValues + '';

    	    var websites = websites.split(";");
            var otherWeb;
    	    console.log(websites);



    	    for (var i = websites.length - 1; i >= 0; i--) {
                console.log(('www.' + websites[i]));
                if (window.location.host == websites[i] || window.location.host == (websites[i].replace('www.','') || (window.location.host == ('www.' + websites[i])))) {
					my_elem.parentNode.insertBefore(span, my_elem);

					if (timeLeft <= 0 || isNaN(timeLeft)) {
        				//window.location.replace("https://blank.org/");
                        my_elem.parentNode.insertBefore(blockWeb, my_elem);
                        my_elem.style = 'overflow:hidden;';
					}
    	    	}
    	    } 
    	});
});

var timesRun = 0;
var interval = setInterval(function(){
    timesRun += 1;
    if(timesRun === 1){
        clearInterval(interval);
    }
    try{document.getElementById('message532').style = 'display:none;';}catch(err){}
}, 3500); 





