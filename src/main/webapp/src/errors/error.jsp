<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.contextPath}/resources" var="rsPath" />

<html lang="en">
	<head>
		<title>404 Error</title>
		<meta charset="UTF-8" />
		<meta content="EditPlus®" name="Generator" />
		<meta content="" name="Author" />
		<meta content="" name="Keywords" />
		<meta content="" name="Description" />
		<link href="./error.css" rel="stylesheet" />
	</head>
	<body>
		<div class="noise"></div>
		<div class="overlay"></div>
		<div class="terminal">
			<h1>Error <span class="errorcode">404</span></h1>
			<p class="output">
				The page you are looking for might have been removed, had its name changed or is temporarily
				unavailable.
			</p>
			<p class="output">
				Please try to <a href="#1">go back</a> or <a href="#2">return to the homepage</a>.
			</p>
			<p class="output">Good luck.</p>
		</div>
	</body>
</html>
