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
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
              <p class="control-label">사용자 이름/아이디</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 mt-2">
              <input class="form-control" type="text" id="findUserNm" onKeyDown="fnPressGet01(event)" />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <button class="btn btn-primary btn-sm pointer" type="button" onClick="fnPressGet01(event)">
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
            <span>사용자 정보</span>
          </div>
          <div class="cards-content">
            <div class="row p-10 ps-10 pe-10">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="flagYN" value='Y' />
                <input type="hidden" id="offSeq" value="0" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label">사용자</label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <select id="userID" name="userID" class="form-control"></select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label">휴무일</label>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <input class="form-control" type="text" id="offDay" />
                  </div>
                  <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 control-label">휴무일수</label>
                  <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <input class="form-control" type="text" id="count" />
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
  <script src="/inc/js/page/dayOff.js"></script>
</body>
