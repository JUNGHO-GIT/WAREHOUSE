<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container px-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row my-20px">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 px-10px">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row d-row-left">
            <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 p-5px bg-dark-white mr-10px">
              <div class="fs-0-8rem fw-600 dark d-right">
                엑셀 파일
              </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
              <input
                type="file"
                name="resourceXls"
                id="resourceXls"
                accept=".xls, .xlsx"
                class="d-none"
              />
              <button
                type="button"
                class="btn btn-primary btn-sm"
                onclick="$('#resourceXls').click()"
              >
                파일선택
              </button>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 d-row-right">
              <button
                type="button"
                class="btn btn-success btn-sm ml-10px"
                onclick="fnReset()"
              >
                초기화
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm ml-10px"
                onclick="fnSave()"
              >
                저장
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm ml-10px"
                onclick="fnExDownload()"
              >
                Sample Download
              </button>
            </div>
          </div>
        </form>
      </div>
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

    <!-- js -->
    <div class="h-5vh"></div>
    <script defer src="${rsPath}/scripts/pages/resourceXls.js"></script>

  </div>
</body>
