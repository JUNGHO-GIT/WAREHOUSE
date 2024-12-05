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
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              &nbsp;
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <br/>

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
        <div class="cards">
          <ul id="grid01" class="ztree h-60p"></ul>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt mr-1vw"></i>
            <span>창고 카테고리</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="parentsHCd" />
                <input type="hidden" id="houseCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <span>상위 창고</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="parentsHNm" disabled readonly />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>창고 이름</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="houseNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>창고 순서</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control"type="text" id="houseOrder" />
                  </div>
                </div>
                <hr/>
                <div class="cards-button">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" class="btn btn-success btn-sm" onclick="fnReset()">
                      신규
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" onclick="fnSave()">
                      저장
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="fnDel()">
                      삭제
                    </button>
                    <button type="button" class="btn btn-warning btn-sm" onclick="fnAddCat()">
                      하위 카테고리
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
        <div class="cards" id="gridView">
          <div id="grid02" class="cards-grid5"></div>
          <hr/>
          <div id="grid03" class="cards-grid5"></div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>
  <!-- js -->
  <link rel="stylesheet" href="/inc/build/css/zTreeStyle/zTreeStyle.css" />
  <script defer src="${rsPath}/scripts/jquery/dist/jquery.min.js"></script>
  <script defer src="${rsPath}/scripts/bootstrap/dist/js/bootstrap.min.js"></script>
  <script defer src="${rsPath}/scripts/jquery.ztree.core.min.js"></script>
	<script defer src="${rsPath}/scripts/pqgrid24/jquery-ui.min.js"></script>
	<script defer src="${rsPath}/scripts/pqgrid24/pqgrid.min.js"></script>
  <script defer src="${rsPath}/scripts/export/init.js"></script>
  <script defer src="${rsPath}/scripts/pages/common.js"></script>
  <script defer src="${rsPath}/scripts/pages/house.js"></script>
</body>
