function start() {
	document.head.innerHTML += "<title>Made By PINARAX Mod By XCOMEL</title>";
	document.head.innerHTML += "<link rel='icon' href='https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico' type='image/gif' sizes='16x16'>";
	document.head.innerHTML += "<link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet'>";
	document.head.innerHTML += "<script src='https://code.jquery.com/jquery-latest.min.js' type='text/javascript'></script>";
	document.head.innerHTML += "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'></script>";
	document.body.innerHTML += " <div class='container mt-2' style='width: 100%;'> <div class='row '> <div class='col-md-5'> <div class='form-group'> <textarea id='linkuid' class='form-control' name='text' placeholder='YOUR LINK OR YOUR UID'></textarea> </div> <div class='text-center mt-1'> <div class='btn-group mr-2' role='group' aria-label='First group'> <button type='button' class='btn btn-success btn-sm' onclick='jojolink()'>LINK</button> <button type='button' class='btn btn-primary btn-sm' onclick='jojouid()'>UID</button> </div> <div class='btn-group mr-2' role='group' aria-label='Second group'> <button type='button' class='btn btn-danger btn-sm' onclick='resetlinku()'>Reset</button> </div> </div> <div id='wadahlinkuid' style='display: none;'></div> </div> <div class='col-md-5'> <div class='panel panel-default'><div class='panel-heading' style='text-align: left;'><div class='form-group'><label for='inputsm'>JUMLAH EMAIL</label><input type='text' class='form-control input-sm' id='bulkmail' placeholder='30'><br> TOTAL : <span id='hitungYuk'>0</span></div><div class='form-group'><div class='btn-group mr-2' role='group' aria-label='First group'><button type='button' class='btn btn-success btn-sm' id='pcreate' onclick='create()'>Create Email</button><button type='button' class='btn btn-primary btn-sm' id='bcreate' onclick='createbulk()'>Create Bulk</button></div><div class='btn-group mr-2' role='group' aria-label='Second group'><button type='button' class='btn btn-danger btn-sm' onclick='reset()'>Reset</button></div></div></div><div class='form-group'><div class='panel-body' id='wadaeemail' style='display: none;'></div></div></div> </div> </div> </div>";
}

function reset() {
	$('#hitungYuk').html("0");
	document.getElementById("wadaeemail").innerHTML = "";
	document.getElementById("wadaeemail").setAttribute("style", "display: none;");
	for (var intervalcek = 1; intervalcek < 99999; intervalcek++) {
		window['clearInterval'](intervalcek);
	}
}

function createbulk() {
  banyak = document.getElementById("bulkmail").value;
  if (banyak == null || banyak == "") {
  alert("Masukkan Jumlah Email yang dibuat !!!");
  $('#bcreate').removeAttr('disabled');
  }else{
  document.getElementById("wadaeemail").setAttribute("style", "");
  document.getElementById("bcreate").setAttribute("disabled", "");
  i = 0;
  hitungBULK = document.getElementById("hitungYuk").textContent;
  startbulk();  
  };
}

function startbulk(){
	i++;
    if( i < banyak ){
	var cmail = "https://m.kuku.lu/index.php?";	
	$.get(cmail, {
		"action": "addMailAddrByAuto",
		"nopost": "1",
		"by_system": "1",
		"UID_enc": "C2ujKU%2Fn7Um3mmFGn6jGnErbxeIBvcY6qA3AMvxBKN2sJ5C6AVGE6uka2KPnap2s",
		"csrf_token_check": "fc931e8618f934356c8adf191d9f9218",
		"csrf_subtoken_check": "c728ba94f3165b6a7805c2d600fa45e7"
	}, function(response) {
		var email = response.split("OK:")[1];
		hitungBULK++;
		$('#hitungYuk').html(hitungBULK);
		$("<div class='input-group'><input type='text' class='form-control input-sm' id='kode-"+email+"' value='"+email+"|Waiting...' readonly style='width: 600px;'></div>").prependTo($('#wadaeemail')).slideDown(1000);
		checkcode(''+email+'');
		setTimeout( startbulk, 200 );
	});

    }else {
       setTimeout( startbulk, 200 );
       $('#bcreate').removeAttr('disabled');
	}
}

function create() {
	hitungSIJI = document.getElementById("hitungYuk").textContent;
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
		hitungSIJI++;
		$('#hitungYuk').html(hitungSIJI);		
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

function jojolink() {
    document.getElementById("wadahlinkuid").setAttribute("style", "margin-top:10px");
    var data = $('#linkuid').val();
    var list = data.split('\n');
    var lingling = "";
    for (var i = 0, l = list.length; i < l; i++) {
        ;
        ling = list[i];
        lingling += "<div class='input-group'><input type='text' class='form-control input-sm' value='" + ling + "' readonly></div>";
    }
    $('#wadahlinkuid').html(lingling);
}

function jojouid() {
    document.getElementById("wadahlinkuid").setAttribute("style", "margin-top:10px");
    var list = $('#linkuid').val();
    var data = list.split('\n');
    var i;
    var ake = data.length;
    var duid = ['0_49', '50_99', '100_149', '150_199', '200_249', '250_299', '300_349', '350_399', '400_449', '450_499', '500_549', '550_599', '600_649', '650_699', '700_749', '750_799', '800_849', '850_899', '900_949', '950_999', '1000_1049', '1050_1099', '1100_1149', '1150_1199', '1200_1249', '1250_1299', '1300_1349', '1350_1399', '1400_1449', '1450_1499'];
    var x;
    for (x of duid) {
        var uid = x.split("_");
        var datauid = "";
        if (ake >= uid[1]) {
            for (i = uid[0]; i <= uid[1]; i++) {
                datauid += data[i] + ",";
            }
            $("<div class='input-group'><input type='text' class='form-control input-sm'  value='" + datauid + "' readonly></div>").prependTo($('#wadahlinkuid')).slideDown(1000);
        }
    }
}
function resetlinku() {
    $('#wadahlinkuid').html("");
    $('#linkuid').val("");
}
