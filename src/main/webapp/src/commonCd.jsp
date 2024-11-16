<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/src/inc/header.jsp" %>
<%@ page session="true" %>

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container body ps-10 pe-10">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row mt-15 mb-n20">
      <form class="form-horizontal m-0">
        <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <p class="control-label">그룹</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 mt-2">
              <select id="findGroupCd" class="form-control" onChange="fnChangeList()"></select>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <p class="control-label">항목</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 mt-2">
              <input class="form-control" type="text" id="findItemNm" onKeyDown="fnPressGet01(event)" placeholder="아이템명을 입력해주세요." />
            </div>
            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
              <button class="btn btn-primary btn-sm" type="button" onClick="fnPressGet01(event)">
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
          <div id="grid01" class="cards-grid h-98"></div>
        </div>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div class="cards" id="contentView">
          <div class="cards-title">
            <i class="fa fa-list-alt ms-5 me-5"></i>
            <span>공통코드 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10 ps-10 pe-10">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span>그룹명</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <select id="groupCd" class="form-control"></select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>아이템코드</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="itemCd" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>아이템</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="itemNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span>순위</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="itemSeq" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span>메모</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <textarea class="form-control resize-none" rows="1" id="itemMemo"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span>신규등록</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" placeholder="그룹코드@그룹명" id="regGroup" />
                  </div>
                </div>
                <hr/>
                <div class="cards-button">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button type="button" class="btn btn-success btn-sm" onClick="fnReset()">
                      신규
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" onClick="fnSave()">
                      저장
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick="fnDel()">
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
  <script src="/inc/vendors/jquery/dist/jquery.min.js"></script>
  <script src="/inc/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="/inc/js/pqgrid24/jquery-ui.min.js"></script>
  <script src="/inc/js/pqgrid24/pqgrid.min.js"></script>
  <script src="/inc/js/init.js"></script>
  <script src="/inc/js/common.js"></script>
  <script src="/inc/js/page/files.js"></script>
  <script src="/inc/js/page/commonCd.js"></script>
</body>
