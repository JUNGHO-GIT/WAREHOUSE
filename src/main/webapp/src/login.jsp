<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/src/inc/header.jsp" %>
<%@ page session="true" %>

<!------------------------------------------------------------------------------------------------->
<body class="login h-100 d-center">
  <div class="login_wrapper">

    <!--------------------------------------------------------------------------------------------->
    <div class="animate form login_form">
      <div class="login_content">
        <!-- <img src="/imgs/story4you-logo.png" style="width:240px; margin:0 auto 20px auto;" /> -->
        <img src="/imgs/cores-logo.png" style="width:240px; margin:0 auto 20px auto;" />
        <form>
          <h1>Login</h1>
          <div class="mt-5">
            <input class="form-control h-4" type="text" placeholder="아이디" id="uid" name="uid"  />
          </div>
          <div class="mt-5">
            <input class="form-control h-4" type="password" placeholder="비밀번호" id="pass" name="pass" onKeyDown="onKeyDown(event)" />
          </div>
          <div class="mt-20">
            <input type="checkbox" id="setId" />
            <label>아이디 저장</label>
          </div>
          <div class="mt-20">
            <button class="btn btn-primary btn-lg" type="button" onClick="fnAuth()">
              로그인
            </button>
          </div>
          <div class="mt-30">
            <p>©2021 All Rights Reserved. WAREHOUSE</p>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- js -->
  <script src="/inc/vendors/jquery/dist/jquery.min.js"></script>
  <script src="/inc/js/jquery.cookie.js"></script>
  <script src="/inc/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="/inc/js/pqgrid24/jquery-ui.min.js"></script>
  <script src="/inc/js/pqgrid24/pqgrid.min.js"></script>
  <script src="/inc/js/common.js"></script>
  <script src="/inc/js/page/login.js"></script>
</body>