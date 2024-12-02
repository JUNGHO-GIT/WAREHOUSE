/**
 * Created by KANGS on 2023-09-18.
 */
/**
 * Created by KANGS on 2023-01-18.
 */
$(document).ready(function () {

  fnChatList();
  setInterval(function () {
    document.location.href = "cores3.html";
  }, 60000);

});

var G_scrollCnt = 2;

var fnScrollUp = function () {
  var tr1 = $("#tr1").html();
  var tr2 = $("#tr2").html();
  var tr3 = $("#tr3").html();
  var tr4 = $("#tr4").html();
  var tr5 = $("#tr5").html();
  var tr6 = $("#tr6").html();

  var cnt1 = parseInt(G_scrollCnt) % 6;
  var cnt2 = (parseInt(cnt1) + 1) % 6;
  var cnt3 = (parseInt(cnt2) + 1) % 6;
  var cnt4 = (parseInt(cnt3) + 1) % 6;
  var cnt5 = (parseInt(cnt4) + 1) % 6;
  var cnt6 = (parseInt(cnt5) + 1) % 6;

  if (cnt1 == 0) cnt1 = 6;
  if (cnt2 == 0) cnt2 = 6;
  if (cnt3 == 0) cnt3 = 6;
  if (cnt4 == 0) cnt4 = 6;
  if (cnt5 == 0) cnt5 = 6;
  if (cnt6 == 0) cnt6 = 6;

  $("#tr" + cnt1).html(tr1);
  $("#tr" + cnt2).html(tr2);
  $("#tr" + cnt3).html(tr3);
  $("#tr" + cnt4).html(tr4);
  $("#tr" + cnt5).html(tr5);
  $("#tr" + cnt6).html(tr6);

  $("#tr" + cnt1).css("display", "none");
  $("#tr" + cnt2).css("display", "none");
  $("#tr" + cnt3).css("display", "none");
  $("#tr" + cnt4).css("display", "none");
  $("#tr" + cnt5).css("display", "none");
  $("#tr" + cnt6).css("display", "none");

  $("#tr1").fadeIn(800);
  setTimeout(function () {
    $("#tr2").fadeIn(800);
  }, 500);
  setTimeout(function () {
    $("#tr3").fadeIn(800);
  }, 800);
  setTimeout(function () {
    $("#tr4").fadeIn(800);
  }, 1100);
  setTimeout(function () {
    $("#tr5").fadeIn(800);
  }, 1400);
  setTimeout(function () {
    $("#tr6").fadeIn(800);
  }, 1700);

  G_scrollCnt++;

};

function shuffle (array) {
  array.sort(() => Math.random() - 0.5);
};

var fnChatList = function () {

  var toDeliChart = AmCharts.makeChart("toDeliChart", {
    "type": "serial",
    "theme": "light",
    "addClassNames": true,
    "marginLeft": 25,
    "marginRight": 25,
    "marginTop": 0,
    "marginBottom": 0,
    "autoMarginOffset": 15,
    "startDuration": 0.9,
    "sequencedAnimation": true,
    "dataProvider": [{
      "month": "Today",
      "value1": 160,
      "value2": 15,
      "value3": 0,
      "value4": 160,
      "color": "#30BEFF"
    }, {
      "month": "+1",
      "value1": 135,
      "value2": 15,
      "value3": 0,
      "value4": 115,
      "color": "#30BEFF"
    }, {
      "month": "+2",
      "value1": 102,
      "value2": 15,
      "value3": 0,
      "value4": 82,
      "color": "#30BEFF"
    }, {
      "month": "+3",
      "value1": 34,
      "value2": 15,
      "value3": 0,
      "value4": 14,
      "color": "#30BEFF"
    }, {
      "month": "+4",
      "value1": 108,
      "value2": 15,
      "value3": 0,
      "value4": 88,
      "color": "#30BEFF"
    }, {
      "month": "+5",
      "value1": 41,
      "value2": 15,
      "value3": 0,
      "value4": 21,
      "color": "#30BEFF"
    }],
    "graphs": [{
      "id": "g1",
      "lineAlpha": 0,
      "lineThickness": 3,
      "fillColors": "#30BEFF",
      "valueField": "value1",
      "showBalloon": false
    }, {
      "id": "g2",
      "lineAlpha": 0,
      "lineColor": "#fff",
      "lineThickness": 0,
      "fillColors": "#30BEFF",
      "fillColorsField": "color",
      "fillAlphas": 2,
      "valueField": "value2",
      "showBalloon": false
    }, {
      "id": "g3",
      "lineAlpha": 1,
      "lineColor": "#fff",
      "lineThickness": 5,
      "valueField": "value3",
      "balloonColor": "#30BEFF",
      "balloonText": "[[value1]]",
      "balloon": {
        "drop": true,
        "adjustBorderColor": false,
        "color": "#ffffff"
      }
    }, {
      "id": "g4",
      "lineAlpha": 1,
      "lineColor": "#000",
      "lineThickness": 10,
      "valueField": "value4",
      "showBalloon": false,
      "stackable": false,
      "lineAlpha": 0.6
    }
    ],
    "categoryField": "month",
    "categoryAxis": {
      "color": "#30BEFF",
      "axisColor": "#30BEFF",
      "gridAlpha": 0,
      "startOnAxis": false,
      "balloon": {
        "fillAlpha": 1,
        "fontSize": 5,
        "horizontalPadding": 10
      }
    },
    "valueAxes": [{
      "stackType": "regular",
      "gridAlpha": 0,
      "gridColor": "#30BEFF",
      "axisAlpha": 0,
      "labelsEnabled": false,
      "minimum": 0,
      "ignoreAxisWidth": true
    }],
    "balloon": {
      "borderThickness": 0,
      "shadowAlpha": 0,
      "fontSize": 5
    },
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

  var deliOkChat = new Chart(document.getElementById('deliOkChat'), {
    type: 'pie',
    data: {
      //      labels: ['준수율', '미준수율'],
      datasets: [{
        data: [98, 2],
        backgroundColor: ['#30BEFF', '#505B66'],
        hoverBackgroundColor: ['#67DBE9', '#FFFFFF'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  var deliNoChat = new Chart(document.getElementById('deliNoChat'), {
    type: 'pie',
    data: {
      //      labels: ['미준수율', '준수율'],
      datasets: [{
        data: [2, 98],
        backgroundColor: ['#30BEFF', '#505B66'],
        hoverBackgroundColor: ['#67DBE9', '#FFFFFF'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  var expectChat = new Chart(document.getElementById('expectChat'), {
    type: 'pie',
    data: {
      //      labels: ['주간 출하 예정', '주간 출하 완료'],
      datasets: [{
        data: [4864, 6396],
        backgroundColor: ['#30BEFF', '#505B66'],
        hoverBackgroundColor: ['#67DBE9', '#FFFFFF'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  /*var compChat = new Chart(document.getElementById('compChat'), {
      type: 'pie',
      data: {
          //    labels: ['주간 출하 완료', '주간 출하 예정'],
          datasets: [{
              data: [6396,4864],
              backgroundColor: ['#30BEFF',  '#505B66'],
              hoverBackgroundColor: ['#67DBE9', '#FFFFFF'],
              borderWidth: 0
          }]
      },
      options: {
          plugins: {
              legend: {
                  display: false
              }
          }
      }
  })*/

  am4core.ready(function () {

    am4core.useTheme(am4themes_animated);

    var commuChart = am4core.create("commuChart", am4charts.Pie3D);
    commuChart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    commuChart.data = [
      {
        inOut: "출근",
        cnt: 74
      },
      {
        inOut: "퇴근",
        cnt: 26
      }
    ];

    var series = commuChart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "cnt";
    series.dataFields.category = "inOut";
    series.ticks.template.disabled = true;
    series.labels.template.disabled = true;

  });

  var partNm = ["0-고속가공팀", "1-머시닝팀(범용밀링)", "2-머시닝팀(범용선반)", "3-머시닝팀(복합기)", "4-머시닝팀(MCT)", "5-방전팀", "6-연삭팀", "7-와이어팀", "8-조립팀", "9-프로파일팀", "10-PFC"];
  var workloadVal = [360095, 11968, 18000, 77232, 38789, 200806, 245995, 404822, 125947, 166223, 125949];

  shuffle(partNm);
  //   shuffle(workloadVal);

  var departChat = AmCharts.makeChart("departChat", {

    "type": "serial",
    "startDuration": 2,
    "dataProvider": [{
      "part": partNm[0].split("-")[1],
      "workload": workloadVal[partNm[0].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[1].split("-")[1],
      "workload": workloadVal[partNm[1].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[2].split("-")[1],
      "workload": workloadVal[partNm[2].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[3].split("-")[1],
      "workload": workloadVal[partNm[3].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[4].split("-")[1],
      "workload": workloadVal[partNm[4].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[5].split("-")[1],
      "workload": workloadVal[partNm[5].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[6].split("-")[1],
      "workload": workloadVal[partNm[6].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[7].split("-")[1],
      "workload": workloadVal[partNm[7].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[8].split("-")[1],
      "workload": workloadVal[partNm[8].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[9].split("-")[1],
      "workload": workloadVal[partNm[9].split("-")[0]],
      "color": "#30BEFF"
    }, {
      "part": partNm[10].split("-")[1],
      "workload": workloadVal[partNm[10].split("-")[0]],
      "color": "#30BEFF"
    }],
    "graphs": [{
      "colorField": "color",
      "fillAlphas": 0.65,
      "lineAlpha": 0.1,
      "type": "column",
      "valueField": "workload"
    }],
    "depth3D": 20,
    "angle": 150,
    "color": "#666666",
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "part",
    "categoryAxis": {
      "gridPosition": "start",
      "labelRotation": 0
    }
  });

  var shipChart = AmCharts.makeChart("shipChart", {
    "type": "serial",
    "startDuration": 3,
    "dataProvider": [{
      "date": "2023-02-27",
      "visits": 1148,
      "color": "#30BEFF"
    }, {
      "date": "2023-02-28",
      "visits": 912,
      "color": "#30BEFF"
    }, {
      "date": "2023-03-02",
      "visits": 884,
      "color": "#30BEFF"
    }, {
      "date": "2023-03-03",
      "visits": 1060,
      "color": "#30BEFF"
    }, {
      "date": "2023-03-06",
      "visits": 1028,
      "color": "#30BEFF"
    }, {
      "date": "2023-03-07",
      "visits": 884,
      "color": "#30BEFF"
    }, {
      "date": "2023-03-08",
      "visits": 820,
      "color": "#30BEFF"
    }, {
      "date": "2023-03-09",
      "visits": 956,
      "color": "#30BEFF"
    }],
    "graphs": [{
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "colorField": "color",
      "fillAlphas": 0.85,
      "lineAlpha": 0.1,
      "type": "column",
      "topRadius": 1,
      "valueField": "visits"
    }],
    "depth3D": 40,
    "angle": 30,
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "date",
    "categoryAxis": {
      "gridPosition": "start",
      "axisAlpha": 0,
      "gridAlpha": 0

    },
    "export": {
      "enabled": true
    },
    "color": "#666666"

  }, 0);

  var inChart = AmCharts.makeChart("inChart", {
    "type": "serial",
    "theme": "light",
    "addClassNames": true,
    "marginLeft": 25,
    "marginRight": 25,
    "marginTop": 0,
    "marginBottom": 0,
    "autoMarginOffset": 15,
    "startDuration": 0.9,
    "sequencedAnimation": true,
    "dataProvider": [{
      "month": "-6",
      "value1": 10,
      "value2": 10,
      "value3": 0,
      "value4": -10,
      "color": "#30BEFF"
    }, {
      "month": "-5",
      "value1": 43,
      "value2": 10,
      "value3": 0,
      "value4": 23,
      "color": "#30BEFF"
    }, {
      "month": "-4",
      "value1": 15,
      "value2": 10,
      "value3": 0,
      "value4": -5,
      "color": "#30BEFF"
    }, {
      "month": "-3",
      "value1": 42,
      "value2": 10,
      "value3": 0,
      "value4": 22,
      "color": "#30BEFF"
    }, {
      "month": "-2",
      "value1": 52,
      "value2": 10,
      "value3": 0,
      "value4": 32,
      "color": "#30BEFF"
    }, {
      "month": "-1",
      "value1": 40,
      "value2": 10,
      "value3": 0,
      "value4": 20,
      "color": "#30BEFF"
    }, {
      "month": "Today",
      "value1": 35,
      "value2": 10,
      "value3": 0,
      "value4": 15,
      "color": "#30BEFF"
    }],
    "graphs": [{
      "id": "g1",
      "lineAlpha": 0,
      "lineThickness": 3,
      "valueField": "value1",
      "showBalloon": false
    }, {
      "id": "g2",
      "lineAlpha": 0,
      "lineColor": "#fff",
      "lineThickness": 0,
      "fillColors": "#30BEFF",
      "fillColorsField": "color",
      "fillAlphas": 1,
      "valueField": "value2",
      "showBalloon": false
    }, {
      "id": "g3",
      "lineAlpha": 1,
      "lineColor": "#fff",
      "lineThickness": 5,
      "valueField": "value3",
      "balloonColor": "#30BEFF",
      "balloonText": "[[value1]]",
      "balloon": {
        "drop": true,
        "adjustBorderColor": false,
        "color": "#ffffff"
      }
    }, {
      "id": "g4",
      "lineAlpha": 1,
      "lineColor": "#000",
      "lineThickness": 10,
      "valueField": "value4",
      "showBalloon": false,
      "stackable": false,
      "lineAlpha": 0.6
    }
    ],
    "categoryField": "month",
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
    "valueAxes": [{
      "stackType": "regular",
      "gridAlpha": 0,
      "gridColor": "#30BEFF",
      "axisAlpha": 0,
      "labelsEnabled": false,
      "minimum": 0,
      "ignoreAxisWidth": true
    }],
    "balloon": {
      "borderThickness": 0,
      "shadowAlpha": 0,
      "fontSize": 18
    },
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

  var outChart = AmCharts.makeChart("outChart", {
    "type": "serial",
    "theme": "light",
    "addClassNames": true,
    "marginLeft": 25,
    "marginRight": 25,
    "marginTop": 0,
    "marginBottom": 0,
    "autoMarginOffset": 15,
    "startDuration": 0.9,
    "sequencedAnimation": true,
    "dataProvider": [{
      "month": "-6",
      "value1": 32,
      "value2": 10,
      "value3": 0,
      "value4": -10,
      "color": "#30BEFF"
    }, {
      "month": "-5",
      "value1": 11,
      "value2": 10,
      "value3": 0,
      "value4": 23,
      "color": "#30BEFF"
    }, {
      "month": "-4",
      "value1": 27,
      "value2": 10,
      "value3": 0,
      "value4": -5,
      "color": "#30BEFF"
    }, {
      "month": "-3",
      "value1": 7,
      "value2": 10,
      "value3": 0,
      "value4": 22,
      "color": "#30BEFF"
    }, {
      "month": "-2",
      "value1": 29,
      "value2": 10,
      "value3": 0,
      "value4": 32,
      "color": "#30BEFF"
    }, {
      "month": "-1",
      "value1": 56,
      "value2": 10,
      "value3": 0,
      "value4": 20,
      "color": "#30BEFF"
    }, {
      "month": "Today",
      "value1": 22,
      "value2": 10,
      "value3": 0,
      "value4": 15,
      "color": "#30BEFF"
    }],
    "graphs": [{
      "id": "g1",
      "lineAlpha": 0,
      "lineThickness": 3,
      "valueField": "value1",
      "showBalloon": false
    }, {
      "id": "g2",
      "lineAlpha": 0,
      "lineColor": "#fff",
      "lineThickness": 0,
      "fillColors": "#30BEFF",
      "fillColorsField": "color",
      "fillAlphas": 1,
      "valueField": "value2",
      "showBalloon": false
    }, {
      "id": "g3",
      "lineAlpha": 1,
      "lineColor": "#fff",
      "lineThickness": 5,
      "valueField": "value3",
      "balloonColor": "#30BEFF",
      "balloonText": "[[value1]]",
      "balloon": {
        "drop": true,
        "adjustBorderColor": false,
        "color": "#ffffff"
      }
    }, {
      "id": "g4",
      "lineAlpha": 1,
      "lineColor": "#000",
      "lineThickness": 10,
      "valueField": "value4",
      "showBalloon": false,
      "stackable": false,
      "lineAlpha": 0.6
    }
    ],
    "categoryField": "month",
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
    "valueAxes": [{
      "stackType": "regular",
      "gridAlpha": 0,
      "gridColor": "#30BEFF",
      "axisAlpha": 0,
      "labelsEnabled": false,
      "minimum": 0,
      "ignoreAxisWidth": true
    }],
    "balloon": {
      "borderThickness": 0,
      "shadowAlpha": 0,
      "fontSize": 18
    },
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

};