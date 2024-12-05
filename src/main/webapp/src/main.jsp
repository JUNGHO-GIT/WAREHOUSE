<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="fileUrl" value="${sessionScope.fileUrl}"/>

<body class="nav-md">
  <div class="container body">
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 left_col">
      <div class="scroll-view">
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
          <div class="menu_section">
            <ul class="nav side-menu">
              <c:forEach var="page" items="${mainList}" varStatus="status">
                <c:set var="findPage" value=",${mainList[status.index].findPage},"/>
                <c:set var="allPage" value=",${sessionScope.uPerm},"/>
                <c:choose>
                  <c:when test="${page.subPage == '00'}">
                    <c:if test="${status.index != 0 && sumPage == 'ok'}">
                      </ul>
                      </li>
                    </c:if>
                    <li>
                      <a><i class="fa ${page.pageIcon}"></i>
                      <span>${page.pageNm}</span>
                      <span class="fa fa-chevron-down"></span></a>
                      <c:set var="sumPage" value="empty"/>
                  </c:when>
                  <c:otherwise>
                    <c:choose>
                      <c:when test="${page.subPage == '01'}">
                        <ul class="nav child_menu">
                      </c:when>
                    </c:choose>
                    <c:if test="${allPage.indexOf(findPage) > -1 }">
                      <!-- 1. 대시보드 페이지일 경우 -->
                      <c:if test="${fn:contains(page.pageUrl,'/dash')}">
                        <li>
                          <a class="pointer" onclick="location.href='${page.pageUrl}'">
                            <span>${page.pageNm}</span>
                          </a>
                        </li>
                      </c:if>
                      <!-- 2. 대시보드 페이지가 아닐 경우 -->
                      <c:if test="${not fn:contains(page.pageUrl,'/dash')}">
                        <li>
                          <a class="pointer" onclick="fnAddTab('${page.pageNm}','${page.pageUrl}','${page.pageOrder}')">
                            <span>${page.pageNm}</span>
                          </a>
                        </li>
                      </c:if>
                    </c:if>
                    <c:set var="sumPage" value="ok"/>
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
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 right_col" style="width:-webkit-fill-available; padding:inherit">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3vh">
          <div class="gnb_wrap border-bottom-1 shadow-bottom-3">
            <div class="gnb_toggle">
              <i class="fa fa-bars fs-25px light-black pointer-navy" id="menu_toggle"></i>
            </div>
            <div class="gnb_tab">
              <ul id="tabs" class="d-row"></ul>
            </div>
            <div class="save_gnb">
              <input type="hidden" id="configSeq" />
              <a onclick="fnCloseAllTab()" class="pointer" title="모두닫기">
                <i class="fa fa-times fs-25px mr-15px"></i>
              </a>
              <a onclick="fnIfrRefresh()" class="pointer" title="새로고침">
                <i class="fa fa-refresh fs-25px mr-15px"></i>
              </a>
              <a onclick="fnSaveUserConfigTab()" class="pointer" title="저장">
                <i class="fa fa-save fs-25px mr-15px"></i>
              </a>
              <a onclick="fnShowUserConfigInfo()" class="pointer" title="사용자정보">
                <i class="fa fa-user fs-25px mr-15px"></i>
              </a>
              <a onclick="fnLogOut()" class="pointer" title="로그아웃">
                <i class="fa fa-sign-out fs-25px mr-15px"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div id="tabContents"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- js -->
  <%@ include file="./userConfig.jsp" %>
  <script src="${rsPath}/scripts/pages/main.js"></script>
</body>