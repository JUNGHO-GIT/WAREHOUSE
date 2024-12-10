<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="urlPath" value="https://cdnjs.cloudflare.com/ajax/libs" />

<head>
  <title>WAREHOUSE</title>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="WAREHOUSE"/>
  <meta name="keywords" content="WAREHOUSE"/>
  <meta name="author" content="WAREHOUSE"/>

  <!-- favicon -->
  <link
    rel="icon"
    type="image/x-icon"
    href="${rsPath}/images/favicon.ico"
  />
  <link
    rel="shortcut icon"
    type="image/x-icon"
    href="${rsPath}/images/favicon.ico"
  />

  <!-- preconnect -->
  <link
    rel="preconnect"
    href="https://cdnjs.cloudflare.com"
    crossorigin
  />
  <link
    rel="preconnect"
    href="https://storage.googleapis.com"
    crossorigin
  />
  <link
    rel="preconnect"
    href="https://jungho-git.github.io"
    crossorigin
  />

  <!-- css 1 -->
  <link rel="stylesheet" href="${urlPath}/bootstrap/4.6.2/css/bootstrap.min.css" />
  <link rel="stylesheet" href="${urlPath}/font-awesome/4.7.0/css/font-awesome.css" />
  <link rel="stylesheet" href="${urlPath}/jqueryui/1.14.1/themes/base/jquery-ui.min.css" />
  <link rel="stylesheet" href="${urlPath}/bootstrap-datepicker/1.10.0/css/bootstrap-datepicker.min.css" />

  <!-- css 2 -->
  <link rel="stylesheet" href="${rsPath}/styles/libs/jquery-pqgrid.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/libs/jquery-pqgrid.ui.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/libs/jquery-pqgrid.css" />
  <link rel="stylesheet" href="${rsPath}/styles/commons/main.css" />

  <!-- js 1 -->
  <script src="${urlPath}/jquery/3.7.1/jquery.min.js"></script>
  <script defer src="${urlPath}/jqueryui/1.14.1/jquery-ui.min.js"></script>
  <script defer src="${urlPath}/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
  <script defer src="${urlPath}/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
  <script defer src="${urlPath}/bootstrap/4.6.2/js/bootstrap.bundle.min.js"></script>
  <script defer src="${urlPath}/bootstrap-datepicker/1.10.0/js/bootstrap-datepicker.min.js"></script>
  <script defer src="${urlPath}/moment.js/2.30.1/moment.min.js"></script>
  <script defer src="${urlPath}/crypto-js/4.2.0/crypto-js.min.js"></script>

  <!-- js 2 -->
  <script defer src="${rsPath}/scripts/libs/jquery-pqgrid.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/json2xls.js"></script>
  <script defer src="${rsPath}/scripts/commons/common.js"></script>
  <script defer src="${rsPath}/scripts/commons/dom.js"></script>
  <script defer src="${rsPath}/scripts/commons/init.js"></script>
  <script defer src="${rsPath}/scripts/commons/files.js"></script>
  <script defer src="${rsPath}/scripts/commons/grid.js"></script>
  <script defer src="${rsPath}/scripts/commons/script.js"></script>

  <!-- cdn -->
  <link
    rel="stylesheet"
    href="https://jungho-git.github.io/JCDN/fonts/PretendardVariable.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="https://jungho-git.github.io/JCDN/styles/Reset.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="https://jungho-git.github.io/JCDN/styles/Init.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="https://jungho-git.github.io/JCDN/styles/Jstyle.min.css"
    crossorigin
  />

  <!-- custom -->
  <style>
    ::-webkit-scrollbar {
      display: block !important;
      width: 10 !important;
      height: 5 !important;
      background-color: #f5f5f5 !important;
    }
    .d-none {
      display: none !important;
    }
  </style>
  <script>
    const xs = window.matchMedia("(min-width: 0px) and (max-width: 576px)");
    const sm = window.matchMedia("(min-width: 577px) and (max-width: 768px)");
    const md = window.matchMedia("(min-width: 769px) and (max-width: 992px)");
    const lg = window.matchMedia("(min-width: 993px) and (max-width: 1200px)");
    const xl = window.matchMedia("(min-width: 1201px) and (max-width: 10000px)");
  </script>
</head>