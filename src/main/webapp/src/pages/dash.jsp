<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page session="true" %>

<!DOCTYPE html>
<html class="bg-cover-5">

  <!-- head --------------------------------------------------------------------------------------->
  <head lang="en, ko">
    <title>warehouse dash</title>

    <!-- meta -->
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <!-- css -->
    <link rel="stylesheet" href="/inc/dash/css/main.css" />
    <link rel="stylesheet" href="/inc/dash/css/vendor.min.css" />
    <link rel="stylesheet" href="/inc/dash/css/app.min.css" />

    <!-- js cdn -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
    <script src="//www.amcharts.com/lib/3/amcharts.js"></script>
    <script src="//www.amcharts.com/lib/3/serial.js"></script>

    <!-- js local -->
    <script src="/inc/dash/js/vendor.min.js"></script>
    <script defer src="/inc/dash/js/app.min.js"></script>
    <script defer src="/inc//js/page/dash.js"></script>

    <!-- css -->
    <style>
      .hr {
        opacity: 0.3;
        margin: 0.5rem -1.3rem;
      }
      .card {
        height: 100% !important;
      }
      .card-body {
        overflow-x: hidden !important;
        overflow-y: auto !important;
      }
      .flex-grow-1 {
        cursor: pointer !important;
        caret-color: transparent !important;
      }
      .d-none {
        display: none !important;
      }
    </style>
  </head>

  <!-- body --------------------------------------------------------------------------------------->
  <body class="theme-cyan">
    <div id="app" class="app">
      <div id="content" class="" style="margin: 1.3%">
        <button class="app-sidebar-mobile-backdrop" data-toggle-target=".app" data-toggle-class="app-sidebar-mobile-toggled"></button>

        <!-- header ------------------------------------------------------------------------------->
        <div id="header" class="app-header">
          <a href="#" data-toggle="scroll-to-top" class="btn-scroll-top fade">
            <i class="fa fa-arrow-up"></i>
          </a>
          <div class="brand" style="margin-left: -1%">
            <a href="main" class="brand-logo">
              <img src="viewFiles?fileUrl=${fileUrl}" width="131.1471.px" height="27.81135px" />
            </a>
          </div>
          <!-- 뒤로가기 버튼 -->
          <div class="menu">
            <div class="menu-item dropdown dropdown-mobile-full">
              <a href="#" data-toggle="dropdown" class="nav-link d-flex align-items-center">
                <i class="fas fa-arrow-right" style="font-size: 1.5rem; margin-right: 0.5rem" onClick="location.href='main'"></i>
              </a>
            </div>
          </div>
        </div>
        <!-- /.header -->

        <!-- row 1 -------------------------------------------------------------------------------->
        <div class="row" data-masonry='{"percentPosition":true}'>

          <!-- col 1 -->
          <div class="col-xl-4 col-lg-6 mb-4" style="height: 21.5rem">
            <div class="card" style="height: 100%">
              <div class="card-body">
                <div class="d-flex fw-bold small">
                  <span class="flex-grow-1 fs-14px text-white" id="prodInTodaySpan"
                  onClick="fnSwitchSpan('prod', 'In', '', 'Today')">
                    금일 입고 현황
                  </span>
                  <span class="flex-grow-1 fs-14px text-gray" id="prodInPlanTodaySpan"
                  onClick="fnSwitchSpan('prod', 'In', 'Plan', 'Today')">
                    금일 입고 예정
                  </span>
                  <a href="#" data-toggle="card-expand" class="text-white text-opacity-50 text-decoration-none">
                    <i class="bi bi-fullscreen"></i>
                  </a>
                </div>
                <div class="row">
                  <div class="col-12 float-sm-start">
                    <div class="row align-items-center">
                      <h5 class="mb-0">
                        <small class="fw-600 ms-auto" style="font-size: 40px">
                          <span class="prodInTodayQty"></span>
                          <span class="prodInPlanTodayQty d-none"></span>
                        </small>
                        <small class="h3">
                          <span class="prodInTodaySubfix">건</span>
                          <span class="prodInPlanTodaySubfix d-none">예정</span>
                        </small>
                      </h5>
                    </div>
                  </div>
                </div>
                <hr class="hr" />
                <!-- 1. 현황 -->
                <div id="prodInToday" style="display:block"></div>
                <!-- 2. 예정 -->
                <div id="prodInPlanToday" style="display:none"></div>
              </div>
              <div class="card-arrow">
                <div class="card-arrow-top-left"></div>
                <div class="card-arrow-top-right"></div>
                <div class="card-arrow-bottom-left"></div>
                <div class="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <!-- /.col 1 -->

          <!-- col 2 -->
          <div class="col-xl-4 col-lg-6 mb-4" style="height: 21.5rem">
            <div class="card" style="height: 100%">
              <div class="card-body">
                <div class="d-flex fw-bold small">
                  <span class="flex-grow-1 fs-14px text-white" id="prodOutTodaySpan"
                  onClick="fnSwitchSpan('prod', 'Out', '', 'Today')">
                    금일 출고 현황
                  </span>
                  <span class="flex-grow-1 fs-14px text-gray" id="prodOutPlanTodaySpan"
                  onClick="fnSwitchSpan('prod', 'Out', 'Plan', 'Today')">
                    금일 출고 예정
                  </span>
                  <a href="#" data-toggle="card-expand" class="text-white text-opacity-50 text-decoration-none">
                    <i class="bi bi-fullscreen"></i>
                  </a>
                </div>
                <div class="row">
                  <div class="col-12 float-sm-start">
                    <div class="row align-items-center">
                      <h5 class="mb-0">
                        <small class="fw-600 ms-auto" style="font-size: 40px">
                          <span class="prodOutTodayQty"></span>
                          <span class="prodOutPlanTodayQty d-none"></span>
                        </small>
                        <small class="h3">
                          <span class="prodOutTodaySubfix">건</span>
                          <span class="prodOutPlanTodaySubfix d-none">예정</span>
                        </small>
                      </h5>
                    </div>
                  </div>
                </div>
                <hr class="hr" />
                <!-- 1. 현황 -->
                <div id="prodOutToday" style="display:block"></div>
                <!-- 2. 예정 -->
                <div id="prodOutPlanToday" style="display:none"></div>
              </div>
              <div class="card-arrow">
                <div class="card-arrow-top-left"></div>
                <div class="card-arrow-top-right"></div>
                <div class="card-arrow-bottom-left"></div>
                <div class="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <!-- /.col 2 -->

          <!-- col 3 -->
          <div class="col-xl-4 col-lg-6 mb-4" style="height: 21.5rem">
            <div class="card" style="height: 100%">
              <div class="card-body">
                <div class="d-flex fw-bold small">
                  <span class="flex-grow-1 fs-14px text-white" id="shipTodaySpan"
                  onClick="fnSwitchSpan('ship', '', '', 'Today')">
                    금일 출하 현황
                  </span>
                  <span class="flex-grow-1 fs-14px text-gray" id="shipPlanTodaySpan"
                  onClick="fnSwitchSpan('ship', '', 'Plan', 'Today')">
                    금일 출하 예정
                  </span>
                  <a href="#" data-toggle="card-expand" class="text-white text-opacity-50 text-decoration-none">
                    <i class="bi bi-fullscreen"></i>
                  </a>
                </div>
                <div class="row">
                  <div class="col-12 float-sm-start">
                    <div class="row align-items-center">
                      <h5 class="mb-0">
                        <small class="fw-600 ms-auto" style="font-size: 40px">
                          <span class="shipTodayQty"></span>
                          <span class="shipPlanTodayQty d-none"></span>
                        </small>
                        <small class="h3">
                          <span class="shipTodaySubfix">건</span>
                          <span class="shipPlanTodaySubfix d-none">예정</span>
                        </small>
                      </h5>
                    </div>
                  </div>
                </div>
                <hr class="hr" />
                <!-- 1. 현황 -->
                <div id="shipToday" style="display:block"></div>
                <!-- 2. 예정 -->
                <div id="shipPlanToday" style="display:none"></div>
              </div>
              <div class="card-arrow">
                <div class="card-arrow-top-left"></div>
                <div class="card-arrow-top-right"></div>
                <div class="card-arrow-bottom-left"></div>
                <div class="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <!-- /.col 3 -->

        </div>
        <!-- /.row 1 -->

        <!-- row 2 ------------------------------------------------------------------------------>
        <div class="row" data-masonry='{"percentPosition":true}'>
          <!-- col 1 -->
          <div class="col-xl-3 col-lg-3 mb-4" style="height: 15rem">
            <div class="card" style="height: 100%">
              <div class="card-body">
                <div class="d-flex fw-bold small">
                  <span class="flex-grow-1 fs-14px text-white" id="prodInPieWeekSpan"
                  onClick="fnSwitchPie('prod', 'In', '', 'Week')">
                    금주 입고 현황
                  </span>
                  <span class="flex-grow-1 fs-14px text-gray" id="prodInPlanPieWeekSpan"
                  onClick="fnSwitchPie('prod', 'In', 'Plan', 'Week')">
                    금주 입고 예정
                  </span>
                  <a href="#" data-toggle="card-expand" class="text-white text-opacity-50 text-decoration-none">
                    <i class="bi bi-fullscreen"></i>
                  </a>
                </div>
                <div class="row">
                  <div class="col-12 float-sm-start">
                    <div class="row align-items-center">
                      <h5 class="mb-0">
                        <small class="fw-600 ms-auto" style="font-size: 40px">
                          <span class="prodInPieWeekQty"></span>
                          <span class="prodInPlanPieWeekQty d-none"></span>
                        </small>
                        <small class="h3">
                          <span class="prodInPieWeekSubfix">건</span>
                          <span class="prodInPlanPieWeekSubfix d-none">예정</span>
                        </small>
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div style="height: 7rem; width: 7rem; margin: 0 auto; margin-top: 3%">
                      <!-- 1. 현황 -->
                      <canvas id="prodInPieWeek" style="display:block"></canvas>
                      <!-- 2. 예정 -->
                      <canvas id="prodInPlanPieWeek" style="display:none"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-arrow">
                <div class="card-arrow-top-left"></div>
                <div class="card-arrow-top-right"></div>
                <div class="card-arrow-bottom-left"></div>
                <div class="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <!-- /.col 1 -->

          <!-- col 2 -->
          <div class="col-xl-3 col-lg-3 mb-4" style="height: 15rem">
            <div class="card" style="height: 100%">
              <div class="card-body">
                <div class="d-flex fw-bold small">
                  <span class="flex-grow-1 fs-14px text-white" id="prodOutPieWeekSpan"
                  onClick="fnSwitchPie('prod', 'Out', '', 'Week')">
                    금주 출고 현황
                  </span>
                  <span class="flex-grow-1 fs-14px text-gray" id="prodOutPlanPieWeekSpan"
                  onClick="fnSwitchPie('prod', 'Out', 'Plan', 'Week')">
                    금주 출고 예정
                  </span>
                  <a href="#" data-toggle="card-expand" class="text-white text-opacity-50 text-decoration-none">
                    <i class="bi bi-fullscreen"></i>
                  </a>
                </div>
                <div class="row">
                  <div class="col-12 float-sm-start">
                    <div class="row align-items-center">
                      <h5 class="mb-0">
                        <small class="fw-600 ms-auto" style="font-size: 40px">
                          <span class="prodOutPieWeekQty"></span>
                          <span class="prodOutPlanPieWeekQty d-none"></span>
                        </small>
                        <small class="h3">
                          <span class="prodOutPieWeekSubfix">건</span>
                          <span class="prodOutPlanPieWeekSubfix d-none">예정</span>
                        </small>
                      </h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div style="height: 7rem; width: 7rem; margin: 0 auto; margin-top: 3%">
                        <!-- 1. 현황 -->
                        <canvas id="prodOutPieWeek" style="display:block"></canvas>
                        <!-- 2. 예정 -->
                        <canvas id="prodOutPlanPieWeek" style="display:none"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-arrow">
                <div class="card-arrow-top-left"></div>
                <div class="card-arrow-top-right"></div>
                <div class="card-arrow-bottom-left"></div>
                <div class="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <!-- /.col 2 -->

          <!-- col 3 -->
          <div class="col-xl-6 col-lg-6 mb-4" style="height: 15rem">
            <div class="card" style="height: 100%">
              <div class="card-body">
                <div class="d-flex fw-bold small mb-3">
                  <span class="flex-grow-1 fs-14px">
                    안전 재고 알림
                  </span>
                  <a href="#" data-toggle="card-expand" class="text-white text-opacity-50 text-decoration-none">
                    <i class="bi bi-fullscreen"></i>
                  </a>
                </div>
                <div class="table-responsive">
                  <!-- 1. 현황 -->
                  <div id="prodProtectedToday" style="display:block"></div>
                  <!-- 2. 예정 -->
                  <div id="prodProtectedPlanToday" style="display:none"></div>
                </div>
              </div>
              <div class="card-arrow">
                <div class="card-arrow-top-left"></div>
                <div class="card-arrow-top-right"></div>
                <div class="card-arrow-bottom-left"></div>
                <div class="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <!-- /.col 3 -->
        </div>
        <!-- /.row 2 -->

        <!-- row 3 ------------------------------------------------------------------------------>
        <div class="row" data-masonry='{"percentPosition":true}'>
          <!-- col 1 -->
          <div class="col-xl-6 col-lg-6 mb-4" style="height: 20rem">
            <div class="card" style="height: 100%">
              <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                  <div class="flex-fill fw-bold fs-14px">주간 입고 현황</div>
                  <a href="#" class="text-decoration-none text-white text-opacity-50">
                    View report
                  </a>
                </div>
                <div class="d-flex align-items-center">
                  <div class="h5">
                    <small> 금일</small>
                    <small style="font-size: 35px">
                      <span class="prodInTodayQtyInWeek"></span>
                    </small>
                    <small style="font-size: 30px"> / </small>
                    <small style="font-size: 25px">
                      <span class="prodInPlanTodayQtyInWeek"></span>
                    </small>
                    <small> 건</small>
                  </div>
                  <small class="fw-400 ms-auto h4">
                    <small style="font-size:17px;">
                      전일대비
                      <span class="prodInChartWeekSign"></span>
                      <span class="prodInChartWeekCount"></span>
                    </small>
                  </small>
                </div>
                <hr class="hr" />
                <div class="col-12 float-sm-start">
                  <div id="prodInChartWeek" style="position:relative; height:19vh; width:46.5vw">
                  </div>
                </div>
              </div>
              <div class="card-arrow">
                <div class="card-arrow-top-left"></div>
                <div class="card-arrow-top-right"></div>
                <div class="card-arrow-bottom-left"></div>
                <div class="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <!-- /.col 1 -->

          <!-- col 2 -->
          <div class="col-xl-6 col-lg-6 mb-4" style="height: 20rem">
            <div class="card" style="height: 100%">
              <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                  <div class="flex-fill fw-bold fs-14px">주간 출고 현황</div>
                  <a href="#" class="text-decoration-none text-white text-opacity-50">
                    View report
                  </a>
                </div>
                <div class="d-flex align-items-center">
                  <div class="h5">
                    <small> 금일</small>
                    <small style="font-size: 35px">
                      <span class="prodOutTodayQtyInWeek"></span>
                    </small>
                    <small style="font-size: 30px"> / </small>
                    <small style="font-size: 25px">
                      <span class="prodOutPlanTodayQtyInWeek"></span>
                    </small>
                    <small> 건</small>
                  </div>
                  <small class="fw-400 ms-auto h4">
                    <small style="font-size:17px;">
                      전일대비
                      <span class="prodOutChartWeekSign"></span>
                      <span class="prodOutChartWeekCount"></span>
                    </small>
                  </small>
                </div>
                <hr class="hr" />
                <div class="col-6 float-sm-start">
                  <div id="prodOutChartWeek" style="position:relative; height:19vh; width:46.5vw">
                  </div>
                </div>
              </div>
              <div class="card-arrow">
                <div class="card-arrow-top-left"></div>
                <div class="card-arrow-top-right"></div>
                <div class="card-arrow-bottom-left"></div>
                <div class="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <!-- /.col 2 -->

        </div>
        <!-- /.row 3 -->

      </div>
    </div>

    <div id="footer" style="margin-left: 1.5%; margin-top: -1.7%">
      © 2023 CORES Inc. All Right Reserved
    </div>

  </body>
  <!-- /.body -->
</html>
<!-- /.html -->