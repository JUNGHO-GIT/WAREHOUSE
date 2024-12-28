<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="urlPath" value="https://cdnjs.cloudflare.com/ajax/libs" />

<script src="${urlPath}/crypto-js/4.2.0/crypto-js.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const encryptedItem = {"loginSession": "false"};
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
    localStorage.setItem("loginSession", encryptedValue);
    window.top.location.href = "login";
  });
</script>