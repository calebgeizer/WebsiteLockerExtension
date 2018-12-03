// Saves options to chrome.storage
function save_options() {
  var websites = document.getElementById('websites').value;
  var minutes = document.getElementById('minutes').value;
  var whitelist = document.getElementById('whitelist').checked;
  var blacklist = document.getElementById('blacklist').checked;

  chrome.storage.sync.set({
    'websites': websites,
    'minutes': minutes,
    'list' : whitelist
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  console.log("options saved");
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    websites: 'www.example.com;www.example2.com',
    minutes: '0',
    list: 'false'
  }, function(items) {
    document.getElementById('websites').value = items.websites;
    document.getElementById('minutes').value = items.minutes;
    document.getElementById('whitelist').checked = items.list;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);