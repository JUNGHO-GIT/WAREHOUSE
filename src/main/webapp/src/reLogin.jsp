<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="true" %>
<c:set var="rsPath" value="${pageContext.request.contextPath}/resources" />

<script src="${rsPath}/scripts/libs/crypto.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const encryptedItem = {"loginSession": "false"};
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
    localStorage.setItem("loginSession", encryptedValue);
    window.top.location.href = "login";
  });
</script>