package com.WAREHOUSE.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Component
@RequiredArgsConstructor
public class LogsUtil {

  // -----------------------------------------------------------------------------------------------
  private final ObjectMapper objectMapper = new ObjectMapper();
  private final SimpleDateFormat dateFormat = new SimpleDateFormat(
    "yyyy-MM-dd HH:mm:ss", Locale.KOREA
  );

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
      return message;
    }
  }

  // -----------------------------------------------------------------------------------------------
  private String formatObject(
    Object object
  ) throws Exception {
    try {
      if (object instanceof String) {
        return prettyPrintIfJson(String.valueOf(object));
      }
      else {
        String jsonString = objectMapper.writeValueAsString(object);
        return prettyPrintIfJson(jsonString);
      }
    }
    catch (Exception e) {
      return object != null ? String.valueOf(object) : "null";
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
    String levelStr = "[" + String.valueOf(level) + "]";
    String prefixStr = preFix + " : ";
    String formattedMessage = "";

    try {
      formattedMessage = formatObject(object);
    }
    catch(Exception e) {
      formattedMessage = object != null ? String.valueOf(object) : "null";
    }

    String message = String.format(
      "\n%s\n%s%s\n%s%s",
      divider,
      timeStr, levelStr,
      prefixStr, formattedMessage
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