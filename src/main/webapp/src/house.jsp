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
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              &nbsp;
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <br/><div class="clearfix"></div>

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div class="cards">
          <ul id="grid01" class="ztree h-58"></ul>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt ms-5 me-5"></i>
            <span>창고 카테고리</span>
          </div>
          <div class="cards-content">
            <div class="row p-10 ps-10 pe-10">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="parentsHCd" />
                <input type="hidden" id="houseCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span>상위 창고</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="parentsHNm" disabled readonly />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>창고 이름</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="houseNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>창고 순서</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control"type="text" id="houseOrder" />
                  </div>
                </div>
                <hr/>
                <div class="cards-button">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button type="button" class="btn btn-success btn-sm" onClick="fnReset()">
                      신규
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" onClick="fnSave()">
                      저장
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick="fnDel()">
                      삭제
                    </button>
                    <button type="button" class="btn btn-warning btn-sm" onClick="fnAddCat()">
                      하위 카테고리
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid02" class="cards-grid h-45"></div>
          <hr/>
          <div id="grid03" class="cards-grid h-45"></div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>
  <!-- js -->
  <link rel="stylesheet" href="/inc/build/css/zTreeStyle/zTreeStyle.css" />
  <script src="/inc/vendors/jquery/dist/jquery.min.js"></script>
  <script src="/inc/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="/inc/js/jquery.ztree.core.min.js"></script>
	<script src="/inc/js/pqgrid24/jquery-ui.min.js"></script>
	<script src="/inc/js/pqgrid24/pqgrid.min.js"></script>
  <script src="/inc/js/init.js"></script>
  <script src="/inc/js/common.js"></script>
  <script src="/inc/js/page/house.js"></script>
</body>
