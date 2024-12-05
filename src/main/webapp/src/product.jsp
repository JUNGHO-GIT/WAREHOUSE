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
              <input class="form-control" type="text" id="findProdNm" onKeyDown="fnPressGet01(event)" placeholder="제품명을 입력해주세요." />
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
        <div class="cards" id="contentView">
          <div class="cards-title">
            <i class="fa fa-list-alt mr-1vw"></i>
            <span>제품 상세정보</span>
          </div>
          <div class="cards-content h-70p">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="prodCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>제품명</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="prodNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>분류</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <select id="prodType" class="form-control">
                      <option value="">==분류==</option>
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
                    <span>제조사</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="maker" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <span>단위</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="unit" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <span>사양</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="quality" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <span>재질(색상)</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="option1" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <span>규격(사이즈)</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="option2" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <div class="fs-0-8rem fw-500 red mr-10px">
                ≫
              </div>
                    <span>안전재고</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input
                      class="form-control d-right"
                      type="text"
                      id="protectedQty"
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
                    <span>표준단가</span>
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
                    <span>바코드</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <input class="form-control" type="text" id="barcode" readonly />
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
                <div class="form-group">
                  <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                    <span>이미지</span>
                  </label>
                  <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div class="form-control cards-imageWrapper d-flex" id="showImage"></div>
                  </div>
                </div>
                <div id="fileShow">
                  <div class="form-group">
                    <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label">
                      <span>파일</span>
                    </label>
                    <form id="fileUpload" name="fileUpload">
                      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-6">
                        <input type="hidden" name="tableNm" id="tableNm" value="tblProduct" />
                        <input type="hidden" name="tableKey" id="tableKey" value="0" />
                        <input type="hidden" name="keyColumn" id="keyColumn" value="prodCd" />
                        <input type="hidden" name="fileSeq" id="fileSeq" value="0" />
                        <input type="hidden" name="fileNm" id="fileNm" />
                        <input type="hidden" name="fileUrl" id="fileUrl" />
                        <input type="file" name="userFile" id="userFile" class="w-100p mt-3px" />
                      </div>
                      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 d-right">
                        <button class="btn btn-success btn-xs pt-2px" type="button" id="fileUpBtn"
                        onclick="fnUploadFiles(this.form)">업로드</button>
                      </div>
                    </form>
                  </div>
                  <div class="form-group mt-3px">
                    <label class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></label>
                    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                      <div class="form-control cards-imageWrapper" id="files"></div>
                    </div>
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
  <script defer src="${rsPath}/scripts/pages/product.js"></script>
</body>
