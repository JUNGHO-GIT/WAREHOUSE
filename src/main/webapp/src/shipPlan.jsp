<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<body class="nav-md">
  <div class="container px-20px">
    <div class="row">
      <form class="form-horizontal m-0px">
        <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
          <div class="row">
            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
              <p class="control-label">기간별 조회</p>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 mt-2px">
              <input class="form-control" type="text" id="findStartDt" onkeydown="fnPressGet01 (event)">
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 mt-2px">
              <input class="form-control" type="text" id="findEndDt" onkeydown="fnPressGet01(event)">
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <button class="btn btn-primary btn-sm" type="button" onclick="fnPressGet01(event)">
                조회
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
        <div class="cards" id="gridView">
          <div id="grid02" class="cards-grid5"></div>
          <hr>
          <div class="cards-title">
            <i class="fa fa-list-alt mr-1vw"></i>
            <span>출하 계획 관리 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <input type="hidden" id="shipCd">
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
                    <span>거래처</span>
                  </label>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <input class="form-control" type="text" id="compNm" onkeydown="fnFindCd(this.value,'','comp',event)">
                  </div>
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <select id="comp" class="form-control">
                      <option value="">==거래처==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
                    <span>거래처 담당자 번호</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <input class="form-control" type="text" id="toPhone">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
                    <span>거래처 담당자</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <input class="form-control" type="text" id="toMajor">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
                    <span>출하일</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <input class="form-control" type="text" id="shipDt">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
                    <span>출하 담당자</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <input class="form-control" type="text" id="shipMajor">
                  </div>
                </div>
                <hr>
                <div class="cards-button">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" class="btn btn-success btn-sm" onclick="fnReset()">
                      신규
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" onclick="fnExcelDown()">
                      Excel Download
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="fnDel()">
                      삭제
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- js -->
    <div class="h-5vh"></div>
    <script defer src="${rsPath}/scripts/pages/shipPlan.js"></script>

  </div>
</body>
