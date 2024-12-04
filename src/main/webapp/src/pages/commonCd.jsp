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
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <p class="control-label">그룹</p>
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-2px">
              <select id="findGroupCd" class="form-control" onChange="fnChangeList()"></select>
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <p class="control-label">항목</p>
            </div>
            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-2px">
              <input class="form-control" type="text" id="findItemNm" onKeyDown="fnPressGet01(event)" placeholder="아이템명을 입력해주세요." />
            </div>
            <div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
              <button class="btn btn-primary btn-sm" type="button" onClick="fnPressGet01(event)">
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
            <span>공통코드 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>그룹명</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <select id="groupCd" class="form-control"></select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>아이템코드</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="itemCd" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>아이템</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="itemNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>순위</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="itemSeq" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>메모</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <textarea class="form-control resize-none" rows="1" id="itemMemo"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>신규등록</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" placeholder="그룹코드@그룹명" id="regGroup" />
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
  <script defer src="${rsPath}/scripts/pages/commonCd.js"></script>
</section>
