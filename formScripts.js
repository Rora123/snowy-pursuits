
	openForm = function(){
		text = localStorage.getItem("guide");
		var sequence = JSON.parse(text);
		if(sequence != null){
			if(sequence.length > 1){
				if (!confirm('Creating a new form will overwrite any previous made guides. Are you sure you wish to continue?')) {
					return 0;
				}
			}
		}
		document.location.href = "Form.html";
	}
	skipForm = function(){
		document.location.href = "SinglePage.html";	
		text = localStorage.getItem("guide");
		var sequence = JSON.parse(text);
		if(sequence != null){return 0;}
		resetSeq();	
	}
	closeForm = function(){
		//save form answers
		obj = {};
		for(i in document.getElementById("skiForm").elements){
			obj[document.getElementById("skiForm").elements[i].id] = document.getElementById("skiForm").elements[i].value;
		}
		var board = 0;
		if(document.getElementById("skate").checked){
			board++;
		}
		if(document.getElementById("surf").checked){
			board++;
		}
		if(document.getElementById("sBoard").checked){
			board+=5;
		}
		if(document.getElementById("ice").checked){
			board--;
		}
		if(document.getElementById("roll").checked){
			board--;
		}
		if(board>0){
			obj["gear"]="board";
		}else{
			obj["gear"]="ski";
		}
		//console.log(obj);
	    myJSON = JSON.stringify(obj);
	    localStorage.setItem("formAnswers", myJSON);


		resetSeq();
		createGuideSeq();
		document.location.href = "SinglePage.html";
		var on = 1;
	    myJSON = JSON.stringify(on);
	    localStorage.setItem("overlay", myJSON);
	}
	checkOn = function(){
		text = localStorage.getItem("overlay");
		var on = JSON.parse(text);
		if(on){
			onGuide();
		}
		return 0;
	}
	onGuide = function() {
	    document.getElementById("overlay").style.display = "block";
	    document.getElementById("overlayS").onclick = function() { offGuide(); };
	    document.getElementById("overlayS").innerHTML = "Hide Guide";
	    overlayCur();
	    var on = 1;
	    myJSON = JSON.stringify(on);
	    localStorage.setItem("overlay", myJSON);
	}
	offGuide = function() {
	    document.getElementById("overlay").style.display = "none";
	    document.getElementById("overlayS").onclick = function() { onGuide(); };
	    document.getElementById("overlayS").innerHTML = "Display Guide";
	    removeCur();
	    var on = 0;
	    myJSON = JSON.stringify(on);
	    localStorage.setItem("overlay", myJSON);
	}
	
	
	
	
	
	// sequence will be an array that is created from the intial form
	// starting from 100
	/* 100 will explain the overlay
	 * 101 is button that leads to home
	 * 102 refers to social media section
	 * 103 refers to following tab
	 * 104 explains the entire header
	 * 105 goes to resort list
	 * 106 explains the resort list page
	 * 107 explains the resort page
	 * 108 
	 * 109 is any button leading to equipment
	 * 110 explains the equipment page
	 * 111 
	 * 112 is any button leading to food
	 * 113 explains the food page
	 * 114 is any button leading to lodging
	 * 115 explains the lodging page
	 * 116 is any button leading to the map
	 * 117 briefly explains the map
	 * 118 links to route map
	 * 119 explains route map
	 */ // like it like this so that i can add the option to choose any one at any time (add a select list somewhere)
	// push these numbers to the array stored in guide
	// and when you call this function it will activate the first one to view
	// mby a function that adds that code at the current position (moves all others up 1 then insert)
	
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

	// ID = str(resort name) [e.g. "thredbo"]
	overlayCur = function(){// add the relevant classes to elements NOT DONE
		text = localStorage.getItem("guide");
		var sequence = JSON.parse(text);
		if(sequence == null){return 0;}
		text = localStorage.getItem("session");
		var currentP = JSON.parse(text).page;	
		var index = sequence[0];
		text = localStorage.getItem("formAnswers");
		var answers = JSON.parse(text);
		switch(sequence[index]){
		case 100:
			x = "<p><h2>Move your pointer here to expand the text box and/or click on it.</h2></p>" +
					"<p>Welcome to our website. This is where you will view the extra details " +
					"about the parts of the screen that are highlighted.</p>" +
					"<p>Use the button on the right to proceed or the button on the left to go back.</p>";
			document.getElementById("guideText").innerHTML = x;
			break;
		case 101:
			x = "<p>This is the end to your guide. Now that you're finished feel free to go back and check anything previously in the guide " +
					"or make a new one if there is still something else you dont understand.</p>"
					document.getElementById("guideText").innerHTML = x;
			break;
		case 102:
			x = "<p>After following an item, this is where you will see a twitter feed of that resort, so that you can keep " +
					"up to date on whats going on.</p>" +
					"<p>Add new resorts to following to add them to this feed.</p>";
			document.getElementById("guideText").innerHTML = x;
			document.getElementById("sidebarHeadingsR").className += " redBac";
			break;
		case 103:
			x = "<p>Now that you've got to here you can make use of the following tab.</p><p>To add pages to this list, click" +
					" on the star that is next to the page name.</p><p> You can either click on the star " +
					"again to remove it from following or click on the edit icon in the following tab " +
					"and then the small x in the top right corner of the item you want to remove.<\p>";
			document.getElementById("guideText").innerHTML = x;
			document.getElementById("sidebarHeadingsL").className += " redBac";
			if(currentP >= 3){
				document.getElementById("star").className += " redText";
			}
			break;
		case 104:
			x = "<p>Firstly I will explain our site header at the top of the page. From left to right you can: </p><p> Click on the website name to go back to the homepage.</p>" +
					"<p>Enter a resort name or area and click on search to find your resort.</p>" +
					"<p>View you recommendations that will be dependant on how you filled out the previous form.</p>" +
					"<p>Click on hide guide to hide all of the guide interface and click on new guide to open up a new form" +
					" that will help you create a new guide. </p><p> Click on travel advice to view specialised advice on travelling from overseas to the stated country.</p>" +
					"<p>Select a country from the drop down list to focus the website on that country.</p>" 
					document.getElementById("guideText").innerHTML = x;
				document.getElementById("headerTop").className += " redBor";
				document.getElementById("headerName").className += " redText";
			break;
		case 105:
			x = "<p>To continue, click on the glowing buttons as you will be lead towards the information you should know. Click on the \"Find a Resort\" button or Search button in the header to view our list of resorts</p>"
				document.getElementById("guideText").innerHTML = x;
			if(currentP == 0){				
				document.getElementById("findResort").className += " redBac";
			}
			document.getElementById("searchHeader").className += " redBac";
			//document.getElementById("findResort").onclick += " overlayNext()";
			//document.getElementById("findResort").onclick += function() { overlayNext; };
			break;
		case 106:
			x = "<p>Scroll down to see more resorts" +
			" and click on \" View Resort Page\n to go to that resort page</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 2){
				document.getElementById("view0").className += " redBac";
				document.getElementById("view1").className += " redBac";
				document.getElementById("view2").className += " redBac";
				document.getElementById("view3").className += " redBac";
			}
			break;
		case 107:
			x = "<p>Here is our resort page.</p><p>From here you can access all the information you will need to about the resort" +
					" you have chosen. This includes: </p><p> The current Weather at the resort.</p> <p> Information on the " +
					"easiest methods of travelling to and from the resort.</p><p> Reviews of the resort" +
					".</p><p> A resort mountain route map </p><p> And various links to information on equipment, food, lodging " +
					"and a map of the local area.</p><p>" +
					"A link to the resorts website for any further reading.</p>" +
					"<p>Remember that you can click on any of the up/down arrows next to sections headings to minimise/expand that section. </p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 3){
				document.getElementById("websiteLink").className += " redText";
			}
			break;
		case 108:
			x = "";
			document.getElementById("guideText").innerHTML = x;
			break;
		case 109:
			x = "<p>Next up you will need to get some equipment so click on the highlighted button</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 3){
				document.getElementById("equip").className += " redBac";
			}
			break;
		case 110:// will split into 2 if we get snowboard/skis from form
			if(answers["gear"]=="board"){
				x = "<p>Here you can view all the information you will need about equipment as a beginner</p>" +
						"<p>Because you are familiar with sports similar to snowboarding it is recommended to choose that.</p>" +
					"<p> Below this information we have a couple of our recommendations for where to get" +
					" your equipment and some of the most popular schools for learning how to ski/snowboard.</p>" +
					"<p> When you are done click on the glowing resort name to go back to the resort page.</p>";
				document.getElementById("guideText").innerHTML = x;
				if(currentP == 4){
					document.getElementById("boarding").className += " redBor";	
				}
			}else{
				
				x = "<p>Here you can view all the information you will need about equipment as a beginner</p>" +
						"<p>Since you are not familiar with sports similar to snowboarding I would recommend skiing which is much easier to learn.</p>" +
					"<p> Below this information we have a couple of our recommendations for where to get" +
					" your equipment and some of the most popular schools for learning how to ski/snowboard.</p>" +
					"<p> When you are done click on the glowing resort name to go back to the resort page.</p>";
				document.getElementById("guideText").innerHTML = x;
				if(currentP == 4){
					document.getElementById("skiing").className += " redBor";	
				}
			}
			if(currentP == 4){
				document.getElementById("breadResort").className += " redText";				
			}
			break;
		case 111:
			x = "";
			document.getElementById("guideText").innerHTML = x;
			break;
		case 112:
			x = "<p>Next up is our favourite places to eat. Click on the glowing button to continue</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 3){
				document.getElementById("food").className += " redBac";
			}
			break;
		case 113:
			x = "<p>Here we have split our recommendations into 2 sections being On the Mounatain and Off the Mountain</p>" +
					"<p> On the mountain referring to locations accessessable while still with your snow gear and off the mountain " +
					"referring to all others</p>" +
					"<p> Click on the links to view the location on a map or look at the stores website (if they have one)</p>" +
					"<p> When you are done click on the glowing resort name to go back to the resort page.</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 5){
				document.getElementById("breadResort").className += " redText";				
			}
			break;
		case 114:
			x = "<p>Next up is all the best locations we could find for you to rest. Click on the glowing button to continue</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 3){
				document.getElementById("sleep").className += " redBac";
			}
			break;
		case 115:
			x = "<p>Here you can view the best places to sleep in the area.</p>" +
					"<p>Definitely have a good read about them on their website because most lodges run in a much" +
					"friendlier way than normal hotels would</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 6){
				document.getElementById("breadResort").className += " redText";				
			}
			break;
		case 116:
			x = "<p>Next up is an interactive map of this resort. Click on the glowing button to continue</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 3){
				document.getElementById("map").className += " redBac";
			}
			break;
		case 117:
			x = "<p>Here you can access an interactive map that will start focused on the Resort.<p>" +
					"<p>Drag around the map and zoom in/out to familiarise yourself with the area.</p>" +
					"<p> When you are done click on the glowing resort name to go back to the resort page.</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 7){
				document.getElementById("breadResort").className += " redText";				
			}
			break;
		case 118:
			x = "<p> Next up is the route map which often has different codes for each country. Click on the glowing button to continue<p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 3){
				document.getElementById("routeMap").className += " redBac";
			}
			break;
		case 119://might need a check what country to make sure i do the right x
			//mby even the resort so I can recommend the beginner area
			x = "<p>Most maps should have a key in the bottom left corner. Be sure to not go beyond what difficulty you think you" +
					" can manage because especially in Australia (where harder normally means bad snow) you will not have nearly" +
					" as much fun as you could of had.</p>" +
					"<p>There should also be plenty of free route maps available at the resort if you would prefer" +
					" a hard copy";
			x+="<p> At Thredbo the area with the smallest slope is Friday flats and often learners might first" +
					"procceed up the Gunbarrel chairlift and head towards merits for more space although it is a " +
					"slightly steeper slop</p>" +
					"<p> When you are done click on the glowing resort name to go back to the resort page.</p>";
			document.getElementById("guideText").innerHTML = x;
			if(currentP == 8){
				document.getElementById("breadResort").className += " redText";				
			}
			break;
		default:
			break;
		}
		//alert(currentP);
		return 0;
	}
	removeCur = function(){
		text = localStorage.getItem("guide");
		var sequence = JSON.parse(text);
		if(sequence == null){return 0;}
		text = localStorage.getItem("session");
		var currentP = JSON.parse(text).page;	
		var index = sequence[0];
		switch(sequence[index]){
		case 100:
			x = "Move your pointer here to expand the text box<p>" +
					"Welcome to our website. This is where you will view the extra details " +
					"about the parts of the screen that are highlighted. " +
					"Use the button on the right to proceed or the button on the left to go back.</p>" +
					"";
			document.getElementById("guideText").innerHTML = x;
			break;
		case 101:
			break;
		case 102:
			//x = "";
			//document.getElementById("guideText").innerHTML = x;
			resetClass("sidebarHeadingsR")
			
			break;
		case 103:
			resetClass("sidebarHeadingsL")
			if(currentP >= 3){
				resetClass("star");
			}
			break;
		case 104:
			resetClass("headerTop");
			resetClass("headerName");
			break;
		case 105:
			if(currentP == 0){
				resetClass("findResort");
			}
			resetClass("searchHeader");
			
			break;
		case 106:
			if(currentP == 2){
				resetClass("view0");
				resetClass("view1");
				resetClass("view2");
				resetClass("view3");
			}
			break;
		case 107:
			if(currentP == 3){
				resetClass("websiteLink");
			}
			break;
		case 108:
			
			break;
		case 109:
			if(currentP == 3){
				resetClass("equip");
			}
			break;
		case 110:
			if(currentP == 4){
				//resetClass("ski/snow"stuff); if troy gets the ski or snowboard workin then can do seperate
				resetClass("breadResort");
				resetClass("skiing");
				resetClass("boarding");
			}
			break;
		case 111:
			break;
		case 112:
			if(currentP == 3){
				resetClass("food");
			}
			break;
		case 113:
			if(currentP == 5){
				resetClass("breadResort");
			}
			break;
		case 114:
			if(currentP == 3){
				resetClass("sleep");
			}
			break;
		case 115:
			if(currentP == 6){
				resetClass("breadResort");
			}
			break;
		case 116:
			if(currentP == 3){
				resetClass("map");
			}
			break;
		case 117:
			if(currentP == 7){
				resetClass("breadResort");
			}
			break;
		case 118:
			if(currentP == 3){
				resetClass("routeMap");
			}
			break;
		case 119:
			if(currentP == 8){
				resetClass("breadResort");
			}
			break;
		default:
			break;
		}
		return 0;
	}
	resetClass = function(id){
		var replaceT = document.getElementById(id).className;
		replaceT = replaceT.replace(" redText","");
		replaceT = replaceT.replace(" redBac","");
		replaceT = replaceT.replace(" redBor","");
		
		document.getElementById(id).className = replaceT;
		//replaceT = document.getElementById(id).onclick;
		//if(replaceT == null){return 0;}
		//alert(replaceT);
		//replaceT = replaceT.replace(" overlayNext()","");
		//document.getElementById(id).onclick = replaceT;
	}
	overlayNext = function() {
		removeCur();
		text = localStorage.getItem("guide");
		var sequence = JSON.parse(text);
		if(sequence == null){return 0;}
		var index = sequence[0];
		if(index >= sequence.length-1){
			if (confirm('You have finished your current guide. Click yes to end it or no if you want to be able to check any previous tips')) {
				offGuide();
				return 0;
			}
		}else{
			index +=1;
		}
		sequence[0] = index;
		myJSON = JSON.stringify(sequence);
	    localStorage.setItem("guide", myJSON);
	    overlayCur();
	    return 0;
	}
	overlayPrev = function() {
		removeCur();
		text = localStorage.getItem("guide");
		var sequence = JSON.parse(text);
		if(sequence == null){return 0;}
		var index = sequence[0];
		if(index <= 1){			
			return 0;			
		}else{
			index -=1;
		}
		sequence[0] = index;
		myJSON = JSON.stringify(sequence);
	    localStorage.setItem("guide", myJSON);
	    overlayCur();
	    return 0;
	}
	resetSeq = function() {// reset the sequence
		var sequence = [];
		myJSON = JSON.stringify(sequence);
	    localStorage.setItem("guide", myJSON);	    
	    return 0;
	}
	/*function removeSeq(page) {
		text = localStorage.getItem("guide");
		var sequence = JSON.parse(text);
		var removed = false;
		var i = 0;
		while(!removed){
			if(sequence[i] == page){
				sequence.splice(i,1);
				removed = true;
			}
			i++;			
		}
		myJSON = JSON.stringify(sequence);
	    localStorage.setItem("guide", myJSON);
	    // make sure this function doesn't remain in the onclick after completion
	    // although that may be guaranteed because after changing page it reloads stuff anyway
	}*/
	/*function pauseOverlay(){// this will make to remove any classes that make the elements standout NOT DONE
		text = localStorage.getItem("guide");
		var sequence = JSON.parse(text);
		if(sequence == null){return 0;}
		if(sequence.length <= 1){return 0;}
		// make sure to remove an changes from overlayNext
		return 0;
	}*/
	createGuideSeq = function(){// the first element is the index I am currently at (start at 1) NOT DONE
		// etc for all the selections that will be available on the first page;
		
		// then if statements to read the values and then add numbers to the array depending
		// on what the user has selected
		
		var sequence = [1];//might move this to page specific
		sequence[0] = 1;
		sequence.push(100);
		sequence.push(104);
		sequence.push(105);
		sequence.push(106);
		sequence.push(107);
		sequence.push(103);
		sequence.push(102);
		if(document.getElementById("ownGearForm").value == "No"){
			sequence.push(109);
			sequence.push(110);
		}
		if(document.getElementById("favEatForm").value == "No"){
			sequence.push(112);
			sequence.push(113);
		}
		if(document.getElementById("stayForm").value == "No"){
			sequence.push(114);
			sequence.push(115);
		}
		
		sequence.push(116);
		sequence.push(117);
		sequence.push(118);
		sequence.push(119);
		sequence.push(101);
		
		
		myJSON = JSON.stringify(sequence);
	    localStorage.setItem("guide", myJSON);
	    document.location.href = "SinglePage.html";
	    return 0;
	}
	homeOverlay = function(){//probly gon move this into a switch statement in overcur PROBLY REMOVE
		text = localStorage.getItem("session");
		var currentP = JSON.parse(text).page;
		if(currentP != 0){
			alert("wrong page HOME"+currentP);
			return 0;
		}
		var toDo = [1,2,3,4,5,6];		
		document.getElementById("sidebarHeadingsR").className += " redText";
		document.getElementById("findResort").className += " redBac";
		x = " Here is the social media feed which will display much stuff dadadadadadada hopefully looks godddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfffddddd";
		document.getElementById("guideText").innerHTML = x;

		return 0;
	}
