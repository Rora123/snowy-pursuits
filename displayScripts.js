//toggle button triangle ip<->down
$(document).ready(function() {arrowStuff();setWeather();})
arrowStuff = function(){
	$('#hideB').click(function(){
	    $(this).find('span').toggleClass('glyphicon-triangle-top').toggleClass('glyphicon-triangle-bottom');
	});
	$('#hideB2').click(function(){
	    $(this).find('span').toggleClass('glyphicon-triangle-top').toggleClass('glyphicon-triangle-bottom');
	});
	$('#hideB3').click(function(){
	    $(this).find('span').toggleClass('glyphicon-triangle-top').toggleClass('glyphicon-triangle-bottom');
	});// add more if you have more toggles on the same page

}

setWeather = function(){
	for (var item in resorts){
		var weatherAPI = `https://thingproxy.freeboard.io/fetch/https://api.darksky.net/forecast/60daa73a34d7afa9c08bd532dda02f70/`+
		resorts[item].resortData.weather.lat+`,`+resorts[item].resortData.weather.long
		console.log(weatherAPI);
		var snowAPI =
		$.ajax({
			async: false,
			dataType: "json",
			url: weatherAPI
		}).done(function(data) {
			for (var item2 in resorts){
				if(item2 == item){ // nice variable names...
					var precipType = data.currently.precipType;
					var a = document.getElementsByClassName(resorts[item].name + "Temp");
					var b = document.getElementsByClassName(resorts[item].name + "Snow");
					var c = document.getElementsByClassName(resorts[item].name + "Wind");
					var z;
					for (z = 0; z < a.length; z++) {
						if(a[z].id == "Temp"){
							a[z].innerHTML = "<b>Temperature:</b><div class=\"spaceHorizontal\"></div>"+Math.round(((data.currently.temperature-32)*5)/9).toString() + ' &deg;C';
						}else{
							a[z].innerHTML = Math.round(((data.currently.temperature-32)*5)/9).toString() + ' &deg;C';	
						}
						switch(precipType){
						case "rain":
							if(b[z].id == "Snow"){
								b[z].innerHTML = "<b>Precipitation:</b><div class=\"spaceHorizontal\"></div>"+Math.round(data.currently.precipIntensity).toString() + " mm/h";
							}else{
								b[z].innerHTML = Math.round(data.currently.precipIntensity).toString() + " mm/h";
							}
							break;
						case "snow":
							if(b[z].id == "Snow"){
								b[z].innerHTML = "<b>Snowfall:</b><div class=\"spaceHorizontal\"></div>"+Math.round(data.currently.precipIntensity).toString() + " mm/h";
							}else{
								b[z].innerHTML = Math.round(data.currently.precipIntensity).toString() + " mm/h";
							}
							break;
						case "sleet":
							if(b[z].id == "Snow"){
								b[z].innerHTML = "<b>Sleet:</b><div class=\"spaceHorizontal\"></div>"+Math.round(data.currently.precipIntensity).toString() + " mm/h";
							}else{
								b[z].innerHTML = Math.round(data.currently.precipIntensity).toString() + " mm/h";
							}
							break;
						default:
							if(b[z].id == "Snow"){
								b[z].innerHTML = "<b>Snowfall:</b><div class=\"spaceHorizontal\"></div><div class=\"spaceHorizontal\"></div><div class=\"spaceHorizontal\"></div>"+Math.round(data.currently.precipIntensity).toString() + " mm/h";
							}else{
								b[z].innerHTML = Math.round(data.currently.precipIntensity).toString() + " mm/h";
							}
							break;
						}
						if(c[z].id == "Wind"){
							c[z].innerHTML = "<b>Wind Speed:</b><div class=\"spaceHorizontal\"></div>"+data.currently.windSpeed + ' km/h';
						}else{
							c[z].innerHTML = data.currently.windSpeed + ' km/h';
						}
					}
					var d = document.getElementsByClassName(resorts[item].name + "HourSum");
					for (z = 0; z < d.length; z++) {
						d[z].innerHTML = "<canvas id="+data.currently.icon+" width='64' height='64' style='vertical-align:middle;padding-right:1.5em;'>"
						d[z].innerHTML += "<b style='position: relative; top: 100%;'>"+resorts[item].capName+" Weather Today:</b> " +data.currently.summary;
					}
					var e = document.getElementsByClassName(resorts[item].name + "TempHigh");
					var f = document.getElementsByClassName(resorts[item].name + "TempLow");
					var h = document.getElementsByClassName(resorts[item].name + "SnowChance");
					var i = document.getElementsByClassName(resorts[item].name + "SnowType");
					var j = document.getElementsByClassName(resorts[item].name + "WindGust");
					var k = document.getElementsByClassName(resorts[item].name + "WindCover");
					for (z = 0; z < e.length; z++) {
						e[z].innerHTML = Math.round((data.daily.data[0].temperatureHigh-30)*100)/100+ "&deg;C";//changed this cause looks better, it does say on the sight that it should be celcius tho
						f[z].innerHTML = Math.round((data.daily.data[0].temperatureLow-30)*100)/100 + "&deg;C";// changed to min cause low had like 10 dp's
						h[z].innerHTML = Math.round(data.currently.precipProbability*100) + "%";
						i[z].innerHTML = Math.round(data.currently.humidity*100) + "%";
						j[z].innerHTML = Math.round(data.currently.windGust*100)/100 + "km/h";
						k[z].innerHTML = Math.round(data.currently.cloudCover*100) + "%";
					}
				}
			}
		});
	}
	var icons = new Skycons(),
		 list  = [
			"clear-day", "clear-night", "partly-cloudy-day",
			"partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
			"fog"
		 ],
		 i;

	for(i = list.length; i--; )
	  icons.set(list[i], list[i]);

	icons.play();
}

displayCenter = function(string){
	//Change Center Panel to string
	document.getElementById("centerPanel").innerHTML = string;
}

displayTop = function(string){
	//Change Top Title to string
	document.getElementById("topTitle").innerHTML = string;
}

displayLeft = function(string){
	//Change Left Panel to string
	document.getElementById("followingList").innerHTML = string;
}

displayRight = function(string){
	//Change Right Panel to string
	document.getElementById("twitterPanel").innerHTML = string;
}

nameToObject = function(name){
	for (var item in resorts){
		if (resorts[item].name == name){
			return resorts[item];
		}
	}
	return null;
}
moveToAdvice = function(){
	displayCenter(`	<h3>General Travel Advice
					<button class="hideB" data-toggle="collapse" data-target="#SorS"><span class="glyphicon glyphicon-triangle-bottom"></span></button></h3>
					<div id="SorS" class="collapse in">
						<img src="resources/kangaroo_snow.png" alt="Kangaroo" class="img-responsive img-thumbnail center-block" style="max-width:700px">
						<h3><centre>Visa</center></h3>
							<p>All visitors to Australia need a visa, except New Zealanders. Apply online for an ETA or eVisitor visa, each allowing a three-month stay: www.border.gov.au.</p>

							<h3><centre>Getting Around</center></h3>
								<p>Car: Travel at your own pace, drive on the left!!!!</p>
								<p>Bus: Generally reliable and cheap why to get around town especially big cities.</P>
								<p>Train: Cheap and reliable. Great for travelling both interstate or regional.</P>
					</div>

					<h3>Culture and Language
					<button class="hideB" data-toggle="collapse" data-target="#cul"><span class="glyphicon glyphicon-triangle-bottom"></span></button></h3>
					<div id="cul" class="collapse in">
						<img src="resources/culture.png" alt="culture" class="img-responsive img-thumbnail center-block" style="max-width:700px">
						<h3><centre>Language</center></h3>
							<p>The main Langaige spoken in Australia is English. Australia is very culturally diverse as over 200 langauges are spoken
							by various communities.</p>

						<h3><centre>Culture</center></h3>
							<p>Australia is a rich diverse mutlicultural society comprised of peoples from all over the world. (not sure what else to write) </p>

							<h3><centre>Learn the Lingo</center></h3>
								<p>This guide will help you learn some of the popular Aussie slang words</p>
								<table class="table">
									<thead>
										<tr>
											<th>Aussie</th>
											<th>English</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>G'day</td>
											<td>Hello</td>
										</tr>
										<tr>
											<td>Arvo</td>
											<td>Afternoon</td>
										</tr>
										<tr>
											<td>Servo</td>
											<td>Service station</td>
										</tr>
									</tbody>
								</table>`);
	displayTop(`<center><h1> <ol class="breadcrumb">
				  <li class="breadcrumb-item"><a class="jsLink" onclick="moveToHome()">Welcome</a></li>
				  <li class="breadcrumb-item active">Travel Advice </li>
					</ol>
					</h1></center>`);

	updatePage(1);
}

moveToHome = function(){
	var text = localStorage.getItem("session");
	var obj = JSON.parse(text);

	if(obj.country=="Australia"){
				displayCenter(`	<div class="container-fluid">
									<div class="text-center row">
										<img src="resources/ski-resort.jpg" class="row img-fluid img-thumbnail" alt="Responsive image" style="max-width:500px;">
									</div>
									<div class="text-center row">
										<br/>
										<div class="btn btn-primary btn-lg" id="findResort" onclick="moveToResortList()" role="button">
										Find a Resort
										</div>
									</div>
									<div class="row">
										<h1>Welcome to Australia</h1>
										<p class="lead">
										Home of the best blokes and some very speedy boot skiiers, we may not have the powder but we sure have the attitude
										to make up for up. Come down to enjoy the incredible atmosphere and make sure to bring your family or some mates.
										</p>
									</div>
									<div class="row">
										<h1>Our Website</h1>
										<p class="lead">
										We keep our website up-to-date with all the latest weather, snow, and traffic data to help you plan the perfect ski holiday.
										We offer information beyond the scope of just a resort. With our website you can find the best place to hire your equipement, for find the perfect spot for an after-ski dinner.
										Choose between australia and japan to view country specific travelling tips and search for resorts.
										</p>
									</div>
								</div>`);
	}else{displayCenter(`<div class="container-fluid">
					<div class="text-center row">
						<img src="resources/japLodge.jpg" class="row img-fluid img-thumbnail" alt="Responsive image" style="max-width:500px;">
					</div>
					<div class="text-center row">
						<br/>
						<div class="btn btn-primary btn-lg" id="findResort" onclick="moveToResortList()" role="button">
						Find a Resort
						</div>
					</div>
					<div class="row">
						<h1>Welcome to Japan</h1>
						<p class="lead">
						The home of meter depth snow and the most comfortable meals you will ever eat. One of the kindest nations with resorts all over the place,
						definitely my best reccomendation. Also make sure to check out the open air onsens while you are over here.
						</p>
					</div>
					<div class="row">
						<h1>Our Website</h1>
						<p class="lead">
						We keep our website up-to-date with all the latest weather, snow, and traffic data to help you plan the perfect ski holiday.
						We offer information beyond the scope of just a resort. With our website you can find the best place to hire your equipement, for find the perfect spot for an after-ski dinner.
						Choose between australia and japan to view country specific travelling tips and search for resorts.
						</p>
					</div>
				</div>`);


	}
	displayTop(`<center><h1> <ol class="breadcrumb">
					  <li class="breadcrumb-item"><a class="jsLink" onclick="moveToHome()">Welcome</a></li>
						</ol>
						</h1></center>`);

	updatePage(0);
}

moveToResortList = function(){
	var i = 0;
	x =	`	<h1><centre>Ski Resorts in Australia</center></h1>
					<div class="panel panel-default">
						<div class="panel-body">
							<!-- First Result -->`
	for (var item in resorts){
		x +=`					<div class="row">
								<div class="thumbnail">
		                        	<img src="resources/`+resorts[item].image+`.png" class="img" alt="Responsive image" style="max-width:600px;">
		                        	<div class="caption">
		                            	<h3>`+resorts[item].capName+`</h3>
		                            	<p>`+resorts[item].description+`</p>
		                            	<p><a  onclick="moveToResort('`+resorts[item].name+`')" class="btn btn-primary" id="view`+i+`" role="button">View Resort Page</a></p>
		                        	</div>
		                    	</div>
		                    </div>`
		i++;
	}

	x +=`
		                        	</div>
		                    	</div>
		                    </div>
						</div>
					</div>`;

	displayCenter(x);
	displayTop(`<center><h1> <ol class="breadcrumb">
				  <li class="breadcrumb-item"><a class="jsLink" onclick="moveToHome()">Welcome</a></li>
				  <li class="breadcrumb-item active">Resort List </li>
				</ol>
				</h1></center>`);

	updatePage(2);
}

moveToResort = function(name){
	setWeather();
	item = nameToObject(name);

	x = `	<div class="row">
				<div class="col-sm-4 col-md-4 text-center align-middle">
					<img src="resources/`+item.image+`.png" alt="`+item.capName+` Logo" style="display:inline;width:100%;float:center;">
					<div class="extraSubPageBtns">
						<div class="row">
							<div class="col-md-6">
								<a href="`+item.resortData.web+`" target="_blank">
								<div class="webLink" id="websiteLink" role="button">
										Resort Website
								</div>
								</a>
							</div>
							<div class="col-md-6">
								<div class="btn btn-primary" id="routeMap" role="button" onclick="moveToSkiMap('`+item.name+`')">
										Mountain Route Map
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="panel panel-default weatherBox" id="mainWeather">
					<div class="panel-heading" >
						<h4 style="" class="`+item.name+`HourSum">
						</h4>
					</div>
					<table id="mainWeatherTable" style="text-align: left">
						<tr>
							<td>
								<img src="resources/temp.png"
								alt="Temperature" class="leftsidebarimages">
							</td>
							<td id="Temp" class="`+item.name+`Temp"></td>
							<td><b>High: </b></td>
							<td class="`+item.name+`TempHigh"></td>
							<td><b>Low: </b></td>
							<td class="`+item.name+`TempLow"></td>
						</tr>
						<tr>
						<td>
							<img src=\"resources/snow.png\"alt=\"Snow Fall\" class=\"leftsidebarimages\">
							</td>
							<td id="Snow" class="`+item.name+`Snow"></td>
							<td><b>Chance: </b></td>
							<td class="`+item.name+`SnowChance"></td>
							<td><b>Humidity: </b></td>
							<td class="`+item.name+`SnowType"></td>
						</tr>
						<tr>
							<td>
								<img src="resources/wind.png"
								alt="Wind Speed" class="leftsidebarimages">
							</td>
							<td id="Wind" class="`+item.name+`Wind"></td>
							<td><b>Wind Gust: </b></td>
							<td class="`+item.name+`WindGust"></td>
							<td><b>Cloud Cover: </b></td>
							<td class="`+item.name+`WindCover"></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6 resortTravelInfo">
					<h3>Travel Information
					<button class="hideB" data-toggle="collapse" data-target="#LtH"><span class="glyphicon glyphicon-triangle-bottom"></span></button></h3>

					<div id="LtH" class="collapse in">
						`+item.resortData.travelInfo.text+`
						<div class="row">
						<div class="extraSubPageBtns">`;

						for (var i = 0; i < item.resortData.travelInfo.array.length && i < 1; i++) {
							curr = item.resortData.travelInfo.array[i]
							x += `	<a href="`+curr.web+`" target="_blank"><div class="col-md-4"><div class="btn btn-primary" id="mainBtns" role="button">
									   Travel to `+curr.name+`
									</div></div></a>`;
						}


	x += `
						</div>
						</div>
					</div>
				</div>
				<div class="col-md-6 resortButtons"><span class="align-middle">
					<div class="subPageBtns">
						<div class="btn btn-primary btn-lg lgMainBtns" id="equip" onclick="moveToEquipment('`+item.name+`')" role="button">
						<img src="resources/boot.png" alt="Boot Icon" style="display:inline;width:80%;float:center;filter:invert(100%);">
						</div>
						<div class="btn btn-primary btn-lg lgMainBtns" id="food" onclick="moveToFood('`+item.name+`')" role="button">
						<span class="glyphicon glyphicon-cutlery" aria-hidden="true"></span>
						</div>
						<div></div>
						<div class="btn btn-primary btn-lg lgMainBtns" id="sleep" onclick="moveToLodging('`+item.name+`')" role="button">
						<span class="glyphicon glyphicon-bed" aria-hidden="true"></span>
						</div>
						<div class="btn btn-primary btn-lg lgMainBtns" id="map" onclick="moveToMap('`+item.name+`')" role="button">
						<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
						</div><p>
					</div>
				</span></div>
				</div>`;

	x += `<div class="row">
				<div id="google-reviews"></div>
			</div>`;

	jQuery(document).ready(function( $ ) {
		$("#google-reviews").googlePlaces({
			  placeId: item.resortData.reviews
			, render: ['reviews']
			, min_rating: 0
			, max_rows:4
		});
	});

	displayCenter(x);
	displayTop(`	<center><h1> <ol class="breadcrumb">
					  <li class="breadcrumb-item active"><a href="#">`+item.capName+`    </a>`+addStar(name,3)+`</li>
					</ol>
					</h1></center>`);

	updatePage(3);
	updateID(name);
	setWeather();
}

moveToEquipment = function(name){
	item = nameToObject(name);

	x = `<h3>Skiing or Snowboarding?
			<button id="hideB" class="hideB" data-toggle="collapse" data-target="#SorS"><span class="glyphicon glyphicon-triangle-bottom"></span></button></h3>
			<div id="SorS" class="collapse in">
			<p>No matter which you choose always make sure the pack plenty of warm clothes, optimally:
			Outer layer wind breaker (waterproof), maybe a thick inner fleece and some thin layers to
			generate more heat (normal shirts/under armor/skins). Also make sure to bring thick socks, potentially neck warmers or other warm headware.
			</p>
			<div class="column-midL" id="skiing"><center><h4>Skiing</h4></center>
				<table class="table">
					<thead>
						<tr>
							<th>Why to choose Skiing</th>
						</tr>
					</thead>
					<tbody>
						<tr><td>Easier for beginners</td></tr>
						<tr><td>Much easier for icier conditions (which commonly occurs in Australia)</td></tr>
						<tr><td>Easier traversing</td></tr>
						<tr><td>Boot skiing is a thing (more ice = better)</td></tr>
					</tbody>
				</table>
				<table class="table">
					<thead>
						<tr>
							<th>Equipment:</th>
						</tr>
					</thead>
					<tbody>
						<tr><td>2 Skis</td></tr>
						<tr><td>Skiing boots</td></tr>
						<tr><td>2 Poles (for more advanced skiiers)</td></tr>
					</tbody>
				</table>
				<span style="display:inline-block; width: 10%;"></span>
				<img src="resources/Ski.png" style="width:80%;height:80%;">
			</div>

			<div class="column-midR" id="boarding"><center><h4>Snowboarding</h4></center>
				<table class="table">
					<thead>
						<tr>
							<th>Why to choose Snowboarding</th>
						</tr>
					</thead>
					<tbody>
						<tr><td>Easier freestyle tricks</td></tr>
						<tr><td>If you are familiar with similar sports (skateboarding, surfing)</td></tr>
						<tr><td>less equipment required</td></tr>
						<tr><td>Easier walking in Snow boots</td></tr>
					</tbody>
				</table>
				<table class="table">
				<thead>
						<tr>
							<th>Equipment:</th>
						</tr>
					</thead>
					<tbody>
						<tr><td>Snowboard</td></tr>
						<tr><td>Snowboard boots</td></tr>
						<tr><td>Wrist guards (recommended for beginners)</td></tr>
					</tbody>
				</table>
				<span style="display:inline-block; width: 10%;"></span>
				<img src="resources/snowboard.png" style="width:80%;height:80%;">
				<div><span style="display:inline-block; width: 10%;"></span></div>
			</div>
			</div>

			<h3>Locations to hire/buy
			<button id="hideB2" class="hideB" data-toggle="collapse" data-target="#LtH"><span class="glyphicon glyphicon-triangle-bottom"></span></button></h3>

			<div id="LtH" class="collapse in">
			<p>First of all it is only recommended to buy gear if you are
			not going to grow out of it before you would next wear it and you know
			you will be using it again.</p>
			<div class="panel panel-default">
					<div class="panel-body">`


	//add equipment stores
	for (var i = 0; i < item.equipment.length; i++) {
		x+= stdStorePrint(item.equipment[i]);
	}


	x +=`			</div>
				</div>
			</div>
			<h3>Where to get lessons
			<button id="hideB3" class="hideB" data-toggle="collapse" data-target="#Les"><span class="glyphicon glyphicon-triangle-bottom"></span></button></h3>

			<div id="Les" class="collapse in">
			<p>If you are a beginner you should definitely be having at least a few lessons on the snow.
			You will enjoy yourself much more once you are more comfortable on the slope.</p>
			<div class="panel panel-default">
					<div class="panel-body">`


	//add lessons
	for (var i = 0; i < item.lessons.length; i++) {
		x+= stdStorePrint(item.lessons[i]);
	}


	x +=`			</div>
				</div>
			</div>`



	displayCenter(x);
	displayTop(`<center><h1> <ol class="breadcrumb">
				  <li class="breadcrumb-item"><a class="jsLink" id="breadResort" onclick="moveToResort('`+item.name+`')">`+item.capName+`</a></li>
				  <li class="breadcrumb-item active">Equipment  `+addStar(name,4)+`</li>
				</ol>
				</h1></center>`);

	updatePage(4);
	updateID(name);
}

moveToFood = function(name){
	item = nameToObject(name);
	x='';
	if(item.food_on.length>0){x += `	<h3>On the Mountain
										<button id="hideB" class="hideB" data-toggle="collapse" data-target="#SorS"><span class="glyphicon glyphicon-triangle-bottom"></span></button></h3>
										<div id="SorS" class="collapse in">
										<p>Eating on the mountain is generally more expensive but necessary if you are going to survive
										a full day of skiing/snowboarding
										</p>
										<div class="panel panel-default">
												<div class="panel-body">`

						//add onsite resturants
						for (var i = 0; i < item.food_on.length; i++) {
							x+= stdStorePrint(item.food_on[i]);
						}


						x +=`					</div>
											</div>
										</div>`
	}

	if(item.food_off.length>0){x +=`
									<h3>Off the mountain
									<button id="hideB2" class="hideB" data-toggle="collapse" data-target="#LtH"><span class="glyphicon glyphicon-triangle-bottom"></span></button></h3>

									<div id="LtH" class="collapse in">
									<p>These restaurants may be a bit further away from the mountain, but their reviews say they're worth it.</p>
										<div class="panel panel-default">
											<div class="panel-body">`

									//add onsite resturants
									for (var i = 0; i < item.food_off.length; i++) {
										x+= stdStorePrint(item.food_off[i]);
									}

									x +=`					</div>
														</div>
													</div>`;
	}


	displayCenter(x);
	displayTop(`<center><h1> <ol class="breadcrumb">
				  	<li class="breadcrumb-item"><a class="jsLink" id="breadResort" onclick="moveToResort('`+item.name+`')">`+item.capName+`</a></li>
					<li class="breadcrumb-item active">Food  `+addStar(name,5)+`</li>
				</ol>
				</h1></center>`);

	updatePage(5);
	updateID(name);
}

moveToLodging = function(name){
	item = nameToObject(name);
	x='';
	x += `	<h1><centre>Resort - Find Lodging</center></h1>
					<p>Ski resorts offer a myriad of accomodation choices for guests to consider.
						From multiple family hostels, to serviced apartments, to luxury montain-side hotels;
						it's important to consider what's best for you.

						Additionally many options are available both near the slopes, and near town centres, providing
						accomadtion all over the resort.
					</p>`;

					//add onsite resturants
					for (var i = 0; i < item.lodging.length; i++) {
						x+= stdStorePrint(item.lodging[i]);
					}


					x +=`					</div>
										</div>
									</div>`

	displayCenter(x);
	displayTop(`<center><h1> <ol class="breadcrumb">
						<li class="breadcrumb-item"><a class="jsLink" id="breadResort" onclick="moveToResort('`+item.name+`')">`+item.capName+`</a></li>
					<li class="breadcrumb-item active">Lodging  `+addStar(name,6)+`</li>
				</ol>
				</h1></center>`);

	updatePage(6);
	updateID(name);
}

moveToMap = function(name){
	item = nameToObject(name);
	console.log(name);
	displayCenter(`	<h1><centre>Resort - Map</center></h1>
					 	<!-- Maps Panel -->


			            <div class="panel panel-default">
			                 <div class="panel-body">


							 <div class="embed-responsive embed-responsive-16by9">
								 <iframe
								   width="600"
								   height="450"
								   frameborder="0" style="border:0"
								   src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGysBVU10UHFqiDlL2-6srxrpsGdbE0WM&q=`+name+`" allowfullscreen>
								 </iframe>
							 </div>

			                 </div>`);
	displayTop(`<center><h1> <ol class="breadcrumb">
				  <li class="breadcrumb-item"><a class="jsLink" id="breadResort" onclick="moveToResort('`+item.name+`')">`+item.capName+`</a></li>
				  <li class="breadcrumb-item active">Map  `+addStar(name,7)+`</li>
				</ol>
				</h1></center>`);

	updatePage(7);
	updateID(name);
}

moveToStoreMap = function(name){
	displayCenter(`	<h1><centre>Map</center></h1>
					 	<!-- Maps Panel -->


			            <div class="panel panel-default">
			                 <div class="panel-body">


							 <div class="embed-responsive embed-responsive-16by9">
								 <iframe
								   width="600"
								   height="450"
								   frameborder="0" style="border:0"
								   src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGysBVU10UHFqiDlL2-6srxrpsGdbE0WM
									 &q=`+name+`" allowfullscreen>
								 </iframe>
							 </div>

			                 </div>`);
}

moveToSkiMap = function(name){
	item = nameToObject(name);
	displayCenter(`	<h1><centre>Resort - Ski Map</center></h1>
					 	<!-- Maps Panel -->
			            <div class="panel panel-default">
			                 <div class="panel-body">

			                     <div class="embed-responsive embed-responsive-16by9">
			                     	 <img src="resources/`+item.resortData.map+`.png" alt="`+item.capName+` Ski Map" id="review" style="display:inline;width:900px;float:center;">
			                     </div>

			                 </div>`);
	displayTop(`<center><h1> <ol class="breadcrumb">
				  <li class="breadcrumb-item"><a class="jsLink" id="breadResort" onclick="moveToResort('`+item.name+`')">`+item.capName+`</a></li>
				  <li class="breadcrumb-item active">Ski Map  `+addStar(name,8)+`</li>
				</ol>
				</h1></center>`);

	updatePage(8);
	updateID(name);
}

moveToSearch = function(){

	text = document.getElementById('search text').value;

	indexArray = searchResorts(text);

	x =	`	<h1><centre>Search Results`;
	if(text!="")x += ` for "`+text+`"`;
	x +=`</center></h1>
					<div class="panel panel-default">
						<div class="panel-body">
							<!-- First Result -->`
	for (var temp in indexArray){
		item = indexArray[temp];
		x +=`					<div class="row">
								<div class="thumbnail">
		                        	<img src="resources/`+resorts[item].image+`.png" class="img" alt="Responsive image" style="max-width:600px;">
		                        	<div class="caption">
		                            	<h3>`+resorts[item].capName+`</h3>
		                            	<p>`+resorts[item].description+`</p>
		                            	<p><a  onclick="moveToResort('`+resorts[item].name+`')" class="btn btn-primary" role="button">View Resort Page</a></p>
		                        	</div>
		                    	</div>
		                    </div>`
	}

	if(indexArray.length==0){x+="No Results"}

	x +=`
		                        	</div>
		                    	</div>
		                    </div>
						</div>
					</div>`;

	displayCenter(x);
	displayTop(`<center><h1> <ol class="breadcrumb">
				  <li class="breadcrumb-item"><a class="jsLink" onclick="moveToHome()">Welcome</a></li>
				  <li class="breadcrumb-item active">Search Results</li>
				</ol>
				</h1></center>`);
}

searchResorts = function(text){
	text = text.toLowerCase();
	retArray = [];
	for (var item in resorts){
		if(resorts[item].name.toLowerCase().includes(text) ||
			resorts[item].description.toLowerCase().includes(text) ||
			resorts[item].resortData.travelInfo.text.toLowerCase().includes(text)||
			resorts[item].tags.toLowerCase().includes(text)){
			retArray.push(item);
		}
	}
	return retArray;
}

moveToRecomend = function(){
	var text = localStorage.getItem("formAnswers");
	var obj = JSON.parse(text);


	if(obj==null){
					x = `	<div class="container-fluid">
								<div class="text-center row">
									You haven't filled out our form yet.
									<br/>
									<a href="Form.html"><div class="btn btn-primary btn-lg" id="findResort" role="button">
									Find a Resort
									</div></a>
								</div>
							</div>`;
	}else{
					x = `<div class="container-fluid">
							<div class="row">
								<p class="lead">
								Based on your answers we recomend looking at the following:
								</p>
								<h1>Recomended Resorts</h1>
								<p class="lead">
								`+recomendedResorts(obj)+`
								</p>
							</div>
						</div>`;
	}


	displayCenter(x);





	displayTop(`<center><h1> <ol class="breadcrumb">
				  <li class="breadcrumb-item"><a class="jsLink" onclick="moveToHome()">Welcome</a></li>
				  <li class="breadcrumb-item active">Recomendation</li>
				</ol>
				</h1></center>`);
}

recomendedResorts = function(obj){
	if(obj["timesSkiForm"]<2){
		myResorts = searchResorts("thredbo");
	}else{
		myResorts = searchResorts("");
	}
	returnString = '';
	for(i in myResorts){
		item = myResorts[i];
		returnString+=recomendedResortHTML(item,obj);
	}

	return returnString;
}

recomendedResortHTML = function(index, obj){
	x=""
		if(obj["timesSkiForm"]!="2"){x+=`<p>Since you are newer to the snow it is recommended that you go to the more popular resorts where there is much more support for beginners.</p>`;}
			x+=`<div class="row">
						<div class="thumbnail">
                        	<img src="resources/`+resorts[index].image+`.png" class="img" alt="Responsive image" style="max-width:600px;">
                        	<div class="caption">
                        		<p><a  onclick="moveToResort('`+resorts[index].name+`')" class="btn btn-primary btn-lg" id="view" role="button">`+resorts[index].capName+`</a></p>
                            	<p>`+resorts[index].description+`</p>
                            	<p>`
						    if(obj["timesSkiForm"]!="2"){x+=`<a  onclick="moveToEquipment('`+resorts[index].name+`')" class="btn btn-info" id="view" role="button">Lessons</a>&nbsp;`}
						    if(obj["ownGearForm"]=="No"){x+=`<a  onclick="moveToEquipment('`+resorts[index].name+`')" class="btn btn-info" id="view" role="button">Equipment</a>&nbsp;`}
						    if(obj["gear"]=="board"){x+=`<a  onclick="moveToEquipment('`+resorts[index].name+`')" class="btn btn-info" id="view" role="button">Snowboard</a>&nbsp;`}
						    if(obj["gear"]=="ski"){x+=`<a  onclick="moveToEquipment('`+resorts[index].name+`')" class="btn btn-info" id="view" role="button">Skis</a>&nbsp;`}
						    if(obj["favEatForm"]=="No"){x+=`<a  onclick="moveToFood('`+resorts[index].name+`')" class="btn btn-info" id="view" role="button">Food</a>&nbsp;`}
						    if(obj["stayForm"]=="No"){x+=`<a  onclick="moveToLodging('`+resorts[index].name+`')" class="btn btn-info" id="view" role="button">Lodging</a>`}

    x+=							`</p>
                        	</div>
                    	</div>
                    </div>`
    return(x);
}

stdStorePrint = function(store){
	x= `			<div class="row">
					<div class="thumbnail">
                    	<img src="resources/`+store.image+`.png" class="img" alt="`+store.image+` image" style="max-width:600px;max-height:300px">
                    	<div class="caption">
                        	<h3>`+store.name+`</h3>
                        	<p>`+store.description+`</p>
                        	<p><a onclick="moveToStoreMap('`+store.map+`')" class="btn btn-primary" role="button">View location on map</a>
                        	<a href="`+store.website+`">Store Website</a></p>
                    	</div>
                	</div>
                </div>`;
    return x;
}

addStar = function(ID,page){
	//console.log("addStar: started");
	if(checkFollow(ID,page)){
		x=`<span style="vertical-align: -11%;cursor:pointer;" class="glyphicon glyphicon-star" id="star" onclick="removeFollow('`+ID+`',`+page.toString()+`);restoreToSession();"></span>`;
	}else{
		x=`<span style="vertical-align: -11%;cursor:pointer;" class="glyphicon glyphicon-star-empty" id="star" onclick="addFollow('`+ID+`',`+page.toString()+`);restoreToSession();"></span>`;
	}
	return x;
}

addResort = function(name, image, description, resortData, equipment, lessons, food_on, food_off, lodging, map, tags){
	resorts.push(new Resort(name, image, description, resortData, equipment, lessons, food_on, food_off, lodging, map, tags));
	return resorts.length-1;
}

Resort = function(name, image, description, resortData, equipment, lessons, food_on, food_off, lodging, map, tags){
	this.name		=	name;
	//this.capName	=	name.charAt(0).toUpperCase() + name.slice(1);
	this.capName 	= name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	this.image		=	image;
	this.description		=	description;
	this.resortData	=	new ResortData(resortData);
	this.equipment	=	equipment;
	this.lessons 	= 	lessons;
	this.food_on	=	food_on;
	this.food_off	=	food_off;
	this.lodging	=	lodging;
	this.map		=	map;
	this.tags		= 	tags;
}

addStoreInfo = function(array, name, image, description, map, website){
	array.push(new Store(name, image, description, map, website));
	//console.log(resorts);
}

Store = function(name, image, description, map, website){
	this.name			=	name;
	this.image			=	image;
	this.description	=	description;
	this.map			=	map;
	this.website		=	website;
}

ResortData = function(data){
	this.travelInfo 	= data.travelInfo;
	this.weather 		= data.weather;
	this.web 			= data.web;
	this.map 			= data.map;
	this.reviews 		= data.reviews;
	this.twitter 		= data.twitter;
}

addLodging = function(array, name, image, description, web){
	array.push(new Lodging(name, image, description, web));
}

Lodging = function(name, image, description, map, web){
		this.name			=	name;
		this.image			=	image;
		this.description	=	description;
		this.map 			= map;
		this.web		=	web;
	}




//Add resorts to database
var resorts = [];

var text = localStorage.getItem("session");
var obj = JSON.parse(text);

if(obj.country=="Australia"){
	//Threadbo
		currResort = addResort(	`thredbo`,
					"Thredbo_logo",
					"Thredbo is a village and ski resort in the Snowy Mountains of New South Wales, Australia. It is about 500 kilometres south of Sydney, accessible by the Alpine Way via Cooma, Berridale, and Jindabyne.",
					{	"travelInfo"	:{  "text"	:`	<p>Travelling by road is one of the most common routes. Stop by Jindabyne on the way in to take a short brake.</p>
														<p>Flying to Canberra or Jindabyne is probably the fastest way, then just take a shuttle in.</p>
														<p>There is a night bus that you can take from Sydney, passes through Canberra and you'll be there before you know it.</p>`,
											"array"		:[{"name":"Canberra","web":"https://visitcanberra.com.au/getting-to-canberra"},{"name":"Jindabyne","web":"http://www.absolutealpine.com.au/jindabyne/getting-there/"}]},
						"weather"		:{"postcode":"2625,au","lat":"-36.5012959","long":"148.310377"},
						"web"			:`https://www.thredbo.com.au/`,
						"map"			:`thredboRoutes`,
						"reviews"		:`ChIJ0V9Wjq9LI2sRJvgsdf-EavQ`,
						"twitter"		:`https://twitter.com/ThredboResort`
					},
					[],
					[],
					[],
					[],
					[],
					`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3207.1891522661417!2d148.30818831528745!3d-36.501295880011206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b234baf8e565fd1%3A0xf46a84ff752cf826!2sThredbo!5e0!3m2!1sen!2sau!4v1504686470625`,
					"New South Wales nsw")
		//Equipment
		addStoreInfo(resorts[currResort].equipment,"Rhythym Snowsports","Rhythymlogo",`Rhythym is probably the friendliest place that you can get your gear.
												Always with staff happy to help, it is located in Jindabyne and most people will probably pass it on their way to the snow.`,
												"Rhythym+Snowsports,Threadbo","http://www.rhythmsnowsports.com.au/");
		addStoreInfo(resorts[currResort].equipment,"Rossignol","rossignol",`A well known brand that sells equipment all over the world, but also has
			                            		their own little shop right next to the Mt. Kosciuszko chairlift.`,
			                            		"Rossignol,Threadbo","http://www.rossignol.com/AU/AU/");
		//Lessons
		addStoreInfo(resorts[currResort].lessons,"ThredboLand","Tland",`For the little bubbas, enjoy a full day skiing with fully licensed instructors`,
												"ThredboLand,Threadbo","https://www.thredbo.com.au/lessons-programs/thredboland-ski-program-4-6-years/");
		addStoreInfo(resorts[currResort].lessons,"Thredbo ski racing club","skirace",`Ages 10 and up, for the faster skiiers polish your turns and break your legs xD`,
												"Rossignol,Threadbo","http://www.thredboskiracing.com/training/");

		//Food_on
		addStoreInfo(resorts[currResort].food_on,"Frostbite","frostbite",`Great food served fast, local coffee made with love, friendly service. Best view on the hill! Open daily: 9am – 4pm`,
												"Rossignol,Threadbo","https://www.thredbo.com.au/restaurants-bars/frostbite-kiosk/");
		addStoreInfo(resorts[currResort].food_on,"Eagles Nest Restaurant","eaglesnest",`We offer appetising meals for everyone, hearty mountain breakfasts, lunch, sweets, snacks and dinner. Eagles Nest is open all year round, when the Chair is Open!`,
												"Eagles+Nest+Restaurant,Threadbo","http://www.eaglesnest.com.au/");
		//Food_off
		addStoreInfo(resorts[currResort].food_off,"Alfrescos Pizzaria","Alfrescos",`Located across the bridge from the Kosciuszko chairlift, this pizzaria features
				                            	the best pizzas around with inside and outside seating both available`,
				                            	"Alfrescos+Pizzaria,Threadbo","http://www.pizzaalfresco.com.au/");
		addStoreInfo(resorts[currResort].food_off,"Thredbo Burger Bar","burgerB",`Home to Thredbos custom made burgers
				                            	and located not too far from the Mt. Kosciuszko chairlift.`,
				                            	"Rossignol,Threadbo","https://www.thredbo.com.au/restaurants-bars/thredbo-burger-bar/");
		//Lodging
		addStoreInfo(resorts[currResort].lodging,"Thredbo YHA", "ThredboYHA", "Includes Free Hi-Speed WIFI, Room service, Non-smoking ...",
												"Thredbo+YHA","#");
		addStoreInfo(resorts[currResort].lodging,"SnowStream Apts", "SSapts", "Featuring a modern design and furnishings, 4.5 star Apts ...",
												"SnowStream+Apts","#");
		addStoreInfo(resorts[currResort].lodging,"Oberdere 1", "Oberdere1", "Fully equipped kitchen, ski gear drying room, 5min from ...",
												"Oberdere+1","#");
		addStoreInfo(resorts[currResort].lodging,"Angala 2", "Angala2", "Featuring spa baths, equipped kitchen and located across ...",
												"Angala+2","#");


	//Charlotte Pass
		currResort = addResort(	`charlotte pass`,
					"Charlotte_Pass_logo",
					"With a broad range of accommodation options, reliable snow cover, as well as exciting on and off snow features, Charlotte Pass Snow Resort offers a unique snow experience that is unlike any other.",
					{	"travelInfo"	:{  "text"	:`	<p>Situated in the heart of the NSW Snowy Mountains, Charlotte Pass Snow Resort offers ski-in ski-out accommodation and facilities.</p>
														<p>Completely snowbound at the top of Australia, Charlotte Pass is only accessible by Oversnow Transport.</p>`,
											"array"		:[{"name":"Charotte Pass","web":"http://www.charlottepass.com.au/getting-here.html"}]},
						"weather"		:{"postcode":"2624,au","lat":"-36.4311829","long":"148.3243897"},
						"web"			:`http://www.charlottepass.com.au/`,
						"map"			:`charlottepassRoutes`,
						"reviews"		:`ChIJz8M1Mwo1I2sRpfjvPOy-l4Y`,
						"twitter"		:`https://twitter.com/charlottepass`
					},
					[],
					[],
					[],
					[],
					[],
					`https://www.google.com.au/maps?q=charlotte+pass+snow+resort&output=embed`,
					"New South Wales nsw")
		//Equipment
		addStoreInfo(resorts[currResort].equipment,"Charlotte Pass","Charlotte_Pass_logo",`Rhythym is probably the friendliest place that you can get your gear.
												Always with staff happy to help, it is located in Jindabyne and most people will probably pass it on their way to the snow.`,
												"Charlotte Pass","http://www.charlottepass.com.au/equipment-hire.html");

		//Lessons
		addStoreInfo(resorts[currResort].lessons,"Charlotte Pass Group Lessons","Charlotte_Pass_logo",`Charlotte Pass Snow Resort offers Group Lessons for all levels of skier and snowboarder.
																										You will be in groups with people of similar age and ability.<br>* Group Lessons are for people 5yrs & over`
													,"Charlotte Pass","http://www.charlottepass.com.au/lessons.html");
		addStoreInfo(resorts[currResort].lessons,"Charlotte Pass Private Lessons","Charlotte_Pass_logo",`If you are after more personalised instruction, then Private Lessons are for you. We offer Private Lessons for downhill skiing and snowboarding.
																										 We match you with an instructor to perfectly suit your needs.`
													,"Charlotte Pass","http://www.charlottepass.com.au/lessons.html");
		addStoreInfo(resorts[currResort].lessons,"Charlotte Pass Kosi Kids Club","Charlotte_Pass_logo",`Charlotte Pass Snow Resort offers an all-day kids ski program for children 3-12 years. Featuring lessons, hot lunch as well as fun indoor games and activities,
																										Kosi Kids Club is designed to improve your child's skills from beginners to intermediates.`
													,"Charlotte Pass","http://www.charlottepass.com.au/lessons.html");


		//Food_on
		addStoreInfo(resorts[currResort].food_on,"The Chalet Restaurant","The_Chalet_Restaurant",`The ultimate dining experience in Charlotte Pass. Come in for a la Carte dinner or a country style buffet breakfast.`,
												"Charlotte Pass","http://www.charlottepass.com.au/food--drink.html");
		addStoreInfo(resorts[currResort].food_on,"Kosi Bar & Bistro","Kosi_Bar_&_Bistro",`Open every day serving coffee, cold drinks, lunch and snacks. The Kosi Bar & Bistro is the perfect place for a quick bite or taking a break during your ski day.`,
												"Charlotte Pass","http://www.charlottepass.com.au/food--drink.html");
		addStoreInfo(resorts[currResort].food_on,"The Cellar","The_Cellar",`Open every day and late into the night. The Cellar has great atmosphere for that afternoon beer or game of pool, with live music playing Wednesday to Saturday.`,
												"Charlotte Pass","http://www.charlottepass.com.au/food--drink.html");
		addStoreInfo(resorts[currResort].food_on,"Adams Cocktail Lounge","Adams_Cocktail_Lounge",`Open for après ski every afternoon and still going for that after dinner nightcap. Sit back and relax in leather couches by the roaring fire while our experienced cocktail bartenders make up something just for you.`,
												"Charlotte Pass","http://www.charlottepass.com.au/food--drink.html");

		//Food_off

		//Lodging
		addStoreInfo(resorts[currResort].lodging,"Kosciuszko Chalet Hotel", "Kosciuszko", "The Kosciuszko Chalet Hotel is the historic heart of Charlotte Pass Ski Resort, offering sweeping views of the entire resort.",
												"Kosciuszko+Chalet+Hotel","http://www.charlottepass.com.au/kosciuszko-chalet-hotel.html");
		addStoreInfo(resorts[currResort].lodging,"Arlberg Ski Club", "Arlberg", "Club guests enjoy our ski-in ski-out location close to the lifts, comfortable ensuite rooms, ...",
												"Arlberg+Ski+Club","http://arlbergskiclub.org.au/");
		addStoreInfo(resorts[currResort].lodging,"Jerrabomberra Lodge", "Jerrabomberra", "Jerrabomberra fantastic location, accommodation for 30 guests in-house bar...",
												"Jerrabomberra+Lodge","http://www.jerrabomberralodge.com.au/");


	//Mount Hotham
		currResort = addResort(	`mount hotham`,
					"Mount_Hotham_logo",
					"From powder hound ski slopes to breathtaking views of Victoria’s North East and Gippsland regions, Australia’s highest alpine village will enchant you from the moment you begin your journey along the Great Alpine Road.",
					{	"travelInfo"	:{  "text"	:`	<p>From powder hound ski slopes to breathtaking views of Victoria’s North East and Gippsland regions,
															Australia’s highest alpine village will enchant you from the moment you begin your journey along the Great Alpine Road.</p>`,
											"array"		:[{"name":"Mount Hotham","web":"http://www.mthotham.com.au/plan-my-trip/travel-to-hotham/"}]},
						"weather"		:{"postcode":"","lat":"-36.9752769","long":"147.124023"},
						"web"			:`http://www.mthotham.com.au/`,
						"map"			:`mounthothamRoutes`,
						"reviews"		:`ChIJA7Vd5FoyJGsREwtfSW9lGGk`,
						"twitter"		:`https://twitter.com/_hotham`
					},
					[],
					[],
					[],
					[],
					[],
					`https://www.google.com.au/maps?q=mount+hotham+snow+resort&output=embed`,
					"Victoria Vic Melbourne")
		//Equipment
		addStoreInfo(resorts[currResort].equipment,"Alpine Heights Ski & Board Rentals","Mount_Hotham_logo",`Conveniently located to service not only Alpine Heights but also Lawlers, Chalet Hotham, Razorback, and 1750.`,
												"mount+hotham+snow+resort",
												"http://www.mthotham.com.au/lessons-gear/gear-hire/alpine_heights_ski_board_rentals.asp");

		//Lessons
		addStoreInfo(resorts[currResort].lessons,"Mount Hotham Adult Group Lessons","Mount_Hotham_logo",`Hotham Ski & Ride School offers group lessons for beginner to expert skiers and boarders.
														The classes are a fun and cost effective way to improve your skills, not to mention a good opportunity to meet people of a similar ability.
														<br>* Adult Group lessons are for people aged 15 years and older`,
												"mount+hotham+snow+resort",
												"http://www.mthotham.com.au/lessons-gear/snowsports-lessons/adultlessons.asp");
		addStoreInfo(resorts[currResort].lessons,"Mount Hotham Private Lessons","Mount_Hotham_logo",`Whether it's your first time on the snow or you're a seasoned professional, you will always improve with a private coaching session.
														Our Ski & Ride School instructors are passionate, experienced and offer supportive instructions in a safe learning environment to suit all levels.`
												,"mount+hotham+snow+resort",
												"http://www.mthotham.com.au/lessons-gear/snowsports-lessons/20126281161335.asp");
		addStoreInfo(resorts[currResort].lessons,"Mount Hotham Kids Lessons","Mount_Hotham_logo",`Kids club ski or snowboard program us available for kids aged 6-14, kids must be 7 or older to snowboard.
														Our experienced professionals will share their passion for skiing and snowboarding, and kids will enjoy learning new skills and perfecting existing skills, all while making new friends`,
												"mount+hotham+snow+resort",
												"http://www.mthotham.com.au/lessons-gear/snowsports-lessons/kidslessons.asp");


		//Food_on
		addStoreInfo(resorts[currResort].food_on,"Arlberg Bar & Bistro","Arlberg Bar & Bistro",
												`The Arlberg Bar & Bistro is the place to wind down and share your adventures of the day. Enjoy a drink, generous hearty meal, award winning pizza or delicious bar snacks without having to rug up and brave the elements, just come as you are to level 3.  Children are always welcome.`,
												"Arlberg+Hotham",
												"http://www.arlberghotham.com.au/eat-drink/bar-bistro/");
		addStoreInfo(resorts[currResort].food_on,"Last Run Bar","Last Run Bar",
												`The Last Run Bar is located within the Lawlers Apartment Complex -  just next to the Day Carpark. The Last Run is a stylish, warm space where you can enjoy a relaxed dining experience in a warm and comfortable atmosphere. `,
												"The+Last+Run+Bar+and+Restaurant",
												"http://www.lastrunbar.com.au/");

		//Food_off
		addStoreInfo(resorts[currResort].food_off,"Arco-Ski Lodge","Arco-Ski Lodge",
												`Arco Ski Lodge is a traditional, family friendly Bavarian Bier Hall serving big, hearty German meals of superb quality plus a large range of traditional Bavarian beverages. Arco's mouth-watering menu features traditional dishes ranging from soups and giant Brezels to their famous pork knuckle, freshly made schnitzels and sausage. `,
												"Arco+Ski+Lodge",
												"www.arcoskilodge.com.au");
		addStoreInfo(resorts[currResort].food_off,"Yama Kitchen & Bar","Yama Kitchen & Bar",
												`Yama Kitchen and Bar is ideally situated on the lower level of the Hotham Central Building, providing a warm and intimate ambiance. Serving modern Asian cuisine matched with premium beers, wines and cocktails, Yama Kitchen and Bar is Hotham's only premier fine dinning venue. Open seven days per week, lunch Thursday to Sunday.`,
												"Yama+Kitchen+Bar",
												"http://www.yama.net.au/");

		//Lodging
		addStoreInfo(resorts[currResort].lodging,"Aardvark Alpine Lodge", "Aardvark Alpine Lodge",
												"A cosy, family-friendly club lodge offering 31 beds across 8 bedrooms on 3 split levels, Aardvark is where you’ll discover a true alpine experience nestled amongst the snowgums, with skiing right from the front door.",
												"Aardvark+Alpine+Lodge","http://www.mthotham.com.au/plan-my-trip/accommodation/lodges/aardvark.asp");
		addStoreInfo(resorts[currResort].lodging,"Arlberg Hotel", "Arlberg Hotel",
												"Arlberg Hotham Hotel offers its guests the complete Hotel experience; Central location, unbeatable value, 24 /7 guest services, experienced reservations team and extensive hotel facilities.",
												"Arlberg+Hotel","http://www.mthotham.com.au/plan-my-trip/accommodation/lodges/20179143122279.asp");
		addStoreInfo(resorts[currResort].lodging,"Arrabri Ski Club", "Arrabri Ski Club",
												"Arrabri is situated at 1720m above sea level and offers spacious living areas in a family-friendly club lodge environment. ",
												"Arrabri+Ski+Club","http://www.mthotham.com.au/plan-my-trip/accommodation/lodges/arrabri.asp");


	//Mount Buller
		currResort = addResort(	`mount buller`,
					"Mount_Buller_logo",
					"Just three hours' drive from Melbourne, Mt Buller is close enough for a day’s escape yet far enough away for a holiday. Mt Buller has everything you need for the perfect winter snow experience.",
					{	"travelInfo"	:{  "text"	:`	<p> Only 248kms north east of Melbourne (about 3 hours), Mt Buller is the most accessible snow resort in Australia and the closest resort to any international airport (Melbourne, Tullamarine).</p>`,
											"array"		:[{"name":"Mount Buller","web":"http://www.mtbuller.com.au/Winter/plan-your-visit/getting-here"}]},
						"weather"		:{"postcode":"","lat":"-37.1576502","long":"146.4717833"},
						"web"			:`http://www.mtbuller.com.au/Winter/`,
						"map"			:`mountbullerRoutes`,
						"reviews"		:`ChIJ23kplao5JmsRRp4s6noufR8`,
						"twitter"		:`https://twitter.com/mtbuller`
					},
					[],
					[],
					[],
					[],
					[],
					`https://www.google.com.au/maps?q=mount+buller+snow+resort&output=embed`,
					"Victoria Vic Melbourne")
		//Equipment
		addStoreInfo(resorts[currResort].equipment,"Arlburg hotel ski hire","Mount_Buller_logo",
												`Arlberg has comprehensive snow equipment hire facilities with friendly helpful staff, right where you need it … on the mountain! Be wary of false economies! Why spend time and money decking yourself out when we’ve got all you need in clothing and equipment when you need it … especially if you decide you need a change or to make adjustments.`,
												"45+Summit+Road+Mt+Buller",
												"http://www.mthotham.com.au/lessons-gear/gear-hire/alpine_heights_ski_board_rentals.asp");

		//Lessons
		addStoreInfo(resorts[currResort].lessons,"Mt Buller Ski & Snowboard School","Mount_Buller_logo",
												`The Mt Buller Ski & Snowboard School is one of the best in Australia. You can improve your skills, gain confidence and discover the wonders of Mt Buller with one of our professional instructors. `,
												"mount+buller+snow+resort",
												"http://www.mtbuller.com.au/Winter/ski-snowboard-school/lessons");

		//Food_on
		addStoreInfo(resorts[currResort].food_on,"Abom","Abom",
												`A long-standing Buller favourite offering everything from great coffee in the morning, grab-and-go options at lunch, a bar and a bistro style evening menu. Don't miss out on our famous pizzas served daily. `,
												"ABOM+Hotel+Summit+Road+Mt+Buller/",
												"http://www.mtbuller.com.au/Winter/resort-info/the-village/bars-restaurants/details/abom");
		addStoreInfo(resorts[currResort].food_on,"Arlberg - Nooky's Restaurant","Arlberg - Nooky's Restaurant",
												`Nooky's is a stylish a la carte dining room and bar located in the Arlberg Hotel, overlooking Bourke Street with its beautiful views. Great comfort pub style meals for all the family.  Fully renovated in 2012, we also have pool tables to entertain all the family along with our  Sports Bar area for a casual drink.`,
												"Arlberg+Hotel+Mt+Buller/",
												"https://www.arlberg.com.au/dining/nookys.html");
		addStoreInfo(resorts[currResort].food_on,"Arlberg Bistro and Bar","Arlberg Bistro and Bar",
												`With arguably one of the best ski-in, ski-out locations on the mountain, the Arlberg Bistro and Bar is open for coffee, cake, lunch and dinner seven days a week. Ski in during the day and enjoy the sandwiches/foccacias, hamburgers, hearty soup and curries along with good old favourites including pies, chips, wraps and wedges.`,
												"Arlberg+Hotel+Mt+Buller/",
												"https://www.arlberg.com.au/dining/rooftop.html");

		//Food_off
		addStoreInfo(resorts[currResort].food_off,"Black Cockatoo Restaurant","Mount_Buller_logo",
												`This year Black Cockatoo flys again with a simlar style of menu as last year style. Architecturally designed. Australian inspired. Mt Buller’s new home for quality, Black Cockatoo is a raw mix of copper, leather, steel and charcoal paired with amazing views of Mt Stirling.`,
												"BLACK+COCKATOO+mt+buller/",
												"http://blackcockatoo.net.au/");

		//Lodging
		addStoreInfo(resorts[currResort].lodging,"Ajax Ski Club", "Ajax Ski Club",
												"Renowned for its excellent cuisine (especially its legendary Friday night smorgasbord) and friendly family atmosphere, AJAX offers premium accommodation (shared or private rooms each with en-suite) and extensive guest facilities that also includes a 3 course meal and cooked breakfast.",
												"Ajax+Ski+Club+mt+buller", "http://www.mtbuller.com.au/Winter/plan-your-visit/accommodation/details/ajax-ski-club");
		addStoreInfo(resorts[currResort].lodging,"Alpine Retreat Mt Buller", "Alpine Retreat Mt Buller",
												"This Mt Buller accommodation is half Mt Buller hotel, half Mt Buller ski lodge and offers 4 floors of fun! Ski Victoria and STAY, EAT, PLAY and RELAX - all at the Alpine Retreat Mt Buller!",
												"Alpine+Retreat+mt+buller","http://www.mtbuller.com.au/Winter/plan-your-visit/accommodation/details/alpine-retreat-mt-buller");
		addStoreInfo(resorts[currResort].lodging,"Hotel Pension Grimus & Appartments", "Hotel Pension Grimus & Appartments",
												"This renowned boutique hotel is the ideal place for a romantic weekend for two, or the annual family skiing holiday. Hotel Pension Grimus is centrally located in an absolute ski in ski out position next to the Bourke Street ski run and only 50 metres from the loading station of the new ABOM six-seater Chairlift which offers super fast access to your favourite ski areas. ",
												"Hotel+Pension+Grimus+Appartments+mt+buller","http://www.mtbuller.com.au/Winter/plan-your-visit/accommodation/details/hotel-pension-grimus-apartments");
}else{
	//Niseko United
		currResort = addResort(	`niseko united`,
					"Niseko_logo",
					"Niseko United is comprised of four resorts on the one mountain, Niseko Annupuri (1,308m). 100km south of Sapporo, Niseko Annupuri is a part of the Niseko-Shakotan-Otaru Kaigan Quasi-National Park and is the most eastern park of the Niseko Volcanic Group.",
					{	"travelInfo"	:{  "text"	:`	<p>100km south of Sapporo, Niseko Annupuri is a part of the Niseko-Shakotan-Otaru Kaigan Quasi-National Park and is the most eastern park of the Niseko Volcanic Group. Niseko United is accessible by bus, train, and car.</p>`,
											"array"		:[{"name":"Niseko United","web":"http://www.niseko.ne.jp/en/access/index.html"}]},
						"weather"		:{"postcode":"","lat":"42.854209","long":"140.6374901"},
						"web"			:`http://www.niseko.ne.jp/en/index.html`,
						"map"			:`nisekoRoutes`,
						"reviews"		:`ChIJ1eQBCWGlCl8RZBxM4g4_JlM`,
						"twitter"		:`https://twitter.com/nisekotourism`
					},
					[],
					[],
					[],
					[],
					[],
					`https://www.google.com.au/maps?q=niseko+united&output=embed`,
					"")

	//Hakuba
		currResort = addResort(	`hakuba ski resort`,
					"Hakuba_Logo",
					"Situated in the breathtakingly beautiful Northern Japan Alps, Hakuba stands out as one of Japan's top winter resort areas, offering some of the best winter sports action in Japan.",
					{	"travelInfo"	:{  "text"	:`	<p>Without the doubt the most popular winter destination in Japan is easily accessible by various different options, whether arriving by plane or traveling from the cities by bullet train, bus or car to Hakuba, the information and maps here will make your travel plans that much more easier.</p>`,
											"array"		:[{"name":"Hakuba Ski Resort","web":"http://www.hakubatourism.jp/gettinghere/"}]},
						"weather"		:{"postcode":"","lat":"36.6972154","long":"137.7782343"},
						"web"			:`http://www.hakubatourism.jp`,
						"map"			:`hakubaRoutes`,
						"reviews"		:`ChIJh07LxNjR918Rbbk4bjyrGZ8`,
						"twitter"		:`https://twitter.com/hakuba_47?lang=en`
					},
					[],
					[],
					[],
					[],
					[],
					`https://www.google.com.au/maps?q=hakuba+47&output=embed`,
					"")
}
