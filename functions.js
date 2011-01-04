var user = 'admin';
var temp = new Date();
var today = temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate();

function show(id){
	document.getElementById(id).style.display = '';
}

function hide(id){
	document.getElementById(id).style.display = 'none';
}

function isExpand(divid,obj){
	if(document.getElementById(divid).style.display == ''){
		divClose(divid,obj);
		if (divid == 'container-1'){
			show('latestDocs');
			show('myDocs');
		}
	}else{
		divOpen(divid,obj);
		if (divid == 'container-1'){
			hide('latestDocs');
			hide('myDocs');
		}
	}
}
function divOpen(divid,obj){
	show(divid);
	obj.className = 'mod-collapse-closed';
}
function divClose(divid,obj){
	hide(divid);
	obj.className = 'mod-collapse';
}

function addHistoryEvent(sid,hid){
	if(document.getElementById(sid).style.display != ''){
		show(sid);
		document.getElementById(sid+'tab').className='ui-tabs-selected';
		hide(hid);
		document.getElementById(hid+'tab').className='';
	}
}

function addOption(id,txt,val){
	var elOptNew = document.createElement('option');
	elOptNew.text = txt;
	elOptNew.value = val;
	var elSel = document.getElementById(id);

	elSel.add(elOptNew);
}
function insertOption(id,txt,val){
	var elOptNew = document.createElement('option');
	elOptNew.text = txt;
	elOptNew.value = val;
	var elSel = document.getElementById(id);

	elSel.add(elOptNew,0);
}

function getOptionSelected(id){
	var returnStr = '';
	var elSel = document.getElementById(id);
	var i;
	for (i = elSel.length - 1; i>=0; i--) {
		if (elSel.options[i].selected) {
			returnStr = returnStr + elSel.options[i].text + ':' + elSel.options[i].value + ':' + i + ',';
		}
	}
	returnStr = returnStr.substring(0,returnStr.length -1);
	return returnStr;
}
function removeOptionSelected(id){
	var elSel = document.getElementById(id);
	var i;
	for (i = elSel.length - 1; i>=0; i--) {
		if (elSel.options[i].selected) {
			elSel.remove(i);
		}
	}
}
function removeOptionsByIndex(id,index){
	var elSel = document.getElementById(id);
	elSel.remove(index);
}
function removeUser(id){
	addOption('ulist',document.getElementById(id).cells[0].innerHTML,id);
	deleteRow('tbulist',id);
	tableEvenRowStyleUpdateByClass('tbulist','listeven',1);
}
function removeUser2(tbid,listid,id){
	addOption(listid,document.getElementById(id).cells[0].innerHTML,id);
	deleteRow(tbid,id);
}

function addSelectedUser(tbId,id){
	var data = getOptionSelected(id);
	var tempdata;
	var dataList = data.split(',');
	for(m=0;m<dataList.length;m++){
		tempdata = dataList[m].split(':');
		addUser(tbId,tempdata[0],tempdata[1]);
		removeOptionsByIndex(id,tempdata[2]);
	}
	tableEvenRowStyleUpdateByClass(tbId,'listeven',1);
}
function addUser(tbId,name,id){
	var cells = new Array();
	cells[0] = name;
	cells[1] = '<INPUT type=checkbox CHECKED>';
	cells[2] = '<INPUT type=checkbox CHECKED>';
	cells[3] = '<img src="images/icon_delete.gif" onclick="removeUser(\'' + id +'\');">';
	tableAddRow(tbId,id,cells);
}
function addSelectedUser2(tbId,id){
	var data = getOptionSelected(id);
	var tempdata;
	var dataList = data.split(',');
	for(m=0;m<dataList.length;m++){
		tempdata = dataList[m].split(':');
		addUser2(tbId,id,tempdata[0],tempdata[1]);
		removeOptionsByIndex(id,tempdata[2]);
	}
}
function addUser2(tbId,listid,name,id){
	var cells = new Array();
	cells[0] = name;
	cells[1] = '&nbsp;';
	cells[2] = '<img src="images/icon_delete.gif" onclick="removeUser2(\'' + tbId +'\',\'' + listid +'\',\'' + id +'\');" style="cursor:pointer;">';
	tableAddRow(tbId,id,cells);
}
function addMember(){
	var cells = new Array();
	cells[0] = '<BUTTON class="classDisabled btn01_mouseout" onclick=";"><IMG style="CURSOR: pointer" border=0 align=absMiddle src="images/tick.png">&nbsp;已啟用</BUTTON>&nbsp;&nbsp;<BUTTON class=btn01_mouseout onclick=";"><IMG style="CURSOR: pointer" border=0 align=absMiddle src="images/edit.gif">&nbsp;編輯</BUTTON>';
	cells[1] = $('#newloginid').val();
	cells[2] = $('#newdisplayname').val();
	cells[3] = '&nbsp;';
	tableAddRow('mlist','',cells);
	$('#newitemU').hide();
	$('#newloginid').val('');
	$('#newdisplayname').val('');
}
function pageInit(){
	document.getElementById('currentUser').innerHTML = user;
	document.getElementById('CRdate').value = today;
	document.getElementById('CRmember').value = user;
	var flag = location.href.substr(location.href.lastIndexOf("#")+1,location.href.length);
	if(flag == 'searchResult'){
		searchMode();
	}else{
		natureMode();
	}
}
function adminPageInit(){
	document.getElementById('currentUser').innerHTML = user;
}

function createDoc(){
	addMode();
}

function saveDoc(){
	var CRcusName = document.getElementById('CRcusName').value ;
	if (CRcusName == ''){
		alert('請輸入客戶名稱');
	}else{
		save('my0');
		save('latest0');
		saveMode();
	}
	function save(id){
		document.getElementById(id+'user').innerHTML = user;
		document.getElementById(id+'Name').innerHTML = today.replace(/\//g,"") + '_' + CRcusName + '_Call Report';
		var nowtemp = new Date();
		var now = nowtemp.getHours() + ":" + nowtemp.getMinutes() + ":" + nowtemp.getSeconds();
		document.getElementById(id+'date').innerHTML = today + ' ' + now;
	}
}

function saveMode(){
	alert('存檔成功！');
	show('my0');
	hide('my5');
	show('latest0');
	hide('latest5');
	
	natureMode();
}

function addMode(){
	hide('searchResult');
	show('addDoc');
	hide('latestDocs');
	hide('myDocs');
}

function searchMode(){
	var flag = location.href.substr(location.href.lastIndexOf("#")+1,location.href.length);
	if(flag != 'searchResult'){
		location.href = location.href + '#searchResult';
	}
	show('searchResult');
	hide('addDoc');
	hide('latestDocs');
	hide('myDocs');
	divOpen('documents3',document.getElementById('searchPanel'));
	window.scrollTo(0,0);
}

function natureMode(){
	hide('searchResult');
	hide('addDoc');
	show('latestDocs');
	show('myDocs');
}

function uploadFile(){
	var fpath = document.getElementById('f1').value;
	var fname = fpath.substr(fpath.lastIndexOf("\\")+1,fpath.length);
	var fid = fname.substr(0,fname.lastIndexOf("."));

	var cells = new Array();

	cells[0] = '<a href="#">' + fname +'</a>';
	cells[1] = '<img src="images/icon_delete.gif" onclick="deleteRow(\'filelist\',\''+fid+'\');" style="cursor: pointer;">';
	
	tableAddRow('filelist',fid,cells);
	//tableEvenRowStyleUpdateByClass('filelist','listeven',0);
	
	document.getElementById('f1').value='';
	document.getElementById('f1').outerHTML='<input type="file" name="F1" id="f1" size="20">';
}

function tableAddRow(tbId,trId,cells){
	var tbObj = document.getElementById(tbId);
	var tr = tbObj.insertRow(tbObj.rows.length);
	if (trId != ''){
		tr.setAttribute("id", trId);
	}
	var td;
	for(i=0;i<cells.length;i++){
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = cells[i];
	}
}
function tableEvenRowStyleUpdateByColor(tbId,color,isHasTH){
	var tbObj = document.getElementById(tbId);
	for(i=0+isHasTH;i<tbObj.rows.length;i++){
		if(i % 2 == 1){
			tbObj.rows[i].style.backgroundColor = color;
		}else{
			tbObj.rows[i].style.backgroundColor = '';
		}
	}
}
function tableEvenRowStyleUpdateByClass(tbId,className,isHasTH){
	var tbObj = document.getElementById(tbId);
	for(i=0+isHasTH;i<tbObj.rows.length;i++){
		if((i+isHasTH) % 2 == 1){
			tbObj.rows[i].className = className;
		}else{
			tbObj.rows[i].className = ''
		}
	}
}
function deleteRow(tbId,trId){
	var tb = document.getElementById(tbId);
	tb.deleteRow(document.getElementById(trId).rowIndex);
}
function toggle(id) {
	if ($("#"+id+"_tog").attr("src").indexOf("expand_icon.gif")>-1) {
		$("#"+id+"_tog").attr("src","images/collapse_icon.gif");
		$("#"+id+"_sub").fadeIn("fast");
	}
	else {
		$("#"+id+"_tog").attr("src","images/expand_icon.gif");
		$("#"+id+"_sub").fadeOut("fast");
	}
}
function del(id) {
	$("#"+id).remove();
}
var replaceId = 'admin';
function rptMode(text,id) {
	$('#btnQuery').unbind('click');
	$('#contents4').show();$('#contents0,#contents2').hide();
	$('#sitemap').text(text);
	addOption('subjects','--','--');
	document.getElementById('subjects').options[5].selected = true;
	document.getElementById('subjects').remove(5);
	$('#result').hide();
	$('#btnQuery').bind('click',id,function(){
		var data = getOptionSelected('subjects').split(':');
		if(data != ""){
			$('#result').show();
			$('.results').each(function(i){
				if((i+1)==id){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		
			$("td:contains('"+replaceId+"')").each(function(){
				if($(this).text().length<20){
					$(this).replaceWith('<td>' + data[0] + '</td>');
				}
			});
			replaceId = data[0];
		}else{
			alert('請選擇使用者');
		}
		return false;
	});
}
