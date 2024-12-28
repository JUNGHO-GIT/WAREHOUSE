<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
  <div class="border-1 radius-1 shadow-4 w-min-350px w-max-90vw h-max-500px d-none z-10000" id="popupInOutAll">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <!-- form -->
        <form id="formData1" name="formData1" class="formData1">
          <div class="row">
            <!-- top -->
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-primary border-bottom-dark-1 p-15px drag" id="popTop">
              <div class="d-row-center">
                <div class="fs-1-2rem fw-600 white ml-auto">
                  창고 및 거래처 일괄적용
                </div>
                <div class="fs-1-4rem fw-600 white pointer-red mr-10px ml-auto" onclick="fnPopup('popupInOutAll','off')">
                  x
                </div>
              </div>
            </div>
          </div>
          <!-- body -->
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white p-15px" id="popBody">
            <div class="row mb-3vh">
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
                  <select id="house" class="form-control form-control-sm">
                    <option value="">==창고==</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row mb-3vh">
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
                  <select id="comp" class="form-control form-control-sm">
                    <option value="">==거래처==</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row mt-5vh">
              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="d-row-center">
                  <div class="btn btn-primary btn-xs mr-10px" onclick="fnSaveAll()">
                    저장
                  </div>
                  <div class="btn btn-danger btn-xs" onclick="fnPopup('popupInOutAll','off')">
                    닫기
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>