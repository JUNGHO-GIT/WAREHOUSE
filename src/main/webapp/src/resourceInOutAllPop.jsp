<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<div class="border-1 radius-1 shadow-4 d-none w-max-600px popup" id="popupInOutAll">
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <!-- form -->
      <form id="formData1" name="formData1" class="formData1">
        <!-- top -->
        <div class="row bg-primary border-bottom-dark-1 p-15px" id="popTop">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center" onclick="fnLayerTop('popupInOutAll')">
            <div class="fs-1-2rem fw-600 white ml-auto">
              창고 및 거래처 일괄적용
            </div>
            <div class="fs-1-4rem fw-600 white pointer-red mr-10px ml-auto"
              onclick="fnGridPopup('popupInOutAll', 'off')"
            >
              x
            </div>
          </div>
        </div>
        <!-- body -->
        <div class="row bg-white p-25px" id="popBody">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="row">
              <div class="d-row-center mb-3vh">
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
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
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
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div class="d-row-left mr-2vw">
                    <select id="house" class="form-control">
                      <option value="">==창고==</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-row-center mb-3vh">
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
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
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
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div class="d-row-left mr-2vw">
                    <select id="comp" class="form-control">
                      <option value="">==거래처==</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-row-center mt-3vh">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-center">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm mr-10px"
                    onclick="fnSaveAll()"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onclick="fnGridPopup('popupInOutAll', 'off')"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>