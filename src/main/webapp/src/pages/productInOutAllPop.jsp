<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<div
  id="popupInOutAll"
  class="border-1 radius-1 shadow-4 w-max-700px h-max-500px d-none z-10000"
  style="position: fixed; top: 40vh; left: 30vw"
>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <!-- form -->
      <form id="formData1" name="formData1" class="formData1">
        <!-- top -->
        <div class="row bg-primary border-bottom-dark-1 p-15px drag" id="popTop">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-center">
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
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="row">
              <div class="d-row-center mb-3vh">
                <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="d-row-left mr-10px">
                    <div class="fs-0-7rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-7rem fw-600 light-black">
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
                <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <div class="d-row-left mr-10px">
                    <select id="house" class="form-control form-control-sm">
                      <option value="">==창고==</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-row-center mb-3vh">
                <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <div class="d-row-left mr-10px">
                    <div class="fs-0-7rem fw-500 red mr-3px">
                      ≫
                    </div>
                    <div class="fs-0-7rem fw-600 light-black">
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
                <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <div class="d-row-left mr-10px">
                    <select id="comp" class="form-control form-control-sm">
                      <option value="">==거래처==</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-row-center mt-2vh">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-center">
                  <button
                    type="button"
                    class="btn btn-primary btn-xs mr-10px"
                    onclick="fnSaveAll()"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-xs"
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