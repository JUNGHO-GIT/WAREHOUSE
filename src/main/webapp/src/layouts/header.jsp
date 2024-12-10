<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<head>
  <title>::: WMS :::</title>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="WMS"/>
  <meta name="keywords" content="WMS"/>
  <meta name="author" content="WMS"/>

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

  <!-- css 1 -->
  <link rel="stylesheet" href="${rsPath}/styles/libs/bootstrap.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/libs/bootstrap-datepicker.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/libs/font-awesome.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/libs/jquery-ui.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/libs/jquery-pqgrid.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/libs/jquery-pqgrid.ui.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/libs/jquery-pqgrid.css" />
  <link rel="stylesheet" href="${rsPath}/styles/commons/custom.css" />
  <link rel="stylesheet" href="${rsPath}/styles/commons/common.css" />

  <!-- js 1 -->
  <script src="${rsPath}/scripts/libs/jquery.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/jquery-ui.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/jquery-cookie.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/jquery-punch.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/jquery-pqgrid.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/moment.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/bootstrap.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/bootstrap-datepicker.min.js"></script>
  <script defer src="${rsPath}/scripts/libs/crypto.min.js"></script>
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

  <!-- css 2 -->
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
</head>