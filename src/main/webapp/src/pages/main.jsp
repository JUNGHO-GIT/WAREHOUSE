<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="imgPath" value="${pageContext.request.contextPath}/images" />
<%@ include file="head.jsp" %>
<%@ page session="true" %>

<!------------------------------------------------------------------------------------------------->
<body class="nav-md over-hidden">
  <div class="container body">

    <!--------------------------------------------------------------------------------------------->
    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 left_col">
      <div class="scroll-view">
        <div class="navbar nav_title">
          <c:set var="fileUrl" value="${sessionScope.fileUrl}"/>
          <c:if test="${empty fileUrl}">
            <img
              src="${imgPath}/no-logo.webp"
              class="logo-image"
              loading="eager"
            />
          </c:if>
          <c:if test="${not empty fileUrl}">
            <img
              src="viewFiles?fileUrl=${fileUrl}"
              class="logo-image"
              loading="eager"
            />
          </c:if>
        </div>
        <br />
        <div class="clearfix"></div>
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
          <div class="menu_section">
            <ul class="nav side-menu">
              <c:forEach var="menu" items="${mainList}" varStatus="status">
                <c:set var="menuCd" value="${mainList[status.index+1].menu}"/>
                <c:set var="findMenu" value=",${mainList[status.index].findMenu},"/>
                <c:set var="findReadMenu" value=",${mainList[status.index].findMenu}R,"/>
                <c:set var="allMenus" value=",${sessionScope.uPerm},"/>
                <c:choose>
                  <c:when test="${menu.subMenu == '00'}">
                    <c:if test="${status.index != 0 && sumMenu == 'ok'}">
                      </ul>
                      </li>
                    </c:if>
                    <li>
                      <a><i class="fa ${menu.pageIcon}"></i>
                      <span>${menu.pageNm}</span>
                      <span class="fa fa-chevron-down"></span></a>
                      <c:set var="sumMenu" value="empty"/>
                  </c:when>
                  <c:otherwise>
                    <c:choose>
                      <c:when test="${menu.subMenu == '01'}">
                        <ul class="nav child_menu">
                      </c:when>
                    </c:choose>
                    <c:if test="${allMenus.indexOf(findMenu) > -1 }">
                      <!-- 1. 대시보드 페이지일 경우 -->
                      <c:if test="${fn:contains(menu.pageUrl,'/dash')}">
                        <li>
                          <a class="pointer" onClick="location.href='${menu.pageUrl}'">
                            <span>${menu.pageNm}</span>
                          </a>
                        </li>
                      </c:if>
                      <!-- 2. 대시보드 페이지가 아닐 경우 -->
                      <c:if test="${not fn:contains(menu.pageUrl,'/dash')}">
                        <li>
                          <a class="pointer" onClick="fnAddTab('${menu.pageNm}','${menu.pageUrl}','${menu.menuOrder}')">
                            <span>${menu.pageNm}</span>
                          </a>
                        </li>
                      </c:if>
                    </c:if>
                    <c:set var="sumMenu" value="ok"/>
                  </c:otherwise>
                </c:choose>
              </c:forEach>
            </ul>
          </div>
          <div id="showVersion"></div>
        </div>
      </div>
    </div>

    <!--------------------------------------------------------------------------------------------->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 right_col" style="width:-webkit-fill-available; padding:inherit">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0">
        <div class="gnb_wrap">
          <div class="nav toggle toggle_gnb">
            <a class="pointer pos-relative p-15 z-10" id="menu_toggle">
            	<i class="fa fa-bars fs-25"></i>
            </a>
          </div>
          <div class="gnb_tab">
            <ul id="tabs"></ul>
          </div>
          <div class="save_gnb">
            <input type="hidden" id="configSeq" />
            <a onClick="fnCloseAllTab()" class="pointer" title="모두닫기">
              <i class="fa fa-times fs-25 me-15"></i>
            </a>
            <a onClick="fnIfrRefresh()" class="pointer" title="새로고침">
              <i class="fa fa-refresh fs-25 me-15"></i>
            </a>
            <a onClick="fnSaveUserConfigTab()" class="pointer" title="저장">
              <i class="fa fa-save fs-25 me-15"></i>
            </a>
            <a onClick="fnShowUserConfigInfo()" class="pointer" title="사용자정보">
              <i class="fa fa-user fs-25 me-15"></i>
            </a>
            <a onClick="fnLogOut()" class="pointer" title="로그아웃">
              <i class="fa fa-sign-out fs-25 me-15"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div id="tabContents"></div>
      </div>
    </div>
  </div>

  <!-- js -->
  <%@ include file="./userConfig.jsp" %>
  <script src="${rsPath}/scripts/jquery/dist/jquery.min.js"></script>
  <script src="${rsPath}/scripts/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="${rsPath}/scripts/pqgrid24/jquery-ui.min.js"></script>
  <script src="${rsPath}/scripts/pqgrid24/pqgrid.min.js"></script>
  <script src="${rsPath}/scripts/export/init.js"></script>
  <script src="${rsPath}/scripts/pages/common.js"></script>
  <script src="${rsPath}/scripts/pages/files.js"></script>
  <script src="${rsPath}/scripts/pages/main.js"></script>

</body>