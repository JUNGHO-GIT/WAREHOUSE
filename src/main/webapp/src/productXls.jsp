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
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="row">
            <div class="col-lg-1 col-md-2 col-sm-2 col-xs-4">
              <p class="control-label">엑셀 파일</p>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-8 mt-5 d-center">
              <input type="file" name="productXls" id="productXls" accept=".xls, .xlsx" />
            </div>
            <div class="col-lg-6 col-md-4 col-sm-4 col-xs-12 mt-5">&nbsp;</div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 d-center">
              <button class="btn btn-success btn-sm ms-10" type="button" onClick="fnReset()">
                초기화
              </button>
              <button class="btn btn-primary btn-sm ms-10" type="button" onClick="fnSave()">
                저장
              </button>
              <button class="btn btn-danger btn-sm ms-10" type="button" onClick="fnExDownload()">
                Sample Download
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
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98"></div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>

  <!-- js -->
  <script src="/inc/vendors/jquery/dist/jquery.min.js"></script>
  <script src="/inc/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="/inc/js/pqgrid24/jquery-ui.min.js"></script>
  <script src="/inc/js/pqgrid24/pqgrid.min.js"></script>
  <script src="/inc/js/init.js"></script>
  <script src="/inc/js/common.js"></script>
  <script src="/inc/js/json2Xls.js"></script>
  <script src="/inc/js/page/files.js"></script>
  <script src="/inc/js/page/productXls.js"></script>
</body>

