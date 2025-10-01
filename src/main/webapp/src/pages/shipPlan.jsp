<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<%@ include file="head.jsp" %>
<%@ page session="true" %>

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container body ps-10 pe-10">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row mt-15 mb-n20">
      <form class="form-horizontal m-0">
        <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
              <p class="control-label">기간별 조회</p>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 mt-2">
              <input class="form-control" type="text" id="findStartDt" onKeyDown="fnPressGet01(event)" />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 mt-2">
              <input class="form-control" type="text" id="findEndDt" onKeyDown="fnPressGet01(event)" />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <button class="btn btn-primary btn-sm pointer" type="button" onClick="fnPressGet01(event)">
                조회
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <br /><div class="clearfix"></div>

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid02"class="cards-grid5"></div>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt ms-5 me-5"></i>
            <span>출하 계획 관리 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10 ps-10 pe-10">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="shipCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>거래처</span>
                  </label>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <input
                      class="form-control"
                      type="text"
                      id="compNm"
                      onKeyDown="fnFindCd(this.value,'','comp',event)"
                    />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                    <select id="comp" class="form-control">
                      <option value="">==거래처==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>거래처 담당자 번호</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="toPhone" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>거래처 담당자</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="toMajor" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>출하일</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="shipDt" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>출하 담당자</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="shipMajor" />
                  </div>
                </div>
                <hr/>
                <div class="cards-button">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button type="button" class="btn btn-success btn-sm" onClick="fnReset()">
                      신규
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" onClick="fnExcelDown()">
                      Excel Download
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick="fnDel()">
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
  <script src="${rsPath}/scripts/export/init.js"></script>
  <script src="${rsPath}/scripts/pages/common.js"></script>
  <script src="${rsPath}/scripts/pages/files.js"></script>
  <script src="${rsPath}/scripts/pages/shipPlan.js"></script>
</body>
