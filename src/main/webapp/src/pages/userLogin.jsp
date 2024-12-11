<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ include file="../layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!-------------------------------------------------------------------------------------------------><body class="d-center">
  <div class="container d-center">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row border-1 shadow-1 radius-2 p-20px w-max-50vw h-min-60vh">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <!-- logo -->
          <div class="row mb-5vh">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="d-row-center">
                <img
                  src="${rsPath}/images/cores-logo.png"
                  alt="logo"
                  class="img-fluid w-max-200px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <!-- title -->
          <div class="row mb-5vh">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="d-row-center">
                <div class="fs-1-8rem fw-800 light-black">
                  로그인
                </div>
              </div>
            </div>
          </div>
          <!-- id -->
          <div class="row mb-3vh">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="d-row-center">
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  class="form-control form-control-sm"
                  placeholder="아이디"
                />
              </div>
            </div>
          </div>
          <!-- password -->
          <div class="row mb-3vh">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="d-row-center">
                <input
                  type="password"
                  id="userPw"
                  name="userPw"
                  class="form-control form-control-sm"
                  placeholder="비밀번호"
                  onKeyDown="onKeyDown(event)"
                />
              </div>
            </div>
          </div>
          <!-- save id -->
          <div class="row mb-3vh">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="d-row-center">
                <input
                  type="checkbox"
                  id="setId"
                  name="setId"
                  class="form-check mr-10px"
                />
                <div class="fs-0-9rem fw-500 light-black">
                  아이디 저장
                </div>
              </div>
            </div>
          </div>
          <!-- login -->
          <div class="row mb-5vh">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="d-row-center">
                <div class="btn btn-primary btn-md w-100p" onclick="fnAuth()">
                  로그인
                </div>
              </div>
            </div>
          </div>
          <!-- copy right -->
          <div class="row mb-3vh">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="d-row-center">
                <div class="fs-0-9rem fw-500 light-black">
                  ©2021 All Rights Reserved. WAREHOUSE
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- js -->
    <script defer src="${rsPath}/scripts/pages/userLogin.js"></script>

  </div>
</body>