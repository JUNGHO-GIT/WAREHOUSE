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
              <p class="control-label">년도</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 mt-2">
              <select class="form-control" id="findYear" onChange="fnPressGet01(event)"></select>
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
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-46"></div>
          <hr/>
          <div id="grid02" class="cards-grid h-46"></div>
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
  <script src="/inc/js/page/files.js"></script>
  <script src="/inc/js/page/reportIn.js"></script>
</body>