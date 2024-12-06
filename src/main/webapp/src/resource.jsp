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
                자재 검색
              </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-4 col-lg-4 mr-10px">
              <input
                type="text"
                id="findResrcNm"
                name="findResrcNm"
                class="form-control"
                placeholder="자재명을 입력해주세요."
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
            </div>
            <!-- grid 2 -->
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 px-10px">
              <div class="grid-detail">
                <div class="row mb-3vh">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="d-row-left">
                      <i class="fa fa-list-alt mr-1vw"></i>
                      <div class="fs-0-9rem fw-700 light-black">
                        자재 상세정보
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-10px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          자재명
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="resrcNm"
                          name="resrcNm"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-10px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          분류
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <select
                          id="resrcType"
                          name="resrcType"
                          class="form-control"
                        >
                          <option value="">==분류==</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-10px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          창고
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="houseNm"
                          name="houseNm"
                          class="form-control"
                          placeholder="검색"
                          onKeyDown="fnFindCd(this.value,'','house',event)"
                        />
                      </div>
                    </div>
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                      <div class="d-row-left ml-2vw">
                        <select
                          id="house"
                          name="house"
                          class="form-control"
                        >
                          <option value="">==창고==</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-600 light-black">
                          제조사
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="maker"
                          name="maker"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-600 light-black">
                          단위
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="unit"
                          name="unit"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-600 light-black">
                          사양
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="quality"
                          name="quality"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-600 light-black">
                          재질(색상)
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="option1"
                          name="option1"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-600 light-black">
                          규격(사이즈)
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="option2"
                          name="option2"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-10px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          안전재고
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="protectedQty"
                          name="protectedQty"
                          class="form-control d-right"
                          value="0"
                          onKeyUp="fnInputNum(this); fnSupplyPrice();"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-10px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          표준단가
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="unitPrice"
                          name="unitPrice"
                          class="form-control d-right"
                          value="0"
                          onKeyUp="fnInputNum(this); fnSupplyPrice();"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-600 light-black">
                          바코드
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <input
                          type="text"
                          id="barcode"
                          name="barcode"
                          class="form-control"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-600 light-black">
                          메모
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <textarea
                          id="remark"
                          name="remark"
                          class="form-control resize-none"
                          rows="1"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <div class="p-7px bg-dark-white d-row-left">
                        <div class="fs-0-8rem fw-600 light-black">
                          이미지
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                      <div class="d-row-left ml-2vw">
                        <div class="form-control cards-imageWrapper d-flex" id="showImage"></div>
                      </div>
                    </div>
                  </div>
                  <div id="fileShow">
                    <div class="d-row-center mb-1vh">
                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div class="p-7px bg-dark-white d-row-left">
                          <div class="fs-0-8rem fw-600 light-black">
                            파일
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                        <div class="d-row-left ml-2vw">
                          <form id="fileUpload" name="fileUpload">
                            <input type="hidden" name="tableNm" id="tableNm" value="tblResource" />
                            <input type="hidden" name="tableKey" id="tableKey" value="0" />
                            <input type="hidden" name="keyColumn" id="keyColumn" value="resrcCd" />
                            <input type="hidden" name="fileSeq" id="fileSeq" value="0" />
                            <input type="hidden" name="fileNm" id="fileNm" />
                            <input type="hidden" name="fileUrl" id="fileUrl" />
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
                          </form>
                        </div>
                      </div>
                    </div>
                    <div class="d-row-center mb-3vh">
                      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div class="p-7px bg-dark-white d-row-left">
                          <div class="fs-0-8rem fw-600 light-black">
                            파일목록
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                        <div class="d-row-left ml-2vw">
                          <div class="form-control cards-imageWrapper" id="files"></div>
                        </div>
                      </div>
                    </div>
                    <div class="d-row-center">
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
    <script defer src="${rsPath}/scripts/pages/resource.js"></script>

  </div>
</body>