var aeon;

function changeTab(aeon) {
    var foundSelected = false;
    for (var i = 0; i <= aeon.length; i++){
        if (aeon[i].active){
            foundSelected = true;
            if(i+1 == aeon.length) {
				console.log('going back to zero');
				chrome.tabs.update(aeon[0].id, {active: true});
				chrome.alarms.create("cycleDelay", {delayInMinutes: aeon[0].duration/60});
				aeon[i].active = false;
				aeon[0].active = true;
				if(aeon[0].refresh) {
					window.location.reload();
				}
				return;
			}
        } else if (foundSelected){
			console.log('changed tab called for ' + i);
			chrome.tabs.update(aeon[i].id, {active: true});
			chrome.alarms.create("cycleDelay", {delayInMinutes: aeon[i].duration/60});
			aeon[i-1].active = false;
			aeon[i].active = true;
			if(aeon[i].refresh) {
				window.location.reload();
			}
            return;
        }
    }
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  changeTab(aeon);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.command === 0) {
		console.log('start - scope recieved');
		aeon = request.aeon;
		chrome.alarms.create("cycleDelay", {delayInMinutes: request.aeon[0].duration/60} );
	}
	if(request.command === 1) {
		console.log('stopped');
		chrome.alarms.clear("cycleDelay");
	}
	//if (request.greeting == "hello") {
		//sendResponse({
		//	msg: "goodbye!"
		//});
	//}
});
