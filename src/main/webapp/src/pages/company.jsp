<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="head.jsp" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<section class="container-fluid">
  <div class="container body pl-10px pr-10px">

    <div class="row mt-15px mb-n20px">
      <form class="form-horizontal m-0px">
        <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
          <div class="row">
            <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <p class="control-label">거래처 검색</p>
            </div>
            <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-2px">
              <input class="form-control" type="text" id="findCompNm" onKeyDown="fnPressGet01(event)" placeholder="거래처를 입력해주세요." />
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

    <br />

    <div class="row">
      <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
        <div class="cards" id="gridView">
          <div id="grid01" class="cards-grid h-98p"></div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
        <div class="cards" id="contentView">
          <div class="cards-title">
            <i class="fa fa-list-alt ml-5px mr-5px"></i>
            <span>거래처 상세</span>
          </div>
          <div class="cards-content">
            <div class="row p-10px pl-10px pr-10px">
              <form class="form-horizontal">
                <!-- hidden -->
                <input type="hidden" id="compCd" />
                <!-- /.hidden -->
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>거래처 이름</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="compNm" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span class="required">≫</span>
                    <span>사업자 등록번호</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="compNo" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>대표자</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="owner" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>담당자</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="major" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>전화번호</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="phone" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>세금계산서 Email</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="taxEmail" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>주소</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="address" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>업태</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="compType" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>종목</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <input class="form-control" type="text" id="compPart" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>메모</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <textarea class="form-control resize-none" rows="1" id="remarks"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                    <span>로고 이미지</span>
                  </label>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="form-control cards-imageWrapper d-flex" id="showImage"></div>
                  </div>
                </div>
                <div id="fileShow">
                  <div class="form-group">
                    <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control-label">
                      <span>로고 파일</span>
                    </label>
                    <form id="fileUpload" name="fileUpload">
                      <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                        <input type="hidden" name="tableNm" id="tableNm" value="tblCompany" />
                        <input type="hidden" name="tableKey" id="tableKey" value="0" />
                        <input type="hidden" name="keyColumn" id="keyColumn" value="compCd" />
                        <input type="hidden" name="fileSeq" id="fileSeq" value="0" />
                        <input type="hidden" name="fileNm" id="fileNm" />
                        <input type="hidden" name="fileUrl" id="fileUrl" />
                        <input type="file" name="userFile" id="userFile" class="w-100p mt-3px" />
                      </div>
                      <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <button class="btn btn-success btn-xs pt-2px" type="button" id="fileUpBtn"
                        onClick="fnUploadFiles(this.form)">업로드</button>
                      </div>
                    </form>
                  </div>
                  <div class="form-group mt-3px">
                    <label class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"></label>
                    <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                      <div class="form-control cards-imageWrapper" id="files"></div>
                    </div>
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
  <script defer src="${rsPath}/scripts/pages/company.js"></script>
</section>
