package com.WAREHOUSE.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

// -------------------------------------------------------------------------------------------------
public class Logs {

  // -----------------------------------------------------------------------------------------------
  private final SimpleDateFormat dateFormat;
  private final ObjectMapper objectMapper;

  // -----------------------------------------------------------------------------------------------
  public Logs() {
    this.dateFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss", Locale.KOREA);
    this.objectMapper = new ObjectMapper();
  }

  // -----------------------------------------------------------------------------------------------
  public enum LogLevel {
    INFO, WARN, ERROR, DEBUG
  }

  // -----------------------------------------------------------------------------------------------
  private String prettyPrintIfJson(
    String message
  ) throws Exception {
    try {
      JsonNode jsonNode = objectMapper.readTree(message);
      Gson gson = new GsonBuilder().setPrettyPrinting().create();
      return gson.toJson(objectMapper.treeToValue(jsonNode, Object.class));
    }
    catch (Exception e) {
      e.printStackTrace();
      return message;
    }
  }

  // -----------------------------------------------------------------------------------------------
  private String formatObject(
    Object object
  ) throws Exception {
    try {
      if (object instanceof String) {
        return prettyPrintIfJson((String) object);
      }
      // JSON으로 변환 가능한 경우 처리
      else {
        String jsonString = objectMapper.writeValueAsString(object);
        return prettyPrintIfJson(jsonString);
      }
    }
    // JSON 변환 실패 시 기본 toString 사용
    catch (Exception e) {
      return object.toString();
    }
  }

  // -----------------------------------------------------------------------------------------------
  public void log(
    LogLevel level,
    String preFix,
    Object object
  ) throws Exception {

    String divider = String.format("========================================");
    String timeStr = "[" + dateFormat.format(Calendar.getInstance().getTime()) + "]";
    String levelStr = "[" + level.toString() + "]";
    String prefixStr = preFix + " : ";
    String formattedMessage = "";

    try {
      formattedMessage = formatObject(object);
    }
    catch(Exception e) {
      e.printStackTrace();
      formattedMessage = object.toString();
    }

    String message = String.format(
      "%s\n%s%s\n%s%s\n%s\n",
      divider,
      timeStr, levelStr,
      prefixStr, formattedMessage,
      divider
    );

    System.out.println(message);
  }

  // -----------------------------------------------------------------------------------------------
  public void info(
    String preFix,
    Object object
  ) throws Exception {
    log(LogLevel.INFO, preFix, object);
  }

  // -----------------------------------------------------------------------------------------------
  public void warn(
    String preFix,
    Object object
  ) throws Exception {
    log(LogLevel.WARN, preFix, object);
  }

  // -----------------------------------------------------------------------------------------------
  public void error(
    String preFix,
    Object object
  ) throws Exception {
    log(LogLevel.ERROR, preFix, object);
  }

  // -----------------------------------------------------------------------------------------------
  public void debug(
    String preFix,
    Object object
  ) throws Exception {
    log(LogLevel.DEBUG, preFix, object);
  }

}