<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
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
                placeholder="자재명을 입력해주세요"
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
              <div class="grid-main">
                <div class="h-37p" id="grid02"></div>
              </div>
              <hr class="my-1vh bg-dark" />
              <div class="grid-detail">
                <div class="row mb-3vh">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="d-row-left">
                      <i class="fa fa-list-alt mr-1vw"></i>
                      <div class="fs-0-9rem fw-700 light-black">
                        자재 입고 상세
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <div class="d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          날짜
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="inOutDt"
                          name="inOutDt"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <div class="d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          자재
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="resrcNm"
                          name="resrcNm"
                          class="form-control"
                          placeholder="검색"
                          onKeyDown="fnFindCd(this.value,'','resrc',event)"
                        />
                      </div>
                    </div>
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                      <div class="d-row-left mr-2vw">
                        <select
                          id="resrc"
                          name="resrc"
                          class="form-control"
                          readonly
                        >
                          <option value="">==자재==</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <div class="d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          창고
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                      <div class="d-row-left mr-2vw">
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
                      <div class="d-row-left mr-2vw">
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
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <div class="d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          거래처
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="compNm"
                          name="compNm"
                          class="form-control"
                          placeholder="검색"
                          onKeyDown="fnFindCd(this.value,'','comp',event)"
                        />
                      </div>
                    </div>
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                      <div class="d-row-left mr-2vw">
                        <select
                          id="comp"
                          name="comp"
                          class="form-control"
                        >
                          <option value="">==거래처==</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <div class="d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          수량
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="qty"
                          name="qty"
                          class="form-control d-right"
                          value="0"
                          onKeyUp="fnInputNum(this); fnSupplyPrice();"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <div class="d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          단가
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                      <div class="d-row-left mr-2vw">
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
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <div class="d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          공급가
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                      <div class="d-row-left mr-2vw">
                        <input
                          type="text"
                          id="supplyPrice"
                          name="supplyPrice"
                          class="form-control d-right"
                          value="0"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-row-center mb-1vh">
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <div class="d-row-left">
                        <div class="fs-0-8rem fw-500 red mr-3px">
                          ≫
                        </div>
                        <div class="fs-0-8rem fw-600 light-black">
                          메모
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                      <div class="d-row-left mr-2vw">
                        <textarea
                          id="remark"
                          name="remark"
                          class="form-control resize-none"
                          rows="1"
                        ></textarea>
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
                  </div>
                  <!-- hidden -->
                  <div class="hidden-wrapper">
                    <input type="hidden" id="inOut" name="inOut" value="in" />
                    <input type="hidden" id="inOutSeq" name="inOutSeq" />
                    <input type="hidden" id="resrc" name="resrc" />
                    <input type="hidden" id="resrcCd" name="resrcCd" />
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
    <script defer src="${rsPath}/scripts/pages/resourceIn.js"></script>

  </div>
</body>
