// this is the background code...


// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
});


function hello() {
	var locked = false;

	chrome.storage.sync.set({'locked': locked}, function() {
	});

	chrome.tabs.executeScript({
	file: 'inject.js'
	}); 
}


function lock() {
	//alert("lock");

	var locked = true;

	chrome.storage.sync.set({'locked': locked}, function() {
	});

	chrome.tabs.executeScript({
		file: 'inject.js'
	}); 
}


try{document.getElementById('clickme').addEventListener('click', hello);}catch(err){}
try{document.getElementById('lock').addEventListener('click', lock);}catch(err){}