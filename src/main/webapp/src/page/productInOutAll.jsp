<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="../layout/head.jsp" %>
<%@ page session="true" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="body over-y-auto">
  <div class="container">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row d-center">
            <div class="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2">
              <div class="d-row-right search-label">
                <div class="fs-0-8rem fw-600 dark">
                  제품 검색
                </div>
              </div>
            </div>
            <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
              <div class="d-row-left mr-10px">
                <input
                  type="text"
                  id="findProdNm"
                  name="findProdNm"
                  class="form-control form-control-sm"
                  placeholder="제품명을 입력해주세요"
                  onkeydown="fnPressGet01(event)"
                />
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-6 col-lg-6 col-xl-6">
              <div class="d-row-left">
                <div class="btn btn-primary btn-xs" onclick="fnPressGet01(event)">
                  조회
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
              <div class="grid-main h-min-50vh mb-3vh">
                <div id="grid01"></div>
              </div>
            </div>
            <!-- grid 2 -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="grid-switch">
                <div class="d-row">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="d-row-left">
                      <div
                        id="inTab"
                        class="btn btn-secondary btn-xs radius-bottom-0 mr-5px active"
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
                      </div>
                      <div
                        id="outTab"
                        class="btn btn-secondary btn-xs radius-bottom-0"
                        onclick="fnSwitchTab('out')"
                      >
                        <input
                          type="radio"
                          class="prodInOutAll d-none"
                          name="inOut"
                          value="out"
                        />
                        출고
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid-main h-min-30vh mb-3vh">
                <div id="grid02"></div>
              </div>
            </div>
            <!-- grid 3 -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="grid-detail">
                <div class="d-row">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="d-row-center">
                      <div class="btn btn-warning btn-xs mr-10px" onclick="fnCheck()">
                        검증
                      </div>
                      <div class="btn btn-success btn-xs mr-10px" onclick="fnDelAll()">
                        초기화
                      </div>
                      <div class="btn btn-primary btn-xs mr-10px" onclick="fnSave()">
                        저장
                      </div>
                      <div class="btn btn-danger btn-xs" onclick="fnPopup('popupInOutAll','on')">
                        일괄 적용
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- hidden -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="hidden-wrapper">
                <input type="hidden" id="tableNm" name="tableNm" value="tblProduct" />
                <input type="hidden" id="tableKey" name="tableKey" value="0" />
                <input type="hidden" id="keyColumn" name="keyColumn" value="prodCd" />
                <input type="hidden" id="fileSeq" name="fileSeq" value="0" />
                <input type="hidden" id="fileSeq" name="fileSeq" value="" />
                <input type="hidden" id="fileUrl" name="fileUrl" value="" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <%@ include file="./productInOutAllPop.jsp" %>
    <script defer src="${rsPath}/script/page/productInOutAll.js"></script>

  </div>
</body>
