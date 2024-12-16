// -------------------------------------------------------------------------------------------------
const fnInOutChart = async (keyParam, inOutParam, planParam, dateParam) => {

  const downStr = `${keyParam}${inOutParam}${planParam}${dateParam}`;

  fetch(`act/dash`, {
    method: "POST",
    body: `key=${keyParam}&inOut=${inOutParam}&plan=${planParam}&date=${dateParam}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    },
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {
    const dashBoardData = data[downStr];
    const resultMap = dashBoardData.reduce((map, obj) => {
      Object.keys(obj).forEach((k) => {
        map[k] = obj[k];
      });
      return map;
    }, {});

    const todayList = resultMap.todayList;
    const percentMap = resultMap.dayPercentMap;
    const todayQty = resultMap.qtyMap.todayQty;
    const thisWeekQty = resultMap.qtyMap.thisWeekQty;

    const htmlContent = todayList.map((item, index) => {
      const classStr = index === todayList.length - 1;
      return (/* javascript */`
        <div class="d-row-left">
          <div class="mr-auto">
            <div class="fs-0-9rem fw-500 mr-10px">${item.prodNm}</div>
            <div class="fs-0-7rem fw-400 dark-white">${item.sessionCnt} session</div>
          </div>
          <div class="ml-auto">
            <div class="fs-0-9rem fw-600 white">${item.qty}</div>
          </div>
        </div>
        <hr class="hr ${classStr ? 'd-none' : 'd-block'}" />
      `);
    }).join("");

    setInnerHTML(getById(`${downStr}`), htmlContent);
    setTextContent(getById(`${downStr}Qty`), todayQty);
    setTextContent(getById(`${downStr}QtyInWeek`), todayQty);
    addClass(getById(`${downStr}Sign`), percentMap.color);
    setTextContent(getById(`${downStr}Sign`), percentMap.sign);
    addClass(getById(`${downStr}Percent`), percentMap.color);
    setTextContent(getById(`${downStr}Percent`), `${percentMap.percent} %`);
    addClass(getById(`${downStr}Count`), percentMap.color);
    setTextContent(getById(`${downStr}Count`), percentMap.count);
  })
  .catch((err) => {
    console.error(err);
  });
};

// -------------------------------------------------------------------------------------------------
const fnPieChart = async (keyParam, inOutParam, planParam, dateParam) => {

  const downStr = `${keyParam}${inOutParam}${planParam}${dateParam}`;
  const strPie = `${keyParam}${inOutParam}Pie${planParam}${dateParam}`;
  const ctx = getEl(`#${strPie}`);
  const pieCharts = {};

  // 기존 차트 인스턴스가 있으면 파괴
  if (pieCharts[strPie]) {
    pieCharts[strPie].destroy();
  }

  // 차트 생성
  // @ts-ignore
  pieCharts[strPie] = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [{
        data: [0, 100],
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

  fetch(`act/dash`, {
    method: "POST",
    body: `key=${keyParam}&inOut=${inOutParam}&plan=${planParam}&date=${dateParam}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    },
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {
    const dashBoardData = data[downStr];
    const resultMap = dashBoardData.reduce((map, obj) => {
      Object.keys(obj).forEach((k) => {
        map[k] = obj[k];
      });
      return map;
    }, {});

    const percentMap = resultMap.weekPercentMap;
    const thisWeekQty = resultMap.qtyMap.thisWeekQty;

    setTextContent(getById(`${strPie}Qty`), thisWeekQty);
    addClass(getById(`${strPie}Sign`), percentMap.color);
    setTextContent(getById(`${strPie}Sign`), percentMap.sign);
    addClass(getById(`${strPie}Percent`), percentMap.color);
    setTextContent(getById(`${strPie}Percent`), `${percentMap.percent} %`);
    addClass(getById(`${strPie}Count`), percentMap.color);
    setTextContent(getById(`${strPie}Count`), percentMap.count);

    // 차트 데이터 업데이트
    const percent = parseInt(percentMap.percent);
    if (!percent || percent === 0) {
      pieCharts[strPie].data.datasets[0].data = [0, 100];
    }
    else {
      pieCharts[strPie].data.datasets[0].data = [percent, 100 - percent];
    }

    pieCharts[strPie].update();
  })
  .catch((err) => {
    console.error(err);
  });
};

// -------------------------------------------------------------------------------------------------
const fnProdProtected = async () => {

  fetch(`act/prodProtected`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    },
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {
    let listData = data.prodProtectedTodayList;
    let listLength = listData.length;
    let htmlContent = (`
      <table class="table table-striped table-borderless">
      <tbody>
    `);

    listData.forEach((item, index) => {
      const iconClass = index % 2 === 0
      ? "fas fa-circle fs-6px text-theme mr-10px"
      : "fas fa-circle fs-6px text-white-transparent-3 mr-10px";

      htmlContent += (/* javascript */`
        <tr>
          <td>
            <div class="d-row-left">
              <div class="${iconClass}"></div>
              <div class="fs-0-8rem fw-500 grey">${item.prodNm}</div>
            </div>
          </td>
          <td>
            <div class="d-row-right">
              <div class="fs-0-9rem fw-600 white">${item.qty}</div>
            </div>
          </td>
        </tr>
      `);
    });

    htmlContent += (`
        </tbody>
      </table>
    `);

    setInnerHTML(getById("prodProtectedToday"), htmlContent);
    setTextContent(getById("prodProtectedTodayCount"), listLength);
  })
  .catch((err) => {
    console.error(err);
  });
};

// -------------------------------------------------------------------------------------------------
const fnProdInChartWeek = async () => {

  const inChart = AmCharts.makeChart("prodInChartWeek", {
    type: "serial",
    theme: "light",
    addClassNames: true,
    hideCredits: true,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 80,
    marginBottom: 0,
    autoMarginOffset: 15,
    startDuration: 0.9,
    sequencedAnimation: true,
    categoryField: "date",
    categoryAxis: {
      color: "#30BEFF",
      axisColor: "#30BEFF",
      gridAlpha: 0,
      startOnAxis: false,
      balloon: {
        fillAlpha: 1,
        fontSize: 12,
        horizontalPadding: 3,
      }
    },
    graphs: [
      {
        id: "g1",
        lineAlpha: 0,
        lineThickness: 3,
        valueField: "value1",
        showBalloon: false
      },
      {
        id: "g2",
        lineAlpha: 1,
        lineColor: "#30BEEE",
        bullet: "round",
        lineThickness: 3,
        valueField: "value1",
        balloonColor: "#30BEFF",
        balloonText: "[[value1]]",
        balloon: {
          drop: true,
          adjustBorderColor: false,
          color: "#ffffff"
        }
      }
    ],
    valueAxes: [{
      stackType: "regular",
      gridAlpha: 0,
      gridColor: "#30BEFF",
      axisAlpha: 0,
      labelsEnabled: false,
      minimum: 0,
      ignoreAxisWidth: true
    }],
    chartCursor: {
      cursorAlpha: 0.7,
      cursorColor: "#30BEFF",
      categoryBalloonColor: "#30BEFF",
      categoryBalloonAlpha: 1,
      zoomable: false
    },
    defs: {
      filter: [{
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%",
        id: "blur",
        feGaussianBlur: {
          in: "SourceGraphic",
          stdDeviation: "15"
        }
      }]
    }
  });

  fetch(`act/prodInChartWeek`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    },
  })
  .then((response) => response.json())
  .then((data) => {
    const chartData = data.prodInChartWeekList;
    const percentData = data.percentMap;

    const today = new Date();
    const formattedToday = (
      `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
    );

    const successData = JSON.stringify(chartData.map((item) => {
      const displayDate = (item.date === formattedToday) ? "Today" : item.date.substring(5, 10);
      return {
        date: displayDate,
        value1: item.totalQty
      };
    }));

    inChart.dataProvider = JSON.parse(successData);
    inChart.validateData();

    addClass(getById("prodInChartWeekSign"), percentData.color);
    setTextContent(getById("prodInChartWeekSign"), percentData.sign);
    addClass(getById("prodInChartWeekPercent"), percentData.color);
    setTextContent(getById("prodInChartWeekPercent"), `${percentData.percent} %`);
    addClass(getById("prodInChartWeekCount"), percentData.color);
    setTextContent(getById("prodInChartWeekCount"), percentData.count);
  })
  .catch((err) => {
    console.error(err);
  });
};

// -------------------------------------------------------------------------------------------------
const fnProdOutChartWeek = async () => {

  const outChart = AmCharts.makeChart("prodOutChartWeek", {
    type: "serial",
    theme: "light",
    addClassNames: true,
    hideCredits: true,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 80,
    marginBottom: 0,
    autoMarginOffset: 15,
    startDuration: 0.9,
    sequencedAnimation: true,
    categoryField: "date",
    categoryAxis: {
      color: "#30BEFF",
      axisColor: "#30BEFF",
      gridAlpha: 0,
      startOnAxis: false,
      balloon: {
        fillAlpha: 1,
        fontSize: 12,
        horizontalPadding: 3,
      }
    },
    graphs: [
      {
        id: "g1",
        lineAlpha: 0,
        lineThickness: 3,
        valueField: "value1",
        showBalloon: false
      },
      {
        id: "g2",
        lineAlpha: 1,
        lineColor: "#30BEEE",
        bullet: "round",
        lineThickness: 3,
        valueField: "value1",
        balloonColor: "#30BEFF",
        balloonText: "[[value1]]",
        balloon: {
          drop: true,
          adjustBorderColor: false,
          color: "#ffffff"
        }
      }
    ],
    valueAxes: [{
      stackType: "regular",
      gridAlpha: 0,
      gridColor: "#30BEFF",
      axisAlpha: 0,
      labelsEnabled: false,
      minimum: 0,
      ignoreAxisWidth: true
    }],
    chartCursor: {
      cursorAlpha: 0.7,
      cursorColor: "#30BEFF",
      categoryBalloonColor: "#30BEFF",
      categoryBalloonAlpha: 1,
      zoomable: false
    },
    defs: {
      filter: [{
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%",
        id: "blur",
        feGaussianBlur: {
          in: "SourceGraphic",
          stdDeviation: "15"
        }
      }]
    }
  });

  fetch(`act/prodOutChartWeek`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "AJAX": "true"
    },
  })
  .then((response) => (
    response.json()
  ))
  .then((data) => {
    const chartData = data.prodOutChartWeekList;
    const percentData = data.percentMap;

    const today = new Date();
    const formattedToday = (
      `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
    );

    const successData = JSON.stringify(chartData.map((item) => {
      const displayDate = item.date === formattedToday ? "Today" : item.date.substring(5, 10);
      return {
        date: displayDate,
        value1: item.totalQty
      };
    }));

    outChart.dataProvider = JSON.parse(successData);
    outChart.validateData();

    addClass(getById("prodOutChartWeekSign"), percentData.color);
    setTextContent(getById("prodOutChartWeekSign"), percentData.sign);
    addClass(getById("prodOutChartWeekPercent"), percentData.color);
    setTextContent(getById("prodOutChartWeekPercent"), `${percentData.percent} %`);
    addClass(getById("prodOutChartWeekCount"), percentData.color);
    setTextContent(getById("prodOutChartWeekCount"), percentData.count);
  })
  .catch((err) => {
    console.error(err);
  });
};

// -------------------------------------------------------------------------------------------------
const fnSwitch = (keyParam, inOutParam, planParam, dateParam, isPie) => {

  const key = keyParam;
  const inOut = inOutParam;
  const date = dateParam;

  const planId = isPie ? `${key}${inOut}PiePlan${date}` : `${key}${inOut}Plan${date}`;
  const noPlanId = isPie ? `${key}${inOut}Pie${date}` : `${key}${inOut}${date}`;

  const planArray = [
    `${planId}Div`, `${planId}Qty`, `${planId}Subfix`, `${planId}Sign`, `${planId}Percent`
  ];

  const noPlanArray = [
    `${noPlanId}Div`, `${noPlanId}Qty`, `${noPlanId}Subfix`, `${noPlanId}Sign`, `${noPlanId}Percent`
  ];

  // '예정' 상태로 전환
  if (planParam) {
    getById(planId)?.classList?.remove("d-none");
    getById(planId)?.classList?.add("d-block");
    planArray.forEach((el) => {
      if (el.includes("Div")) {
        getById(el)?.classList?.remove("grey");
        getById(el)?.classList?.add("light");
      }
      else {
        getById(el)?.classList?.remove("d-none");
        getById(el)?.classList?.add("d-block");
      }
    });

    getById(noPlanId)?.classList?.remove("d-block");
    getById(noPlanId)?.classList?.add("d-none");
    noPlanArray.forEach((el) => {
      if (el.includes("Div")) {
        getById(el)?.classList?.remove("light");
        getById(el)?.classList?.add("grey");
      }
      else {
        getById(el)?.classList?.remove("d-block");
        getById(el)?.classList?.add("d-none");
      }
    });
  }

  // '현황' 상태로 전환
  else {
    getById(planId)?.classList?.remove("d-block");
    getById(planId)?.classList?.add("d-none");
    planArray.forEach((el) => {
      if (el.includes("Div")) {
        getById(el)?.classList?.remove("light");
        getById(el)?.classList?.add("grey");
      }
      else {
        getById(el)?.classList?.remove("d-block");
        getById(el)?.classList?.add("d-none");
      }
    });

    getById(noPlanId)?.classList?.remove("d-none");
    getById(noPlanId)?.classList?.add("d-block");
    noPlanArray.forEach((el) => {
      if (el.includes("Div")) {
        getById(el)?.classList?.remove("grey");
        getById(el)?.classList?.add("light");
      }
      else {
        getById(el)?.classList?.remove("d-none");
        getById(el)?.classList?.add("d-block");
      }
    });
  }
};

// -------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  await fnInOutChart("prod", "In", "", "Today");
  await fnInOutChart("prod", "In", "Plan", "Today");
  await fnInOutChart("prod", "Out", "", "Today");
  await fnInOutChart("prod", "Out", "Plan", "Today");
  await fnInOutChart("ship", "", "", "Today");
  await fnInOutChart("ship", "", "Plan", "Today");

  await fnPieChart("prod", "In", "", "Week");
  await fnPieChart("prod", "In", "Plan", "Week");
  await fnPieChart("prod", "Out", "", "Week");
  await fnPieChart("prod", "Out", "Plan", "Week");

  await fnProdProtected();
  await fnProdInChartWeek();
  await fnProdOutChartWeek();
});