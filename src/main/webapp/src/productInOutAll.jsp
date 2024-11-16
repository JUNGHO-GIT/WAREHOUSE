<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/src/inc/header.jsp" %>
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
              <p class="control-label">제품 검색</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 mt-2">
              <input class="form-control" type="text" id="findProdNm" onKeyDown="fnPressGet01(event)" placeholder="제품명을 입력해주세요." />
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

    <br/><div class="clearfix"></div>

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-52"></div>
          <hr/>
          <button type="button" class="btn btn-secondary cards-tab active" id="inTab"
          onClick="fnSwitchTab('in')">
            <input type="radio" class="prodInOutAll d-none" name="inOut" value="in" checked/>입고
          </button>
          <button type="button" class="btn btn-secondary cards-tab" id="outTab"
          onClick="fnSwitchTab('out')">
            <input type="radio" class="prodInOutAll d-none" name="inOut" value="out" />출고
          </button>
          <div id="grid02" class="cards-grid h-25"></div>
          <hr/>
          <div class="cards-button">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-center">
              <button type="button" class="btn btn-warning btn-sm me-10" onClick="fnCheck()">
                검증
              </button>
              <button type="button" class="btn btn-success btn-sm me-10" onClick="fnDelAll()">
                초기화
              </button>
              <button type="button" class="btn btn-primary btn-sm me-10" onClick="fnSave()">
                저장
              </button>
              <button type="button" class="btn btn-danger btn-sm me-10" onClick="fnGridPopup('popupInOutAll','on')">
                일괄 적용
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>
  <!-- js -->
  <%@ include file="./productInOutAllPop.jsp" %>
  <script src="/inc/vendors/jquery/dist/jquery.min.js"></script>
  <script src="/inc/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="/inc/js/pqgrid24/jquery-ui.min.js"></script>
  <script src="/inc/js/pqgrid24/pqgrid.min.js"></script>
  <script src="/inc/js/init.js"></script>
  <script src="/inc/js/common.js"></script>
  <script src="/inc/js/page/files.js"></script>
  <script src="/inc/js/page/productInOutAll.js"></script>
</body>
