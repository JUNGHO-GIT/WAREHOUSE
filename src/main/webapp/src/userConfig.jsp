<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<div
  id="popupUserConfig"
  class="border-1 radius-1 shadow-4 w-max-700px h-max-500px d-none z-10000"
  style="position: fixed; top: 40vh; left: 30vw"
>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <!-- form -->
      <form id="formData1" name="formData1" class="formData1">
        <!-- top -->
        <div class="row bg-primary border-bottom-dark-1 p-15px drag" id="popTop">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-center">
            <div class="fs-1-2rem fw-600 white ml-auto">
              개인정보 변경
            </div>
            <div
              class="fs-1-4rem fw-600 white pointer-red mr-10px ml-auto"
              onclick="fnGridPopup('popupUserConfig', 'off')"
            >
              x
            </div>
          </div>
        </div>
        <!-- body -->
        <div class="row bg-white p-15px" id="popBody">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="row">
              <div class="d-row-center mb-1vh">
                <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="d-row-right mr-2vw">
                    <div class="fs-0-7rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-7rem fw-600 light-black">
                      이름
                    </div>
                  </div>
                </div>
                <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="d-row-right mr-2vw">
                    <input
                      type="text"
                      id="userConfigNm"
                      name="userConfigNm"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="d-row-right mr-2vw">
                    <div class="fs-0-7rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-7rem fw-600 light-black">
                      연락처
                    </div>
                  </div>
                </div>
                <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="d-row-right mr-2vw">
                    <input
                      type="text"
                      id="userConfigPhone"
                      name="userConfigPhone"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="d-row-center mb-1vh">
                <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="d-row-right mr-2vw">
                    <div class="fs-0-7rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-7rem fw-600 light-black">
                      아이디
                    </div>
                  </div>
                </div>
                <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="d-row-right mr-2vw">
                    <input
                      type="text"
                      id="userConfigID"
                      name="userConfigID"
                      class="form-control form-control-sm"
                      value="${sessionScope.userConfigID}"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="d-row-right mr-2vw">
                    <div class="fs-0-7rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-7rem fw-600 light-black">
                      이메일
                    </div>
                  </div>
                </div>
                <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="d-row-right mr-2vw">
                    <input
                      type="text"
                      id="userConfigEmail"
                      name="userConfigEmail"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="d-row-center mb-1vh">
                <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="d-row-right mr-2vw">
                    <div class="fs-0-7rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-7rem fw-600 light-black">
                      비밀번호
                    </div>
                  </div>
                </div>
                <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="d-row-right mr-2vw">
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
                  <div class="d-row-right mr-2vw">
                    <div class="fs-0-7rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-7rem fw-600 light-black">
                      비번변경
                    </div>
                  </div>
                </div>
                <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <div class="d-row-left mr-10px">
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
              <div class="d-row-center mt-2vh">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-center">
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
                    onclick="fnGridPopup('popupUserConfig', 'off')"
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
