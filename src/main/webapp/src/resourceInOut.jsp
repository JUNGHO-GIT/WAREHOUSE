<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="./layouts/header.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<!------------------------------------------------------------------------------------------------->
<body class="nav-md">
  <div class="container px-20px">

    <!-- row 1 ------------------------------------------------------------------------------------>
    <div class="row">
      <form class="form-horizontal form-label-left m-0">
        <div class="col-lg-7 col-md-12 col-sm-12 col-xs-12">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 fw-8">
              <p class="control-label">자재 검색</p>
            </div>
            <div class="col-lg-8 col-md-7 col-sm-7 col-xs-7 mt-2">
              <input class="form-control d-none" type="text" id="0" />
              <input class="form-control" type="text" id="findResrcNm" onkeydown="fnPressGet01(event)" placeholder="자재명을 입력해주세요." />
            </div>
            <div class="col-lg-1 col-md-2 col-sm-2 col-xs-2">
              <button class="btn btn-primary btn-sm" type="button" onclick="fnGetList01()">
                조회
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- /.row 1 -->

    <!-- row 2 ------------------------------------------------------------------------------------>
    <div class="row">
      <div class="col-lg-7 col-md-12 col-sm-12 col-xs-12">
        <div class="cards">
          <div id="grid01" class="cards-grid h-96"></div>
        </div>
      </div>
      <div class="col-lg-5 col-md-12 col-sm-12 col-xs-12">
        <div class="cards">
          <div id="grid02" class="w-100 h-40"></div>
          <hr/>
          <div class="cards-title">
            <i class="fa fa-list-alt ms-5 me-5"></i>
            <span>자재 입출고 상세</span>
          </div>
          <div class="cards-content">
            <form class="form-horizontal form-label-left">
              <input type="hidden" id="flagYN" value="Y" />
              <input type="hidden" id="inOutSeq" />
              <input type="hidden" id="resrcCd" />
              <input type="hidden" id="compCd" />
              <input type="hidden" id="prodCd" />
              <input type="hidden" id="houseCd" />
              <input type="hidden" id="userId" />
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                  <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                  <span>날짜</span>
                </label>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                  <input class="form-control" type="text" id="inOutDt" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                  <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                  <span>자재</span>
                </label>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                  <input class="form-control" type="text" id="resrcNm" onkeydown="fnFindResourceCd(this.value, '', 'resrcCd')" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                  <select id="resrcCd" class="form-control">
                    <option value="">--자재--</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                  <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                  <span>단가</span>
                </label>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                  <input class="form-control" type="text" id="unitPrice" value="0" onkeyup="fnCommify(this);" onfocus="fnSetEmpty(this);" onblur="fnSetZero(this); fnSupplyPrice();" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">
                  <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                  <span>수량</span>
                </label>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                  <input class="form-control" type="text" id="qty" value="0" onkeyup="fnCommify(this);" onfocus="fnSetEmpty(this);" onblur="fnSetZero(this); fnSupplyPrice();" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">공급가</label>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                  <input class="form-control" type="text" id="supplyPrice" value="0" onkeyup="fnCommify(this);" onfocus="fnSetEmpty(this);" onblur="fnSetZero(this);" readonly />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">거래처</label>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                  <input class="form-control" type="text" id="compNm" onkeydown="fnFindCompany(this.value,'','compCd')" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                  <select id="compCd" class="form-control">
                    <option value="">--거래처--</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">창고</label>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                  <input class="form-control" type="text" id="houseNm" onkeydown="fnFindHouseCd(this.value,'','houseCd')" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                  <select id="houseCd" class="form-control">
                    <option value="">--창고--</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label">입/출고</label>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                  <input class="me-5" type="radio" name="inOut" value="in" />입고
                  <input class="me-5" type="radio" name="inOut" value="out" checked="checked" />출고
                </div>
              </div>
              <hr/>
              <div class="cards-button">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <button type="button" class="btn btn-danger btn-sm" onclick="fnDel()">
                    삭제
                  </button>
                  <button type="button" class="btn btn-success btn-sm" onclick="fnReset()">
                    신규
                  </button>
                  <button type="button" class="btn btn-primary btn-sm" onclick="fnSave()">
                    저장
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row 2 -->

    <!-- js -->
    <script src="${rsPath}/scripts/pages/resourceInOut.js"></script>

  </div>
</body>