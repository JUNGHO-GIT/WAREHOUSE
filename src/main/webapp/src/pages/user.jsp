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
        <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
              <p class="control-label">이름 / 아이디</p>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-4 mt-2">
              <input class="form-control" type="text" id="findUserNm" onKeyDown="fnPressGet01(event)" placeholder="사용자를 입력해주세요." />
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

      <!-- col 1 -->
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>

      <!-- col 2 -->
      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div class="cards">
          <div class="cards-title">
            <i class="fa fa-list-alt ms-5 me-5"></i>
            <span>사용자 정보</span>
          </div>
          <div class="cards-content">
            <div class="row p-10 ps-10 pe-10">
              <form class="form-horizontal">

                <!-- hidden -->
                <input type="hidden" id="userIDCheck" value="N" />
                <input type="hidden" id="changeFlag" value="N" />
                <input type="hidden" id="signUpCheck" value="N" />
                <!-- /.hidden -->

                <!-- 1. 관리자인 경우 -->
                <c:if test="${sessionScope.userConfigLevel == '01000' || sessionScope.userConfigLevel == '00900'}">
                  <div class="form-group">
                    <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                      <span class="required">≫</span>
                      <span>아이디</span>
                    </label>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                      <input class="form-control" type="text" id="userID" />
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 d-right ms-15">
                      <button type="button" class="btn btn-warning btn-xs inlineBtn pt-2" onClick="fnCheckUserID()">
                        중복체크
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                      <span class="required">≫</span>
                      <span>비밀번호</span>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                      <input class="form-control" type="password" id="passwd" />
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 d-right ms-15">
                      <button type="button" class="btn btn-primary btn-xs inlineBtn pt-2" id="changePw" onClick="fnUpdatePw()">
                        비번변경
                      </button>
                    </div>
                  </div>
                </c:if>
                <!-- 2. 관리자가 아닌 경우 -->
                <c:if test="${sessionScope.userConfigLevel != '01000' && sessionScope.userConfigLevel != '00900'}">
                  <div class="form-group">
                    <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                      <span class="required">≫</span>
                      <span>아이디</span>
                    </label>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                      <input class="form-control" type="text" id="userID" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                      <span class="required">≫</span>
                      <span>비밀번호</span>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                      <input class="form-control" type="password" id="passwd" />
                    </div>
                  </div>
                </c:if>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>이름</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="userNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span>연락처</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="phone" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span>E-mail</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <input class="form-control" type="text" id="email" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                    <span class="required">≫</span>
                    <span>회원등급</span>
                  </label>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <select id="uLevel" class="form-control">
                      <option value="">==회원등급==</option>
                    </select>
                  </div>
                </div>
                <hr/>
                <!-- 1. 관리자인 경우 -->
                <c:if test="${sessionScope.userConfigLevel == '01000' || sessionScope.userConfigLevel == '00900'}">
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
                </c:if>
                <!-- 2. 관리자가 아닌 경우 -->
                <c:if test="${sessionScope.userConfigLevel != '01000' && sessionScope.userConfigLevel != '00900'}">
                  <div class="cards-button">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">&nbsp;</div>
                  </div>
                </c:if>
                <hr/>
                <!-- 1. 관리자인 경우 -->
                <c:if test="${sessionScope.userConfigID == 'jade'}">
                  <div id="fileShow">
                    <div class="form-group">
                      <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                        <span>WAR 파일</span>
                      </label>
                      <form id="fileUpload" name="fileUpload">
                        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                          <input type="hidden" name="tableNm" id="tableNm" />
                          <input type="hidden" name="tableKey" id="tableKey" />
                          <input type="hidden" name="fileSeq" id="fileSeq" value="0" />
                          <input type="hidden" name="fileNm" id="fileNm" />
                          <input type="hidden" name="fileUrl" id="fileUrl" />
                          <input type="file" name="userFile" id="userFile" class="w-100 mt-3" />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 d-right">
                          <button class="btn btn-success btn-xs pt-2" type="button" id="fileUpBtn" onClick="fnUploadWarFiles(this.form)">업로드</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </c:if>
                <!-- 2. 관리자가 아닌 경우 -->
                <c:if test="${sessionScope.userConfigID != 'jade'}">
                  <div id="fileNotShow"></div>
                </c:if>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- col 3 -->
      <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div class="cards">
          <div class="panel panel-default float_right w-100">
            <div class="panel-heading">
              <i class="fa fa-list-alt ms-5 me-5"></i>
              <span>권한</span>
            </div>
            <div class="panel-body" id="userPerms"></div>
          </div>
        </div>
      </div>
      <!-- /.col 3 -->

    </div>
    <!-- /.row 2 -->
  </div>

  <!-- js -->
  <script src="${rsPath}/scripts/export/init.js"></script>
  <script src="${rsPath}/scripts/pages/common.js"></script>
  <script src="${rsPath}/scripts/pages/files.js"></script>
  <script src="${rsPath}/scripts/pages/user.js"></script>
</body>
