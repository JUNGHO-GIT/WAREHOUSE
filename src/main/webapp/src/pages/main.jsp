<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ include file="head.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="imgPath" value="${pageContext.request.contextPath}/images" />

<!-- main -->
<section class="container-fluid">
  <div class="row d-center">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <!-- detail -->
      <div class="row">
        <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
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
            <div id="sidebar-page" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-page">
                  <c:forEach var="page" items="${mainList}" varStatus="status">
                    <c:set var="menuCd" value="${mainList[status.index+1].page}"/>
                    <c:set var="findMenu" value=",${mainList[status.index].findMenu},"/>
                    <c:set var="findReadMenu" value=",${mainList[status.index].findMenu}R,"/>
                    <c:set var="allMenus" value=",${sessionScope.uPerm},"/>
                    <c:choose>
                      <c:when test="${page.subPage == '00'}">
                        <c:if test="${status.index != 0 && sumMenu == 'ok'}">
                          </ul>
                          </li>
                        </c:if>
                        <li>
                          <a><i class="fa ${page.pageIcon}"></i>
                          <span>${page.pageNm}</span>
                          <span class="fa fa-chevron-down"></span></a>
                          <c:set var="sumMenu" value="empty"/>
                      </c:when>
                      <c:otherwise>
                        <c:choose>
                          <c:when test="${page.subPage == '01'}">
                            <ul class="nav child_menu">
                          </c:when>
                        </c:choose>
                        <li>
                          <div
                            class="fs-0-9rem fw-400 pointer-primary"
                            onClick="fnAddTab('${page.pageNm}','${page.pageUrl}','${page.pageOrder}')"
                          >
                            <span>${page.pageNm}</span>
                          </div>
                        </li>
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
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <!-- header -->
          <div class="row bg-light border-bottom-1 h-8vh">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-row-center">
              <div class="mr-5vw">
                <div class="p-relative pointer hover d-center z-1000" id="menu_toggle">
                  <i class="fa fa-bars fs-25px"></i>
                </div>
              </div>
              <div class="mr-auto">
                <div id="tabContainer" class="d-row"></div>
              </div>
              <div class="ml-auto">
                <a onClick="fnCloseAllTab()" class="pointer" title="모두닫기">
                  <i class="fa fa-times fs-25px mr-15px"></i>
                </a>
                <a onClick="fnRefreshTab()" class="pointer" title="새로고침">
                  <i class="fa fa-refresh fs-25px mr-15px"></i>
                </a>
                <a onClick="fnSaveUserConfigTab()" class="pointer" title="저장">
                  <i class="fa fa-save fs-25px mr-15px"></i>
                </a>
                <a onClick="fnShowUserConfigInfo()" class="pointer" title="사용자정보">
                  <i class="fa fa-user fs-25px mr-15px"></i>
                </a>
                <a onClick="fnLogOut()" class="pointer" title="로그아웃">
                  <i class="fa fa-sign-out fs-25px mr-15px"></i>
                </a>
                <input
                  type="hidden"
                  id="configSeq"
                  name="configSeq"
                />
              </div>
            </div>
          </div>
          <!-- contents -->
          <div class="row p-0px">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div id="tabContents"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- script -->
  <%@ include file="./userConfig.jsp" %>
  <script defer src="${rsPath}/scripts/pages/main.js"></script>
</section>