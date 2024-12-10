<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
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
                  제품 검색
                </div>
              </div>
            </div>
            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div class="d-row-left mr-10px">
                <input
                  type="text"
                  id="findProdNm"
                  name="findProdNm"
                  class="form-control form-control-sm"
                  placeholder="제품명을 입력해주세요"
                  onKeyDown="fnPressGet01(event)"
                />
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
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
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData2" name="formData2" class="formData2">
          <div class="row">
            <!-- grid 1 -->
            <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 px-10px">
              <div class="grid-main h-100vh">
                <div id="grid01"></div>
              </div>
            </div>
            <div class="divider-md d-none"></div>
            <!-- grid 2 -->
            <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 px-10px">
              <div class="grid-main h-40vh">
                <div id="grid02"></div>
              </div>
              <div class="divider-all d-none"></div>
              <div class="grid-detail">
                <div class="row mb-3vh">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="d-row-left">
                      <i class="fa fa-list-alt mr-1vw"></i>
                      <div class="fs-0-9rem fw-700 light-black">
                        제품 출고 예정정보
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
                      <div class="fs-0-8rem fw-600 light-black">
                        날짜
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="inOutDt"
                        name="inOutDt"
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
                      <div class="fs-0-8rem fw-600 light-black">
                        제품
                      </div>
                    </div>
                  </div>
                  <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="prodNm"
                        name="prodNm"
                        class="form-control form-control-sm"
                        placeholder="검색"
                        onKeyDown="fnFindCd(this.value,'','prod',event)"
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
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-8rem fw-500 red mr-3px">
                        ≫
                      </div>
                      <div class="fs-0-8rem fw-600 light-black">
                        창고
                      </div>
                    </div>
                  </div>
                  <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="houseNm"
                        name="houseNm"
                        class="form-control form-control-sm"
                        placeholder="검색"
                        onKeyDown="fnFindCd(this.value,'','house',event)"
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
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-8rem fw-500 red mr-3px">
                        ≫
                      </div>
                      <div class="fs-0-8rem fw-600 light-black">
                        거래처
                      </div>
                    </div>
                  </div>
                  <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="compNm"
                        name="compNm"
                        class="form-control form-control-sm"
                        placeholder="검색"
                        onKeyDown="fnFindCd(this.value,'','comp',event)"
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
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-8rem fw-500 red mr-3px">
                        ≫
                      </div>
                      <div class="fs-0-8rem fw-600 light-black">
                        수량
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="qty"
                        name="qty"
                        class="form-control form-control-sm d-right"
                        value="0"
                        onKeyUp="fnInputNum(this); fnSupplyPrice();"
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
                      <div class="fs-0-8rem fw-600 light-black">
                        단가
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <input
                        type="text"
                        id="unitPrice"
                        name="unitPrice"
                        class="form-control form-control-sm d-right"
                        value="0"
                        onKeyUp="fnInputNum(this); fnSupplyPrice();"
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
                      <div class="fs-0-8rem fw-600 light-black">
                        공급가
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
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
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-8rem fw-500 red mr-3px">
                        ≫
                      </div>
                      <div class="fs-0-8rem fw-600 light-black">
                        메모
                      </div>
                    </div>
                  </div>
                  <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div class="d-row-left mr-10px">
                      <textarea
                        id="remark"
                        name="remark"
                        class="form-control resize-none"
                        rows="1"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row mt-2vh">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-center">
                    <button
                      type="button"
                      class="btn btn-success btn-sm mr-10px"
                      onclick="fnReset()"
                    >
                      신규
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm mr-10px"
                      onclick="fnSave()"
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      onclick="fnDel()"
                    >
                      삭제
                    </button>
                  </div>
                  <!-- hidden -->
                  <div class="hidden-wrapper">
                    <input type="hidden" id="inOut" name="inOut" value="out" />
                    <input type="hidden" id="inOutSeq" name="inOutSeq" />
                    <input type="hidden" id="prod" name="prod" />
                    <input type="hidden" id="prodCd" name="prodCd" />
                    <input type="hidden" id="compCd" name="compCd" />
                    <input type="hidden" id="houseCd" name="houseCd" />
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
    <script defer src="${rsPath}/scripts/pages/productOutPlan.js"></script>

  </div>
</body>