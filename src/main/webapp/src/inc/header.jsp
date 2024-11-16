<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page session="true" %>

<head>
  <title>::: WMS :::</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <!-- css -->
  <link rel="stylesheet" href="/inc/vendors/bootstrap/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/inc/vendors/font-awesome/css/font-awesome.min.css" />
  <link rel="stylesheet" href="/inc/vendors/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css" />
  <link rel="stylesheet" href="/inc/css/jstyle.css" />
  <link rel="stylesheet" href="/inc/build/css/custom.css" />
  <link rel="stylesheet" href="/inc/js/pqgrid24/jquery-ui.css" />
  <link rel="stylesheet" href="/inc/js/pqgrid24/pqgrid.min.css" />
  <link rel="stylesheet" href="/inc/js/pqgrid24/pqgrid.ui.min.css" />
  <link rel="stylesheet" href="/inc/js/pqgrid24/pqgrid.css" />
  <!--  js -->
  <script src="/inc/vendors/jquery/dist/jquery.min.js"></script>
  <script src="/inc/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="/inc/js/pqgrid24/jquery-ui.min.js"></script>
  <script src="/inc/js/pqgrid24/pqgrid.min.js"></script>
  <script src="/inc/js/export/jszip.js"></script>
  <script src="/inc/js/export/FileSaver.js"></script>
  <script src="/inc/js/export/myexcel.js"></script>
  <!-- js -->
  <script defer src="/inc/js/page/demo.js"></script>
  <script defer src="/inc/js/page/jstyle.js"></script>
  <!-- 리로그인 관련 -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
  <!-- 태블릿 및 모바일 에서 jquery-ui 스크롤바 터치 안되는 부분 수정 관련 -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sortablejs/1.6.1/jquery-sortable.js"></script>

  <!-- css -->
  <style>
    .cards {
      background-color: #ffffff !important;
      border-radius: 2px !important;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1) !important;
      margin: 10px -5px 10px -5px !important;
      padding: 10px 10px 0px 10px !important;
      width: 100% !important;
      height: 88%;
      overflow: auto !important;
    }
    .cards-title {
      display: flex;
      justify-content: flex-start !important;
      align-items: center !important;
      text-align: left !important;
      font-weight: 600 !important;
      font-size: 14px !important;
      margin-bottom: 10px !important;
    }
    .cards-grid {
      width: 100% !important;
      border-top: 2px solid #a8c4dc !important;
      border-bottom: 1px solid #a8c4dc !important;
    }
    .cards-content {
      padding: 0px 5px 6px 0px !important;
      position: relative !important;
      width: 100% !important;
      height: fit-content !important;
      float: left !important;
      clear: both !important;
    }
    .cards-imageWrapper {
      width: 100% !important;
      height: 50px !important;
      overflow: auto !important;
    }
    .cards-image {
      border-radius: 3% !important;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2) !important;
    }
    .cards-gridImage {
      width: 50px !important;
      height: 50px !important;
      border-radius:10% !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    }
    .cards-emptyImage {
      width: 0px !important;
      height: 0px !important;
      border-radius: 0% !important;
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0) !important;
    }
    .cards-button {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      text-align: center !important;
      margin-bottom: 10px !important;
    }
    .cards-tab {
      color: #5A738E !important;
      padding: 7px 45px 7px 45px !important;
      border: 1px solid #d1d1d1 !important;
      border-bottom: 0 !important;
      border-radius: 0 !important;
      text-align: center !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      margin: 0px 5px 0px 0px !important;
      box-shadow: none !important;
    }
    .cards-tab:hover, .cards-tab.active {
      background-color: #ffffff !important;
    }
    .logo-image {
      width: 100% !important;
      height: 100% !important;
      padding: 5px !important;
    }
    .hr {
      border-style:dashed !important;
      border-color:darkgrey !important;
    }
    .inlineBtn {
      width: 60px !important;
      height: 23px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
    }
    .delBtn {
      width:17px !important;
      margin: 0px !important;
      padding: 0px !important;
      color: #d9534f !important;
      font-weight: 800 !important;
      background-color: #ffffff !important;
    }
    .chkBtn {
      width:17px !important;
      margin: 0px !important;
      padding: 0px !important;
      color: #428bca !important;
      font-weight: 800 !important;
      background-color: #ffffff !important;
    }
    .headBtn {
      font-size: 27px !important;
      font-weight: 500 !important;
      margin-right: 25px !important;
      cursor: pointer !important;
    }
    .insertBtn {
      width:17px !important;
      margin: 0px !important;
      padding: 0px !important;
      color: #428bca !important;
      font-weight: 800 !important;
      background-color: #ffffff !important;
    }
    .d-center {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      text-align: center !important;
    }
    .d-left {
      display: flex !important;
      justify-content: flex-start !important;
      align-items: center !important;
      text-align: left !important;
    }
    .d-right {
      display: flex !important;
      justify-content: flex-end !important;
      align-items: center !important;
      text-align: right !important;
    }
    .d-none {
      display: none !important;
    }
    .d-flex {
      display: flex !important;
    }
    .d-inline {
      display: inline-block !important;
    }
    .over-hidden {
      overflow: hidden !important;
    }
    .over-auto {
      overflow: auto !important;
    }
    .pointer {
      cursor: pointer !important;
    }
    .resize-none {
      resize: none !important;
    }
    .webkit-fill {
      width: -webkit-fill-available !important;
      height: -webkit-fill-available !important;
    }
    .control-label {
      padding-top: 7px !important;
      margin-bottom: 0 !important;
      text-align: right !important;
    }
    .form-control, .control-label {
      font-weight: 600 !important;
      max-height: 35px !important;
    }
    .red {
      color: #ff0000 !important;
      font-size: max(12px, 1rem) !important;
    }
  </style>
  <!-- zTree -->
  <style>
    .ztree li span.button {
      transform: scale(1.5) !important;
      transform-origin: center !important;
      border-radius: 1% !important;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0) !important;
    }
    .ztree li span {
      line-height: 16px !important;
      margin: 0px 0px 7px 7px !important;
      font-weight: 600 !important;
    }
    .ztree li a {
      margin-top: 10px !important;
      font-weight: 600 !important;
    }
    .ztree li a:hover {
      color: #428bca !important;
      font-weight: 700 !important;
    }
    .ztree li span.button.switch {
      margin-top: 10px !important;
      font-weight: 600 !important;
    }
  </style>
  <!-- sum footer -->
  <style>
    .pq-grid-summary, .summary-row {
      background-color: #dae6f0 !important;
    }
    .summary-row .pq-grid-number-cell {
      background-color: #dae6f0 !important;
      border-right: none !important;
    }
  </style>

</head>
