<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="../layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container px-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <form class="form-horizontal m-0px">
        <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              &nbsp;
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
        <div class="cards">
          <ul id="grid01" class="ztree h-60p"></ul>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt mr-1vw"></i>
            <span>창고 카테고리</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="parentsHCd" />
                <input type="hidden" id="houseCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <span>상위 창고</span>
                  </label>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <input class="form-control form-control-sm" type="text" id="parentsHNm" disabled readonly />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
                    <span>창고 이름</span>
                  </label>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <input class="form-control form-control-sm" type="text" id="houseNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
                    <span>창고 순서</span>
                  </label>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <input class="form-control form-control-sm"type="text" id="houseOrder" />
                  </div>
                </div>
                <hr/>
                <div class="cards-button">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <button type="button" class="btn btn-success btn-xs" onclick="fnReset()">
                      신규
                    </button>
                    <button type="button" class="btn btn-primary btn-xs" onclick="fnSave()">
                      저장
                    </button>
                    <button type="button" class="btn btn-danger btn-xs" onclick="fnDel()">
                      삭제
                    </button>
                    <button type="button" class="btn btn-warning btn-xs" onclick="fnAddCat()">
                      하위 카테고리
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
        <div class="cards" id="gridView">
          <div id="grid02" class="cards-grid5"></div>
          <hr/>
          <div id="grid03" class="cards-grid5"></div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <div class="h-5vh"></div>
    <link rel="stylesheet" href="${rsPath}/styles/libs/ztree.min.css" />
    <script defer src="${rsPath}/scripts/libs/ztree.min.js"></script>
    <script defer src="${rsPath}/scripts/pages/bom.js"></script>

  </div>
</body>