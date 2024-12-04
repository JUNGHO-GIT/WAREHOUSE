<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<div class="popup" id="popup2" style="visibility:hidden; width:600px;">
  <div class="x_title bg-primary" id="popTop" onClick="fnLayerTop('popup2')">
    <h4>개인정보 변경</h4>
    <ul class="nav navbar-right panel_toolbox">
      <li>
        <a class="pointer" onClick="fnGridPopup('popup2','off')">
          <i class="fa fa-close"></i>
        </a>
      </li>
    </ul>
  </div>
  <div class="x_content bs-example-popovers bg-white" id="popBody">
    <form class="form-horizontal">
      <!-- hidden -->
      <input type="hidden" id="changeConfigFlag" value="N" />
      <input type="hidden" id="userConfigLevel">
      <input type="hidden" id="userConfigCompCd">
      <input type="hidden" id="userConfigPerm">
      <!-- /.hidden -->
      <div class="form-group">
        <label class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 control-label">
          <span class="required">≫</span>
          <span>아이디</span>
        </label>
        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <input class="form-control" type="text" id="userConfigID" readonly />
        </div>
        <label class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 control-label">
          <span class="required">≫</span>
          <span>이름</span>
        </label>
        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <input class="form-control" type="text" id="userConfigNm" />
        </div>
      </div>
      <div class="form-group">
        <label class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 control-label">
          <span class="required">≫</span>
          <span>비밀번호</span>
        </label>
        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <input class="form-control" type="password" id="userConfigPw" readonly />
        </div>
        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <button type="button" class="btn btn-primary btn-xs inlineBtn pt-2px" id="changeConfigPw" onClick="fnUpdateConfigPw()">
            비번변경
          </button>
        </div>
      </div>
      <div class="form-group">
        <label class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 control-label">
          <span>연락처</span>
        </label>
        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <input class="form-control" type="text" id="userConfigPhone" />
        </div>
      </div>
      <div class="form-group">
        <label class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 control-label">
          <span>이메일</span>
        </label>
        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <input class="form-control" type="text" id="userConfigEmail" />
        </div>
      </div>
    </form>
    <div class="form-group d-center">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <button type="button" class="btn btn-primary btn-sm" onClick="fnSaveUserConfigInfo()">
          저장
        </button>
        <button type="button" class="btn btn-danger btn-sm" onClick="fnGridPopup('popup2','off')">
          닫기
        </button>
      </div>
    </div>
  </div>
  <script defer src="${rsPath}/scripts/pages/userConfig.js"></script>
</div>
