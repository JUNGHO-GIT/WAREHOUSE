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
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <div class="p-5px bg-dark-white d-right mr-10px">
                <div class="fs-0-8rem fw-600 dark">
                  제품 검색
                </div>
              </div>
            </div>
            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div class="d-row-left mr-10px">
                <input
                  type="text"
                  id="findProdNm"
                  name="findProdNm"
                  class="form-control form-control-sm"
                  placeholder="제품명을 입력해주세요"
                  onKeyDown="fnPressGet01(event)"
                />
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <button
                type="button"
                class="btn btn-primary btn-xs"
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
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData2" name="formData2" class="formData2">
          <div class="row">
            <!-- grid 1 -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-10px">
              <div class="grid-main h-50vh">
                <div id="grid01"></div>
              </div>
            </div>
            <div class="divider-all d-none"></div>
            <!-- grid 2 -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-10px">
              <div class="grid-switch">
                <div class="d-row-left">
                  <button
                    type="button"
                    id="inTab"
                    class="btn btn-primary radius-bottom-0 mr-5px active"
                    onclick="fnSwitchTab('in')"
                  >
                    <input
                      type="radio"
                      class="prodInOutAll d-none"
                      name="inOut"
                      value="in"
                      checked
                    />
                    입고
                  </button>
                  <button
                    type="button"
                    id="outTab"
                    class="btn btn-primary radius-bottom-0"
                    onclick="fnSwitchTab('out')"
                  >
                    <input
                      type="radio"
                      class="prodInOutAll d-none"
                      name="inOut"
                      value="out"
                    />
                    출고
                  </button>
                </div>
              </div>
              <div class="grid-main h-30vh">
                <div id="grid02"></div>
              </div>
              <div class="divider-all d-none"></div>
              <div class="grid-detail">
                <div class="d-row-center">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-center">
                    <button
                      type="button"
                      class="btn btn-warning btn-xs mr-10px"
                      onclick="fnCheck()"
                    >
                      검증
                    </button>
                    <button
                      type="button"
                      class="btn btn-success btn-xs mr-10px"
                      onclick="fnDelAll()"
                    >
                      초기화
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-xs mr-10px"
                      onclick="fnSave()"
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-xs"
                      onclick="fnGridPopup('popupInOutAll','on')"
                    >
                      일괄 적용
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <div class="h-5vh"></div>
    <%@ include file="./productInOutAllPop.jsp" %>
    <script defer src="${rsPath}/scripts/pages/productInOutAll.js"></script>

  </div>
</body>
