<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container px-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <form class="form-horizontal m-0px">
        <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
          <div class="row">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <p class="control-label">그룹</p>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mt-2px">
              <select id="findGroupCd" class="form-control" onchange="fnChangeList()"></select>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <p class="control-label">항목</p>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mt-2px">
              <input class="form-control" type="text" id="findItemNm" onKeyDown="fnPressGet01(event)" placeholder="아이템명을 입력해주세요." />
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
              <button class="btn btn-primary btn-sm" type="button" onclick="fnPressGet01(event)">
                조회
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
        <div class="cards" id="contentView">
          <div class="cards-title">
            <i class="fa fa-list-alt mr-1vw"></i>
            <span>공통코드 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <span>그룹명</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <select id="groupCd" class="form-control"></select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>아이템코드</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <input class="form-control" type="text" id="itemCd" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>아이템</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <input class="form-control" type="text" id="itemNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <span>순위</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <input class="form-control" type="text" id="itemSeq" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <span>메모</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <textarea class="form-control resize-none" rows="1" id="itemMemo"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <span>신규등록</span>
                  </label>
                  <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <input class="form-control" type="text" placeholder="그룹코드@그룹명" id="regGroup" />
                  </div>
                </div>
                <hr/>
                  <div class="d-row-center">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center">
                      <button
                        type="button"
                        class="btn btn-success mr-10px"
                        onclick="fnReset()"
                      >
                        신규
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary mr-10px"
                        onclick="fnSave()"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onclick="fnDel()"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>
  <!-- js -->
  <script defer src="${rsPath}/scripts/pages/commonCd.js"></script>
</body>
