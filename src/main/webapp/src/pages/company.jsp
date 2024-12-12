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
                  거래처 검색
                </div>
              </div>
            </div>
            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div class="d-row-left mr-10px">
                <input
                  type="text"
                  id="findCompNm"
                  name="findCompNm"
                  class="form-control form-control-sm"
                  placeholder="거래처를 입력해주세요"
                  onKeyDown="fnPressGet01(event)"
                />
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <div class="btn btn-primary btn-xs" onclick="fnPressGet01(event)">
                조회
              </div>
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
              <div class="grid-detail">
                <div class="row mb-3vh">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="d-row-left">
                      <i class="fa fa-list-alt mr-1vw"></i>
                      <div class="fs-0-9rem fw-700 light-black">
                        거래처 상세
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
                        거래처 이름
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compNm"
                        name="compNm"
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
                        사업자번호
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compNo"
                        name="compNo"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        대표자
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compOwner"
                        name="compOwner"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        담당자
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compMajor"
                        name="compMajor"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        업태
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compType"
                        name="compType"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        종목
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compPart"
                        name="compPart"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        주소
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compAddr"
                        name="compAddr"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        세금계산서 Email
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compEmail"
                        name="compEmail"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        전화번호
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compPhone"
                        name="compPhone"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        메모
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="remarks"
                        name="remarks"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        이미지
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <div class="form-control cards-imageWrapper d-flex" id="showImage"></div>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right bg-light p-5px mr-10px" id="fileShow">
                      <div class="fs-0-7rem fw-600 light-black">
                        파일
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="file"
                        name="userFile"
                        id="userFile"
                        class="form-control form-control-sm"
                      />
                      <div
                        id="fileUpBtn"
                        class="btn btn-success btn-xs"
                        onclick="fnUploadFiles(this.form)"
                      >
                        업로드
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        파일목록
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <div class="form-control cards-imageWrapper" id="files"></div>
                    </div>
                  </div>
                </div>
                <div class="row mt-5vh">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="d-row-center">
                      <div class="btn btn-success btn-xs mr-10px" onclick="fnReset()">
                        신규
                      </div>
                      <div class="btn btn-primary btn-xs mr-10px" onclick="fnSave()">
                        저장
                      </div>
                      <div class="btn btn-danger btn-xs" onclick="fnDel()">
                        삭제
                      </div>
                    </div>
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
        </form>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <div class="h-5vh"></div>
    <script defer src="${rsPath}/scripts/pages/company.js"></script>

  </div>
</body>
