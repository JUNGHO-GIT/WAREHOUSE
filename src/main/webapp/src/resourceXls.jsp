<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container px-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <form class="form-horizontal m-0px">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="row">
            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-1">
              <p class="control-label">엑셀 파일</p>
            </div>
            <div class="col-xs-8 col-sm-2 col-md-2 col-lg-2 mt-5px d-center">
              <input type="file" name="resourceXls" id="resourceXls" accept=".xls, .xlsx" />
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-6 mt-5px">&nbsp;</div>
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 d-center">
              <button class="btn btn-success btn-sm ml-10px" type="button" onclick="fnReset()">
                초기화
              </button>
              <button class="btn btn-primary btn-sm ml-10px" type="button" onclick="fnSave()">
                저장
              </button>
              <button class="btn btn-danger btn-sm ml-10px" type="button" onclick="fnExDownload()">
                Sample Download
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
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>

  <!-- js -->
  <script defer src="${rsPath}/scripts/export/init.js"></script>
  <script defer src="${rsPath}/scripts/pages/common.js"></script>
  <script defer src="${rsPath}/scripts/json2Xls.js"></script>
  <script defer src="${rsPath}/scripts/pages/files.js"></script>
  <script defer src="${rsPath}/scripts/pages/resourceXls.js"></script>
</body>
