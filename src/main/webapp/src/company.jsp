<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!-------------------------------------------------------------------------------------------------><body class="nav-md">
  <div class="container px-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row my-20px">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 px-10px">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row d-row-left">
            <div class="col-xs-3 col-sm-3 col-md-2 col-lg-2 p-5px bg-dark-white mr-10px">
              <div class="fs-0-8rem fw-600 dark d-right">
                거래처 검색
              </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-4 col-lg-4 mr-10px">
              <input
                type="text"
                id="findCompNm"
                name="findCompNm"
                class="form-control"
                placeholder="거래처를 입력해주세요"
                onKeyDown="fnPressGet01(event)"
              />
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <button
                type="button"
                class="btn btn-primary btn-sm"
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
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <!-- form -->
        <form id="formData2" name="formData2" class="formData2">
          <div class="row">
            <!-- grid 1 -->
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 px-10px">
              <div class="grid-main">
                <div class="h-100p" id="grid01"></div>
              </div>
              <div class="divider-md d-none"></div>
            </div>
            <!-- grid 2 -->
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 px-10px">
              <div class="grid-detail">
                <div class="row mb-3vh">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="d-row-left">
                      <i class="fa fa-list-alt mr-1vw"></i>
                      <div class="fs-0-9rem fw-700 light-black">
                        거래처 상세
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          거래처 이름
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="compNm"
                          name="compNm"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          사업자 등록번호
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="compNo"
                          name="compNo"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          대표자
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="owner"
                          name="owner"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          담당자
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="major"
                          name="major"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          전화번호
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          세금계산서 Email
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="taxEmail"
                          name="taxEmail"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          주소
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          업태
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="compType"
                          name="compType"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          종목
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="compPart"
                          name="compPart"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          메모
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <textarea
                          id="remarks"
                          name="remarks"
                          class="form-control resize-none"
                          rows="1"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          이미지
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <div class="form-control cards-imageWrapper d-flex" id="showImage"></div>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh" id="fileShow">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          파일
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="file"
                          name="userFile"
                          id="userFile"
                          class="w-100p"
                        />
                        <button
                          class="btn btn-success btn-xs mt-3px"
                          type="button"
                          id="fileUpBtn"
                          onclick="fnUploadFiles(this.form)"
                        >
                          업로드
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="d-row-right mr-2vw">
                        <div class="fs-0-8rem fw-600 light-black">
                          파일목록
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left mr-2vw">
                        <div class="form-control cards-imageWrapper" id="files"></div>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mt-2vh">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center">
                      <button
                        type="button"
                        class="btn btn-success mr-10px"
                        onclick="fnReset()"
                      >
                        신규
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary mr-10px"
                        onclick="fnSave()"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onclick="fnDel()"
                      >
                        삭제
                      </button>
                    </div>
                    <!-- hidden -->
                    <div class="hidden-wrapper">
                      <input type="hidden" name="compCd" id="compCd" />
                      <input type="hidden" name="tableNm" id="tableNm" value="tblCompany" />
                      <input type="hidden" name="tableKey" id="tableKey" value="0" />
                      <input type="hidden" name="keyColumn" id="keyColumn" value="compCd" />
                      <input type="hidden" name="fileSeq" id="fileSeq" value="0" />
                      <input type="hidden" name="fileNm" id="fileNm" />
                      <input type="hidden" name="fileUrl" id="fileUrl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <div class="h-5vh"></div>
    <script defer src="${rsPath}/scripts/pages/company.js"></script>

  </div>
</body>
