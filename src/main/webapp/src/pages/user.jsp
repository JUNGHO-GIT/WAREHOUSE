<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="../layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!-------------------------------------------------------------------------------------------------><body class="nav-md">
  <div class="container px-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row my-20px">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-10px">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row d-row-left">
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <div class="p-5px bg-dark-white d-right mr-10px">
                <div class="fs-0-8rem fw-600 dark">
                  사용자 검색
                </div>
              </div>
            </div>
            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div class="d-row-left mr-10px">
                <input
                  type="text"
                  id="findUserNm"
                  name="findUserNm"
                  class="form-control form-control-sm"
                  placeholder="사용자를 입력해주세요"
                  onKeyDown="fnPressGet01(event)"
                />
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <button
                type="button"
                class="btn btn-primary btn-xs"
                onclick="fnPressGet01(event)"
              >
                조회
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row 1 -->

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData2" name="formData2" class="formData2">
          <div class="row">
            <!-- grid 1 -->
            <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 px-10px">
              <div class="grid-main h-min-100vh">
                <div id="grid01"></div>
              </div>
            </div>
            <div class="divider-md d-none"></div>
            <!-- grid 2 -->
            <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 px-10px">
              <div class="grid-switch">
                <div class="d-row-left">
                  <button
                    type="button"
                    id="detailTab"
                    class="btn btn-secondary btn-xs radius-bottom-0 mr-5px active"
                    onclick="fnSwitchPage('detail')"
                  >
                    <input
                      type="radio"
                      class="d-none"
                      name="detailTab"
                      value="detail"
                      checked
                    />
                    사용자정보
                  </button>
                  <button
                    type="button"
                    id="permTab"
                    class="btn btn-secondary btn-xs radius-bottom-0"
                    onclick="fnSwitchPage('perm')"
                  >
                    <input
                      type="radio"
                      class="d-none"
                      name="detailTab"
                      value="perm"
                    />
                    권한
                  </button>
                </div>
              </div>
              <div class="grid-detail h-min-100vh">
                <div class="row mb-3vh">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="d-row-left">
                      <i class="fa fa-list-alt mr-1vw"></i>
                      <div class="fs-0-9rem fw-700 light-black">
                        사용자 정보
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-8rem fw-500 red mr-3px">
                        ≫
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        아이디
                      </div>
                    </div>
                  </div>
                  <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-col-left">
                    <div class="d-row-left mr-10px">
                      <button
                        type="button"
                        class="btn btn-warning btn-xs"
                        onclick="fnCheckUserId()"
                      >
                        중복체크
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-8rem fw-500 red mr-3px">
                        ≫
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        비밀번호
                      </div>
                    </div>
                  </div>
                  <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <div class="d-row-left mr-10px">
                      <input
                        type="password"
                        id="userPw"
                        name="userPw"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-col-left">
                    <div class="d-row-left mr-10px">
                      <button
                        type="button"
                        class="btn btn-primary btn-xs"
                        onclick="fnUpdatePw()"
                      >
                        비번변경
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-8rem fw-500 red mr-3px">
                        ≫
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        이름
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="userNm"
                        name="userNm"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        연락처
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="userPhone"
                        name="userPhone"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        E-mail
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="userEmail"
                        name="userEmail"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-8rem fw-500 red mr-3px">
                        ≫
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        회원등급
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <select
                        id="userLevel"
                        name="userLevel"
                        class="form-control form-control-sm"
                      >
                        <option value="">==회원등급==</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row mt-5vh">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-center">
                    <button
                      type="button"
                      class="btn btn-success btn-xs mr-10px"
                      onclick="fnReset()"
                    >
                      신규
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-xs mr-10px"
                      onclick="fnSave()"
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-xs"
                      onclick="fnDel()"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
              <div class="grid-perm h-min-100vh d-none">
                <div class="row mb-3vh">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="d-row-left">
                      <i class="fa fa-list-alt mr-1vw"></i>
                      <div class="fs-0-9rem fw-700 light-black">
                        권한
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-12 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div id="userPerms"></div>
                  </div>
                </div>
              </div>
              <!-- hidden -->
              <div class="hidden-wrapper">
                <input type="hidden" id="userIdCheck" value="N" />
                <input type="hidden" id="changeFlag" value="N" />
                <input type="hidden" id="signUpCheck" value="N" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- js -->
    <div class="h-5vh"></div>
    <script defer src="${rsPath}/scripts/pages/user.js"></script>

  </div>
</body>
