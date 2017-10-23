// page's for Session
// 0	|	Home/Search for Resort
// 1	|	Advice for *country*
// 2	|	Resort List
// 3	|	Resort Page
// 4	|		- Equipment
// 5	|		- Food
// 6	|		- Lodging
// 7	|		- Map
// 8	|		- Ski Map
// 9	|	Search Page

// ID = str(resort name) [e.g. "thredbo"]


resetFollow = function(){
	array = [];
	myJSON = JSON.stringify(array);
    localStorage.setItem("follow", myJSON);
    console.log("Follow reset");
	 setWeather();
}

checkFollow = function(ID, page){
	//console.log("checking follow");
	text 	= localStorage.getItem("follow");
	array 	= JSON.parse(text);

	if(array == null){return false}

	checkPage = false;
	if(page == 3){checkPage=true}

	for (var i = 0; i < array.length; i++) {
		if(array[i].ID==ID){break;}
	}
	if(i>=array.length){return false}
	if(checkPage==true){return true}

	for (var j = 0; j < array[i].pages.length; j++) {
		if(array[i].pages[j]==page){checkPage=true}
	}
	setWeather();
	return(checkPage);
}


resetSession = function(){
	obj = new Session;

	myJSON = JSON.stringify(obj);
    localStorage.setItem("session", myJSON);
}

updatePage = function(page){
	text = localStorage.getItem("session");
	obj = JSON.parse(text);

	if (obj == null){obj = new Session}

	obj.page 	= page;

	//console.log("[session]: set page to... ", obj.page);

	myJSON = JSON.stringify(obj);
    localStorage.setItem("session", myJSON);
    arrowStuff();
	 setWeather();
}

updateID = function(ID){
	text = localStorage.getItem("session");
	obj = JSON.parse(text);

	if (obj == null){obj = new Session}

	obj.ID 		= ID;

	myJSON = JSON.stringify(obj);
    localStorage.setItem("session", myJSON);
}

restoreToSession = function(){
	text = localStorage.getItem("session");
	obj = JSON.parse(text);

	//console.log(obj);

	if(obj==null){
		resetSession();
    	window.location.href = "Form.html";
	}

	if (obj == null || (obj.page>2 && obj.ID==null)){
		obj = new Session();
		moveToHome();
		return;
	}



	switch (obj.page) {
    case 1:
        moveToAdvice();
        break;
    case 2:
        moveToResortList();
        break;
    case 3:
        moveToResort(obj.ID);
        break;
    case 4:
        moveToEquipment(obj.ID);
        break;
    case 5:
        moveToFood(obj.ID);
        break;
    case 6:
        moveToLodging(obj.ID);
        break;
    case 7:
        moveToMap(obj.ID);
        break;
    case 8:
        moveToSkiMap(obj.ID);
        break;
    default:
        moveToHome();
	}
	reloadFollowing();
	setWeather();
}

Session = function(){
	this.page 	= 0;
	this.ID 	= null;
	this.country= "Australia";
	this.followType= "normal";
}

setCountry = function(){
	var newCountry = document.getElementById("countryChange").value;
	console.log(newCountry);
	text = localStorage.getItem("session");
	obj = JSON.parse(text);
	if(obj.country==newCountry){return}
	obj.country = newCountry;
	myJSON = JSON.stringify(obj);
    localStorage.setItem("session", myJSON);

    if(newCountry=="Australia"){
    	window.location.href = "SinglePage.html";
    }else{
		window.location.href = "SinglePageJ.html";
    }
}

updateTwitter = function(){
	follow = localStorage.getItem("follow");
	array = JSON.parse(text);			// [{ID:'threadbo',pages:[3,4,5]},...]

	text = localStorage.getItem("session");
	obj = JSON.parse(text);
	
	// no follows
	if(obj.country=="Australia"){
		string = `
							<a class="twitter-timeline"
								href="https://twitter.com/ThredboResort"
								data-chrome="nofooter"
								data-link-color="#820bbb"
								data-border-color="#a80000"
								data-tweet-limit="5">>
								Tweets by @ThredboResort
							</a>
		`;
	}else{
		string = `
							<a class="twitter-timeline"
								href="https://twitter.com/nisekotourism"
								data-chrome="nofooter"
								data-link-color="#820bbb"
								data-border-color="#a80000"
								data-tweet-limit="5">>
								Tweets by @ThredboResort
							</a>
		`;
	}
	displayRight(string);
	toggle = false;

	if(array.length!=0){
		//display follows
		string = ``;
		toggle = false;
		for (var i = 0; i < array.length; i++) {
			curr = array[i];
			item = nameToObject(curr.ID);

			if(item==null){continue};

			string += `
								<a class="twitter-timeline"
									href="`+item.resortData.twitter+`"
									data-chrome="nofooter"
									data-link-color="#820bbb"
									data-border-color="#a80000"
									data-tweet-limit="2">
									Tweets by @ThredboResort
								</a>
			`;
			toggle=true;
		}
	}

	if(toggle==true){displayRight(string);}

	twttr.widgets.load();
}

updateFollowing = function(){
	text = localStorage.getItem("follow");
	array = JSON.parse(text);			// [{ID:'threadbo',pages:[3,4,5]},...]

	document.getElementById("sidebarHeadingsL").innerHTML =	`Following
															<button style="float:right" class="btn btn-primary" id="mainBtns" onclick="swapFollow(0);" role="button">
																<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
															</button>`



	string = '';

	for (var i = 0; i < array.length; i++) {
		curr = array[i];
		item = nameToObject(curr.ID);
		if(item==null){continue;}

		string+=`	<a onclick="moveToResort('`+curr.ID+`')" class="list-group-item" id="followingListItem">
						<div class="media-left col-2">
							<img class="media-object" src="resources/`+item.image+`.png"
							alt="`+item.capName+` Logo" style="max-width:90px;max-height:70px;">
						</div>
						<div class="media-body col-8">
							<h4 class="media-heading" style="padding-bottom: 0.5em">
								`+item.capName+`
							</h4>
							<table style="width:100%; text-align: center;">
								<tr>
									<th style="padding-left:0.8em; padding-right: 0.8em;">
										<img src="resources/temp.png"
										alt="Temperature" class="leftsidebarimages">
									</th>
									<th style="padding-left:0.8em; padding-right: 0.8em;">
										<img src="resources/snow.png"
										alt="Snow Fall" class="leftsidebarimages">
									</th>
									<th style="padding-left:0.8em; padding-right: 0.6em;">
										<img src="resources/wind.png"
										alt="Wind Speed" class="leftsidebarimages">
									</th>
								</tr>
								<tr>
									<td class="`+item.name+`Temp"></td>
				                    <td class="`+item.name+`Snow"></td>
				                    <td class="`+item.name+`Wind"></td>
								</tr>
							</table>
						</div>
						<div class="media-body col-2 text-center">
						</div>
					</a>`;

		string+=`<div class="list-group" id="subLink">`

		for (var j = 0; j < curr.pages.length; j++) {
			switch(curr.pages[j]) {
			    case 3:
			        continue;
			    case 4:
			        string+=`<a onclick="moveToEquipment('`+curr.ID+`')" class="list-group-item" id="followingListItem">`+item.capName+` Equipment</a>`
			        break;
			    case 5:
			        string+=`<a onclick="moveToFood('`+curr.ID+`')" class="list-group-item" id="followingListItem">`+item.capName+` Food</a>`
			        break;
		        case 6:
			        string+=`<a onclick="moveToLodging('`+curr.ID+`')" class="list-group-item" id="followingListItem">`+item.capName+` Lodging</a>`
			        break;
		        case 7:
			        string+=`<a onclick="moveToMap('`+curr.ID+`')" class="list-group-item" id="followingListItem">`+item.capName+` Map</a>`
			        break;
			    case 8:
			        string+=`<a onclick="moveToSkiMap('`+curr.ID+`')" class="list-group-item" id="followingListItem">`+item.capName+` Ski Map</a>`
			        break;
			    default:
			        console.log("updateFollowing| Error in case: ", curr.pages[j]);
			}


		}
		string+=`</div>`
	}


	//console.log(string);
	if(array.length==0){string = '';}
	displayLeft(string);
	//setWeather();
}

updateFollowingEdit = function(){
	text = localStorage.getItem("follow");
	array = JSON.parse(text);			// [{ID:'threadbo',pages:[3,4,5]},...]

	document.getElementById("sidebarHeadingsL").innerHTML =	`Following
															<button style="float:right" class="btn btn-success" id="mainBtns" onclick="swapFollow(0);" role="button">
																<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
															</button>`

	string = '';
	setWeather();
	for (var i = 0; i < array.length; i++) {
		curr = array[i];
		item = nameToObject(curr.ID);

		if(item==null){continue};

		string+=`	<div class="list-group-item" id="followingListItem" style="cursor:default;">
						<div class="media-left col-2">
							<img class="media-object" src="resources/`+item.image+`.png"
							alt="`+item.capName+` Logo" style="max-width:90px;max-height:70px;">
						</div>
						<div class="media-body col-8">
							<h4 class="media-heading" style="padding-bottom: 0.5em">
								`+item.capName+`
							</h4>
							<table style="width:100%; text-align: center;">
								<tr>
									<th>
										<img src="resources/temp.png"
										alt="Temperature" class="leftsidebarimages">
									</th>
									<th>
										<img src="resources/snow.png"
										alt="Snow Fall" class="leftsidebarimages">
									</th>
									<th>
										<img src="resources/wind.png"
										alt="Wind Speed" class="leftsidebarimages">
									</th>
								</tr>
								<tr>
									<td class="`+item.name+`Temp"></td>
									<td class="`+item.name+`Snow"></td>
									<td class="`+item.name+`Wind"></td>
								</tr>
							</table>
						</div>
						<div class="media-body col-2 text-center">
							<button style="float:right" class="btn btn-danger btn-xs" onclick="removeFollow('`+curr.ID+`',3);" role="button">
								<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
							</button>
						</div>
					</div>`;
		setWeather();
		string+=`<div class="list-group" id="subLink">`

		for (var j = 0; j < curr.pages.length; j++) {
			switch(curr.pages[j]) {
			    case 3:
			        continue;
			    case 4:
			        string+=`<div class="list-group-item" id="followingListItem" style="cursor:default;">`+item.capName+` Equipment
				        		<button style="float:right" class="btn btn-danger btn-xs" onclick="removeFollow('`+curr.ID+`',4)" role="button">
									<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
								</button>
							</div>`
			        break;
			    case 5:
			        string+=`<div class="list-group-item" id="followingListItem" style="cursor:default;">`+item.capName+` Food
				        		<button style="float:right" class="btn btn-danger btn-xs" onclick="removeFollow('`+curr.ID+`',5)" role="button">
									<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
								</button>
							</div>`
			        break;
		        case 6:
			        string+=`<div class="list-group-item" id="followingListItem" style="cursor:default;">`+item.capName+` Lodging
				        		<button style="float:right" class="btn btn-danger btn-xs" onclick="removeFollow('`+curr.ID+`',6)" role="button">
									<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
								</button>
							</div>`
			        break;
		        case 7:
			        string+=`<div class="list-group-item" id="followingListItem" style="cursor:default;">`+item.capName+` Map
				        		<button style="float:right" class="btn btn-danger btn-xs" onclick="removeFollow('`+curr.ID+`',7)" role="button">
									<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
								</button>
							</div>`
			        break;
			    case 8:
			        string+=`<div class="list-group-item" id="followingListItem" style="cursor:default;">`+item.capName+` Ski Map
				        		<button style="float:right" class="btn btn-danger btn-xs" onclick="removeFollow('`+curr.ID+`',8)" role="button">
									<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
								</button>
							</div>`
			        break;
			    default:
			        console.log("updateFollowing| Error in case: ", curr.pages[j]);
			}


		}
		string+=`</div>`
	}


	//console.log(string);
	if(array.length==0){string = '';}
	displayLeft(string);
}

swapFollow = function(reset){
	text = localStorage.getItem("session");
	obj = JSON.parse(text);

	if(obj==null){
		resetSession();
		text = localStorage.getItem("session");
		obj = JSON.parse(text);
	}

	text = localStorage.getItem("follow");
	array = JSON.parse(text);
	if(array==null){
		resetFollow();
	}


	if(obj.followType == null || reset==1 || obj.followType != "normal"){
		obj.followType = "normal";
		updateFollowing();
	}else{
		obj.followType = "edit";
		updateFollowingEdit();
	}
	myJSON = JSON.stringify(obj);
    localStorage.setItem("session", myJSON);


	setWeather();
}

reloadFollowing = function(){
	text = localStorage.getItem("session");
	obj = JSON.parse(text);

	text = localStorage.getItem("follow");
	array = JSON.parse(text);
	if(array==null){
		resetFollow();
	}


	if(obj.followType == null || obj.followType == "normal"){
		updateFollowing();
	}else{
		updateFollowingEdit();
	}
	setWeather();
}

//swapFollow(1);

followObj = function(ID, pages){
	this.ID 	= ID;
	this.pages	= pages;
}

addFollow = function(ID, page){
	//console.log("addFollow: (", ID, ", ", page, ")");

	funcRet = addFollowID(ID);
	i = funcRet[0];
	text = localStorage.getItem("follow");
	array = JSON.parse(text);
	//console.log("array[i]= ",array[i])

	for (var j = 0; j < array[i].pages.length; j++) {
		if (array[i].pages[j]==page){return}
	}


	array[i].pages.push(page);
	array[i].pages.sort();
	myJSON = JSON.stringify(array);
    localStorage.setItem("follow", myJSON);
    reloadFollowing();
	if(funcRet[1]==true){updateTwitter()};
}

removeFollow = function(ID, page){
	//console.log("removeFollow: (", ID, ", ", page, ")");

	if(page==3)	{
		removeResortFollow(ID);
	}else{
		removeSubPageFollow(ID,page)
	}
	reloadFollowing();

	if(page==3)	{updateTwitter();}
}

removeSubPageFollow = function(ID,page){
	if(checkFollow(ID,page)==false){return}
	text = localStorage.getItem("follow");
	array = JSON.parse(text);
	for (var i = 0; i < array.length; i++) {
		if(array[i].ID==ID){break}
	}

	for (var j = 0; j < array[i].pages.length; j++) {
		if(array[i].pages[j]==page){console.log("found at: ",i,j,array[i].pages[j],page);array[i].pages.splice(j,1)}
	}

	myJSON = JSON.stringify(array);
    localStorage.setItem("follow", myJSON);
}

removeResortFollow = function(ID){
	if(checkFollow(ID,3)==false){return}
	text = localStorage.getItem("follow");
	array = JSON.parse(text);
	for (var i = 0; i < array.length; i++) {
		if(array[i].ID==ID){array.splice(i,1);break}
	}
	myJSON = JSON.stringify(array);
    localStorage.setItem("follow", myJSON);
}

addFollowID = function(ID){
	text = localStorage.getItem("follow");
	array = JSON.parse(text);

	if (array == null){array = []}

	for (var i = 0; i < array.length; i++) {
		if (array[i].ID==ID){return([i, false])};
	}
	array.push(new followObj(ID, []));

	myJSON = JSON.stringify(array);
    localStorage.setItem("follow", myJSON);

	return([array.length-1, true])
}
