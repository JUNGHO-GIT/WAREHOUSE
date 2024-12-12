/**
 * Created by jade on 2014-12-01.
 */
(function (a) {(jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));})(navigator.userAgent || navigator.vendor || window.opera);
if (jQuery.browser.mobile) {
  var G_gridPageLimit = 500;
}
else {
  var G_gridPageLimit = 100;
}
var G_ScreenHeight = parseInt($(window).height(), 10) - 140;
var G_subMenu = new Array();
var G_subMenuLink = new Array();
var G_subMenuMargin = new Array();
var G_perms = "/10//11//40//41//50/";
var G_curPage = "";

var G_w = "";
var G_h = "";
var G_curRow = "";
var G_update = "";
var G_excelException = "/94/86/176/211/"; //엑셀 다운로드 무제한 권한
var G_grid01Order = "";
var G_grid02Order = "";
var G_grid03Order = "";
var G_grid04Order = "";
var G_grid05Order = "";
var G_Api = "#sgdowk$.dfwrew12ds3zlog-";
var G_enableFile = "/.doc/.docx/.xls/.xlsx/.ppt/.pptx/.pdf/.gif/.jpg/.png/.txt/.log/.zip/.xml/.csv/.CSV/.DOC/.DOCX/.XLS/.CLSX/.PPT/.PPTX/.PDF/.GIF/.JPG/.PNG/.TXT/.LOG/.ZIP/.XML/.DWG/.dwg/.STEP/.step/.X_T/.x_t/.7z/.7Z/.STP/.stp/";  // 파일 업로드 가능한 확장자

var G_calendar = {
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  weekHeader: 'Wk',
  dateFormat: 'yy-mm-dd',														// 날짜형식(2012-03-03)
  //showOn:"button",
  buttonImage: "/img/calendar.png",
  buttonImageOnly: false,
  autoSize: false,																	//자동리사이즈(false 이면 상위 정의에 따름)
  changeMonth: true,															// true이면 월변경, false이면 월변경못함
  changeYear: true,																// true이면 년변경, false이면 년변경못함
  showMonthAfterYear: true,													//년 뒤에 월 표시
  buttonImageOnly: false,														//이미지표시
  yearRange: 'c-99:c+99',													//1990년부터 2020년까지
  maxDate: '+2Y',																	// 오늘부터6년후날짜까지만, '+0d' 오늘 이전 날짜만 선택
  minDate: '-10y'

};

var G_calendar2 = {
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  weekHeader: 'Wk',
  dateFormat: 'yy-mm-dd',														// 날짜형식(2012-03-03)
  //showOn:"button",
  numberOfMonths: [1, 2],
  buttonImage: "/img/calendar.png",
  buttonImageOnly: false,
  autoSize: false,																	//자동리사이즈(false 이면 상위 정의에 따름)
  changeMonth: true,															// true이면 월변경, false이면 월변경못함
  changeYear: true,																// true이면 년변경, false이면 년변경못함
  showMonthAfterYear: true,													//년 뒤에 월 표시
  buttonImageOnly: false,														//이미지표시
  yearRange: 'c-199:c+199',													//1990년부터 2020년까지
  maxDate: '+20Y',																	// 오늘부터6년후날짜까지만, '+0d' 오늘 이전 날짜만 선택
  minDate: '-30y'

};
function fnSetYear() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  for (k = year; k >= 1994; k--) {
    var opt = "<option value='" + k + "'>" + k + "년</option>";
    $(`#findSYear`).append(opt);
    $(`#findEYear`).append(opt);
  }
  for (p = 1; p <= 12; p++) {
    var vM = p;
    if (p < 10) vM = "0" + p;
    var chk = "";
    if (month == p) chk = " SELECTED";
    var opt = "<option value='" + vM + "'" + chk + ">" + vM + "월</option>";
    $(`#findSMonth`).append(opt);
    $(`#findEMonth`).append(opt);
  }
};


function fnSleep(num) {	//[1/1000초]
  var now = new Date();
  var stop = now.getTime() + num;
  while (true) {
    now = new Date();
    if (now.getTime() > stop) return;
  }
};

function fnSetTm(t, target) {
  if (t) {
    var divT = t.split(":");
    if (divT[0] < 10) divT[0] = "0" + parseInt(divT[0], 10);
    if (divT[1] < 10) divT[1] = "0" + parseInt(divT[1], 10);
    t = divT[0] + ":" + divT[1];
    $("#" + target).val(t);
  }
};

function fnSetTmFormat(tm) {
  if (tm) {
    var hr = tm.substr(0, 2);
    var min = tm.substr(2, 2);

    return hr + ":" + min;
  }
};

//## 행당월의 처음날과 마지막날을 반환
function fnSetMonth(mnth, dt) {
  var divDt = dt.split("-");

  var nextMnth = parseInt(mnth, 10) + 1;
  if (nextMnth < 10) nextMnth = '0' + nextMnth;
  var endDt = divDt[0] + '-' + nextMnth + '-01';
  endDt = fnDateAdd(endDt, -1);

  if (mnth < 10) mnth = '0' + mnth;
  var startDt = divDt[0] + '-' + mnth + '-01';

  $(`#startDt`).val(startDt);
  $(`#endDt`).val(endDt);
  //return terms;
};

function fnDateAdd(sDate, nDays) {
  var divDt = sDate.split("-");
  var yy = divDt[0];
  var mm = divDt[1];
  var dd = divDt[2];

  d = new Date(yy, mm - 1, parseInt(dd, 10) + nDays);

  yy = d.getFullYear();
  mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
  dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

  return '' + yy + '-' + mm + '-' + dd;
};

function fnToday() {
  var now = new Date();
  var year = now.getFullYear();
  var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();

  var chan_val = year + '-' + mon + '-' + day;

  return chan_val;
};

function fnYearMonth() {
  var now = new Date();
  var year = now.getFullYear();
  var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  /* var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();*/

  var yyyymm = year + '-' + mon;

  return yyyymm;
};


function fnTodayMin() {
  var now = new Date();
  var hour = now.getHours() > 9 ? '' + now.getHours() : '0' + now.getHours();
  var min = now.getMinutes() > 9 ? '' + now.getMinutes() : '0' + now.getMinutes();

  var chan_val = hour + ':' + min;

  return chan_val;
};


function fnGetLeftMenus(cd) {
  var leftMenu = '';
  for (c = 0; c < G_subMenu[cd].length; c++) {
    leftMenu += '<div onclick="fnExistDestPerms(\'' + G_subMenuLink[cd][c] + '\')"><img src="/img/folder.jpg"> ' + G_subMenu[cd][c] + '</div>';
  }
  $(`#_curSubMenu`).html(leftMenu);
  var siteLinks = fnMkSiteLink(G_link);
  $(`#_siteLink`).html(siteLinks);

};

function fnShowSubMenu(cd) {
  var subPage = '';
  var leftMenu = '';
  for (c = 0; c < G_subMenu[cd].length; c++) {
    if (c == 0) subPage = '<div style="float:left;margin-right:10px;margin-top:2px;margin-left:' + G_subMenuMargin[cd] + 'px;">| </div>';
    subPage += '<div onclick="fnExistDestPerms(\'' + G_subMenuLink[cd][c] + '\')" style="float:left;margin-right:5px;cursor:pointer;margin-top:2px;"> ' + G_subMenu[cd][c] + '</div><div onclick="fnMainOpen(\'' + G_subMenuLink[cd][c] + '\',\'' + G_subMenuLink[cd][c] + '\');" style="float:left;margin-right:10px;margin-top:2px;cursor:pointer;"> <img src="/img/newWin.png" style="vertical-align:middle"> </div><div style="float:left;margin-right:10px;margin-top:2px;"> | </div>';
  }
  $(`#_subMenu`).html(subPage);
  $(`#_subMenu`).show(100);
  //alert(subPage);
};

function fnStaySubMenu() {
  $(`#_subMenu`).show();
};

function fnHideSubMenu() {
  $(`#_subMenu`).hide();
};

function fnSetCurMenu(cd) {
  $('#_mainMenu div:nth-child(' + cd + ')').css("color", "#186096");
  $('#_mainMenu div:nth-child(' + cd + ')').css("background-color", "#FFF");
  $('#_mainMenu div:nth-child(' + cd + ')').css("height", "31px");
  $('#_mainMenu div:nth-child(' + cd + ')').css("margin-top", "2px");
};

function fnStripSlash(str) {
  var rs;
  var divStr = "";
  for (k = 0; k < 10; k++) {
    str = str.split("\\\\").join("\\");
  }

  rs = str.split("\^").join("^");
  return rs;
  //for(c=0; c<divStr.length; c++) {
  //    rs += divStr[c] + "\ ";
  //}
};

function fnMainOpen(target, winName) {
  window.open(target, winName, "width=1024,height=950,left:200,resizable=0, scrollbars=1");
};
//## 페이지 이동
function fnGoPage2(target) {
  window.open(target, "GIRO", "width=1024,height=950,left:200,resizable=0, scrollbars=1");
  return;
};

//## 권한 체크
function fnCheckAuth(auth) {
  if (auth.STATUS == "SESSION_OFF") {
    alert("Session이 종료 되었습니다.\n다시 로그인 하시기 바랍니다");
    fnGoPage("logout.post.php");
    return;
    fnGoPage("logout.post.php");
    return;
  }
};

//## form Reset
function fnGReset(layer, except) {

  var txtEle = $("#" + layer + " input");
  for (let i = 0; i < txtEle.length; i++) {
    if (except == undefined) $(txtEle[i]).val("");
    else {
      if (except.indexOf("/" + $(txtEle[i]).attr("id") + "/") < 0) $(txtEle[i]).val("");
    }
  }
  var areaEle = $("#" + layer + " textarea");
  for (let i = 0; i < areaEle.length; i++) {
    if (except == undefined) $(areaEle[i]).val("");
    else {
      if (except.indexOf("/" + $(areaEle[i]).attr("id") + "/") < 0) $(areaEle[i]).val("");
    }
  }

  var selEle = $("#" + layer + " select");
  for (let i = 0; i < selEle.length; i++) {
    if (except == undefined) $(selEle[i]).val("");
    else {
      if (except.indexOf("/" + $(selEle[i]).attr("id") + "/") < 0) $(selEle[i]).val("");
    }
  }

  var radEle = $("#" + layer + " radio");
  for (let i = 0; i < radEle.length; i++) {
    if (except == undefined) {
      $(radEle[i]).prop('checked', function () {
        return this.getAttribute('checked') == 'checked';
      });
    }
    else {
      if (except.indexOf("/" + $(radEle[i]).attr("id") + "/") < 0) {
        $(radEle[i]).prop('checked', function () {
          return this.getAttribute('checked') == 'checked';
        });
      }
    }
  }

  var chkEle = $("#" + layer + " checkbox");
  for (let i = 0; i < chkEle.length; i++) {
    if (except == undefined) $(chkEle[i]).prop("checked", false);
    else {
      if (except.indexOf("/" + $(radEle[i]).attr("id") + "/") < 0) $(chkEle[i]).prop("checked", false);
    }
  }

};

//## 조회 CC 찾기
function fnSetFindCC(t) {
  var valUrl = "./action/common/listCC.php";
  var findStr = "";
  var curVal = G_userId;
  if (t == undefined) var target = "findCC";
  else var target = t;
  var showStr = "CC";
  fnFindComboWithParam(valUrl, findStr, curVal, target, showStr);
};

//## 지점별 CC 찾기
function fnSetFindCCatDaily(val) {
  var valUrl = "./action/common/listCCatDaily.php";
  var findStr = "findPart=" + val;
  var target = "findCC";
  var showStr = "CC";
  var curVal = "";
  fnFindComboWithParam(valUrl, findStr, curVal, target, showStr);
};
//## APDCALL 찾기
function fnSetFindAPDCALLatDaily(val) {
  var valUrl = "./action/common/listAPDCALLatDaily.php";
  var findStr = "findPart=" + val;
  var target = "findAPDCALL";
  var showStr = "APD";
  var curVal = "";
  fnFindComboWithParam(valUrl, findStr, curVal, target, showStr);
};
//## CC별 병원 찾기
function fnSetHospitalwithCC(I00USRSEQ) {
  var valUrl = "./action/common/listHospitalWithCC.php";
  var findStr = "I00USRSEQ=" + I00USRSEQ;
  var curVal = '';
  var showStr = "Hospital";
  var target = 'findHSPT';
  fnFindComboWithParam(valUrl, findStr, curVal, target, showStr);
};

//## 수정모드로 변경
function fnEditMode(layer, onOff, except) {

  var txtEle1 = $("#" + layer + " input");

  for (let i = 0; i < txtEle1.length; i++) {
    if ($(txtEle1[i]).attr("type") != "checkbox" && $(txtEle1[i]).attr("type") != "radio") {
      if (onOff == "on") {
        if ($(txtEle1[i]).prop("class") != "readOnlyBox") $(txtEle1[i]).attr("class", "inputBox");
      }
      else {
        if ($(txtEle1[i]).prop("class") != "readOnlyBox") {
          if (except == undefined) $(txtEle1[i]).attr("class", "readBox");
          else {
            //alert(except+":"+$(txtEle1[i]).attr("id"));
            if (except.indexOf("/" + $(txtEle1[i]).attr("id") + "/") < 0) $(txtEle1[i]).attr("class", "readBox");
            else {
              $(txtEle1[i]).attr("class", "inputBox");
            }
          }
        }
      }
    }
  }

  var txtEle2 = $("#" + layer + " select");

  for (let i = 0; i < txtEle2.length; i++) {
    if (onOff == "on") $(txtEle2[i]).attr("class", "inputBox");
    else $(txtEle2[i]).attr("class", "readBox");
  }

  var txtEle3 = $("#" + layer + " textarea");

  for (let i = 0; i < txtEle3.length; i++) {
    if (onOff == "on") $(txtEle3[i]).attr("class", "inputTextBox");
    else $(txtEle3[i]).attr("class", "readTextBox");
  }

  if (onOff == "on") onOff = false;
  else onOff = true;
  fnReadMode(layer, onOff, except);
  return;
};

function fnReadMode(layer, onOff, except) {

  var txtEle1 = $("#" + layer + " input");

  for (let i = 0; i < txtEle1.length; i++) {
    if (except == undefined) {
      $(txtEle1[i]).prop("readOnly", onOff);
    }
    else {
      if (except.indexOf("/" + $(txtEle1[i]).attr("id") + "/") < 0) $(txtEle1[i]).prop("readOnly", onOff);
    }
  }

  var txtEle2 = $("#" + layer + " select");

  for (let i = 0; i < txtEle2.length; i++) {
    $(txtEle2[i]).prop("readOnly", onOff);
  }
  return;
};

//## 환자 찾기
function fnSetPatient(C20PTNAME, I00PTCODE) {
  var valUrl = "./action/common/listPatient.php";
  var findStr = C20PTNAME;
  var curVal = I00PTCODE;
  var showStr = "Patient";
  var target = "I00PTCODE";
  fnFindCombo(valUrl, findStr, curVal, target, showStr);
};

function fnSetCallPatient(C20PTNAME, I00PTCODE) {
  var valUrl = "./action/common/listCallPatient.php";
  var findStr = C20PTNAME;
  var curVal = I00PTCODE;
  var showStr = "Patient";
  var target = "I00PTCODE";
  fnFindCombo(valUrl, findStr, curVal, target, showStr);
};

function fnGetList(e) {
  if (e.keyCode != "13") {
    return; // 엔터일때만 수행
  }
  fnGetList01();
};

//## 병원 찾기
function fnSetHospital(C50HSPTNM, I00HSPSEQ, e) {

  if (e.keyCode != "13") {
    return; // 엔터일때만 수행
  }
  var valUrl = "./action/common/listHospital.php";
  var findStr = C50HSPTNM;
  var curVal = I00HSPSEQ;
  var target = "I00HSPTCD";
  var showStr = "Hospital";

  fnFindCombo(valUrl, findStr, curVal, target, showStr);
};

function fnShowHospital(C50HSPTNM, I00HSPSEQ) {
  var valUrl = "./action/common/listHospital.php";
  var findStr = C50HSPTNM;
  var curVal = I00HSPSEQ;
  var showStr = "Hospital";
  var target = "I00HSPTCD";
  fnFindCombo(valUrl, findStr, curVal, target, showStr);
};


//## 병원 찾기-설치/재설치
function fnSetHospitalInstall(C50HSPTNM, I00HSPSEQ, e) {

  if (e.keyCode != "13") {
    return; // 엔터일때만 수행
  }
  var valUrl = "./action/common/listHospitalInstall.php";
  var findStr = C50HSPTNM;
  var curVal = I00HSPSEQ;
  var showStr = "Hospital";
  var target = "I00HSPTCD";
  fnFindCombo(valUrl, findStr, curVal, target, showStr);
};

function fnShowHospitalInstall(C50HSPTNM, I00HSPSEQ) {
  var valUrl = "./action/common/listHospitalInstall.php";
  var findStr = C50HSPTNM;
  var curVal = I00HSPSEQ;
  var showStr = "Hospital";
  var target = "I00HSPTCD";
  fnFindCombo(valUrl, findStr, curVal, target, showStr);
};


//## 시리얼 찾기
function fnSetSerial(ITEMNM, I00INOSEQ, target, target1, target2, target3, e) {

  if (e.keyCode != "13") {
    return; // 엔터일때만 수행
  }
  var valUrl = "./action/common/listItems.php";
  var findStr = ITEMNM;
  var curVal = I00INOSEQ;
  var showStr = "Serial NO";
  fnFindCombo(valUrl, findStr, curVal, target, showStr);
  if (target1) fnFindCombo(valUrl, findStr, curVal, target1, showStr);
  if (target2) fnFindCombo(valUrl, findStr, curVal, target2, showStr);
  if (target3) fnFindCombo(valUrl, findStr, curVal, target3, showStr);


};

function fnShowSerial(ITEMNM, I00INOSEQ, target) {
  var valUrl = "./action/common/listItems.php";
  var findStr = ITEMNM;
  var curVal = I00INOSEQ;
  var showStr = "Serial NO";
  fnFindCombo(valUrl, findStr, curVal, target, showStr);
};


function fnMoveMonth(f) {
  var sYr = $(`#findSYear`).val();
  var eYr = $(`#findEYear`).val();
  var sMonth = $(`#findSMonth`).val();
  var eMonth = $(`#findEMonth`).val();

  if (f == "back") {
    if (eMonth == "01") {
      $(`#findEMonth`).val("12");
      $(`#findEYear`).val(parseInt($(`#findEYear`).val(), 10) - 1);
    }
    else {
      var tMnth = parseInt($(`#findEMonth`).val(), 10) - 1;
      if (tMnth < 10) tMnth = "0" + tMnth;
      $(`#findEMonth`).val(tMnth);
    }
    if (sMonth == "01") {
      $(`#findSMonth`).val("12");
      $(`#findSYear`).val(parseInt($(`#findSYear`).val(), 10) - 1);
    }
    else {
      var tMnth = parseInt($(`#findSMonth`).val(), 10) - 1;
      if (tMnth < 10) tMnth = "0" + tMnth;
      $(`#findSMonth`).val(tMnth);

    }
  }
  else {
    if (eMonth == "12") {
      $(`#findEMonth`).val("01");
      $(`#findEYear`).val(parseInt($(`#findEYear`).val(), 10) + 1);
    }
    else {
      var tMnth = parseInt($(`#findEMonth`).val(), 10) + 1;
      if (tMnth < 10) tMnth = "0" + tMnth;
      $(`#findEMonth`).val(tMnth);
    }
    if (sMonth == "12") {
      $(`#findSMonth`).val("01");
      $(`#findSYear`).val(parseInt($(`#findSYear`).val(), 10) + 1);
    }
    else {
      var tMnth = parseInt($(`#findSMonth`).val(), 10) + 1;
      if (tMnth < 10) tMnth = "0" + tMnth;
      $(`#findSMonth`).val(tMnth);

    }
  }
  fnGetCCwithTerm('', '_reportCCBody');
};

//## api 받기
function fnSetApi() {

  var param = "";
  var valUrl = "act/hash";

  $.ajax({
    url: valUrl,
    type: 'POST',
    dataType: 'JSON',
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      G_Api = data.apiKey;
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

//## 날짜 자동세팅하기
function fnSetDate(obj, m) {
  var str10 = obj.value.split(' ').join('');
  var str10 = str10.split('-').join('');
  var strDt = "";
  if (str10.length == 8 && str10.indexOf('-') < 0) {
    strDt = str10.substr(0, 4) + "-" + str10.substr(4, 2) + "-" + str10.substr(6, 2);
    obj.value = strDt;
  }
  else {
    if (m == "check") {
      alert("생년월일을 입력해 주세요.\nEx) 1980-01-02");
      $(`#C00BRTHDY`).trigger("focus");
      return;
    }
  }
};

//## 천단위 코마(,) 찍어 해당 폼에 표기하기
function fnCommify(obj) {
  n = obj.value;
  var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
  n += '';                          // 숫자를 문자열로 변환

  var num = "";
  for (k = 0; k <= n.length; k++) {
    if (n.substr(k, 1) != "," && n.substr(k, 1) != "") num += n.substr(k, 1);
  }

  while (reg.test(num))
    num = num.replace(reg, '$1' + ',' + '$2');

  obj.value = num;
};

//## 천단위 코마(,) 찍어 반환하기
function fnGetNumWithComma(n) {
  var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
  n += '';                          // 숫자를 문자열로 변환

  var num = "";
  for (k = 0; k <= n.length; k++) {
    if (n.substr(k, 1) != "," && n.substr(k, 1) != "") num += n.substr(k, 1);
  }

  while (reg.test(num))
    num = num.replace(reg, '$1' + ',' + '$2');

  return num;
};


//## 천단위 코마(,) 제거 후 반환하기
function fnGetNumRemoveComma(n) {
  if (!n) return;
  var num = parseInt(n.replace(/,/g, ""));
  return num;
};




function fnSetEmpty(obj) {
  if (obj.value == "0") obj.value = "";
};

function fnSetZero(obj) {
  if (obj.value == "") obj.value = "0";
};



function fnPermCheck() {
  if (G_permStr) {
    alert(G_permStr);
    fnGoPage("logout.post.php");
    return;
  }
};

function fnCheckPermJson(obj) {
  if (obj.STATUS == "SESSION_OFF") {
    alert(obj.ERROR_MSG);
    location.href = "/index.html";
  }
};

function fnMkSiteLink(str) {
  var links = "";
  var divRow = str.split(",");
  for (l = 0; l < divRow.length; l++) {
    if (divRow[l]) {
      var divLink = divRow[l].split("^");
      var topMargin = "";
      if (l == 0) topMargin = "margin-top:10px;";

      links += "<div onclick='window.open(\"" + divLink[1] + "\")' style='cursor:pointer;padding-left:10px;height:18px;" + topMargin + "'>" + divLink[0] + "</div>";
    }
  }
  return links;
};

//## APD Alarm popup
function fnAPDAlarmPopup(on) {
  var target = "_APD_Alarm";
  if (on != "off") {
    if (on != "fix" || $("#" + target).css("top") == "auto") {
      $("#" + target).css("top", "112px");
      $("#" + target).css("left", "427px");
    }
    $("#" + target).show(477);
  }
  else {
    $("#" + target).css("display", "none");
  }
};

//## 업데이트 로우
function fnRowUpdate(valUrl, param, rowIndx, gridCd) {

  $.ajax({
    url: valUrl,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      var gData = $("#" + gridCd).pqGrid("getRowData", {rowIndxPage: rowIndx});
      //if(gData.chk == "E") gData["chk"] = "<span style='color:#FFF;font-weight:bold;background-color:#FF0000;width:30px;'>∨</span>";
      //else gData["chk"] = "E";
      var gridData = data.GRIDDATA[0];
      $.each(gridData, function (key, value) {
        gData[key] = value;
      });
      //alert(JSON.stringify(gData))
      $("#" + gridCd).pqGrid("updateRow", {rowIndx: rowIndx, row: gridData});
      //$("#"+gridCd).pqGrid("setSelection", {rowIndx: rowIndx });
      $("#" + gridCd).pqGrid("refresh");
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

function fnComboComCode(targets) {

  var divTgt = targets.split(",");

  var param = "";
  var valUrl = "./action/common/listComCodeGroup.php";

  $.ajax({
    url: valUrl,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      for (p = 0; p < divTgt.length; p++) {
        $('#' + divTgt[p]).html('');
      }
      var options = '<option value="">=그룹=</option>';
      if (data.TOTAL_COUNT > 0) {
        for (k = 0; k < data.T_COMMON_CD.length; k++) {
          var comboData = data.T_COMMON_CD[k];
          options += '<option value="' + comboData.C04GRUPCD + '">' + comboData.C50GRUPNM + '</option>';
        }
      }
      for (p = 0; p < divTgt.length; p++) {
        $('#' + divTgt[p]).append(options);
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

/*//## 공통코드를 통해서 콤보, checkBox, Radio 버튼
function fnCommonCd(comGrpCd, curVal, target, format, fid) { //comGrpCd:그룹코드, val:기존값, target:표시해야할 레이어, format:combo/radio/checkbox, fid:폼ID

    var param  = "C04GRUPCD="+comGrpCd;
    param  += "&curVal="+curVal;
    var valUrl = "./action/common/listComCode.php";

    if($("#"+target).html() && curVal && format != "combo") {
        if (format == "checkbox") {

            //checkbox Reset()
            $("input[name='"+fid+"']:checkbox").each(function() {
                $(this).prop("checked", false);
            });
            // 값 check
            var divVal = curVal.split(",");
            for (let idx in divVal) {
                $("input[id='"+fid+"'][value=" + divVal[idx] + "]").prop("checked", true);
            }
        }
        if (format == "radio") {

            //radio Reset()
            $("input[name='"+fid+"']:radio").each(function() {
                $(this).prop("checked", false);
            });
            // 값 check
            var divVal = curVal.split(",");
            for (let idx in divVal) {
                $("input[id='"+fid+"'][value=" + divVal[idx] + "]").prop("checked", true);
            }
        }
        return;
    }
    $.ajax({
        url: valUrl,
        type: 'POST',
        dataType:"json",
        data: param,
        beforeSend : function(xmlHttpRequest){
             xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
         },
        success: function(data){
            $('#'+target).html('');
            var groupCd = parseInt(comGrpCd,10);
            if (G_userLevel == "00900") groupCd = '('+groupCd+')';
            else groupCd = "";
            if (format == "combo") {
                var groupNm = data.T_COMMON_CD[0].C50GRUPNM;
                var options = '<option value="">='+groupNm+groupCd+'=</option>';
                if (G_userLevel != "00900") var options = '<option value=""></option>';
            }
            else var options = "<span style='font-size:9px;line-height:18px;'>"+groupCd+"</span>";
            for (k=0; k<data.T_COMMON_CD.length; k++)
            {
                var comData = data.T_COMMON_CD[k];
                var chk = "";
                if (format == "combo") {
                    if (comData.C05ITEMCD == curVal) chk = "SELECTED";
                    options += '<option value="'+comData.C05ITEMCD+'" '+chk+'>'+comData.C50ITEMNM+'</option>';
                }
                else {
                    if (!curVal && format=="radio") {
                        if (k == 0) chk = "CHECKED";
                        else chk = "";
                    }
                    else {
                        curVal = "/" + curVal + "/";
                        if (curVal.indexOf("/"+comData.C05ITEMCD+"/") > -1) chk = "CHECKED";
                    }
                    if (format == "checkbox" ) options += '<input type="checkbox" id="'+fid+'" name="'+fid+'" style="width:13px;height:13px;vertical-align:text-top;" value="'+comData.C05ITEMCD+'" '+chk+'><label>'+comData.C50ITEMNM+' </label>';
                    else if (format == "radio" ) options += '<input type="radio" id="'+fid+'" name="'+fid+'" style="width:13px;height:13px;vertical-align:text-top;" value="'+comData.C05ITEMCD+'" '+chk+'><label>'+comData.C50ITEMNM+' </label>';
                }

            }
            $('#'+target).append(options);
        },
        error: function(request,status,error){
            if(request.status == 477) {
              alert("세션이 종료 되었습니다");
              fnGoPage("reLogin");
            }
            else alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}
*/
//## 여러개의 콤보를 한번의 통신으로 구성(콤보박스 전용)
function fnMultiCombo(groupCds, targets, mode) { //groupCds:그룹 코드들, targets:표시해야할 콤보

  var divGroupCd = groupCds.split(",");
  var divTarget = targets.split(",");
  if (divGroupCd.length != divTarget.length) {
    alert("그룹코드와 Target의 숫자는 반드시 일치해야 합니다");
    return;
  }
  var param = "groupCds=" + groupCds;
  param += "&targets=" + targets;
  var valUrl = "./action/common/listComCode.php";
  $.ajax({
    url: valUrl,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      fnCheckAuth(data);
      for (c = 0; c < divGroupCd.length; c++) {

        var groupCd = divGroupCd[c];
        var target = divTarget[c];
        if (G_userLevel == "00900") groupCd = '(' + groupCd + ')';
        else groupCd = "";

        $('#' + target).html('');

        var comboObj = data[target];

        var groupNm = comboObj.T_COMMON_CD[0].C50GRUPNM;
        var grpCd = parseInt(groupCd, 10);
        //alert(mode);
        if (G_userLevel == "00900") var options = '<option value="">' + groupNm + groupCd + '</option>';
        else {
          if (mode == "null") var options = '<option value=""></option>';
          else var options = '<option value="">' + groupNm + groupCd + '</option>';
        }
        for (k = 0; k < comboObj.T_COMMON_CD.length; k++) {
          var comData = comboObj.T_COMMON_CD[k];
          options += '<option value="' + comData.CD + '">' + comData.NM + '</option>';

        }
        $('#' + target).append(options);
        options = "";
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

//## Master Data를 통해서 콤보
function fnFindCombo(valUrl, findStr, curVal, target, showStr) { //valUrl:Master Data URL, findStr:검색어, curVal:기존값, target:표시해야할 콤보, showStr:콤보 타이틀

  var param = "findStr=" + findStr;
  if (curVal) {param += "&curVal=" + curVal;}
  if (findStr || curVal) {
    $.ajax({
      url: valUrl,
      type: 'POST',
      dataType:"json",
      data: param,
      beforeSend: (xmlHttpRequest) => {
        xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
      },
      success: (data) => {
        fnCheckAuth(data);
        $('#' + target).html('');

        var options = '<option value="">=' + showStr + '=</option>';
        if (data.TOTAL_COUNT > 0) {
          for (k = 0; k < data.GRIDDATA.length; k++) {
            var comData = data.GRIDDATA[k];
            var chk = "";
            if (comData.CD == curVal) chk = "SELECTED";
            options += '<option value="' + comData.CD + '" ' + chk + '>' + comData.NM + '</option>';

          }
        }
        $('#' + target).append(options);
      },
      error: function (request, status, error) {
        if (request.status == 477) {
          alert("세션이 종료 되었습니다");
          fnGoPage("reLogin");
        }
        else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
      }
    });
  }
};

//## Master Data를 통해서 콤보(파라미터 바로 넘기기)
function fnFindComboWithParam(valUrl, param, curVal, target, showStr) { //valUrl:Master Data URL, param:파라미터, curVal:기존값, target:표시해야할 콤보, showStr:콤보 타이틀

  $.ajax({
    url: valUrl,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      fnCheckAuth(data);
      $('#' + target).html('');

      var options = '<option value="">' + showStr + '</option>';
      if (data.TOTAL_COUNT > 0) {
        for (k = 0; k < data.GRIDDATA.length; k++) {
          var comData = data.GRIDDATA[k];
          var chk = "";
          if (comData.CD == curVal) chk = "SELECTED";
          options += '<option value="' + comData.CD + '" ' + chk + '>' + comData.NM + '</option>';

        }
      }
      $('#' + target).append(options);
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

//## Master Data를 통해서 콤보
function fnComCombo(valUrl, target, curVal, showStr) { //valUrl:Master Data URL, target:표시해야할 콤보, showStr:콤보 타이틀

  var param = "";

  $.ajax({
    url: valUrl,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      fnCheckAuth(data);
      $('#' + target).html('');

      var options = '<option value="">' + showStr + '</option>';
      for (k = 0; k < data.GRIDDATA.length; k++) {
        var comData = data.GRIDDATA[k];
        var chk = "";
        if (comData.CD == curVal) chk = "SELECTED";
        options += '<option value="' + comData.CD + '" ' + chk + '>' + comData.NM + '</option>';

      }
      $('#' + target).append(options);
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

//## Radio, Checkbox 값 취하기
function fnGetCheckVal(obj, format) {
  var rsVal = "";
  if (format == "radio") {
    var newObj = $('input:radio[id=' + obj + ']');
    rsVal = $('input:radio[id=' + obj + ']:checked').val();
  }
  else {
    $('input:checkbox[id=' + obj + ']').each(function () {
      if ($(this).is(':checked')) {
        if (rsVal) rsVal += ",";
        rsVal += $(this).val();
      }
    });
  }
  return rsVal;
};


//## 첨부 파일 이미지 보기 - 공통 처리
function fnShowThumb(I00SEQNCY, target) {

  var param = "I00SEQNCY=" + I00SEQNCY;
  var valUrl = "./action/common/fileThumb.php";

  $.ajax({
    url: valUrl,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      var link = data.T_FILES[0].LINK;
      var img = "";

      var divFile = link.split(".");
      var ext = divFile[(divFile.length - 1)];
      if ("/png/jpg/jpeg/gif/bmp/".indexOf(ext) > -1) {
        img = "<img src=\"" + link + "\" style=\"width:90px;height:90px;\">";
      }
      else {
        img = "<div style='width:50px;height:30px;margin-top:35px;margin-left:20px;font-size:15pt;font-weight:bold;text-align:center;'>" + ext + "</div>";
      }
      $("#" + target).html(img);
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });

};

function fnCheckPart(val) {
  if ($("#" + val.id).prop("checked") == true) {

    $("input[id=" + val.value + "]:checkbox").each(function () {
      //alert(val.value);
      $(this).prop("checked", true);
    });
  }
  else {
    $("input[id=" + val.value + "]:checkbox").each(function () {
      $(this).prop("checked", false);
    });
  }
};


var LogOutTimer = function () {
  var S = {
    timer: null,
    limit: 1000 * 60 * 60 * 4,
    //limit : 1000 * 60 * 10,  //10분 후 로그아웃
    fnc: function () {fnGoPage('/logout.post.php');},
    start: function () {
      S.timer = window.setTimeout(S.fnc, S.limit);
    },
    reset: function () {
      window.clearTimeout(S.timer);
      S.start();
    }
  };

  document.onmousemove = function () {S.reset();};

  return S;
};



$(document).on("keyup", "input:text[korOnly]", function () {$(this).val($(this).val().replace(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/g, ""));});
$(document).on("keyup", "input:text[engOnly]", function () {$(this).val($(this).val().replace(/[^\!-z]/gi, ""));});


/*
function fnInitCombo(struct, callback) {
    var part = "";
    var target = "";
    var groupCd = "";
    for(k=0; k<struct.length; k++) {
        if(part) {
            part += "/";
            target += "/";
            groupCd += "/";
        }
        part += struct[k].part;
        target += struct[k].target;
        groupCd += struct[k].groupCd;

    }

    var param = "part="+part;
    param += "&target="+target;
    param += "&groupCd="+groupCd;

    var valUrl = "./action/common/initCommonCd.php";



    $.ajax({
        url: valUrl,
        type: 'POST',
        dataType:"json",
        data: param,
        beforeSend : function(xmlHttpRequest){
             xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
         },
        success: (data) => {

            for(k=0; k<struct.length; k++) {
                $('#'+struct[k].target).html('');
                var format = struct[k].format;
                var formID = struct[k].formID;
                var showStr = "";
                if(struct[k].part == "equipment") showStr = "== 설비 ==";
                else if(struct[k].part == "user") showStr = "== 사용자 ==";
                else {
                    if(format == "radio") showStr = "";
                    else if(format == "checkbox") showStr = "";
                    else {
                        eval("var grpStr = data."+struct[k].target+"[0].SHOWSTR;");
                        showStr = "==" + grpStr + "==";
                    }
                }
                if(struct[k].part == "year") showStr = "";
                if(struct[k].part == "menu") {

                    var totalCnt = eval("data." + struct[k].target + "_TOTAL_COUNT");
                    var options = "";
                    var menuGrp = "";
                    for (c=0; c<totalCnt; c++) {
                        eval("var menus = data." + struct[k].target + "[" + c + "]");
                        if(menus.C03SUBMNU == "00") {
                            menuGrp = menus.CD;
                            options += "<div style=\"width:182px;height:25px;border:1px #CCC solid;margin-top:-1px;border-left:0;\"><p style='margin-top:5px;margin-left:3px;font-weight:bold;'><input type='checkbox' id='"+menuGrp+"' value='"+menus.CD+"' onclick=\"fnCheckUserPart(this);\">" + menus.NM + "</p></div>";
                        }
                        else {
                            options += "<div style=\"width:182px;height:22px;background-color:#FFF;;border:1px #CCC solid;border-left:0;margin-top:-1px;\"><p style='margin-top:2px;padding-left:8px;'><input type='checkbox' id='permission' name='"+menuGrp+"' value='" + menus.CD + "' onclick=\"fnMkStartPage(\'m\');\">" + menus.NM +"</p></div>";
                        }
                    }
                    $('#' + struct[k].target).append(options);

                }
                if(struct[k].part == "user") {

                    var totalCnt = eval("data." + struct[k].target + "_TOTAL_COUNT");
                    var options = "";
                    var menuGrp = "";
                    if (showStr) options += '<option value="">' + showStr + '</option>';
                    for (c=0; c<totalCnt; c++) {
                        eval("var userConfig = data." + struct[k].target + "[" + c + "]");

                        if (struct[k].curVal == userConfig.CD) chk = " SELECTED";
                        options += '<option value="' + userConfig.CD + '"' + chk + '>' + decodeURIComponent(userConfig.NM) + '</option>';
                    }
                    $('#' + struct[k].target).append(options);

                }

                else {
                    var options = "";
                    if (showStr) options += '<option value="">' + showStr + '</option>';
                    var totalCnt = eval("data." + struct[k].target + "_TOTAL_COUNT");
                    for (c = 0; c < totalCnt; c++) {

                        eval("var comboData = data." + struct[k].target + "[" + c + "]");
                        var chk = "";
                        if (struct[k].curVal == comboData.CD) chk = " SELECTED";

                        if(format == "radio") {
                            if(c == 0) chk = "checked";
                            options += "<input type='radio' id='"+formID+"' name='"+formID+"' value='"+comboData.CD+"' style='float:left;position:relative;top:1.7px;' "+chk+"> <label style='float:left;'>" + decodeURIComponent(comboData.NM) +" </label>";
                        }
                        else if(format == "checkbox"){
                            //if(c == 0) chk = "checked";
                            options += "<input type='checkbox' id='"+formID+"' name='"+formID+"' value='"+comboData.CD+"' style='float:left;position:relative;top:1.7px;' "+chk+"> <label style='float:left;'>" + decodeURIComponent(comboData.NM) +" </label>";
                        }
                        else options += '<option value="' + comboData.CD + '"' + chk + '>' + decodeURIComponent(comboData.NM) + '</option>';
                    }
                    if(format == "radio" && G_userLevel == "00900") options += "&nbsp; / " +struct[k].groupCd;
                    if(struct[k].part != "menu")$('#' + struct[k].target).append(options);
                }

            }

        },
        complete: function(data) {
            if(typeof callback === "function") {
                callback();
            }
        },
        error: function(request,status,error){
            if(request.status == 477) {
              alert("세션이 종료 되었습니다");
              fnGoPage("reLogin");
            }
            else alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });

};
*/
function fnShowHideCol(gridCd, colNm) {
  var CM = $("#" + gridCd).pqGrid("getColModel");

  for (let i = 0; i < CM.length; i++) {
    var column = CM[i],
      dataIndx = column.dataIndx + "";
    if (dataIndx == colNm) {
      if (CM[i].hidden == false) CM[i].hidden = true;
      else CM[i].hidden = false;
    }
  }
  $("#" + gridCd).pqGrid("option", "colModel", CM);
  $("#" + gridCd).pqGrid('refresh');
};

function fnSetTime(obj) {

  var val = obj.value;
  var tm = "";
  if (val.length == 3) {
    val = '0' + val;
    tm = leadingZeros(val.substring(0, 2), 2) + ':' + leadingZeros(val.substring(2, 4), 2);
  }

  if (val.length == 4) {
    tm = leadingZeros(val.substring(0, 2), 2) + ':' + leadingZeros(val.substring(2, 4), 2);
  }

  if (val.length == 5) {
    tm = val;
  }

  obj.value = tm;
};

/*
function fnPressGet01(e) {
  alert("dd2");
    if(e.keyCode != "13")
    {
        return; // 엔터일때만 수행
    }
    fnGetList01();
};
*/

function fnExport(gridCd, xlsxNm) {

  if (gridCd == undefined) {
    alert("그리드 코드가 지정되지 않았습니다");
    return;
  }
  if (xlsxNm == undefined) {
    alert("Excel 파일명이 지정되지 않았습니다");
    return;
  }
  var gridData = $("#" + gridCd).pqGrid("getData");
  var column = $("#" + gridCd).pqGrid("getColModel");

  var rowCnt = gridData.length;
  var colCnt = column.length;

  var headers = [];
  var widths = [];
  var aligns = [];
  var dataTypes = [];
  var fullWidth = 0;
  var maxWidth = 300;
  if (colCnt < 20) maxWidth = 250;
  if (colCnt < 15) maxWidth = 200;
  if (colCnt < 10) maxWidth = 150;
  if (colCnt < 5) maxWidth = 60;
  for (let k = 0; k < colCnt; k++) {
    var cWidth = Math.ceil(column[k]["width"]);
    headers[k] = column[k]["title"].replace(/(<([^>]+)>)/ig, "");
    aligns[k] = column[k]["align"];
    dataTypes[k] = column[k]["dataType"];
    fullWidth += parseInt(column[k]["width"]);
  }
  for (let k = 0; k < colCnt; k++) { //width 재정의
    var cWidth = Math.ceil(maxWidth * (column[k]["width"] / fullWidth));
    if (column[k]["hidden"] != true) widths[k] = cWidth;
  }
  var excel = $JExcel.new("맑은고딕 9 #3C4752");			// Default font

  var sheetNm = xlsxNm.split(".xlsx").join("");
  excel.set({sheet: 0, value: sheetNm});

  for (let i = 0; i <= rowCnt; i++) excel.set({row: i, value: 19.5});
  //excel.set({row:3,value: 30  });

  var formatHeader = excel.addStyle({ 															// Format for headers
    border: "none,none,none,thin #bdbdbd", 													// 		Border for header
    font: "맑은고딕 9 #3C4752 B",
    fill: "#E6E6E6",
    align: "C C"
  }); 														// 		Font for headers

  for (let i = 0; i < headers.length; i++) {
    if (i == (colCnt - 1)) {
      formatHeader = excel.addStyle({ 															// Format for headers
        border: "none,thin #bdbdbd,none,thin #bdbdbd", 													// 		Border for header
        font: "맑은고딕 9 #3C4752 B",
        fill: "#E6E6E6",
        align: "C C"
      });
    }
    excel.set(0, i, 0, headers[i], formatHeader);													// Set CELL with header text, using header format
    //excel.set(0,i,undefined,"auto");
    excel.set(0, i, undefined, widths[i]);
  }


  for (let i = 1; i <= rowCnt; i++) {
    for (let c = 0; c < colCnt; c++) {
      var cellData = gridData[(i - 1)][column[c]["dataIndx"]];

      var css = {};
      css["align"] = "C C";
      if (aligns[c] == undefined) css["align"] = "L C";
      if (aligns[c] == "left") css["align"] = "L C";
      if (aligns[c] == "right") css["align"] = "R C";
      if (i % 2 == 0) {
        css["border"] = "thin #bdbdbd,thin #bdbdbd,thin #bdbdbd,thin #bdbdbd";
        css["fill"] = "";
      }
      else {
        css["border"] = "thin #bdbdbd,thin #bdbdbd,thin #bdbdbd,thin #bdbdbd";
        css["fill"] = "#FAFAFA";
      }
      if (dataTypes[c] == "float" || dataTypes[c] == "integer") {
        css["format"] = "#,##0 ;[Red](#,##0)";
      }
      else {
        css["format"] = "";
      }
      //alert(JSON.stringify(css));
      var cellStyle = excel.addStyle(css);
      if (column[c]["hidden"] != true) excel.set(0, c, i, cellData, cellStyle);
    }
  }

  //excel.set = function (s, column, row, value, style)
  var curTm = fnCurDateTime();
  xlsxNm = curTm + "_" + xlsxNm;
  excel.generate(xlsxNm);
};


function fnCurDateTime() {
  var d = new Date();

  var date = leadingZeros(d.getFullYear().toString().substr(2, 2), 2) + leadingZeros(d.getMonth() + 1, 2) + leadingZeros(d.getDate(), 2);
  var time = leadingZeros(d.getHours(), 2) + leadingZeros(d.getMinutes(), 2) + leadingZeros(d.getSeconds(), 2);
  return date + '_' + time;
};

var leadingZeros = function (n, digits) {

  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;

};


/* 오늘로부터 1개월전 날짜 반환 */
function lastMonth () {
  var date = new Date();
  date.setMonth(date.getMonth() - 1); //한달 전
  return fnChGraphDate(date);
}


/* 오늘로부터 1개월후 날짜 반환 */
function nextMonth () {
  var date = new Date();
  date.setMonth(date.getMonth() + 1); //한달 전
  return fnChGraphDate(date);
}

//## AM Chart 날짜 YYYY-MM-DD로 변환
function fnChGraphDate(curDt) {
  var Y = curDt.getFullYear();
  var M = (curDt.getMonth() + 1);
  var D = curDt.getDate();
  if (M < 10) M = '0' + M;
  if (D < 10) D = '0' + D;
  var dt = Y + "-" + M + "-" + D;

  return dt;
};


function formatDate (date, format) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  hour = d.getHours();
  min = d.getMinutes();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;

  var rsDate = "";
  if (format == "date") rsDate = [year, month, day].join('-');
  if (format == "time") rsDate = [hour, min].join(':');

  return rsDate;
}

function fnGetCommonCd (groupCd, target, callback) {

  var urlVal = "act/getCommonCd";
  $("#" + target).html("<option value=''>==</option>");
  var param = "groupCd=" + encodeURIComponent(groupCd);
  $.ajax({
    type: 'GET',
    url: urlVal,
    contentType: "text/plain",
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      if (data.length > 0) {
        $("#" + target).html("<option value=''>=" + data[0].groupNm + "=</option>");
        for (let z = 0; z < data.length; z++) {
          var row = data[z];
          $("#" + target).append("<option value='" + row.itemCd + "'>" + row.itemNm + "</option>");
        }
      }
    },
    complete: function (data) {
      if (typeof callback === 'function') {
        callback();
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
}

function fnGetRooms (target, callback) {

  var divTarget = target.split("/");
  for (d = 0; d < divTarget.length; d++) {
    $("#" + divTarget[d]).html("<option value=''>=타석=</option>");
  }
  var urlVal = "act/getRooms";
  var param = "";
  $.ajax({
    type: 'GET',
    url: urlVal,
    contentType: "text/plain",
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      for (let z = 0; z < data.length; z++) {
        var row = data[z];
        for (d = 0; d < divTarget.length; d++) {
          $("#" + divTarget[d]).append("<option value='" + row.roomCd + "'>" + row.roomNm + "</option>");
        }
      }

    },
    complete: function (data) {
      if (typeof callback === 'function') {
        callback();
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
}



function fnInputNm(obj) {
  //좌우 방향키, 백스페이스, 딜리트, 탭키에 대한 예외
  if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39
    || event.keyCode == 46) return;
  obj.value = obj.value.replace(/[\a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
  //obj.value = obj.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');

};



function fnPressCommonCd(part, target, findStrId) {
  if (event.keyCode != "13") {
    return; // 엔터일때만 수행
  }
  var findStr = $("#" + findStrId).val();
  fnCommonCd(part, '', '', target, 'combo', findStr);
};


//struct 구조 => { part:'구분', target:'표시해야할 레이어' , groupCd:'그룹코드',  cd:'기존값(현재값)'  }
function fnInitCombo(struct, callback, m) {

  var part = "";
  var target = "";
  var groupCd = "";
  var options = "";


  for (k = 0; k < struct.length; k++) {
    if (part) {
      part += "/";
      target += "/";
    }
    part += struct[k].part;
    target += struct[k].target;

    if (groupCd) groupCd += "/";
    if (struct[k].groupCd != undefined) groupCd += struct[k].groupCd;
  }


  var param = "part=" + part;
  param += "&groupCd=" + groupCd;
  param += "&target=" + target;
  // param  += "&findStr="+findStr;
  // param  += "&cd="+cd;
  var urlVal = "act/initCodeAll";
  /*alert(JSON.stringify(param))*/

  $.ajax({
    url: urlVal,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      for (k = 0; k < struct.length; k++) {

        $('#' + struct[k].target).html('');
        var format = struct[k].format;
        var formID = struct[k].formID;

        if (struct[k].part == "comCodeGroup") options = '<option value="">==그룹==</option>';
        //else if(struct[k].part == "year") options = '';
        //else if(struct[k].part == "user") options = '<option value="">==TDMS 관리==</option>';


        else { //공통코드일때
          for (j = 0; j < data.length; j++) {

            if (struct[k].groupCd == data[j].groupCd) {
              options = "";
              showStr = "";
              if (format == "radio") {
                showStr = '(' + struct[k].groupCd + ')';
                options += "<span style='font-size:9px;line-height:18px;'>" + showStr + "</span>";
              }
              else if (format == "checkbox") {
                showStr = '(' + struct[k].groupCd + ')';
              }
              else {
                showStr = data[j].groupNm + '(' + struct[k].groupCd + ')';
                options = '<option value="">==' + showStr + '==</option>';
              }
            }
          }
        }

        var grpCnt = 1;
        var z = 0;
        var chk = "";
        var br = "";

        for (i = 0; i < data.length; i++) {
          chk = "";
          var comData = data[i];

          if (struct[k].target == data[i].target) {

            if (format == "radio") {
              if (z == 0) chk = "checked";
              else chk = "";
              options += "<input type='radio' id='" + formID + "' name='" + formID + "' value='" + comData.cd + "' style='float:left;position:relative;' " + chk + "> <label style='float:left;margin-right:3px'>" + decodeURIComponent(comData.nm) + " </label>";
              z++;
            }
            else if (format == "checkbox") {
              // 예외사항 처리 유저 정보 표시 체크박스 뒤에 label 추가 필요
              if (struct[k].option == "addLabel") {
                options += "<input type='checkbox' id='" + formID + "' name='" + formID + "' value='" + comData.cd + "' style='float:left;position:relative;' " + chk + "> <label style='float:left;margin-right:3px'>" + decodeURIComponent(comData.nm) + " </label>";
                options += '<label style="float:left;margin-right:2px" id="' + comData.cd + 'Status"></label>';
                // tooltip
              }
              else {
                options += "<input type='checkbox' id='" + formID + "' name='" + formID + "' value='" + comData.cd + "' style='float:left;position:relative;' " + chk + "> <label style='float:left;margin-right:3px'>" + decodeURIComponent(comData.nm) + " </label>";
              }

            }
            else {
              if (comData.cd == struct[k].cd) chk = "SELECTED";
              if (struct[k].part == "comCodeGroup") options += '<option value="' + comData.cd + '" ' + chk + '>' + grpCnt + '_' + comData.nm + '</option>';
              else options += '<option value="' + comData.cd + '" ' + chk + '>' + comData.nm + '</option>';

            }

          } else {
            grpCnt = 0;
          }

          grpCnt++;
        }

        $('#' + struct[k].target).append(options);


      }



    },
    complete: function (data) {
      if (typeof callback === "function") {
        callback();
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });



};





function fnCommonCd(part, groupCd, cd, target, format, findStr) { //part: 구분(테이블), groupCd:그룹코드, itemCd:기존값, target:표시해야할 레이어, format:combo/radio/checkbox

  var param = "part=" + part;
  param += "&groupCd=" + groupCd;
  param += "&findStr=" + findStr;
  // param  += "&cd="+cd;
  var urlVal = "act/findCodeAll";

  $.ajax({
    url: urlVal,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      $('#' + target).html('');
      var options = "";
      if (data.length == 0) {
        options = '<option value="">==No Data==</option>';
        $('#' + target).append(options);
        return;
      }
      if (part == "member") options = '<option value="">==사용자==</option>';
      else if (part == "company") options = '<option value="">==거래처==</option>';
      else if (part == "src") options = '<option value="">==원자재==</option>';
      /*
       else if(part == "comCodeGroup") options = '<option value="">==그룹==</option>';
       else if(part == "src") options = '<option value="">==원자재==</option>';*/
      else if (part == "blueprint") options = '<option value="">==도면==</option>';
      else if (part == "estimate") options = '<option value="">==견적서==</option>';
      else if (part == "orderAndOrderArticle") options += '<option value="">==오더품목==</option>';
      else if (part == "product") options = '<option value="">==제품==</option>';
      else { //공통코드일떼
        // alert("dd")
        groupCd = '(' + groupCd + ')';
        if (format == "combo") {
          var groupNm = data[0].groupNm;
          options = '<option value="">==' + groupNm + groupCd + '==</option>';

        }
      }

      for (k = 0; k < data.length; k++) {
        var comData = data[k];

        var chk = "";
        if (format == "combo") {
          if (comData.cd == cd) chk = "SELECTED";
          options += '<option value="' + comData.cd + '" ' + chk + '>' + comData.nm + '</option>';
        }
      }

      $('#' + target).append(options);
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};


function fnGetFiles(cd, seq, target, flagYn) { // flagYn = 'Y' 삭제버튼 보이게 / 'N' 삭제버튼 안보이게

  var param = "bbsCd=" + cd;
  param += "&bbsSeq=" + seq;

  var valUrl = "act/listFiles";

  $.ajax({
    url: valUrl,
    type: 'POST',
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      //fnCheckAuth(data);
      $("#" + target).html("");
      var showFiles = "";
      var upGroup = "";
      for (k = 0; k < data.length; k++) {
        var fileSeq = data[k].fileSeq;
        var fileUrl = data[k].fileUrl;
        var fileNm = data[k].fileNm;
        var fileFlag = data[k].fileFlag;
        upGroup = data[k].upGroup;
        var fileNmSubStr = fileUrl;

        //showFiles += "<div class='Tit1' style='width:240px'><p style='text-align:left;margin-left:3px;'>- <a href=\"javascript:fnDelFile('"+I00SEQNCY+"')\">[D]</a> <a href=\"javascript:fnDownFile('"+I00SEQNCY+"')\">[↓]</a> "+files[k].C00FLLINK+"</p></div>";

        /* if(fileUrl.length > 45){
           showFiles += "<div style='display:inline-block;margin-top:-3px'>";
             //if(flagYn == 'Y') showFiles += "<div style='float:left;width:50px;height:50px;text-align:center;'><p><img src=\"/imgs/icon_fileddel.png\" style=\"cursor:pointer;\" onclick=\"fnDelFile('"+fileSeq+"')\"> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('"+fileSeq+"')\"> </p></div>";

           // 기존 코드
           //if(flagYn == 'Y') showFiles += "<div style='float:left;width:50px;height:50px;text-align:center;'><p><img src=\"/imgs/icon_fileddel.png\" style=\"cursor:pointer;\" onclick=\"fnDelFile('"+seq+"', '"+fileUrl+"', '"+fileNm+"', '"+upGroup+"', '"+fileSeq+"', '"+fileFlag+"')\"> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('"+fileUrl+"', '"+fileNm+"')\"> </p></div>";
           if(flagYn == 'Y') showFiles += "<div style='float:left;width:50px;height:50px;text-align:center;'><p><img src=\"/imgs/icon_fileddel.png\" style=\"cursor:pointer;\" onclick=\"fnDelFile('"+cd+"', '"+seq+"', '"+fileUrl+"', '"+fileNm+"', '"+upGroup+"', '"+fileSeq+"', '"+fileFlag+"')\"> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('"+fileUrl+"', '"+fileNm+"')\"> </p></div>";
             else showFiles += "<div style='float:left;width:50px;height:50px;text-align:center;'><p> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('"+fileUrl+"', '"+fileNm+"')\"> </p></div>";
             showFiles += "<div style='float:left;width:280px;height:50px;text-align:left;'><p>"+fileUrl+"</p></div>";
             showFiles += "</div>";
         }
         else{
           showFiles += "<div style='display:inline-block;margin-top:-3px'>";
           //if(flagYn == 'Y') showFiles += "<div style='float:left;width:50px;height:21px;text-align:center;'><p><img src=\"/imgs/icon_fileddel.png\" style=\"cursor:pointer;\" onclick=\"fnDelFile('"+fileSeq+"')\"> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('"+fileSeq+"')\"> </p></div>";

           // 기존코드
           //if(flagYn == 'Y') showFiles += "<div style='float:left;width:50px;height:21px;text-align:center;'><p><img src=\"/imgs/icon_fileddel.png\" style=\"cursor:pointer;\" onclick=\"fnDelFile('"+seq+"', '"+fileUrl+"', '"+fileNm+"', '"+upGroup+"', '"+fileSeq+"', '"+fileFlag+"')\"> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('"+fileUrl+"', '"+fileNm+"')\"> </p></div>";
           if(flagYn == 'Y') showFiles += "<div style='float:left;width:50px;height:21px;text-align:center;'><p><img src=\"/imgs/icon_fileddel.png\" style=\"cursor:pointer;\" onclick=\"fnDelFile('"+cd+"', '"+seq+"', '"+fileUrl+"', '"+fileNm+"', '"+upGroup+"', '"+fileSeq+"', '"+fileFlag+"')\"> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('"+fileUrl+"', '"+fileNm+"')\"> </p></div>";
           else showFiles += "<div style='float:left;width:50px;height:21px;text-align:center;'><p> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('"+fileUrl+"', '"+fileNm+"')\"> </p></div>";
             showFiles += "<div style='float:left;width:280px;height:21px;text-align:left;'><p>"+fileUrl+"</p></div>";
             showFiles += "</div>";
         }*/

        if (fileUrl.length > 28) {
          var fileNmLength = fileNmSubStr.length;
          fileNmSubStr = fileNmSubStr.substring(0, 12) + "..." + fileNmSubStr.substring(fileNmLength - 16, fileNmLength);
        }

        showFiles += "<div style='display:inline-block;margin-top:-3px'>";
        if (flagYn == 'Y') showFiles += "<div style='float:left;width:50px;height:21px;text-align:center;'><p><img src=\"/imgs/icon_fileddel.png\" style=\"cursor:pointer;\" onclick=\"fnDelFile('" + cd + "', '" + seq + "', '" + fileUrl + "', '" + fileNm + "', '" + upGroup + "', '" + fileSeq + "', '" + fileFlag + "')\"> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('" + fileUrl + "', '" + fileNm + "')\"> </p></div>";
        else showFiles += "<div style='float:left;width:50px;height:21px;text-align:center;'><p> <img src=\"/imgs/icon_filedown.png\" style=\"cursor:pointer;\" onclick=\"fnDownFile('" + fileUrl + "', '" + fileNm + "')\"> </p></div>";
        showFiles += "<div style='float:left;width:340px;height:21px;text-align:left;'><p>" + fileNmSubStr + "</p></div>"; // fileUrl // width : 280px;
        showFiles += "</div>";


      }
      $(`#upGroup`).val(upGroup);
      $("#" + target).append(showFiles);
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });

};

/*
//## 첨부파일 다운로드 - 공통처리
function fnDownFile(seq) {
window.open("/action/common/fileDown.php?SEQ="+seq);
};


//## 첨부 파일 삭제 - 공통 처리
function fnDelFile(seq) {

  if(!confirm("정말로 삭제 하시겠습니까?")) {
      return;
  }

  var param  = "seq="+seq;
  var valUrl = "act/fileDel";

  $.ajax({
      url: valUrl,
      type: 'POST',
      dataType:"json",
      data: param,
      beforeSend : function(xmlHttpRequest){
             xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
         },
      success: function(data){
          if (data.result == "Success") {
              alert("삭제되었습니다");
              fnGetFile('blueprint',data.cd,'showPrints');
          }
      },
     error: function(request,status,error){
            if(request.status == 477) {
              alert("세션이 종료 되었습니다");
              fnGoPage("reLogin");
            }
            else alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
  });

};*/



//## 파일 업로드
/*function fnFileUp() {


 if (!$(`#userFile`).val()) {
     alert('파일을 먼저 선택해 주세요');
     $(`#userFile`).trigger("focus");
     return;
 }


 if (!$(`#blueprintCd`).val()) {
     alert('도면을 먼저 선택해 주세요');
     $(`#blueprintCd`).trigger("focus");
     return;
 }

 var divFile = $(`#userFile`).val().split(".");
 var fileExt = divFile[(divFile.length - 1)]; // 확장자

 if (G_enableFile.indexOf("/."+fileExt+"/") < 0) {
     alert('등록 불가능한 파일입니다.\n다음의 파일만 등록 가능합니다.\n'+G_enableFile);
     $(`#userFile`).val("");
     $(`#userFile`).trigger("focus");
     return;
 }

 const curDate = fnToday();

 var upGroup = $(`#upGroup`).val();
 var fileValue = $(`#userFile`).val().split("\\");
 var fileName = fileValue[fileValue.length-1]; // 파일명
 var fileUrl = formatDate(curDate ,"date").split("-").join("") + fnCurDateTime().split("_")[1];

 if(!upGroup) upGroup= fileUrl;
 $(`#upGroup`).val(upGroup); // 원래 show에서 해줘야됨.. 지금은 테스트;

 var fileSeq = 0;
 var fileFlag = '';
 if(fileExt == 'jpg' || fileExt == 'png' || fileExt == 'PNG') fileFlag = 'I';
 else fileFlag = 'F';

 var param = {};
  param["bbsCd"] = "blueprint";	// tblNm
  param["bbsSeq"] = $(`#blueprintCd`).val(); // tblSeq
  param["fileSeq"] = fileSeq;
  param["fileUrl"] = fileName; // 파일 이름
  param["fileNm"] = fileUrl; // 연월일시분초
  param["upGroup"] = upGroup;
  param["fileFlag"] = fileFlag;
  param["flag"] = 'Y';

  param = JSON.stringify(param);

 var valUrl = "act/saveFiles";

 $.ajax({
     url: valUrl,
     type: "POST",
     contentType: "application/json; charset=UTF-8",
   dataType:"json",
   data: param,
   beforeSend : function(xmlHttpRequest){
             xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
         },
   success: function(data){
     alert(data.result);
     $(`#userFile`).val("");
     fnGetFiles('blueprint',data.cd,'files','Y');
   },
   error: function(request,status,error){
            if(request.status == 477) {
              alert("세션이 종료 되었습니다");
              fnGoPage("reLogin");
            }
            else alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
 })

};*/

//## 파일 삭제
function fnDelFile(bbsCd, bbsSeq, fileUrl, fileNm, upGroup, fileSeq, fileFlag) {

  if (!confirm("정말로 삭제 하시겠습니까?")) {
    return;
  }

  var param = {};
  param["bbsCd"] = bbsCd;  // "blueprint";
  param["bbsSeq"] = bbsSeq; // $(`#blueprintCd`).val();
  param["fileUrl"] = fileUrl;
  param["fileNm"] = fileNm;
  param["flag"] = 'N';
  param["upGroup"] = upGroup;
  param["fileSeq"] = fileSeq;
  param["fileFlag"] = fileFlag;

  param = JSON.stringify(param);
  var valUrl = "act/saveFiles";

  $.ajax({
    url: valUrl,
    type: "POST",
    contentType: "application/json; charset=UTF-8",
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      alert(data.result);
      $(`#userFile`).val("");
      if (data.result == "삭제 되었습니다") {
        fnGetFiles('blueprint', data.cd, 'files', 'Y');
      }

    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });

};


//## 첨부파일 다운로드 - 공통처리
function fnDownFile(fileUrl, fileNm) {

  var valUrl = "act/fileDownload?fileUrl=" + fileUrl + "&fileNm=" + fileNm;
  window.location = valUrl;

};

function fnGetParameter(nm) {
  var name = nm.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function fnFindCompany(findCompNm, compCd, target) {
  if (event.keyCode != "13" && findCompNm != "") {
    return; // 엔터일때만 수행
  }
  var param = "findCompNm=" + findCompNm;

  var urlVal = "act/findCompany";
  $("#" + target).html("<option value=''>==거래처==</option>");
  $.ajax({
    type: 'POST',
    url: urlVal,
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      //alert(JSON.stringify(data));

      if (data == null || data.length == 0) $("#" + target).html("<option value=''>--No Result--</option>");
      for (k = 0; k < data.length; k++) {
        var chk = "";
        if (data[k].compCd == compCd) chk = "selected";
        var option = "<option value=" + data[k].compCd + " " + chk + ">" + data[k].compNm + "</option>";
        $("#" + target).append(option);
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

function fnFindHouse(findhouseNm, houseCd, target) {
  if (event.keyCode != "13" && findhouseNm != "") {
    return; // 엔터일때만 수행
  }
  var param = "findhouseNm=" + findhouseNm;
  var urlVal = "act/findHouse";

  $("#" + target).html("<option value=''>==창고==</option>");
  $.ajax({
    type: 'POST',
    url: urlVal,
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      //alert(JSON.stringify(data));

      if (data == null || data.length == 0) $("#" + target).html("<option value=''>--No Result--</option>");
      for (k = 0; k < data.length; k++) {
        var chk = "";
        if (data[k].houseCd == houseCd) chk = "selected";
        var option = "<option value=" + data[k].houseCd + " " + chk + ">" + data[k].houseNm + "</option>";
        $("#" + target).append(option);
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

function fnFindResrcNm(findResrcNm, resrcCd, target) {

  if (event.keyCode != "13" && findResrcNm != "") {
    return; // 엔터일때만 수행
  }

  var param = "findResrcNm=" + findResrcNm;

  var urlVal = "act/findResrcNm";

  $("#" + target).html("<option value=''>==자재==</option>");
  $.ajax({
    type: 'POST',
    url: urlVal,
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      //alert(JSON.stringify(data));

      if (data == null || data.length == 0) $("#" + target).html("<option value=''>--No Result--</option>");
      for (k = 0; k < data.length; k++) {
        var chk = "";
        if (data[k].resrcCd == resrcCd) chk = "selected";

        var option = "<option value=" + data[k].resrcCd + " " + chk + ">" + data[k].resrcNm + " 안전재고[" + data[k].protectedQty + "] </option>";
        $("#" + target).append(option);
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};
function fnFindProdNm(findProdNm, prodCd, target) {

  if (event.keyCode != "13") //  && findProdNm != ""
  {
    return; // 엔터일때만 수행
  }

  var param = "findProdNm=" + findProdNm;

  var urlVal = "act/findProd";

  $("#" + target).html("<option value=''>==제품==</option>");
  $.ajax({
    type: 'POST',
    url: urlVal,
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      //alert(JSON.stringify(data));

      if (data == null || data.length == 0) $("#" + target).html("<option value=''>==No Result--==</option>");
      for (k = 0; k < data.length; k++) {
        var chk = "";
        if (data[k].prodCd == prodCd) chk = "selected";

        var option = "<option value=" + data[k].prodCd + " " + chk + ">" + data[k].prodNm + " [재고 : " + data[k].qty + "] </option>";
        $("#" + target).append(option);
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });
};

var LogOutTime = function () {
  var timer = null;
  var limit = 1000 * 60 * 60 * 1;
  //limit : 1000 * 60 * 10,  //10분 후 로그아웃
  function fnc() {fnGoPage('/logout');};
  var start = function () {
    timer = window.setTimeout(function () {fnc();}, limit);
    //        $("#time_No",opener.document).val(1);
    var curPage = fnCurPageNm();
    if (curPage == "main") {
      //        	opener.document.getElementById("time_No").value = 1;
      $(`#time_No`).val(1);
    }
    else {
      $("#time_No", parent.document).val(1);
      //        	opener.document.getElementById("time_No").value = 1;
    }

  };
  var reset = function () {
    window.clearTimeout(null);
    start();
  };

  document.onmousemove = function () {reset();};
  document.onload = function () {start();};

};

function fnCurPageNm() {
  var pageName = "";

  var tempPageName = window.location.href;
  var strPageName = tempPageName.split("/");
  pageName = strPageName[strPageName.length - 1].split("?")[0];

  return pageName;
};

function fnInitLoading(gridCd) {

  var div = "<div id=\"progress_" + gridCd + "\" style=\"display:none;width:100%;height:10px;background-image:url('/imgs/progress.gif');background-position:bottom;\"></div>";
  $("#" + gridCd).after(div);
};

function fnLoading(gridCd) {
  var rs = {
    start: function () {
      $("#progress_" + gridCd).css("display", "");
    },
    end: function () {
      $("#progress_" + gridCd).css("display", "none");
    }
  };
  return rs;
};

function fnFindHouseCd(findNm, houseCd, target) {

  if (houseCd == "") {
    if (event.keyCode != "13") {
      return; // 엔터일때만 수행
    }
  }

  var param = "findNm=" + findNm;
  param += "&findCd=" + houseCd;

  var urlVal = "act/findHouseCd";

  $("#" + target).html("<option value=''>==창고==</option>");
  $.ajax({
    type: 'POST',
    url: urlVal,
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      if (data == null || data.length == 0) $("#" + target).html("<option value=''>--No Result--</option>");
      for (k = 0; k < data.length; k++) {
        var chk = "";
        if (data[k].houseCd == houseCd) chk = "selected";
        var option = "<option value=" + data[k].houseCd + " " + chk + ">" + data[k].houseNm + "</option>";
        $("#" + target).append(option);
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });


};

function fnFindCompCd(findNm, findCd, target) {

  if (findCd == "") {
    if (event.keyCode != "13") {
      return; // 엔터일때만 수행
    }
  }

  var param = "findNm=" + findNm;
  param += "&findCd=" + findCd;

  var urlVal = "act/findCompCd";

  $("#" + target).html("<option value=''>==거래처==</option>");
  $.ajax({
    type: 'POST',
    url: urlVal,
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {

      if (data == null || data.length == 0) $("#" + target).html("<option value=''>--No Result--</option>");
      for (k = 0; k < data.length; k++) {
        var chk = "";
        if (data[k].compCd == findCd) chk = "selected";
        var option = "<option value=" + data[k].compCd + " " + chk + ">" + data[k].compNm + "</option>";
        $("#" + target).append(option);
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });


};

function fnFindProdCd(findNm, findCd, target) {

  if (findCd == "") {
    if (event.keyCode != "13") {
      return; // 엔터일때만 수행
    }
  }

  var param = "findNm=" + findNm;
  param += "&findCd=" + findCd;

  var urlVal = "act/findProdCd";

  $("#" + target).html("<option value=''>==제품==</option>");
  $.ajax({
    type: 'POST',
    url: urlVal,
    dataType:"json",
    data: param,
    beforeSend: (xmlHttpRequest) => {
      xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    },
    success: (data) => {
      //alert(JSON.stringify(data));
      if (data == null || data.length == 0) $("#" + target).html("<option value=''>--No Result--</option>");
      for (k = 0; k < data.length; k++) {
        //alert(data[k].prodCd + " // " + findCd);
        var chk = "";
        if (data[k].prodCd == findCd) chk = "selected";
        var option = "<option value=" + data[k].prodCd + " " + chk + ">" + data[k].prodNm + "</option>";
        $("#" + target).append(option);
      }
    },
    error: function (request, status, error) {
      if (request.status == 477) {
        alert("세션이 종료 되었습니다");
        fnGoPage("reLogin");
      }
      else alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    }
  });


};
