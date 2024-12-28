<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="../layout/head.jsp" %>
<%@ page session="true" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="body">
  <div class="container">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row d-center">
            <div class="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2">
              <div class="d-row-right search-label">
                <div class="fs-0-8rem fw-600 dark">
                  제품 검색
                </div>
              </div>
            </div>
            <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
              <div class="d-row-left mr-10px">
                <input
                  type="text"
                  id="findProdNm"
                  name="findProdNm"
                  class="form-control form-control-sm"
                  placeholder="제품명을 입력해주세요"
                  onkeydown="fnPressGet01(event)"
                />
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-6 col-lg-6 col-xl-6">
              <div class="d-row-left">
                <div class="btn btn-primary btn-xs" onclick="fnPressGet01(event)">
                  조회
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row 1 -->

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row mt-20px">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData2" name="formData2" class="formData2">
          <div class="row">
            <!-- grid 1 -->
            <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 margin-md">
              <div class="grid-main h-min-100vh">
                <div id="grid01"></div>
              </div>
            </div>
            <!-- grid 2 -->
            <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
              <div class="grid-main h-min-40vh mb-3vh">
                <div id="grid02"></div>
              </div>
              <div class="grid-detail">
                <div class="row mb-3vh">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="d-row-left">
                      <i class="fa fa-list-alt mr-1vw"></i>
                      <div class="fs-0-9rem fw-700 light-black">
                        제품 입고 예정정보
                      </div>
                      <div class="d-row-center ml-auto">
                        <div class="d-center mr-15px">
                          <div
                            id="in"
                            data-value="in"
                            class="fs-0-7rem fw-500 light on pointer"
                            onclick="fnToggleInOut(this)"
                          >
                            ●
                          </div>
                          <div class="fs-0-7rem fw-400 light-black">
                            입고
                          </div>
                        </div>
                        <div class="d-center mr-15px">
                          <div
                            id="out"
                            data-value="out"
                            class="fs-0-7rem fw-500 light pointer"
                            onclick="fnToggleInOut(this)"
                          >
                            ●
                          </div>
                          <div class="fs-0-7rem fw-400 light-black">
                            출고
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-500 red mr-3px">
                        *
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        날짜
                      </div>
                    </div>
                  </div>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="inOutDt"
                        name="inOutDt"
                        class="form-control form-control-sm pointer"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-500 red mr-3px">
                        *
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        제품
                      </div>
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="prodNm"
                        name="prodNm"
                        class="form-control form-control-sm"
                        placeholder="검색"
                        onkeydown="fnFindCd(this.value,'','prod',event)"
                      />
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-left mr-10px">
                      <select
                        id="prod"
                        name="prod"
                        class="form-control form-control-sm"
                        readonly
                      >
                        <option value="">==제품==</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-500 red mr-3px">
                        *
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        창고
                      </div>
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="houseNm"
                        name="houseNm"
                        class="form-control form-control-sm"
                        placeholder="검색"
                        onkeydown="fnFindCd(this.value,'','house',event)"
                      />
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-left mr-10px">
                      <select
                        id="house"
                        name="house"
                        class="form-control form-control-sm"
                      >
                        <option value="">==창고==</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-500 red mr-3px">
                        *
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        거래처
                      </div>
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compNm"
                        name="compNm"
                        class="form-control form-control-sm"
                        placeholder="검색"
                        onkeydown="fnFindCd(this.value,'','comp',event)"
                      />
                    </div>
                  </div>
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-left mr-10px">
                      <select
                        id="comp"
                        name="comp"
                        class="form-control form-control-sm"
                      >
                        <option value="">==거래처==</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-500 red mr-3px">
                        *
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        수량
                      </div>
                    </div>
                  </div>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="qty"
                        name="qty"
                        class="form-control form-control-sm d-right"
                        value="0"
                        onkeyup="fnInputNum(this); fnSupplyPrice();"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-500 red mr-3px">
                        *
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        단가
                      </div>
                    </div>
                  </div>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="unitPrice"
                        name="unitPrice"
                        class="form-control form-control-sm d-right"
                        value="0"
                        onkeyup="fnInputNum(this); fnSupplyPrice();"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-500 red mr-3px">
                        *
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        공급가
                      </div>
                    </div>
                  </div>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="supplyPrice"
                        name="supplyPrice"
                        class="form-control form-control-sm d-right"
                        value="0"
                        readonly
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-500 red mr-3px">
                        *
                      </div>
                      <div class="fs-0-7rem fw-600 light-black">
                        메모
                      </div>
                    </div>
                  </div>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
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
                </div>
              </div>
            </div>
            <!-- hidden -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="hidden-wrapper">
                <input type="hidden" id="inOut" name="inOut" value="in" />
                <input type="hidden" id="inOutSeq" name="inOutSeq" value="" />
                <input type="hidden" id="prod" name="prod" value="" />
                <input type="hidden" id="prodCd" name="prodCd" value="" />
                <input type="hidden" id="compCd" name="compCd" value="" />
                <input type="hidden" id="houseCd" name="houseCd" value="" />
                <input type="hidden" id="tableNm" name="tableNm" value="tblProduct" />
                <input type="hidden" id="tableKey" name="tableKey" value="0" />
                <input type="hidden" id="keyColumn" name="keyColumn" value="prodCd" />
                <input type="hidden" id="fileSeq" name="fileSeq" value="0" />
                <input type="hidden" id="fileSeq" name="fileSeq" value="" />
                <input type="hidden" id="fileUrl" name="fileUrl" value="" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <script defer src="${rsPath}/scripts/page/productInPlan.js"></script>

  </div>
</body>
