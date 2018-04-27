/*
 * Copyright (c) 2015 - 2017 Samsung Electronics Co., Ltd All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ocfDevice;
var className = "AirConditioner";
var capabilities = [capabilitySwitch, capabilityAirConditionerMode, capabilityThermostatCoolingSetpoint, capabilityTemperatureMeasurement_main, capabilityTemperatureMeasurement_outdoor, capabilityAirQualitySensor, capabilityRelativeHumidityMeasurement, capabilityFanspeed, capabilityFilterStatus, capabilityEnergyMeter];

window.onload = function () {
	console.log("version : 0.0.1");
	init();

	document.body.addEventListener('click', function () {
		closeListBox();
	})
};

function init() {
	console.log("-----------init-----------");
	scplugin.manager.getOCFDevices(getOCFDeviceCB);
}

function getOCFDeviceCB(devices) {
	console.log("getOCFDeviceCB : " + devices.length);

	for (var i in devices) {
		console.log("deviceHandle: " + devices[i].deviceHandle);
		console.log("deviceName: " + devices[i].deviceName);
		console.log("deviceType: " + devices[i].deviceType);
		console.log("metadata: " + devices[i].metadata);
	}

	setMainDevice(devices[0]);
	ocfDevice.subscribe(onRepresentCallback);

	for (var i = 0; i < capabilities.length; i++) {
		capabilities[i].update();
	}
}

function onRepresentCallback(result, deviceHandle, uri, rcsJsonString) {
    for (var i = 0; i < capabilities.length; i++) {
        if ( capabilities[i].href == uri) {
            capabilities[i].onRepresentCallback(result, deviceHandle, uri, rcsJsonString);
        }
    }
}

function setMainDevice(device) {
	scplugin.log.debug(className, arguments.callee.name, "set ocf device : " + device.deviceName);
	ocfDevice = device;
}

function backAction() {
  scplugin.manager.close();
}

function onPowerBtnClicked() {
	capabilitySwitch.powerToggle();
}

function onSelectMode(selectedItem) {
    capabilityAirConditionerMode.set(selectedItem.value);
}

function onPlusBtnClicked() {
	capabilityThermostatCoolingSetpoint.increase();
}

function onMinusBtnClicked() {
	capabilityThermostatCoolingSetpoint.decrease();
}

function onSelectfanspeed(event) {
	document.getElementById("listbox").classList.toggle("show");
	event.stopPropagation();
}

function closeListBox(event) {
	// var x1 = event.offsetLeft;
	// var y1 = event.offsetTop;
	// var x2 = event.offsetWidth;
	// var y2 = event.offsetHeight;
	// var x = event.onmouseout.arguments["0"].clientX;
	// var y = event.onmouseout.arguments["0"].clientY;
	// if(x < x1 || x > x1+x2)
	// 	capabilityFanspeed.closeListbox();
	// else if(y < y1 || y > y1+y2)
	if (document.getElementById("listbox").classList.contains('show')) {
		capabilityFanspeed.closeListbox();
	}
	if (document.getElementById("more_option_listbox").classList.contains('show')) {
		var option = document.getElementsByClassName("more-option-listbox-content");
		if(option[0].classList.contains('show')){
			option[0].classList.remove('show');
		}
	}	
}

function onSelectHigh() {
	capabilityFanspeed.set("high");
	event.stopPropagation();
}

function onSelectMedium() {
	capabilityFanspeed.set("medium");
	event.stopPropagation();
}

function onSelectLow() {
	capabilityFanspeed.set("low");
	event.stopPropagation();
}

function onSelectSleep() {
	capabilityFanspeed.set("sleep");
	event.stopPropagation();
}

function onSelectOption(event) {
	document.getElementById("more_option_listbox").classList.toggle("show", true);
	event.stopPropagation();
}
