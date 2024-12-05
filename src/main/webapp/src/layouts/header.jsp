<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page session="true" %>
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
  <link rel="stylesheet" href="${rsPath}/styles/bootstrap.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/bootstrap-datepicker.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/font-awesome.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/jquery-ui.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/jquery-pqgrid.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/jquery-pqgrid.ui.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/jquery-pqgrid.css" />
  <link rel="stylesheet" href="${rsPath}/styles/custom.css" />
  <link rel="stylesheet" href="${rsPath}/styles/common.css" />

  <!-- js 1 -->
  <script src="${rsPath}/scripts/utils/jquery.min.js"></script>
  <script defer src="${rsPath}/scripts/utils/jquery-ui.min.js"></script>
  <script defer src="${rsPath}/scripts/utils/jquery-punch.min.js"></script>
  <script defer src="${rsPath}/scripts/utils/jquery-pqgrid.min.js"></script>
  <script defer src="${rsPath}/scripts/utils/moment.min.js"></script>
  <script defer src="${rsPath}/scripts/utils/bootstrap.min.js"></script>
  <script defer src="${rsPath}/scripts/utils/bootstrap-datepicker.min.js"></script>
  <script defer src="${rsPath}/scripts/utils/crypto.min.js"></script>
  <script defer src="${rsPath}/scripts/utils/script.js"></script>
  <script defer src="${rsPath}/scripts/utils/common.js"></script>
  <script defer src="${rsPath}/scripts/utils/init.js"></script>

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