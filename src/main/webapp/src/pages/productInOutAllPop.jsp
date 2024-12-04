<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!------------------------------------------------------------------------------------------------->
<section class="container-fluid">
  <div class="container body">
    <div class="popup" id="popupInOutAll" style="visibility:hidden; width:600px;">
      <div class="x_title bg-primary" id="popTop" onClick="fnLayerTop('popupInOutAll')">
        <h4>창고 및 거래처 일괄적용</h4>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a href="javascript:fnGridPopup('popupInOutAll','off')">
              <i class="fa fa-close"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="x_content bs-example-popovers bg-white" id="popBody">
        <div class="row mt-10px">
          <div class="form-horizontal">
            <label class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 control-label">
              <span class="required">≫</span>
              <span>창고</span>
            </label>
            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-2px">
              <input
                class="form-control"
                type="text"
                id="houseNm"
                placeholder="검색"
                onKeyDown="fnFindCd(this.value,'','house',event)"
              />
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-2px">
              <select id="house" class="form-control">
                <option value="">==창고==</option>
              </select>
            </div>
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="form-horizontal">
            <label class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 control-label">
              <span class="required">≫</span>
              <span>거래처</span>
            </label>
            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-2px">
              <input
                class="form-control"
                type="text"
                id="compNm"
                placeholder="검색"
                onKeyDown="fnFindCd(this.value,'','comp',event)"
              />
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-2px">
              <select id="comp" class="form-control">
                <option value="">==거래처==</option>
              </select>
            </div>
          </div>
        </div>
        <hr/>
        <div class="row">
          <div class="cards-button">
            <button type="button" class="btn btn-primary btn-sm mr-10px" onClick="fnSaveAll()">저장</button>
            <button type="button" class="btn btn-danger btn-sm mr-10px" onClick="fnGridPopup('popupInOutAll','off')">닫기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
