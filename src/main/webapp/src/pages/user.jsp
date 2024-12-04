<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> <%@ taglib
prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="head.jsp" %>
<c:set value="${pageContext.request.contextPath}/resources" var="rsPath" />
<section class="container-fluid">
	<div class="pl-10px pr-10px body container">
		<div class="row mb-n20px mt-15px">
			<form class="form-horizontal m-0px">
				<div class="col-12 col-sm-12 col-lg-7 col-md-7 col-xl-7">
					<div class="row">
						<div class="col-4 col-lg-2 col-md-2 col-sm-2 col-xl-2">
							<p class="control-label">이름 / 아이디</p>
						</div>
						<div class="col-4 col-lg-3 col-md-3 col-sm-3 col-xl-3 mt-2px">
							<input
								id="findUserNm"
								type="text"
								class="form-control"
								onkeydown="fnPressGet01 (event)"
								placeholder="사용자를 입력해주세요."
							/>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-2 col-xl-2 col-2">
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
			<div class="col-12 col-sm-12 col-lg-6 col-md-6 col-xl-6">
				<div class="cards" id="gridView">
					<div class="cards-grid h-98p" id="grid01"></div>
				</div>
			</div>
			<div class="col-12 col-sm-12 col-lg-3 col-md-3 col-xl-3">
				<div class="cards">
					<div class="cards-title">
						<i class="fa fa-list-alt ml-5px mr-5px"></i>
						<span>사용자 정보</span>
					</div>
					<div class="cards-content">
						<div class="row p-10px pl-10px pr-10px">
							<form class="form-horizontal">
								<input id="userIDCheck" type="hidden" value="N" />
								<input id="changeFlag" type="hidden" value="N" />
								<input id="signUpCheck" type="hidden" value="N" />
								<c:if
									test="${sessionScope.userConfigLevel == '01000' || sessionScope.userConfigLevel == '00900'}"
								>
									<div class="form-group">
										<label class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
											<span class="required">≫</span>
											<span>아이디</span>
										</label>
										<div class="col-5 col-lg-5 col-md-5 col-sm-5 col-xl-5">
											<input id="userID" type="text" class="form-control" />
										</div>
										<div class="col-lg-2 col-md-2 col-sm-2 col-xl-2 col-2 d-right ml-15px">
											<button
												class="btn btn-xs pt-2px inlineBtn btn-warning"
												onclick="fnCheckUserID()"
												type="button"
											>
												중복체크
											</button>
										</div>
									</div>
									<div class="form-group">
										<div class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
											<span class="required">≫</span>
											<span>비밀번호</span>
										</div>
										<div class="col-5 col-lg-5 col-md-5 col-sm-5 col-xl-5">
											<input id="passwd" type="password" class="form-control" />
										</div>
										<div class="col-lg-2 col-md-2 col-sm-2 col-xl-2 col-2 d-right ml-15px">
											<button
												class="btn btn-primary btn-xs inlineBtn pt-2px"
												onclick="fnUpdatePw()"
												type="button"
												id="changePw"
											>
												비번변경
											</button>
										</div>
									</div>
								</c:if>
								<c:if
									test="${sessionScope.userConfigLevel != '01000' && sessionScope.userConfigLevel != '00900'}"
								>
									<div class="form-group">
										<label class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
											<span class="required">≫</span>
											<span>아이디</span>
										</label>
										<div class="col-8 col-lg-8 col-md-8 col-sm-8 col-xl-8">
											<input id="userID" type="text" class="form-control" />
										</div>
									</div>
									<div class="form-group">
										<div class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
											<span class="required">≫</span>
											<span>비밀번호</span>
										</div>
										<div class="col-8 col-lg-8 col-md-8 col-sm-8 col-xl-8">
											<input id="passwd" type="password" class="form-control" />
										</div>
									</div>
								</c:if>
								<div class="form-group">
									<label class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
										<span class="required">≫</span>
										<span>이름</span>
									</label>
									<div class="col-8 col-lg-8 col-md-8 col-sm-8 col-xl-8">
										<input id="userNm" type="text" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
										<span>연락처</span>
									</label>
									<div class="col-8 col-lg-8 col-md-8 col-sm-8 col-xl-8">
										<input id="phone" type="text" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
										<span>E-mail</span>
									</label>
									<div class="col-8 col-lg-8 col-md-8 col-sm-8 col-xl-8">
										<input id="email" type="text" class="form-control" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
										<span class="required">≫</span>
										<span>회원등급</span>
									</label>
									<div class="col-8 col-lg-8 col-md-8 col-sm-8 col-xl-8">
										<select class="form-control" id="uLevel">
											<option value="">==회원등급==</option>
										</select>
									</div>
								</div>
								<hr />
								<c:if
									test="${sessionScope.userConfigLevel == '01000' || sessionScope.userConfigLevel == '00900'}"
								>
									<div class="cards-button">
										<div class="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
											<button class="btn btn-sm btn-success" onclick="fnReset()" type="button">
												신규
											</button>
											<button class="btn btn-sm btn-primary" onclick="fnSave()" type="button">
												저장
											</button>
											<button class="btn btn-sm btn-danger" onclick="fnDel()" type="button">
												삭제
											</button>
										</div>
									</div>
								</c:if>
								<c:if
									test="${sessionScope.userConfigLevel != '01000' && sessionScope.userConfigLevel != '00900'}"
								>
									<div class="cards-button">
										<div class="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12"> </div>
									</div>
								</c:if>
								<hr />
								<c:if test="${sessionScope.userConfigID == 'jade'}">
									<div id="fileShow">
										<div class="form-group">
											<label class="col-4 col-lg-4 col-md-4 col-sm-4 col-xl-4 control-label">
												<span>WAR 파일</span>
											</label>
											<form id="fileUpload" name="fileUpload">
												<div class="col-5 col-lg-5 col-md-5 col-sm-5 col-xl-5">
													<input id="tableNm" type="hidden" name="tableNm" />
													<input id="tableKey" type="hidden" name="tableKey" />
													<input id="fileSeq" type="hidden" name="fileSeq" value="0" />
													<input id="fileNm" type="hidden" name="fileNm" />
													<input id="fileUrl" type="hidden" name="fileUrl" />
													<input id="userFile" type="file" class="w-100p mt-3px" name="userFile" />
												</div>
												<div class="col-lg-3 col-md-3 col-xl-3 col-sm-3 col-3 d-right">
													<button
														class="btn btn-xs pt-2px btn-success"
														onclick="fnUploadWarFiles(this.form)"
														type="button"
														id="fileUpBtn"
													>
														업로드
													</button>
												</div>
											</form>
										</div>
									</div>
								</c:if>
								<c:if test="${sessionScope.userConfigID != 'jade'}">
									<div id="fileNotShow"></div>
								</c:if>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-12 col-lg-3 col-md-3 col-xl-3">
				<div class="cards">
					<div class="w-100p float_right panel panel-default">
						<div class="panel-heading">
							<i class="fa fa-list-alt ml-5px mr-5px"></i>
							<span>권한</span>
						</div>
						<div class="panel-body" id="userPerms"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script defer="defer" src="${rsPath}/scripts/pages/user.js"></script>
</section>
