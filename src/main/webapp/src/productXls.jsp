<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container px-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row my-20px">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-10px">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row d-row-left">
            <div class="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
              <div class="p-5px bg-dark-white d-right mr-10px">
                <div class="fs-0-8rem fw-600 dark">
                  엑셀 파일
                </div>
              </div>
            </div>
            <div class="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
              <div class="d-row-left mr-10px">
                <input
                  type="file"
                  name="productXls"
                  id="productXls"
                  accept=".xls, .xlsx"
                  class="d-none"
                />
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  onclick="$('#productXls').click()"
                >
                  파일선택
                </button>
              </div>
            </div>
            <div class="divider-md d-none"></div>
            <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 align-md">
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
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="grid-main h-100vh">
          <div id="grid01"></div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <div class="h-5vh"></div>
    <script defer src="${rsPath}/scripts/pages/productXls.js"></script>

  </div>
</body>
