<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="head.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<section class="container-fluid">
  <div class="container body pl-10px pr-10px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row mt-15px mb-n20px">
      <form class="form-horizontal m-0px">
        <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
          <div class="row">
            <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <p class="control-label">자재 검색</p>
            </div>
            <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-2px">
              <input class="form-control" type="text" id="findResrcNm"
                onKeyDown="fnPressGet01(event)" placeholder="자재명을 입력해주세요." />
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <button class="btn btn-primary btn-sm pointer" type="button" onClick="fnPressGet01(event)">
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
      <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
        <div class="cards" id="gridView">
          <div id="grid02" class="cards-grid h-33p"></div>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt ml-5px mr-5px"></i>
            <span>자재 출고 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="inOut" value="out" />
                <input type="hidden" id="inOutSeq" />
                <input type="hidden" id="resrcCd" />
                <input type="hidden" id="compCd" />
                <input type="hidden" id="houseCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>날짜</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="inOutDt" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>자재</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input
                      class="form-control"
                      type="hidden"
                      id="resrcNm"
                      placeholder="검색"
                      onKeyDown="fnFindCd(this.value,'','resrc',event)"
                    />
                    <select id="resrc" class="form-control" readonly>
                      <option value="">==자재==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>거래처</span>
                  </label>
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <input
                      class="form-control"
                      type="text"
                      id="compNm"
                      placeholder="검색"
                      onKeyDown="fnFindCd(this.value,'','comp',event)"
                    />
                  </div>
                  <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <select id="comp" class="form-control">
                      <option value="">==거래처==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>창고</span>
                  </label>
                  <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <input
                      class="form-control"
                      type="text"
                      id="houseNm"
                      placeholder="검색"
                      onKeyDown="fnFindCd(this.value,'','house',event)"
                    />
                  </div>
                  <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <select id="house" class="form-control">
                      <option value="">==창고==</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>수량</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
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
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>단가</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
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
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>공급가</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
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
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>메모</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <textarea class="form-control resize-none" rows="1" id="remark"></textarea>
                  </div>
                </div>
                <hr/>
                <div class="cards-button">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <button type="button" class="btn btn-success btn-sm" onClick="fnReset()">
                      신규
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" onClick="fnSave()">
                      저장
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick="fnDel()">
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
  <script defer src="${rsPath}/scripts/pages/resourceOut.js"></script>
</section>
