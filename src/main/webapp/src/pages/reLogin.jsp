<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    var encryptedItem = {"loginSession": "false"};
    var encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(encryptedItem), "loginSession");
    localStorage.setItem("loginSession", encryptedValue);
    window.top.location.href = "login";
  });
</script>