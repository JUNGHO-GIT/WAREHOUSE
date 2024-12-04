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
        <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
          <div class="row">
            <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <p class="control-label">제품 검색</p>
            </div>
            <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-2px">
              <input class="form-control" type="text" id="findProdNm" onKeyDown="fnPressGet01(event)" placeholder="제품명을 입력해주세요." />
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <button class="btn btn-primary btn-sm pointer" type="button" onClick="fnPressGet01(event)">
                조회
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <br/>

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-52p"></div>
          <hr/>
          <button type="button" class="btn btn-secondary cards-tab active" id="inTab"
          onClick="fnSwitchTab('in')">
            <input type="radio" class="prodInOutAll d-none" name="inOut" value="in" checked/>입고
          </button>
          <button type="button" class="btn btn-secondary cards-tab" id="outTab"
          onClick="fnSwitchTab('out')">
            <input type="radio" class="prodInOutAll d-none" name="inOut" value="out" />출고
          </button>
          <div id="grid02" class="cards-grid h-25p"></div>
          <hr/>
          <div class="cards-button">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-center">
              <button type="button" class="btn btn-warning btn-sm mr-10px" onClick="fnCheck()">
                검증
              </button>
              <button type="button" class="btn btn-success btn-sm mr-10px" onClick="fnDelAll()">
                초기화
              </button>
              <button type="button" class="btn btn-primary btn-sm mr-10px" onClick="fnSave()">
                저장
              </button>
              <button type="button" class="btn btn-danger btn-sm mr-10px" onClick="fnGridPopup('popupInOutAll','on')">
                일괄 적용
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>
  <!-- js -->
  <%@ include file="./productInOutAllPop.jsp" %>
  <script defer src="${rsPath}/scripts/pqgrid24/pqgrid.min.js"></script>
  <script defer src="${rsPath}/scripts/pages/productInOutAll.js"></script>
</section>
