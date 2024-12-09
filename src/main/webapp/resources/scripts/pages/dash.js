// -------------------------------------------------------------------------------------------------
function fnInOutChart(keyParam, inOutParam, planParam, dateParam) {

  var key = keyParam;
  let inOut = inOutParam;
  var plan = planParam;
  var date = dateParam;
  var downStr = `${key}${inOut}${plan}${date}`;

  $.ajax({
    url: `act/dash?key=${key}&inOut=${inOut}&plan=${plan}&date=${date}`,
    type: "POST",
    dataType:"JSON",
    success: (data) => {

      var dashBoardData = data[downStr];

      var resultMap = dashBoardData.reduce(function(map, obj) {
        Object.keys(obj).forEach(function(k) {
          map[k] = obj[k];
        });
        return map;
      }, {});

      var percentMap = resultMap.percentMap;
      var totalQty = resultMap.totalQty;
      var todayList = resultMap.todayList;

      var htmlContent = todayList.map(function(item) {
        return `
          <div class="row mb-2px">
            <div class="col-xs-6">
              <div>${item.prodNm}</div>
              <div class="small text-white text-opacity-50">${item.sessionCnt} session</div>
            </div>
            <div class="col-xs-6 text-end">
              ${item.qty}
            </div>
          </div>
        `;
      }).join("");

      $(`#${downStr}`).html(htmlContent);
      $(`.${downStr}Qty`).text(totalQty);
      $(`.${downStr}QtyInWeek`).text(totalQty);

      $(`.${downStr}Sign`).addClass(percentMap.color);
      $(`.${downStr}Sign`).text(percentMap.sign);

      $(`.${downStr}Percent`).addClass(percentMap.color);
      $(`.${downStr}Percent`).text(percentMap.percent + " % ");

      $(`.${downStr}Count`).addClass(percentMap.color);
      $(`.${downStr}Count`).text(percentMap.count);
    },
    error: function(err) {
      console.error(err);
    }
  });
};

// -------------------------------------------------------------------------------------------------
function fnPie(keyParam, inOutParam, planParam, dateParam) {

  var key = keyParam;
  var keyUp = key.charAt(0).toUpperCase() + key.slice(1);

  let inOut = inOutParam;
  var plan = planParam;
  var date = dateParam;

  var downStr = `${key}${inOut}${plan}${date}`;
  var upStr = `${keyUp}${inOut}${plan}${date}`;

  var strPie = `${key}${inOut}${plan}Pie${date}`;
  var ctx = document.querySelector(`#${strPie}`);

  var pieCharts = {};

  // 기존 차트 인스턴스가 있으면 파괴
  if (pieCharts[strPie]) {
    pieCharts[strPie].destroy();
  }

  // 차트 생성
  pieCharts[strPie] = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [{
        data: [],
        backgroundColor: ['#30BEFF', '#505B66'],
        hoverBackgroundColor: ['#67DBE9', '#FFFFFF'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          display: true,
        }
      },
      animation: {
        duration: 0
      }
    }
  });

  $.ajax({
    url: `act/dash?key=${key}&inOut=${inOut}&plan=${plan}&date=${date}`,
    type: "POST",
    dataType:"JSON",
    success: (data) => {

      var dashBoardData = data[downStr];

      var resultMap = dashBoardData.reduce(function(map, obj) {
        Object.keys(obj).forEach(function(k) {
          map[k] = obj[k];
        });
        return map;
      }, {});

      var percentMap = resultMap.percentMap;
      var totalQty = resultMap.totalQty;
      var sunToSatList = resultMap.sunToSatList;

      // console.log("percentMap : " + JSON.stringify(percentMap));
      // console.log("totalQty : " + JSON.stringify(totalQty));
      // console.log("sunToSatList : " + JSON.stringify(sunToSatList));

      $(`.${strPie}Qty`).text(totalQty);

      $(`.${strPie}Sign`).addClass(percentMap.color);
      $(`.${strPie}Sign`).text(percentMap.sign);

      $(`.${strPie}Percent`).addClass(percentMap.color);
      $(`.${strPie}Percent`).text(percentMap.percent + " % ");

      $(`.${strPie}Count`).addClass(percentMap.color);
      $(`.${strPie}Count`).text(percentMap.count);

      var percent = parseInt($(`.${strPie}SubFix`).text());

      // 차트 데이터 업데이트
      pieCharts[strPie].data.datasets[0].data = [$(`.${strPie}Qty`).text(), percent];
      pieCharts[strPie].update();
    },
    error: function(e) {
      alert(e.toString());
    }
  });
};

// -------------------------------------------------------------------------------------------------
function fnProdInChartWeek() {

  var inChart = AmCharts.makeChart("prodInChartWeek", {
    "type": "serial",
    "theme": "light",
    "addClassNames": true,
    "hideCredits":true,
    "marginLeft": 25,
    "marginRight": 25,
    "marginTop": 0,
    "marginBottom": 0,
    "autoMarginOffset": 15,
    "startDuration": 0.9,
    "sequencedAnimation": true,
    "categoryField": "date",
    "categoryAxis": {
      "color": "#30BEFF",
      "axisColor": "#30BEFF",
      "gridAlpha": 0,
      "startOnAxis": false,
      "balloon": {
        "fillAlpha": 1,
        "fontSize": 15,
        "horizontalPadding": 10
      }
    },
    "balloon": {
      "borderThickness": 0,
      "shadowAlpha": 0,
      "fontSize": 18
    },
    "graphs": [
      {
        "id": "g1",
        "lineAlpha": 0,
        "lineThickness": 3,
        "valueField": "value1",
        "showBalloon": false
      },
      {
        "id": "g2",
        "lineAlpha": 1,
        "lineColor": "#30BEEE",
        "bullet": "round",
        "lineThickness": 3,
        "valueField": "value1",
        "balloonColor": "#30BEFF",
        "balloonText": "[[value1]]",
        "balloon": {
          "drop": true,
          "adjustBorderColor": false,
          "color": "#ffffff"
        }
      }
    ],
    "valueAxes": [{
      "stackType": "regular",
      "gridAlpha": 0,
      "gridColor": "#30BEFF",
      "axisAlpha": 0,
      "labelsEnabled": false,
      "minimum": 0,
      "ignoreAxisWidth": true
    }],
    "chartCursor": {
      "cursorAlpha": 0.7,
      "cursorColor": "#30BEFF",
      "limitToGraph": "g3",
      "categoryBalloonColor": "#30BEFF",
      "categoryBalloonAlpha": 1,
      "zoomable": false
    },
    "defs": {
      "filter": [{
        "x": "-50%",
        "y": "-50%",
        "width": "200%",
        "height": "200%",
        "id": "blur",
        "feGaussianBlur": {
          "in": "SourceGraphic",
          "stdDeviation": "15"
        }
      }]
    }
  });

  $.ajax({
    url: "act/prodInChartWeek",
    type: "POST",
    dataType:"json",
    data: {},
    success: (data) => {

      var chartData = data.prodInChartWeekList;
      var percentData = data.percentMap;

      // console.log("prodInChartWeekList : " + JSON.stringify(chartData));
      // console.log("percentMap : " + JSON.stringify(percentData));

      // 현재 날짜
      var today = new Date();
      var formattedToday = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

      // 데이터 할당
      var successData = JSON.stringify(chartData.map(function(item) {
        // 오늘 날짜를 'Today'로 표시
        var displayDate = item.date === formattedToday ? "Today" : item.date.substring(5, 10);
        return {
          date: displayDate,
          value1: item.totalQty
        };
      }));

      // 새로운 데이터로 차트 생성
      inChart.dataProvider = JSON.parse(successData);

      // 차트 업데이트
      inChart.validateData();

      // 증감폭 출력
      $(".prodInChartWeekSign").addClass(percentData.color);
      $(".prodInChartWeekSign").text(percentData.sign);

      $(".prodInChartWeekPercent").addClass(percentData.color);
      $(".prodInChartWeekPercent").text(percentData.percent + " % ");

      $(".prodInChartWeekCount").addClass(percentData.color);
      $(".prodInChartWeekCount").text(percentData.count);
    },
    error: function (request, status, error) {
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
  });
};

// -------------------------------------------------------------------------------------------------
function fnProdOutChartWeek() {

  var outChart = AmCharts.makeChart("prodOutChartWeek", {
    "type": "serial",
    "theme": "light",
    "addClassNames": true,
    "hideCredits":true,
    "marginLeft": 25,
    "marginRight": 25,
    "marginTop": 0,
    "marginBottom": 0,
    "autoMarginOffset": 15,
    "startDuration": 0.9,
    "sequencedAnimation": true,
    "categoryField": "date",
    "categoryAxis": {
      "color": "#30BEFF",
      "axisColor": "#30BEFF",
      "gridAlpha": 0,
      "startOnAxis": false,
      "balloon": {
        "fillAlpha": 1,
        "fontSize": 15,
        "horizontalPadding": 10
      }
    },
    "balloon": {
      "borderThickness": 0,
      "shadowAlpha": 0,
      "fontSize": 18
    },
    "graphs": [
      {
        "id": "g1",
        "lineAlpha": 0,
        "lineThickness": 3,
        "valueField": "value1",
        "showBalloon": false
      },
      {
        "id": "g2",
        "lineAlpha": 1,
        "lineColor": "#30BEEE",
        "bullet": "round",
        "lineThickness": 3,
        "valueField": "value1",
        "balloonColor": "#30BEFF",
        "balloonText": "[[value1]]",
        "balloon": {
          "drop": true,
          "adjustBorderColor": false,
          "color": "#ffffff"
        }
      }
    ],
    "valueAxes": [{
      "stackType": "regular",
      "gridAlpha": 0,
      "gridColor": "#30BEFF",
      "axisAlpha": 0,
      "labelsEnabled": false,
      "minimum": 0,
      "ignoreAxisWidth": true
    }],
    "chartCursor": {
      "cursorAlpha": 0.7,
      "cursorColor": "#30BEFF",
      "limitToGraph": "g3",
      "categoryBalloonColor": "#30BEFF",
      "categoryBalloonAlpha": 1,
      "zoomable": false
    },
    "defs": {
      "filter": [{
        "x": "-50%",
        "y": "-50%",
        "width": "200%",
        "height": "200%",
        "id": "blur",
        "feGaussianBlur": {
          "in": "SourceGraphic",
          "stdDeviation": "15"
        }
      }]
    }
  });
  $.ajax({
    url: "act/prodOutChartWeek",
    type: "POST",
    dataType:"json",
    data: {},
    success: (data) => {

      var chartData = data.prodOutChartWeekList;
      var percentData = data.percentMap;

      // console.log("prodOutChartWeekList : " + JSON.stringify(chartData));
      // console.log("percentMap : " + JSON.stringify(percentData));

      // 현재 날짜
      var today = new Date();
      var formattedToday = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

      // 데이터 할당
      var successData = JSON.stringify(chartData.map(function(item) {
        // 오늘 날짜를 'Today'로 표시
        var displayDate = item.date === formattedToday ? "Today" : item.date.substring(5, 10);
        return {
          date: displayDate,
          value1: item.totalQty
        };
      }));
      // 새로운 데이터로 차트 생성
      outChart.dataProvider = JSON.parse(successData);

      // 차트 업데이트
      outChart.validateData();

      // 증감폭 출력
      $(".prodOutChartWeekSign").addClass(percentData.color);
      $(".prodOutChartWeekSign").text(percentData.sign);

      $(".prodOutChartWeekPercent").addClass(percentData.color);
      $(".prodOutChartWeekPercent").text(percentData.percent + " % ");

      $(".prodOutChartWeekCount").addClass(percentData.color);
      $(".prodOutChartWeekCount").text(percentData.count);
    },
    error: function (request, status, error) {
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
  });
};

// -------------------------------------------------------------------------------------------------
function fnProdProtected() {
  $.ajax({
    url: "act/prodProtected",
    type: "POST",
    dataType:"JSON",
    success: (data) => {

      var listData = data.prodProtectedTodayList;

      var htmlContent = `
        <table class="table table-striped table-borderless mb-2px small text-nowrap">
          <tbody>
      `;

        listData.forEach(function (item, index) {
          var iconClass = index % 2 === 0
          ? "bi bi-circle-fill fs-6px text-theme mr-2px"
          : "bi bi-circle-fill fs-6px text-white-transparent-3 mr-2px";

          htmlContent += `
            <tr>
              <td>
                <div class="d-flex align-items-center justify-content-start">
                  <i class="${iconClass}"></i>
                  <span>${item.prodNm}</span>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center justify-content-end">
                  <span>${item.qty}</span>
                </div>
              </td>
            </tr>
          `;
        });

      htmlContent += `
          </tbody>
        </table>
      `;

      $(`#prodProtectedToday`).html(htmlContent);
    },
    error: function (request, status, error) {
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
  });
};

// -------------------------------------------------------------------------------------------------
function fnSwitchSpan(keyParam, inOutParam, planParam, dateParam) {

  var key = keyParam;
  let inOut = inOutParam;
  var date = dateParam;

  var planId = `${key}${inOut}Plan${date}`;
  var noPlanId = `${key}${inOut}${date}`;

  var planElement = $(`#${planId}`);
  var planElementSpan = $(`#${planId}Span`);
  var planElementQty = $(`.${planId}Qty`);
  var planElementSubfix = $(`.${planId}Subfix`);
  var planElementSign = $(`.${planId}Sign`);
  var planElementPercent = $(`.${planId}Percent`);

  var noPlanElement = $(`#${noPlanId}`);
  var noPlanElementSpan = $(`#${noPlanId}Span`);
  var noPlanElementQty = $(`.${noPlanId}Qty`);
  var noPlanElementSubfix = $(`.${noPlanId}Subfix`);
  var noPlanElementSign = $(`.${noPlanId}Sign`);
  var noPlanElementPercent = $(`.${noPlanId}Percent`);

  // '예정' 상태로 전환
  if (planParam) {
    planElement.show();
    planElementSpan.removeClass("text-gray").addClass("text-white");
    planElementQty.removeClass("d-none").addClass("d-inline");
    planElementSubfix.removeClass("d-none").addClass("d-inline");
    planElementSign.removeClass("d-none").addClass("d-inline");
    planElementPercent.removeClass("d-none").addClass("d-inline");

    noPlanElement.hide();
    noPlanElementSpan.removeClass("text-white").addClass("text-gray");
    noPlanElementQty.removeClass("d-inline").addClass("d-none");
    noPlanElementSubfix.removeClass("d-inline").addClass("d-none");
    noPlanElementSign.removeClass("d-inline").addClass("d-none");
    noPlanElementPercent.removeClass("d-inline").addClass("d-none");
  }
  // '현황' 상태로 전환
  else {
    planElement.hide();
    planElementSpan.removeClass("text-white").addClass("text-gray");
    planElementQty.removeClass("d-inline").addClass("d-none");
    planElementSubfix.removeClass("d-inline").addClass("d-none");
    planElementSign.removeClass("d-inline").addClass("d-none");
    planElementPercent.removeClass("d-inline").addClass("d-none");

    noPlanElement.show();
    noPlanElementSpan.removeClass("text-gray").addClass("text-white");
    noPlanElementQty.removeClass("d-none").addClass("d-inline");
    noPlanElementSubfix.removeClass("d-none").addClass("d-inline");
    noPlanElementSign.removeClass("d-none").addClass("d-inline");
    noPlanElementPercent.removeClass("d-none").addClass("d-inline");
  }
};

// -------------------------------------------------------------------------------------------------
function fnSwitchPie(keyParam, inOutParam, planParam, dateParam) {

  var key = keyParam;
  let inOut = inOutParam;
  var date = dateParam;

  var planId = `${key}${inOut}PlanPie${date}`;
  var noPlanId = `${key}${inOut}Pie${date}`;

  var planElement = $(`#${planId}`);
  var planElementSpan = $(`#${planId}Span`);
  var planElementQty = $(`.${planId}Qty`);
  var planElementSubfix = $(`.${planId}Subfix`);
  var planElementSign = $(`.${planId}Sign`);
  var planElementPercent = $(`.${planId}Percent`);

  var noPlanElement = $(`#${noPlanId}`);
  var noPlanElementSpan = $(`#${noPlanId}Span`);
  var noPlanElementQty = $(`.${noPlanId}Qty`);
  var noPlanElementSubfix = $(`.${noPlanId}Subfix`);
  var noPlanElementSign = $(`.${noPlanId}Sign`);
  var noPlanElementPercent = $(`.${noPlanId}Percent`);

  // '예정' 상태로 전환 (visibility)
  if (planParam) {
    planElement.show();
    planElementSpan.removeClass("text-gray").addClass("text-white");
    planElementQty.removeClass("d-none").addClass("d-inline");
    planElementSubfix.removeClass("d-none").addClass("d-inline");
    planElementSign.removeClass("d-none").addClass("d-inline");
    planElementPercent.removeClass("d-none").addClass("d-inline");

    noPlanElement.hide();
    noPlanElementSpan.removeClass("text-white").addClass("text-gray");
    noPlanElementQty.removeClass("d-inline").addClass("d-none");
    noPlanElementSubfix.removeClass("d-inline").addClass("d-none");
    noPlanElementSign.removeClass("d-inline").addClass("d-none");
    noPlanElementPercent.removeClass("d-inline").addClass("d-none");
  }
  // '현황' 상태로 전환
  else {
    planElement.hide();
    planElementSpan.removeClass("text-white").addClass("text-gray");
    planElementQty.removeClass("d-inline").addClass("d-none");
    planElementSubfix.removeClass("d-inline").addClass("d-none");
    planElementSign.removeClass("d-inline").addClass("d-none");
    planElementPercent.removeClass("d-inline").addClass("d-none");

    noPlanElement.show();
    noPlanElementSpan.removeClass("text-gray").addClass("text-white");
    noPlanElementQty.removeClass("d-none").addClass("d-inline");
    noPlanElementSubfix.removeClass("d-none").addClass("d-inline");
    noPlanElementSign.removeClass("d-none").addClass("d-inline");
    noPlanElementPercent.removeClass("d-none").addClass("d-inline");
  }
};

// -------------------------------------------------------------------------------------------------
jQuery(function($) {
  /* fnInOutChart("prod", "In", "", "Today");
  fnInOutChart("prod", "In", "Plan", "Today");
  fnInOutChart("prod", "Out", "", "Today");
  fnInOutChart("prod", "Out", "Plan", "Today"); */
  fnInOutChart("ship", "", "", "Today");
  fnInOutChart("ship", "", "Plan", "Today");

  /* fnPie("prod", "In", "Plan", "Week");
  fnPie("prod", "In", "", "Week");
  fnPie("prod", "Out", "Plan", "Week");
  fnPie("prod", "Out", "", "Week");

  fnProdProtected();
  fnProdInChartWeek();
  fnProdOutChartWeek(); */
});