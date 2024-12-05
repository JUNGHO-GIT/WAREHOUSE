<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container body p-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <form class="form-horizontal m-0px">
        <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
          <div class="row">
            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
              <p class="control-label">기간별 조회</p>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 mt-2px">
              <input class="form-control" type="text" id="findStartDt"
                onKeyDown="fnPressGet01(event)" />
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 mt-2px">
              <input class="form-control" type="text" id="findEndDt"
                onKeyDown="fnPressGet01(event)" />
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
    <!-- /.row 1 -->

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">

      <!-- col 1 -->
      <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>

      <!-- col 2 -->
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
        <div class="cards" id="gridView">
          <div id="grid02"class="cards-grid5"></div>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt mr-1vw"></i>
            <span>제품 출하 정보 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="shipCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>거래처</span>
                  </label>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <input
                      class="form-control"
                      type="text"
                      id="compNm"
                      onKeyDown="fnFindCd(this.value,'','comp',event)"
                    />
                  </div>
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <select id="comp" class="form-control">
                      <option value="">==거래처==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>거래처 담당자 번호</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="toPhone" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>거래처 담당자</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="toMajor" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>출하일</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="shipDt" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>출하 담당자</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="shipMajor" />
                  </div>
                </div>
                <hr/>
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
    <!-- /.row 2 -->
  </div>
  <!-- js -->
  <script defer src="${rsPath}/scripts/pages/shipItems.js"></script>
</body>
