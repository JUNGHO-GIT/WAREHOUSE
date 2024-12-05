<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<div class="row border-1 radius-1 shadow-4 d-none w-max-600px popup" id="popup2">
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <!-- form -->
    <form id="formData1" name="formData1" class="formData1">
      <!-- top -->
      <div class="row bg-primary border-bottom-dark-1 p-15px" id="popTop">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center" onclick="fnLayerTop('popup2')">
          <div class="fs-1-2rem fw-600 white ml-auto">
            개인정보 변경
          </div>
          <div class="fs-1-0rem fw-600 white ml-auto">
            <i class="fa fa-close pointer-red mr-10px" onclick="fnGridPopup('popup2')"></i>
          </div>
        </div>
      </div>
      <!-- body -->
      <div class="row bg-white p-15px" id="popBody">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="row mt-3vh mb-2vh d-row-center">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-row-left">
              <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
              <div class="fs-0-8rem fw-600 light-black">
                이름
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 d-row-center">
              <input
                type="text"
                class="form-control"
                id="userConfigNm"
              />
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-row-left">
              <div class="fs-0-8rem fw-500 red mx-10px">
                ≫
              </div>
              <div class="fs-0-8rem fw-600 light-black">
                연락처
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 d-row-center">
              <input
                type="text"
                class="form-control"
                id="userConfigPhone"
              />
            </div>
          </div>
          <div class="row mb-2vh d-row-center">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-row-left">
              <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
              <div class="fs-0-8rem fw-600 light-black">
                아이디
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 d-row-center">
              <input
                type="text"
                class="form-control"
                id="userConfigID"
                readonly
              />
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-row-left">
              <div class="fs-0-8rem fw-500 red mx-10px">
                ≫
              </div>
              <div class="fs-0-8rem fw-600 light-black">
                이메일
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 d-row-center">
              <input
                type="text"
                class="form-control"
                id="userConfigEmail"
              />
            </div>
          </div>
          <div class="row mb-5vh d-row-center">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-row-left">
              <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
              <div class="fs-0-8rem fw-600 light-black">
                비밀번호
              </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 d-row-center">
              <input
                type="password"
                class="form-control"
                id="userConfigPw"
                readonly
              />
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 d-row-left">
              <div class="fs-0-8rem fw-500 red mx-10px">
                ≫
              </div>
              <div class="fs-0-8rem fw-600 light-black">
                비밀번호 변경
              </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 d-row-left">
              <button
                type="button"
                class="btn btn-primary btn-sm ml-10px"
                id="changeConfigPw"
                onclick="fnUpdateConfigPw()"
              >
                변경 하기
              </button>
            </div>
          </div>
          <div class="row d-row-center">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center">
              <button
                type="button"
                class="btn btn-primary btn-sm mr-1vw"
                onclick="fnSaveUserConfigInfo()"
              >
                저장
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm ml-1vw"
                onclick="fnGridPopup('popup2')"
              >
                닫기
              </button>
            </div>
          </div>
          <!-- hidden -->
          <div class="hidden-wrapper">
            <input type="hidden" id="changeConfigFlag" value="N" />
            <input type="hidden" id="userConfigLevel">
            <input type="hidden" id="userConfigCompCd">
            <input type="hidden" id="userConfigPerm">
          </div>
        </div>
      </div>
    </form>
  </div>
  <script defer src="${rsPath}/scripts/pages/userConfig.js"></script>
</div>
