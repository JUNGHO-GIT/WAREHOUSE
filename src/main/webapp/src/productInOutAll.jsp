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
            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 p-5px bg-dark-white mr-10px">
              <div class="fs-0-8rem fw-600 dark d-right">
                제품 검색
              </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-4 col-lg-4 mr-10px">
              <input
                type="text"
                id="findProdNm"
                name="findProdNm"
                class="form-control"
                placeholder="제품명을 입력해주세요"
                onKeyDown="fnPressGet01(event)"
              />
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                onclick="fnPressGet01(event)"
              >
                조회
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
          <div id="grid01" class="cards-grid h-52p"></div>
          <hr/>
          <button type="button" class="btn btn-secondary cards-tab active" id="inTab"
          onclick="fnSwitchTab('in')">
            <input type="radio" class="prodInOutAll d-none" name="inOut" value="in" checked/>입고
          </button>
          <button type="button" class="btn btn-secondary cards-tab" id="outTab"
          onclick="fnSwitchTab('out')">
            <input type="radio" class="prodInOutAll d-none" name="inOut" value="out" />출고
          </button>
          <div id="grid02" class="cards-grid h-25p"></div>
          <hr/>
          <div class="cards-button">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center">
              <button type="button" class="btn btn-warning btn-sm mr-10px" onclick="fnCheck()">
                검증
              </button>
              <button type="button" class="btn btn-success btn-sm mr-10px" onclick="fnDelAll()">
                초기화
              </button>
              <button type="button" class="btn btn-primary btn-sm mr-10px" onclick="fnSave()">
                저장
              </button>
              <button type="button" class="btn btn-danger btn-sm mr-10px" onclick="fnGridPopup('popupInOutAll', 'on')">
                일괄 적용
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <div class="h-5vh"></div>
    <%@ include file="./productInOutAllPop.jsp" %>
    <script defer src="${rsPath}/scripts/pages/productInOutAll.js"></script>

  </div>
</body>
