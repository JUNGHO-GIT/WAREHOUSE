<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ include file="../layouts/head.jsp" %>
<%@ page session="true" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="fileUrl" value="${sessionScope.fileUrl}"/>

<body class="body">

  <!-- sidebar -->
  <div class="sidebar-container sidebar-open">
    <div class="sidebar-logo">
      <img
        src="${rsPath}/images/logo.png"
        alt="logo"
        class="sidebar-img pointer hover"
        onclick="fnGoPage('main')"
      />
    </div>
    <div class="my-1vh h-1px bg-dark"></div>
    <div class="sidebar-menu">
      <ul class="nav side-menu">
        <c:set var="childOpen" value="false" />
        <c:forEach var="page" items="${mainList}" varStatus="status">
          <c:if test="${page.subPage == '00'}">
            <c:if test="${childOpen}">
              <c:set var="childOpen" value="false" />
              </ul></li>
            </c:if>
            <c:if test="${!childOpen}">
              <li class="first-li">
                <a class="first-a">
                  <i class="${page.pageIcon}"></i>
                  <span>${page.pageNm}</span>
                </a>
            </c:if>
          </c:if>
          <c:if test="${page.subPage == '01'}">
            <c:if test="${childOpen}">
              <c:set var="childOpen" value="false" />
              </ul></li>
            </c:if>
            <c:if test="${!childOpen}">
              <c:set var="childOpen" value="true" />
              <ul class="nav child-menu">
            </c:if>
          </c:if>
          <c:if test="${sessionScope.userPerm.indexOf(page.findPage) > -1}">
            <c:if test="${fn:contains(page.pageUrl, 'dash')}">
              <li class="second-li">
                <a class="second-a" onclick="fnGoPage('${page.pageUrl}')">
                  <span>${page.pageNm}</span>
                </a>
              </li>
            </c:if>
            <c:if test="${!fn:contains(page.pageUrl, 'dash')}">
              <li class="second-li">
                <a class="second-a" onclick="fnAddTab('${page.pageNm}', '${page.pageUrl}', '${page.pageOrder}')">
                  <span>${page.pageNm}</span>
                </a>
              </li>
            </c:if>
          </c:if>
        </c:forEach>
      </ul>
    </div>
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
          class="fa fa-gear fs-25px light-black pointer-navy"
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

  <!-- version -->
  <div class="version-container">
    <div class="showVersion"></div>
  </div>

  <!-- js -->
  <%@ include file="./userConfig.jsp" %>
  <input type="hidden" id="configSeq" name="configSeq" value="" />
  <script defer src="${rsPath}/scripts/pages/main.js"></script>

</body>