<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="../layout/head.jsp" %>
<%@ page session="true" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="body">
  <div class="container">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row d-center">
            <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2 margin-sm">
              <div class="d-row-right search-label">
                <div class="fs-0-8rem fw-600 dark">
                  엑셀 파일
                </div>
              </div>
            </div>
            <div class="col-8 col-sm-4 col-md-4 col-lg-4 col-xl-4 margin-sm">
              <div class="d-row-left mr-10px">
                <input
                  type="file"
                  id="productInOutXls"
                  name="productInOutXls"
                  accept=".xls, .xlsx"
                  class="d-none"
                />
                <div class="btn btn-primary btn-xs">
                  <label for="productInOutXls">선택</label>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 align-sm">
              <div class="d-row-right">
                <div class="btn btn-success btn-xs ml-10px" onclick="fnReset()">
                  초기화
                </div>
                <div class="btn btn-primary btn-xs ml-10px" onclick="fnSave()">
                  저장
                </div>
                <div class="btn btn-danger btn-xs ml-10px" onclick="fnExDownload()">
                  Sample Download
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row 1 -->

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row mt-20px">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData2" name="formData2" class="formData2">
          <div class="row">
            <!-- grid 1 -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="grid-main h-min-100vh">
                <div id="grid01"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <script defer src="${rsPath}/script/page/productInOutXls.js"></script>

  </div>
</body>
