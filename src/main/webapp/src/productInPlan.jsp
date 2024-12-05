<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container body p-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <form class="form-horizontal m-0px">
        <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
          <div class="row">
            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
              <p class="control-label">제품 검색</p>
            </div>
            <div class="col-xs-4 col-sm-3 col-md-3 col-lg-3 mt-2px">
              <input class="form-control" type="text" id="findProdNm"
                onKeyDown="fnPressGet01(event)" placeholder="제품명을 입력해주세요." />
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
              <button class="btn btn-primary btn-sm" type="button" onclick="fnPressGet01(event)">
                조회
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <br/>

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
        <div class="cards" id="gridView">
          <div id="grid02" class="cards-grid h-33p"></div>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt mr-1vw"></i>
            <span>제품 입고 예정 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="inOut" value="in" />
                <input type="hidden" id="inOutSeq" />
                <input type="hidden" id="prodCd" />
                <input type="hidden" id="compCd" />
                <input type="hidden" id="houseCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>날짜</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="inOutDt" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>제품</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input
                      class="form-control"
                      type="hidden"
                      id="prodNm"
                      placeholder="검색"
                      onKeyDown="fnFindCd(this.value,'','prod',event)"
                    />
                    <select id="prod" class="form-control" readonly>
                      <option value="">==제품==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>거래처</span>
                  </label>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <input
                      class="form-control"
                      type="text"
                      id="compNm"
                      placeholder="검색"
                      onKeyDown="fnFindCd(this.value,'','comp',event)"
                    />
                  </div>
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <select id="comp" class="form-control">
                      <option value="">==거래처==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>창고</span>
                  </label>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <input
                      class="form-control"
                      type="text"
                      id="houseNm"
                      placeholder="검색"
                      onKeyDown="fnFindCd(this.value,'','house',event)"
                    />
                  </div>
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <select id="house" class="form-control">
                      <option value="">==창고==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>수량</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input
                      class="form-control d-right"
                      type="text"
                      id="qty"
                      value="0"
                      onKeyUp="fnInputNum(this); fnSupplyPrice();"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>단가</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input
                      class="form-control d-right"
                      type="text"
                      id="unitPrice"
                      value="0"
                      onKeyUp="fnInputNum(this); fnSupplyPrice();"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <span>공급가</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input
                      class="form-control d-right"
                      type="text"
                      id="supplyPrice"
                      value="0"
                      readonly
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <span>메모</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <textarea class="form-control resize-none" rows="1" id="remark"></textarea>
                  </div>
                </div>
                <hr/>
                <div class="cards-button">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" class="btn btn-success btn-sm" onclick="fnReset()">
                      신규
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" onclick="fnSave()">
                      저장
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="fnDel()">
                      삭제
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->
  </div>
  <!-- js -->
  <script defer src="${rsPath}/scripts/pages/productInPlan.js"></script>
</body>
