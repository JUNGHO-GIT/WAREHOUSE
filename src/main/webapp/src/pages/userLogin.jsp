<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ include file="head.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="imgPath" value="${pageContext.request.contextPath}/images" />

<!-- main -->
<section class="container-fluid h-100p d-center">
  <div class="row">
    <div class="col-11 col-sm-11 col-md-10 col-lg-10 col-xl-10">
      <!-- form -->
      <form
        th:id="${'formData'}"
        th:name="${'formData'}"
        th:class="${'formData'}"
      >
        <!-- detail -->
        <div class="row border-1 shadow-1 radius-2 p-20px">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <!-- logo -->
            <div class="row d-row-center mb-3vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <img
                  src="${imgPath}/cores-logo.png"
                  alt="logo"
                  class="img-fluid w-max-200px"
                  loading="lazy"
                />
              </div>
            </div>
            <!-- title -->
            <div class="row d-row-center mb-3vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="fs-1-8rem fw-800 light-black">
                  로그인
                </div>
              </div>
            </div>
            <!-- id -->
            <div class="row d-row-center mb-3vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input
                  type="text"
                  class="form-control"
                  id="uid"
                  name="uid"
                  placeholder="아이디"
                />
              </div>
            </div>
            <!-- password -->
            <div class="row d-row-center mb-3vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input
                  type="password"
                  class="form-control"
                  id="pass"
                  name="pass"
                  placeholder="비밀번호"
                  onKeyDown="onKeyDown(event)"
                />
              </div>
            </div>
            <!-- save id -->
            <div class="row d-row-center mb-3vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <input type="checkbox" id="setId" />
                <label>아이디 저장</label>
              </div>
            </div>
            <!-- login -->
            <div class="row d-row-center mb-3vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <button
                  type="button"
                  class="btn btn-primary btn-lg"
                  onClick="fnAuth()"
                >
                  로그인
                </button>
              </div>
            </div>
            <!-- copy right -->
            <div class="row d-row-center mb-3vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="fs-0-9rem fw-500 light-black">
                  ©2021 All Rights Reserved. WAREHOUSE
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- js -->
  <script defer src="${rsPath}/scripts/pages/userLogin.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
</section>