package com.bedone.wms.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

// -------------------------------------------------------------------------------------------------
public class LoginCheckInterceptor extends HandlerInterceptorAdapter {

  @Override
  public boolean preHandle (
    HttpServletRequest request,
    HttpServletResponse response,
    Object handler
  ) throws Exception {

    HttpSession session = request.getSession(false);
    String ajaxCall = "";
    try {
      ajaxCall = (String) request.getHeader("AJAX");
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
    String userID = (String) session.getAttribute("userID");
    String userConfigID = (String) session.getAttribute("userConfigID");
    if (userID == null && userConfigID == null) {
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
