package com.WAREHOUSE.util;

import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Component
@RequiredArgsConstructor
public class JsonUtil {

  private final ObjectMapper objectMapper = new ObjectMapper()
  .setSerializationInclusion(JsonInclude.Include.NON_NULL)
  .configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false)
  .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

  // -----------------------------------------------------------------------------------------------
  // toJson
  public String toJson(Object obj) throws Exception {
    return objectMapper.writeValueAsString(obj);
  }

  // -----------------------------------------------------------------------------------------------
  // fromJson
  public <T> T fromJson(String json, Class<T> clazz) throws Exception {
    return objectMapper.readValue(json, clazz);
  }
}
