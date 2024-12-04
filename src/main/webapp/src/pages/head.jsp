<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
    href="https://storage.googleapis.com"
    crossorigin
  />
  <link
    rel="preconnect"
    href="https://cdnjs.cloudflare.com"
    crossorigin
  />

  <!-- css 1 -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="${rsPath}/styles/pqgrid24/pqgrid.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="${rsPath}/styles/pqgrid24/pqgrid.ui.min.css"
    crossorigin
  />
  <link
    rel="stylesheet"
    href="${rsPath}/styles/pqgrid24/pqgrid.css"
    crossorigin
  />

  <!-- js 1 -->
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
    crossorigin
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"
    defer
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sortablejs/1.6.1/jquery-sortable.js"
    defer
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"
    defer
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.bundle.min.js"
    defer
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"
    defer
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"
    defer
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
    defer
  ></script>

  <!-- script -->
  <script
    src="${rsPath}/scripts/pqgrid24/pqgrid.min.js"
    defer
  ></script>
  <script
    src="${rsPath}/scripts/export/fileSaver.js"
    defer
  ></script>
  <script
    src="${rsPath}/scripts/export/myExcel.js"
    defer
  ></script>
  <script
    src="${rsPath}/scripts/pages/files.js"
    defer
  ></script>
  <script
    src="${rsPath}/scripts/pages/common.js"
    defer
  ></script>

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
    href="${rsPath}/styles/main.css"
  />
</head>