function start() {
	document.head.innerHTML += "<title>Made By PINARAX Mod By XCOMEL</title>";
	document.head.innerHTML += "<link rel='icon' href='https://pinarax.group/favicon.ico' type='image/gif' sizes='16x16'>";
	document.head.innerHTML += "<link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet'>";
	document.head.innerHTML += "<script src='https://code.jquery.com/jquery-latest.min.js' type='text/javascript'></script>";
	document.head.innerHTML += "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>";
	document.body.innerHTML += "<div class='container-fluid' style='width: 665px; padding-top: 50px;'><div class='panel panel-default'><div class='panel-heading' style='text-align: left;'><div class='form-group'><label for='inputsm'>JUMLAH EMAIL : </label> <span id='hitungYuk'>0</span></div><span class='btn btn-default btn-xs' id='pcreate' onclick='create()' style='width: 150px;'><b>Create Email</b></span><span class='btn btn-danger btn-xs' onclick='reset()' style='width: 150px; float: right;'><b>Reset</b></span></div><div class='panel-body' id='wadaeemail' style='display: none;'>";
}

function reset() {
	document.getElementById("wadaeemail").innerHTML = "";
	document.getElementById("wadaeemail").setAttribute("style", "display: none;");
	for (var intervalcek = 1; intervalcek < 99999; intervalcek++) {
		window['clearInterval'](intervalcek);
	}
}

function create() {
	hitungYuk = document.getElementById("hitungYuk").textContent;
	document.getElementById("wadaeemail").setAttribute("style", "");
	document.getElementById("pcreate").setAttribute("disabled", "");
	var cmail = "https://m.kuku.lu/index.php?";
	$.get(cmail, {
		"action": "addMailAddrByAuto",
		"nopost": "1",
		"by_system": "1",
		"UID_enc": "C2ujKU%2Fn7Um3mmFGn6jGnErbxeIBvcY6qA3AMvxBKN2sJ5C6AVGE6uka2KPnap2s",
		"csrf_token_check": "fc931e8618f934356c8adf191d9f9218",
		"csrf_subtoken_check": "c728ba94f3165b6a7805c2d600fa45e7"
	}, function(response) {
		$('#pcreate').removeAttr('disabled');
		var email = response.split("OK:")[1];
		hitungYuk++;
		$('#hitungYuk').html(hitungYuk);
		$("<div class='input-group'><input type='text' class='form-control input-sm' id='kode-"+email+"' value='"+email+"|Waiting...' readonly style='width: 600px;'></div>").prependTo($('#wadaeemail')).slideDown(1000);
		checkcode(''+email+'');
	});
}

function checkcode(imel) {
	var intervalcek = setInterval(function() {
		var boxmail = "https://m.kuku.lu/recv._ajax.php?";
		$.get(boxmail, {
			"q": imel,
			"nopost": "1"
		}, function(response) {
			var aa = response.split('mailnumlist = "')[1];
			var bb = aa.split('";')[0];
			if(bb === "" || bb === null) {} else {
				var cc = response.split('<span style="overflow-wrap: break-word;word-break: break-all;">')[1];
				var dd = cc.split(' ')[0];
				document.getElementById('kode-'+imel).value = imel+'|'+dd;
				clearInterval(intervalcek);
			}
		});
	}, 2000);
}