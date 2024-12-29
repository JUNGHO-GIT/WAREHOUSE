<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
  <div class="border-1 radius-1 shadow-4 w-min-350px w-max-90vw h-max-500px d-none z-10000" id="popupUserConfig">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row">
            <!-- top -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-primary border-bottom-dark-1 p-15px drag" id="popTop">
              <div class="d-row-center">
                <div class="fs-1-2rem fw-600 white ml-auto">
                  개인정보 변경
                </div>
                <div class="fs-1-4rem fw-600 white pointer-red mr-10px ml-auto" onclick="fnPopup('popupUserConfig', 'off')">
                  x
                </div>
              </div>
            </div>
          </div>
          <!-- body -->
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white p-15px" id="popBody">
            <div class="row mb-1vh">
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="d-row-right detail-label">
                  <div class="fs-0-7rem fw-500 red mr-3px">
                    *
                  </div>
                  <div class="fs-0-7rem fw-600 light-black">
                    이름
                  </div>
                </div>
              </div>
              <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div class="d-row-left mr-10px">
                  <input
                    type="text"
                    id="userConfigNm"
                    name="userConfigNm"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="d-row-right detail-label">
                  <div class="fs-0-7rem fw-500 red mr-3px">
                    *
                  </div>
                  <div class="fs-0-7rem fw-600 light-black">
                    연락처
                  </div>
                </div>
              </div>
              <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div class="d-row-left mr-10px">
                  <input
                    type="text"
                    id="userConfigPhone"
                    name="userConfigPhone"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-1vh">
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="d-row-right detail-label">
                  <div class="fs-0-7rem fw-500 red mr-3px">
                    *
                  </div>
                  <div class="fs-0-7rem fw-600 light-black">
                    아이디
                  </div>
                </div>
              </div>
              <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div class="d-row-left mr-10px">
                  <input
                    type="text"
                    id="userConfigId"
                    name="userConfigId"
                    class="form-control form-control-sm"
                    value="${sessionScope.userConfigId}"
                    readonly
                  />
                </div>
              </div>
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="d-row-right detail-label">
                  <div class="fs-0-7rem fw-500 red mr-3px">
                    *
                  </div>
                  <div class="fs-0-7rem fw-600 light-black">
                    이메일
                  </div>
                </div>
              </div>
              <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div class="d-row-left mr-10px">
                  <input
                    type="text"
                    id="userConfigEmail"
                    name="userConfigEmail"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-1vh">
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="d-row-right detail-label">
                  <div class="fs-0-7rem fw-500 red mr-3px">
                    *
                  </div>
                  <div class="fs-0-7rem fw-600 light-black">
                    비밀번호
                  </div>
                </div>
              </div>
              <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div class="d-row-left mr-10px">
                  <input
                    type="password"
                    id="userConfigPw"
                    name="userConfigPw"
                    class="form-control form-control-sm"
                    readonly
                  />
                </div>
              </div>
              <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <div class="d-row-right detail-label">
                  <div class="fs-0-7rem fw-500 red mr-3px">
                    *
                  </div>
                  <div class="fs-0-7rem fw-600 light-black">
                    비번변경
                  </div>
                </div>
              </div>
              <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-col-left">
                <div class="d-row-left mr-10px">
                  <div
                    class="btn btn-primary btn-xs"
                    id="changeConfigPw"
                    onclick="fnUpdateConfigPw()"
                  >
                    변경하기
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="d-row-center">
                  <div class="btn btn-primary btn-xs mr-10px" onclick="fnSaveUserConfigInfo()">
                    저장
                  </div>
                  <div class="btn btn-danger btn-xs" onclick="fnPopup('popupUserConfig', 'off')">
                    닫기
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- hidden -->
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="hidden-wrapper">
              <input type="hidden" id="changeConfigFlag" name="changeConfigFlag" value="N">
              <input type="hidden" id="userConfigLevel" name="userConfigLevel" value="">
              <input type="hidden" id="userConfigCompCd" name="userConfigCompCd" value="">
              <input type="hidden" id="userConfigPerm" name="userConfigPerm" value="">
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- js -->
    <script defer src="${rsPath}/script/page/userConfig.js"></script>
  </div>
</div>
