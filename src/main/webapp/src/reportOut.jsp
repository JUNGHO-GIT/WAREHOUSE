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
              <p class="control-label">년도</p>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mt-2px">
              <select class="form-control" id="findYear" onchange="fnPressGet01(event)"></select>
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
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="cards" id="gridView">
          <div id="grid01" class="h-45p"></div>
          <hr/>
          <div id="grid02" class="h-45p"></div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>
  <!-- js -->
  <script defer src="${rsPath}/scripts/pages/reportOut.js"></script>
</body>
