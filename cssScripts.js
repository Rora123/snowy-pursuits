//Write Navigation Bar
	x =
	`<div id="overlay"><div id="overlayCont"><div tabindex="0" class="panel panel-default guideText" id="guideText"></div><button type="button" class="prev" onclick="overlayPrev()">Previous
	</button><button type="button" class="next" onclick="overlayNext()">Next</button></div>
	</div><nav class="navbar navbar-default navbar-static-top" id="headerTop" >
		<div class="container-fluid">
		<div class="navbar-header header">
		<a class="navbar-brand jsLink" id="headerName" onclick="moveToHome()">Snowy Pursuits</a>
		</div>
		<form class="navbar-form navbar-left" onsubmit="moveToSearch();return false;">
	        <div class="form-group">
	        	<input type="text" id="search text"class="form-control" placeholder="Enter a Resort Area/Name">
	        </div>
	        <button type="submit" id="searchHeader" class="btn btn-default">Search</button>
      	</form>
      	<div class="nav navbar-nav">
      	<button onclick="openForm()" id="newForm" class="btn btn-default overlayS">New guide</button>
      	<button onclick="onGuide()" id="overlayS" class="btn btn-default overlayS">Display Guide</button>
      	<button onclick="moveToRecomend()" id="newForm" class="btn btn-default overlayS">View Your Recommendations</button>
      	</div>      	
		<ul class="nav navbar-nav navbar-right">
			<li><a class="jsLink"onclick="moveToAdvice()">Travel Advice for `;
	text = localStorage.getItem("session");
	obj = JSON.parse(text);
	if(obj==null){
		x+="Australia";
	}else{
		x+=obj.country;
	}

	x+=`</a></li>
			<li>
			<form class="navbar-form">
				<select id="countryChange"class="form-control" onchange='moveToHome();setCountry()'>
					<option`;
								if(obj==null || obj.country=="Australia"){x+=' selected="selected"'};
	x+=`>Australia</option><option`;
								if(obj!=null && obj.country=="Japan"){x+=' selected="selected"'};
	x+=`>Japan</option>
				</select>
			</form>
			</li>
		</ul>
		</div>
	</nav>`;
	document.getElementById("navMenu").innerHTML = x;

//Write Footer
	x =`<footer class="footer">
		<div class="container-fluid text-center text-muted">
		<div class="col-md-3 "><span class="glyphicon glyphicon-home "></span> 99 High Street Sydney NSW 2052</div><div class="col-md-1">|</div>
		<div class="col-md-4"><span class="glyphicon glyphicon-earphone "></span> Telephone +99 9999 999 999</div><div class="col-md-1">|</div>
		<div class="col-md-3"><span class="glyphicon glyphicon-envelope "></span> Email@Email.co.za</div>
		</div>
		</footer>`;
	//document.getElementById("footer").innerHTML = x;