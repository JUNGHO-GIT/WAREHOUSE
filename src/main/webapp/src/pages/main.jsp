<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ include file="../layouts/head.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="fileUrl" value="${sessionScope.fileUrl}"/>

<body class="body">

  <!-- sidebar -->
  <div class="sidebar-container sidebar-open">
    <div class="sidebar-logo">
      <img
        src="${rsPath}/images/logo.png"
        alt="logo"
        class="sidebar-logo"
        onclick="fnGoPage('main')"
      />
    </div>
    <div class="sidebar-menu">
      <ul class="nav side-menu">
        <c:set var="childOpen" value="false" />
        <c:forEach var="page" items="${mainList}" varStatus="status">
          <c:set var="userPerm" value="${sessionScope.userPerm}" />
          <c:set var="findPage" value="${page.findPage}" />
          <c:set var="nm" value="${page.pageNm}" />
          <c:set var="url" value="${page.pageUrl}" />
          <c:set var="order" value="${page.pageOrder}" />
          <c:set var="icon" value="${page.pageIcon}" />
          <c:set var="sub" value="${page.subPage}" />
          <c:set var="isDash" value="${fn:contains(page.pageUrl, 'dash')}" />
          <c:choose>
            <c:when test="${sub == '00'}">
              <c:if test="${childOpen}">
                <c:set var="childOpen" value="false" />
                </ul></li>
              </c:if>
              <li class="first-li">
                <a class="first-a">
                  <i class="${icon}"></i>
                  <span>${nm}</span>
                </a>
            </c:when>
            <c:otherwise>
              <c:if test="${sub == '01' && !childOpen}">
                <c:set var="childOpen" value="true" />
                <ul class="nav child-menu">
              </c:if>
              <c:if test="${userPerm.indexOf(findPage) > -1}">
                <c:choose>
                  <c:when test="${isDash}">
                    <li class="second-li">
                      <a class="second-a" onclick="fnGoPage('${url}')">
                        <span>${nm}</span>
                      </a>
                    </li>
                  </c:when>
                  <c:otherwise>
                    <li class="second-li">
                      <a class="second-a" onclick="fnAddTab('${nm}','${url}','${order}')">
                        <span>${nm}</span>
                      </a>
                    </li>
                  </c:otherwise>
                </c:choose>
              </c:if>
            </c:otherwise>
          </c:choose>
        </c:forEach>
        <c:if test="${childOpen}">
          </ul></li>
        </c:if>
      </ul>
    </div>
    <div id="showVersion"></div>
  </div>

  <!-- main -->
  <div class="main-container ml-100px">
    <div class="header-container border-bottom-1 shadow-bottom-3">
      <div class="header-toggle">
        <div class="fa fa-bars fs-25px light-black pointer-navy"></div>
      </div>
      <div class="header-tab">
        <ul id="tabs" class="d-row"></ul>
      </div>
      <div class="header-menu">
        <div
          class="fa fa-cog fs-25px light-black pointer-navy"
          data-toggle="collapse"
          data-target=".menu-container"
          title="메뉴"
        ></div>
        <div class="collapse menu-container">
          <div
            class="fa fa-times fs-25px my-10px light-black pointer-navy"
            onclick="fnCloseAllTabs()"
            title="모두닫기"
          ></div>
          <div
            class="fa fa-refresh fs-25px my-10px light-black pointer-navy"
            onclick="fnRefreshAllTabs()"
            title="새로고침"
          ></div>
          <div
            class="fa fa-save fs-25px my-10px light-black pointer-navy"
            onclick="fnSaveUserConfigTab()"
            title="저장"
          ></div>
          <div
            class="fa fa-user fs-25px my-10px light-black pointer-navy"
            onclick="fnShowUserConfigInfo()"
            title="사용자정보"
          ></div>
          <div
            class="fa fa-sign-out fs-25px my-10px light-black pointer-navy"
            onclick="fnLogOut()"
            title="로그아웃"
          ></div>
        </div>
      </div>
    </div>
    <div class="content-container">
      <div id="tabContents"></div>
    </div>
  </div>

  <!-- js -->
  <%@ include file="./userConfig.jsp" %>
  <input type="hidden" id="configSeq" />
  <script defer src="${rsPath}/scripts/pages/main.js"></script>
</body>