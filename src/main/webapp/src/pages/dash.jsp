<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="../layouts/head.jsp" %>
<%@ page session="true" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!-- body -->
<body class="theme-cyan">
  <div id="app" class="app px-10px">

    <!-- toggle -->
    <div
      class="app-sidebar-mobile-backdrop"
      data-toggle-target=".app"
      data-toggle-class="app-sidebar-mobile-toggled"
    ></div>
    <div
      class="btn-scroll-top fade hover"
      data-toggle="scroll-to-top"
    >
      <i class="fa fa-arrow-up"></i>
    </div>

    <!-- header -->
    <div class="row mb-2vh">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div id="header" class="app-header">
          <div class="app-header-log p-10px mr-auto">
            <img
              alt="logo"
              src="${rsPath}/images/logo.png"
              class="w-55px h-auto hide-sm"
              loading="lazy"
            />
          </div>
          <div class="app-header-date d-center p-10px mx-auto">
            <div class="fs-0-8rem fw-500 grey mr-20px">
              <i class="fas fa-arrow-left pointer-white" onclick="fnSetDateToPrev()"></i>
            </div>
            <div class="fs-0-9rem fw-600 white pointer mr-20px">
              <div id="displayedDate" name="displayedDate" onclick="fnSetDateToToday()"></div>
              <input id="inputDate" name="inputDate" type="hidden" value="" />
            </div>
            <div class="fs-0-8rem fw-500 grey mr-20px">
              <i class="fas fa-arrow-right pointer-white" onclick="fnSetDateToNext()"></i>
            </div>
            <div class="app-header-test d-center p-10px">
              <div class="btn btn-xs btn-info hover" onclick="fnGetTestData()">
                Test
              </div>
            </div>
          </div>
          <div class="app-header-nav d-center p-10px ml-auto">
            <i
              id="prev"
              class="fas fa-arrow-right fs-1-2rem pointer-white"
              onclick="fnGoPage('main')"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row mb-2vh" data-masonry="{'percentPosition': true}">

      <!-- col 1 -->
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 margin-md-dash">
        <div class="card">
          <div class="card-body h-50vh over-x-hidden over-y-auto">
            <div class="d-row-left mb-1vh">
              <div class="d-center mr-auto">
                <div class="fs-1-1rem fw-600 white">
                  금일
                </div>
              </div>
              <div class="d-center mr-auto">
                <div
                  id="prodInTodayDiv"
                  class="fs-0-9rem fw-600 light pointer-white"
                  onclick="fnSwitch('prod', 'In', '', 'Today', '')"
                >
                  입고현황
                </div>
                <div class="divider mx-20px">/</div>
                <div
                  id="prodInPlanTodayDiv"
                  class="fs-0-9rem fw-600 grey pointer-white"
                  onclick="fnSwitch('prod', 'In', 'Plan', 'Today', '')"
                >
                  입고예정
                </div>
              </div>
              <div class="d-center">
                <div
                  id="expander"
                  class="fs-0-9rem fw-600 light fas fa-expand pointer-white"
                  data-toggle="card-expand"
                ></div>
              </div>
            </div>
            <div class="d-row-left mb-1vh">
              <div
                id="prodInTodayQty"
                class="fs-1-2rem fw-600 white d-block mr-10px"
              ></div>
              <div
                id="prodInTodaySubfix"
                class="fs-0-9rem fw-600 grey d-block"
              >
                건
              </div>
              <div
                id="prodInPlanTodayQty"
                class="fs-1-2rem fw-600 white d-none mr-10px"
              ></div>
              <div
                id="prodInPlanTodaySubfix"
                class="fs-0-9rem fw-600 grey d-none"
              >
                예정
              </div>
            </div>
            <hr class="hr" />
            <div class="d-row-left">
              <div id="prodInToday" class="w-100p d-block"></div>
              <div id="prodInPlanToday" class="w-100p d-none"></div>
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

      <!-- col 2 -->
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 margin-md-dash">
        <div class="card">
          <div class="card-body h-50vh over-x-hidden over-y-auto">
            <div class="d-row-left mb-1vh">
              <div class="d-center mr-auto">
                <div class="fs-1-1rem fw-600 white">
                  금일
                </div>
              </div>
              <div class="d-center mr-auto">
                <div
                  id="prodOutTodayDiv"
                  class="fs-0-9rem fw-600 light pointer-white"
                  onclick="fnSwitch('prod', 'Out', '', 'Today', '')"
                >
                  출고현황
                </div>
                <div class="divider mx-20px">/</div>
                <div
                  id="prodOutPlanTodayDiv"
                  class="fs-0-9rem fw-600 grey pointer-white"
                  onclick="fnSwitch('prod', 'Out', 'Plan', 'Today', '')"
                >
                  출고예정
                </div>
              </div>
              <div class="d-center">
                <div
                  id="expander"
                  class="fs-0-9rem fw-600 light fas fa-expand pointer-white"
                  data-toggle="card-expand"
                ></div>
              </div>
            </div>
            <div class="d-row-left mb-1vh">
              <div
                id="prodOutTodayQty"
                class="fs-1-2rem fw-600 white d-block mr-10px"
              ></div>
              <div
                id="prodOutTodaySubfix"
                class="fs-0-9rem fw-600 grey d-block"
              >
                건
              </div>
              <div
                id="prodOutPlanTodayQty"
                class="fs-1-2rem fw-600 white d-none mr-10px"
              ></div>
              <div
                id="prodOutPlanTodaySubfix"
                class="fs-0-9rem fw-600 grey d-none"
              >
                예정
              </div>
            </div>
            <hr class="hr" />
            <div class="d-row-left">
              <div id="prodOutToday" class="w-100p d-block"></div>
              <div id="prodOutPlanToday" class="w-100p d-none"></div>
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

      <!-- col 3 -->
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 margin-md-dash">
        <div class="card">
          <div class="card-body h-50vh over-x-hidden over-y-auto">
            <div class="d-row-left mb-1vh">
              <div class="d-center mr-auto">
                <div class="fs-1-1rem fw-600 white">
                  금일
                </div>
              </div>
              <div class="d-center mr-auto">
                <div
                  id="shipTodayDiv"
                  class="fs-0-9rem fw-600 light pointer-white"
                  onclick="fnSwitch('ship', '', '', 'Today', '')"
                >
                  출하현황
                </div>
                <div class="divider mx-20px">/</div>
                <div
                  id="shipPlanTodayDiv"
                  class="fs-0-9rem fw-600 grey pointer-white"
                  onclick="fnSwitch('ship', '', 'Plan', 'Today', '')"
                >
                  출하예정
                </div>
              </div>
              <div class="d-center">
                <div
                  id="expander"
                  class="fs-0-9rem fw-600 light fas fa-expand pointer-white"
                  data-toggle="card-expand"
                ></div>
              </div>
            </div>
            <div class="d-row-left mb-1vh">
              <div
                id="shipTodayQty"
                class="fs-1-2rem fw-600 white d-block mr-10px"
              ></div>
              <div
                id="shipTodaySubfix"
                class="fs-0-9rem fw-600 grey d-block"
              >
                건
              </div>
              <div
                id="shipPlanTodayQty"
                class="fs-1-2rem fw-600 white d-none mr-10px"
              ></div>
              <div
                id="shipPlanTodaySubfix"
                class="fs-0-9rem fw-600 grey d-none"
              >
                예정
              </div>
            </div>
            <hr class="hr" />
            <div class="d-row-left">
              <div id="shipToday" class="w-100p d-block"></div>
              <div id="shipPlanToday" class="w-100p d-none"></div>
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
    </div>
    <!-- /.row 1 -->

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row mb-2vh" data-masonry="{'percentPosition': true}">

      <!-- col 1 -->
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 margin-md-dash">
        <div class="card">
          <div class="card-body h-50vh over-x-hidden over-y-auto">
            <div class="d-row-left mb-1vh">
              <div class="d-center mr-auto">
                <div class="fs-1-1rem fw-600 white">
                  금주
                </div>
              </div>
              <div class="d-center mr-auto">
                <div
                  id="prodInPieWeekDiv"
                  class="fs-0-9rem fw-600 light pointer-white"
                  onclick="fnSwitch('prod', 'In', '', 'Week', 'true')"
                >
                  입고현황
                </div>
                <div class="divider mx-20px">/</div>
                <div
                  id="prodInPiePlanWeekDiv"
                  class="fs-0-9rem fw-600 grey pointer-white"
                  onclick="fnSwitch('prod', 'In', 'Plan', 'Week', 'true')"
                >
                  입고예정
                </div>
              </div>
              <div class="d-center">
                <div
                  id="expander"
                  class="fs-0-9rem fw-600 light fas fa-expand pointer-white"
                  data-toggle="card-expand"
                ></div>
              </div>
            </div>
            <div class="d-row-left mb-1vh">
              <div
                id="prodInPieWeekQty"
                class="fs-1-2rem fw-600 white d-block mr-10px"
              ></div>
              <div
                id="prodInPieWeekSubfix"
                class="fs-0-9rem fw-600 grey d-block"
              >
                건
              </div>
              <div
                id="prodInPiePlanWeekQty"
                class="fs-1-2rem fw-600 white d-none mr-10px"
              ></div>
              <div
                id="prodInPiePlanWeekSubfix"
                class="fs-0-9rem fw-600 grey d-none"
              >
                예정
              </div>
            </div>
            <hr class="hr" />
            <div class="d-row-left">
              <canvas id="prodInPieWeek" class="d-block"></canvas>
              <canvas id="prodInPiePlanWeek" class="d-none"></canvas>
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

      <!-- col 2 -->
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 margin-md-dash">
        <div class="card">
          <div class="card-body h-50vh over-x-hidden over-y-auto">
            <div class="d-row-left mb-1vh">
              <div class="d-center mr-auto">
                <div class="fs-1-1rem fw-600 white">
                  금주
                </div>
              </div>
              <div class="d-center mr-auto">
                <div
                  id="prodOutPieWeekDiv"
                  class="fs-0-9rem fw-600 light pointer-white"
                  onclick="fnSwitch('prod', 'Out', '', 'Week', 'true')"
                >
                  출고현황
                </div>
                <div class="divider mx-20px">/</div>
                <div
                  id="prodOutPiePlanWeekDiv"
                  class="fs-0-9rem fw-600 grey pointer-white"
                  onclick="fnSwitch('prod', 'Out', 'Plan', 'Week', 'true')"
                >
                  출고예정
                </div>
              </div>
              <div class="d-center">
                <div
                  id="expander"
                  class="fs-0-9rem fw-600 light fas fa-expand pointer-white"
                  data-toggle="card-expand"
                ></div>
              </div>
            </div>
            <div class="d-row-left mb-1vh">
              <div
                id="prodOutPieWeekQty"
                class="fs-1-2rem fw-600 white d-block mr-10px"
              ></div>
              <div
                id="prodOutPieWeekSubfix"
                class="fs-0-9rem fw-600 grey d-block"
              >
                건
              </div>
              <div
                id="prodOutPiePlanWeekQty"
                class="fs-1-2rem fw-600 white d-none mr-10px"
              ></div>
              <div
                id="prodOutPiePlanWeekSubfix"
                class="fs-0-9rem fw-600 grey d-none"
              >
                예정
              </div>
            </div>
            <hr class="hr" />
            <div class="d-row-left">
              <canvas id="prodOutPieWeek" class="d-block"></canvas>
              <canvas id="prodOutPiePlanWeek" class="d-none"></canvas>
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

      <!-- col 3 -->
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 margin-md-dash">
        <div class="card">
          <div class="card-body h-50vh over-x-hidden over-y-auto">
            <div class="d-row-left mb-1vh">
              <div class="d-center mr-auto">
                <div class="fs-1-1rem fw-600 white">
                  안전재고알림
                </div>
              </div>
              <div class="d-center">
                <div
                  id="expander"
                  class="fs-0-9rem fw-600 light fas fa-expand pointer-white"
                  data-toggle="card-expand"
                ></div>
              </div>
            </div>
            <div class="d-row-left mb-1vh">
              <div
                id="prodProtectedTodayCount"
                class="fs-1-2rem fw-600 white d-block mr-10px"
              ></div>
              <div
                id="prodProtectedTodaySubfix"
                class="fs-0-9rem fw-600 grey d-block"
              >
                항목
              </div>
            </div>
            <hr class="hr" />
            <div class="d-row-left">
              <div id="prodProtectedToday" class="w-100p d-block"></div>
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
    </div>
    <!-- /.row 2 -->

    <!-- row 3 ------------------------------------------------------------------------------------>
    <div class="row mb-2vh" data-masonry="{'percentPosition': true}">

      <!-- col 1 -->
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 margin-md-dash">
        <div class="card">
          <div class="card-body over-x-hidden over-y-auto">
            <div class="d-row-left mb-1vh">
              <div class="d-center mr-auto">
                <div class="fs-1-1rem fw-600 white">
                  주간입고현황
                </div>
              </div>
              <div class="d-center">
                <div
                  id="expander"
                  class="fs-0-9rem fw-600 light fas fa-expand pointer-white"
                  data-toggle="card-expand"
                ></div>
              </div>
            </div>
            <div class="d-row-left">
              <div
                id="prodInTodayQtyInWeekPrefix"
                class="fs-1-1rem fw-600 white d-block mr-10px"
              >
                금일
              </div>
              <div
                id="prodInTodayQtyInWeek"
                class="fs-1-2rem fw-600 white d-block mr-10px"
              ></div>
              <div
                id="prodInTodayQtyInWeekSubfix"
                class="fs-0-9rem fw-600 grey d-block"
              >
                건
              </div>
              <div class="divider mx-20px">/</div>
              <div
                id="prodInTodayQtyInWeekPrefix"
                class="fs-1-1rem fw-600 white d-block mr-10px"
              >
                전일대비
              </div>
              <div
                id="prodInChartWeekCount"
                class="fs-1-1rem fw-600 white d-block"
              ></div>
            </div>
            <hr class="hr" />
            <div class="d-row-center">
              <div id="prodInChartWeek" class="w-100p h-30vh"></div>
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

      <!-- col 2 -->
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 margin-md-dash">
        <div class="card">
          <div class="card-body over-x-hidden over-y-auto">
            <div class="d-row-left mb-1vh">
              <div class="d-center mr-auto">
                <div class="fs-1-1rem fw-600 white">
                  주간출고현황
                </div>
              </div>
              <div class="d-center">
                <div
                  id="expander"
                  class="fs-0-9rem fw-600 light fas fa-expand pointer-white"
                  data-toggle="card-expand"
                ></div>
              </div>
            </div>
            <div class="d-row-left mb-1vh">
              <div
                id="prodOutTodayQtyInWeekPrefix"
                class="fs-1-1rem fw-600 white d-block mr-10px"
              >
                금일
              </div>
              <div
                id="prodOutTodayQtyInWeek"
                class="fs-1-2rem fw-600 white d-block mr-10px"
              ></div>
              <div
                id="prodOutTodayQtyInWeekSubfix"
                class="fs-0-9rem fw-600 grey d-block"
              >
                건
              </div>
              <div class="divider mx-20px">/</div>
              <div
                id="prodOutTodayQtyInWeekPrefix"
                class="fs-1-1rem fw-600 white d-block mr-10px"
              >
                전일대비
              </div>
              <div
                id="prodOutChartWeekCount"
                class="fs-1-1rem fw-600 white d-block"
              ></div>
            </div>
            <hr class="hr" />
            <div class="d-row-center">
              <div id="prodOutChartWeek" class="w-100p h-30vh"></div>
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
    </div>
    <!-- /.row 3 -->

    <!-- footer -->
    <div class="row mb-2vh">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div id="footer" class="app-footer">
          © 2023 CORES Inc. All Right Reserved
        </div>
      </div>
    </div>

    <!-- js -->
    <link rel="stylesheet" href="${urlPath}/font-awesome/5.8.0/css/all.min.css" />
    <link rel="stylesheet" href="${rsPath}/styles/libs/dash.min.css" />
    <link rel="stylesheet" href="${rsPath}/styles/commons/common.css" />
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
    <script defer src="https://www.amcharts.com/lib/3/amcharts.js"></script>
    <script defer src="https://www.amcharts.com/lib/3/serial.js"></script>
    <script defer src="https://www.amcharts.com/lib/3/themes/light.js"></script>
    <script defer src="${rsPath}/scripts/libs/pace.min.js"></script>
    <script defer src="${rsPath}/scripts/libs/dash.min.js"></script>
    <script defer src="${rsPath}/scripts/pages/dash.js"></script>

  </div>
</body>
