<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<div class="border-1 radius-1 shadow-4 d-none w-max-600px popup" id="popup2">
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <!-- form -->
      <form id="formData1" name="formData1" class="formData1">
        <!-- top -->
        <div class="row bg-primary border-bottom-dark-1 p-15px" id="popTop">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center" onclick="fnLayerTop('popup2')">
            <div class="fs-1-2rem fw-600 white ml-auto">
              개인정보 변경
            </div>
            <div class="fs-1-4rem fw-600 white pointer-red mr-10px ml-auto"
              onclick="fnGridPopup('popup2', 'off')"
            >
              x
            </div>
          </div>
        </div>
        <!-- body -->
        <div class="row bg-white p-15px" id="popBody">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="row">
              <div class="d-row-center mb-3vh">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                  <div class="d-row-left">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-8rem fw-600 light-black">
                      이름
                    </div>
                  </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div class="d-row-left mr-2vw">
                    <input
                      type="text"
                      id="userConfigNm"
                      name="userConfigNm"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                  <div class="d-row-left">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-8rem fw-600 light-black">
                      연락처
                    </div>
                  </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div class="d-row-left mr-2vw">
                    <input
                      type="text"
                      id="userConfigPhone"
                      name="userConfigPhone"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="d-row-center mb-3vh">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                  <div class="d-row-left">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-8rem fw-600 light-black">
                      아이디
                    </div>
                  </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div class="d-row-left mr-2vw">
                    <input
                      type="text"
                      id="userConfigID"
                      name="userConfigID"
                      class="form-control"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                  <div class="d-row-left">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-8rem fw-600 light-black">
                      이메일
                    </div>
                  </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div class="d-row-left mr-2vw">
                    <input
                      type="text"
                      id="userConfigEmail"
                      name="userConfigEmail"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="d-row-center mb-3vh">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                  <div class="d-row-left">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-8rem fw-600 light-black">
                      비밀번호
                    </div>
                  </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <div class="d-row-left mr-2vw">
                    <input
                      type="password"
                      id="userConfigPw"
                      name="userConfigPw"
                      class="form-control"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  <div class="d-row-left">
                    <div class="fs-0-8rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-8rem fw-600 light-black">
                      비번변경
                    </div>
                  </div>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  <div class="d-row-left mr-2vw">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      id="changeConfigPw"
                      onclick="fnUpdateConfigPw()"
                    >
                      변경 하기
                    </button>
                  </div>
                </div>
              </div>
              <div class="d-row-center mb-3vh">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm mr-10px"
                    onclick="fnSaveUserConfigInfo()"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onclick="fnGridPopup('popup2', 'off')"
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
        </div>
      </form>
    </div>
    <!-- js -->
    <script defer src="${rsPath}/scripts/pages/userConfig.js"></script>
  </div>
</div>
