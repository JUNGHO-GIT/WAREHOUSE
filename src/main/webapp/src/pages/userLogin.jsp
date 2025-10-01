<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="imgPath" value="${pageContext.request.contextPath}/images" />
<%@ include file="head.jsp" %>
<%@ page session="true" %>

<body class="login d-center">
  <div class="login_wrapper">
    <div class="animate form login_form">
      <div class="login_content">
        <img
          src="${imgPath}/cores-logo.png"
          alt="logo"
          class="img-fluid w-300 h-auto"
          loading="lazy"
        />
        <h1>Login</h1>
        <div class="d-center h-30 mb-20">
          <input
            class="form-control"
            type="text"
            placeholder="아이디"
            id="uid"
            name="uid"
          />
        </div>
        <div class="d-center h-30 mb-20">
          <input
            class="form-control"
            type="password"
            placeholder="비밀번호"
            id="pass"
            name="pass"
            onKeyDown="onKeyDown(event)"
          />
        </div>
        <div class="d-center mb-20">
          <input type="checkbox" id="setId" />
          <label>아이디 저장</label>
        </div>
        <div class="d-center mb-20">
          <button class="btn btn-primary btn-lg" type="button" onClick="fnAuth()">
            로그인
          </button>
        </div>
        <div class="d-center mb-20">
          <div class="fs-0-9rem fw-500 light-black">
            ©2021 All Rights Reserved. WAREHOUSE
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- js -->
  <script src="${rsPath}/scripts/jquery/dist/jquery.min.js"></script>
  <script src="${rsPath}/scripts/cookie/jquery.cookie.js"></script>
  <script src="${rsPath}/scripts/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="${rsPath}/scripts/pqgrid24/jquery-ui.min.js"></script>
  <script src="${rsPath}/scripts/pqgrid24/pqgrid.min.js"></script>
  <script src="${rsPath}/scripts/export/init.js"></script>
  <script src="${rsPath}/scripts/pages/common.js"></script>
  <script src="${rsPath}/scripts/pages/userLogin.js"></script>

</body>