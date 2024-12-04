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
              <p class="control-label">사용자 이름/아이디</p>
            </div>
            <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-2px">
              <input class="form-control" type="text" id="findUserNm" onKeyDown="fnPressGet01(event)" />
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

    <br />

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
        <div class="cards" id="contentView">
          <div class="cards-title">
            <i class="fa fa-list-alt ml-5px mr-5px"></i>
            <span>사용자 정보</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="flagYN" value='Y' />
                <input type="hidden" id="offSeq" value="0" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 control-label">사용자</label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <select id="userID" name="userID" class="form-control"></select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 control-label">휴무일</label>
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <input class="form-control" type="text" id="offDay" />
                  </div>
                  <label class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 control-label">휴무일수</label>
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <input class="form-control" type="text" id="count" />
                  </div>
                </div>
                <hr/>
                <div class="cards-button">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
  <script defer src="${rsPath}/scripts/pages/dayOff.js"></script>
</section>
