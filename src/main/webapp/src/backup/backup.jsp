
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        이미지
                      </div>
                    </div>
                  </div>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="d-row-left mr-10px">
                      <div class="form-control cards-imageWrapper d-flex" id="showImage"></div>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label" id="fileShow">
                      <div class="fs-0-7rem fw-600 light-black">
                        파일
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-center">
                    <div class="d-row-left mr-10px">
                      <input
                        type="file"
                        id="userFile"
                        name="userFile"
                        class="d-none"
                      />
                      <div
                        for="userFile"
                        id="fileLabel"
                        name="fileLabel"
                        class="fs-0-7rem fw-600 pointer-navy"
                      >
                        파일선택
                      </div>
                    </div>
                  </div>
                  <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="d-row-left">
                      <div
                        id="fileUpBtn"
                        class="btn btn-success btn-xs"
                        onclick="fnUploadFiles(this.form)"
                      >
                        업로드
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-1vh">
                  <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div class="d-row-right detail-label">
                      <div class="fs-0-7rem fw-600 light-black">
                        파일목록
                      </div>
                    </div>
                  </div>
                  <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div class="d-row-left mr-10px">
                      <div class="form-control cards-imageWrapper" id="files"></div>
                    </div>
                  </div>
                </div>