<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />
<c:set var="imgPath" value="${pageContext.request.contextPath}/images" />

<!-- head -->
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

  <!-- pre -->
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
    crossorigin
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
  />
  <link
    rel="preconnect"
    href="https://storage.googleapis.com"
    crossorigin
  />
  <link
    rel="preconnect"
    href="https://cdnjs.cloudflare.com"
    crossorigin
  />

  <!-- css -->
  <link rel="stylesheet" href="${rsPath}/styles/bootstrap/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/font-awesome/css/font-awesome.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css" />
  <link rel="stylesheet" href="${rsPath}/styles/pqgrid24/jquery-ui.css" />
  <link rel="stylesheet" href="${rsPath}/styles/pqgrid24/pqgrid.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/pqgrid24/pqgrid.ui.min.css" />
  <link rel="stylesheet" href="${rsPath}/styles/pqgrid24/pqgrid.css" />

  <!--  js -->
  <script src="${rsPath}/scripts/jquery/dist/jquery.min.js"></script>
  <script src="${rsPath}/scripts/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="${rsPath}/scripts/pqgrid24/jquery-ui.min.js"></script>
  <script src="${rsPath}/scripts/pqgrid24/pqgrid.min.js"></script>
  <script src="${rsPath}/scripts/export/fileSaver.js"></script>
  <script src="${rsPath}/scripts/export/myExcel.js"></script>
  <script src="${rsPath}/scripts/pages/main.js"></script>
  <script src="${rsPath}/scripts/pages/main2.js"></script>

  <!-- style -->
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
  <link
    rel="stylesheet"
    href="${rsPath}/styles/custom.css"
  />
  <link
    rel="stylesheet"
    href="${rsPath}/styles/main.css"
  />

  <!-- script -->
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
    defer
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"
    defer
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sortablejs/1.6.1/jquery-sortable.js"
    defer
  ></script>
</head>