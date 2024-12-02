<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<%@ include file="head.jsp" %>
<%@ page session="true" %>

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container body ps-10 pe-10">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row mt-15 mb-n20">
      <form class="form-horizontal m-0">
        <!-- 제품 -->
        <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
              <p class="control-label">제품 검색</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 mt-2">
              <input class="form-control" type="text" id="findProdNm" onKeyDown="fnPressGet01(event)" placeholder="제품명을 입력해주세요." />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <button class="btn btn-primary btn-sm pointer" type="button" onClick="fnPressGet01(event)">
                조회
              </button>
            </div>
          </div>
        </div>
        <!-- 자재 -->
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4">
              <p class="control-label">자재 검색</p>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 mt-2">
              <input class="form-control" type="text" id="findResrcNm" onKeyDown="fnPressGet02(event)" placeholder="자재명을 입력해주세요." />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <button class="btn btn-primary btn-sm" type="button" onClick="fnPressGet02(event)">
                조회
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <br /><div class="clearfix"></div>

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid02" class="cards-grid h-35p"></div>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt ms-5 me-5"></i>
            <span>BOM 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10 ps-10 pe-10">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">
                    <span class="required">≫</span>
                    <span>제품</span>
                  </label>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <input
                      class="form-control bomInput"
                      type="text"
                      id="prodNm"
                      placeholder="검색"
                      onKeyDown="fnFindCd(this.value,'','prod',event)"
                    />
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <select id="prod" class="form-control">
                      <option value="">==제품==</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr/>
          <div id="grid03" class="cards-grid h-33p"></div>
          <hr/>
          <div class="cards-button">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <button type="button" class="btn btn-success btn-sm" onClick="fnNew()">
                신규
              </button>
              <button type="button" class="btn btn-primary btn-sm" onClick="fnSave()">
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>

  <!-- js -->
  <script src="${rsPath}/scripts/export/init.js"></script>
  <script src="${rsPath}/scripts/pages/common.js"></script>
  <script src="${rsPath}/scripts/pages/files.js"></script>
  <script src="${rsPath}/scripts/pages/bom.js"></script>
</body>
