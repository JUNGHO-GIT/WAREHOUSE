<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="head.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<section class="container-fluid">
  <div class="container body pl-10px pr-10px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row mt-15px mb-n20px">
      <form class="form-horizontal m-0px">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div class="row">
            <div class="col-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
              <p class="control-label">엑셀 파일</p>
            </div>
            <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2 mt-5px d-center">
              <input type="file" name="resourceInOutXls" id="resourceInOutXls" accept=".xls, .xlsx" />
            </div>
            <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2 mt-3px d-center">
              <input type="radio" class="resrcInOut" name="inOut" value="in" checked />입고
              <span class="mr-10px"></span>
              <input type="radio" class="resrcInOut" name="inOut" value="out" />출고
            </div>
            <div class="col-12 col-sm-2 col-md-2 col-lg-4 col-xl-4 mt-5px">&nbsp;</div>
            <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 d-center">
              <button class="btn btn-success btn-sm ml-10px" type="button" onClick="fnReset()">
                초기화
              </button>
              <button class="btn btn-primary btn-sm ml-10px" type="button" onClick="fnSave()">
                저장
              </button>
              <button class="btn btn-danger btn-sm ml-10px" type="button" onClick="fnExDownload()">
                Sample Download
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <br />

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
  <script defer src="${rsPath}/scripts/pages/resourceInOutXls.js"></script>
</section>
