<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> <%@ taglib
prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="./layouts/header.jsp" %>
<c:set value="${pageContext.request.contextPath}/resources" var="rsPath" />
<section class="container-fluid">
	<div class="pl-10px pr-10px body container">
		<div class="row mb-n20px mt-15px">
			<form class="form-horizontal m-0px">
				<div class="col-xs-12 col-sm-12 col-lg-7 col-md-7">
					<div class="row">
						<div class="col-xs-4 col-lg-2 col-md-2 col-sm-2">
							<p class="control-label">기간별 조회</p>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-2 col-2 mt-2px">
							<input
								class="form-control"
								id="findStartDt"
								type="text"
								onkeydown="fnPressGet01 (event)"
							/>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-2 col-2 mt-2px">
							<input
								class="form-control"
								id="findEndDt"
								type="text"
								onkeydown="fnPressGet01(event)"
							/>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-2 col-2">
							<button
								class="btn btn-sm btn-primary pointer"
								onclick="fnPressGet01(event)"
								type="button"
							>
								조회
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
		<br />
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-lg-7 col-md-7">
				<div class="cards" id="gridView">
					<div class="cards-grid h-98p" id="grid01"></div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-lg-5 col-md-5">
				<div class="cards" id="gridView">
					<div class="w-100p" id="grid02"></div>
					<hr />
					<div class="cards-title">
						<i class="fa fa-list-alt mr-1vw"></i>
						<span>제품 출하 상세정보</span>
					</div>
					<div class="cards-content">
						<div class="row p-10px pl-10px pr-10px">
							<form class="form-horizontal">
								<div class="form-group">
									<label class="col-xs-4 col-lg-4 col-md-4 col-sm-4 control-label">
										<div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
										<span>거래처</span>
									</label>
									<div class="col-xs-3 col-lg-3 col-md-3 col-sm-3">
										<input
											class="form-control"
											id="compNm"
											type="text"
											onkeydown="fnFindCd(this.value,'','comp',event)"
										/>
									</div>
									<div class="col-lg-5 col-md-5 col-5 col-sm-5">
										<select class="form-control" id="comp">
											<option value="">==거래처==</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-xs-4 col-lg-4 col-md-4 col-sm-4 control-label">
										<div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
										<span>거래처 담당자</span>
									</label>
									<div class="col-xs-8 col-lg-8 col-md-8 col-sm-8">
										<input class="form-control" id="toMajor" type="text" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-xs-4 col-lg-4 col-md-4 col-sm-4 control-label">
										<div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
										<span>담당자 번호</span>
									</label>
									<div class="col-xs-8 col-lg-8 col-md-8 col-sm-8">
										<input class="form-control" id="toPhone" type="text" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-xs-4 col-lg-4 col-md-4 col-sm-4 control-label">
										<div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
										<span>출하일</span>
									</label>
									<div class="col-xs-8 col-lg-8 col-md-8 col-sm-8">
										<input class="form-control" id="shipDt" type="text" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-xs-4 col-lg-4 col-md-4 col-sm-4 control-label">
										<div class="fs-0-8rem fw-500 red mr-3px">
                ≫
              </div>
										<span>출하담당자</span>
									</label>
									<div class="col-xs-8 col-lg-8 col-md-8 col-sm-8">
										<input class="form-control" id="shipMajor" type="text" />
									</div>
								</div>
								<hr />
								<div class="cards-button">
									<div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
										<button class="btn btn-sm btn-success" onclick="fnReset()" type="button">
											신규
										</button>
										<button class="btn btn-sm btn-primary" onclick="fnSaveItems()" type="button">
											출하 등록
										</button>
										<button class="btn btn-sm btn-danger" onclick="fnSavePlan()" type="button">
											출하 계획 등록
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

    <!-- js -->
    <div class="h-5vh"></div>
    <script defer src="${rsPath}/scripts/pages/shipping.js"></script>

  </div>
</body>
