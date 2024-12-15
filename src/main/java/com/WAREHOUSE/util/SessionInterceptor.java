package com.WAREHOUSE.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

// -------------------------------------------------------------------------------------------------
public class SessionInterceptor extends HandlerInterceptorAdapter {

  // -----------------------------------------------------------------------------------------------
  @Override
  public boolean preHandle (
    HttpServletRequest request,
    HttpServletResponse response,
    Object handler
  ) throws Exception {

    HttpSession session = request.getSession(false);
    String ajaxCall = "";
    String userId = "";
    String userConfigID = "";

    try {
      ajaxCall = String.valueOf(request.getHeader("AJAX"));
    }
    catch(Exception ex) {
      ajaxCall = "";
    }

    if (ajaxCall == null) {
      ajaxCall = "";
    }
    if (session == null) {
      if (ajaxCall.equals("true") == false) {
        response.sendRedirect(request.getContextPath() + "/reLogin");
      }
      else {
      	response.sendError(477);
      }

      return false;
    }

    userId = String.valueOf(session.getAttribute("userId"));
    userConfigID = String.valueOf(session.getAttribute("userConfigID"));

    if (userId == null && userConfigID == null) {
      if (ajaxCall.equals("true") == false) {
        response.sendRedirect(request.getContextPath() + "/reLogin");
      }
      else {
      	response.sendError(477);
      }
      return false;
    }
    return true;
  }
}