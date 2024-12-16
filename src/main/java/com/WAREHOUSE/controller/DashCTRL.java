package com.WAREHOUSE.controller;

import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.dao.DashDAO;
import com.WAREHOUSE.util.JsonUtil;
import com.WAREHOUSE.util.LogsUtil;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class DashCTRL {

  private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
  private final NumberFormat formatter = NumberFormat.getInstance(Locale.KOREA);
  private final DashDAO dao;
  private final LogsUtil logs;
  private final JsonUtil json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/dash", produces="text/plain;charset=UTF-8")
  public ModelAndView dash () throws Exception {
    try {
      return new ModelAndView("dash");
    }
    catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // -----------------------------------------------------------------------------------------------
  private HashMap<String, Object> getRelatedDate() throws ParseException {
    // 한국 시간대 설정
    TimeZone koreaTimeZone = TimeZone.getTimeZone("Asia/Seoul");
    simpleDateFormat.setTimeZone(koreaTimeZone);

    // 오늘 날짜 - 한국 시간대
    Calendar todayCal = Calendar.getInstance(koreaTimeZone);

    // 어제 날짜 - 한국 시간대
    Calendar yesterdayCal = Calendar.getInstance(koreaTimeZone);
    yesterdayCal.add(Calendar.DATE, -1);

    // 일주일 전 날짜 - 한국 시간대
    Calendar weekAgoCal = Calendar.getInstance(koreaTimeZone);
    weekAgoCal.add(Calendar.DATE, -6);

    // 오늘 기준 이번주 시작 날짜 - 한국 시간대
    Calendar thisWeekStartCal = Calendar.getInstance(koreaTimeZone);
    thisWeekStartCal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
    thisWeekStartCal.add(Calendar.WEEK_OF_YEAR, 0);

    // 오늘 기준 이번주 마지막 날짜 - 한국 시간대
    Calendar thisWeekEndCal = Calendar.getInstance(koreaTimeZone);
    thisWeekEndCal.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
    thisWeekEndCal.add(Calendar.WEEK_OF_YEAR, 0);

    // 지난주 시작 날짜 - 한국 시간대
    Calendar lastWeekStartCal = Calendar.getInstance(koreaTimeZone);
    lastWeekStartCal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
    lastWeekStartCal.add(Calendar.WEEK_OF_YEAR, -1);

    // 지난주 마지막 날짜 - 한국 시간대
    Calendar lastWeekEndCal = Calendar.getInstance(koreaTimeZone);
    lastWeekEndCal.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
    lastWeekEndCal.add(Calendar.WEEK_OF_YEAR, -1);

    // 결과 맵 생성 및 반환
    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("todayDt", simpleDateFormat.format(todayCal.getTime()));
    resultMap.put("yesterdayDt", simpleDateFormat.format(yesterdayCal.getTime()));
    resultMap.put("weekAgoDt", simpleDateFormat.format(weekAgoCal.getTime()));
    resultMap.put("thisWeekStartDt", simpleDateFormat.format(thisWeekStartCal.getTime()));
    resultMap.put("thisWeekEndDt", simpleDateFormat.format(thisWeekEndCal.getTime()));
    resultMap.put("lastWeekStartDt", simpleDateFormat.format(lastWeekStartCal.getTime()));
    resultMap.put("lastWeekEndDt", simpleDateFormat.format(lastWeekEndCal.getTime()));

    return resultMap;
  }

  // -----------------------------------------------------------------------------------------------
  private HashMap<String, Object> calcPercent (
    String mainQtyParam,
    String targetQtyParam
  ) throws Exception {

    HashMap<String, Object> percentMap = new HashMap<>();

    Integer mainQty = 0;
    if (mainQtyParam != null && !mainQtyParam.equals("")) {
      if (mainQtyParam.indexOf(",") != -1) {
        mainQty = Integer.parseInt(mainQtyParam.replaceAll(",", ""));
      }
      else {
        mainQty = Integer.parseInt(mainQtyParam);
      }
    }
    else {
      mainQty = 0;
    }

    Integer targetQty = 0;
    if (targetQtyParam != null && !targetQtyParam.equals("")) {
      if (targetQtyParam.indexOf(",") != -1) {
        targetQty = Integer.parseInt(targetQtyParam.replaceAll(",", ""));
      }
      else {
        targetQty = Integer.parseInt(targetQtyParam);
      }
    }
    else {
      targetQty = 0;
    }

    Integer percent = 0;
    Integer count = mainQty - targetQty;

    String sign = count >= 0 ? "+" : "-";
    String color = "text-danger";

    if (mainQty == 0 && targetQty == 0) {
      percent = 0;
      count = 0;
      sign = "-";
      color = "text-theme";
    }
    else if (mainQty == 0) {
      percent = 0;
      count = -targetQty;
      sign = "-";
      color = "text-theme";
    }
    else if (targetQty == 0) {
      percent = 0;
      count = mainQty;
      sign = "+";
    }
    else {
      percent = (int) (((double) count / targetQty) * 100);
    }

    percentMap.put("percent", percent);
    percentMap.put("count", count);
    percentMap.put("sign", sign);
    percentMap.put("color", color);
    percentMap.put("inOutColor", "text-theme");
    percentMap.put("inOutSign", "+");

    return percentMap;
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/dash", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> dash (
    @RequestParam(value="key", required=false) String key,
    @RequestParam(value="inOut", required=false) String inOut,
    @RequestParam(value="plan", required=false) String plan,
    @RequestParam(value="date", required=false) String date
  ) throws Exception {

    try {
      // 날짜 데이터
      HashMap<String, Object> dateMap = getRelatedDate();
      String todayDt = String.valueOf(dateMap.get("todayDt"));
      String yesterdayDt = String.valueOf(dateMap.get("yesterdayDt"));
      String thisWeekStartDt = String.valueOf(dateMap.get("thisWeekStartDt"));
      String thisWeekEndDt = String.valueOf(dateMap.get("thisWeekEndDt"));
      String lastWeekStartDt = String.valueOf(dateMap.get("lastWeekStartDt"));
      String lastWeekEndDt = String.valueOf(dateMap.get("lastWeekEndDt"));

      // 파라미터 데이터
      HashMap<String, Object> paramMap = new HashMap<>();
      paramMap.put("key", key);
      paramMap.put("keyUp", Character.toUpperCase(key.charAt(0)) + key.substring(1));
      paramMap.put("keyCd", (key + "Cd"));
      paramMap.put("keyNm", (key + "Nm"));
      paramMap.put("inOut", inOut);
      paramMap.put("plan", plan);
      paramMap.put("date", date);
      paramMap.put("tableNm", ("tblProductInOut"));
      paramMap.put("planYn", (plan != null && !plan.isEmpty()) ? "Y" : "N");
      paramMap.put("sign", (inOut.equals("In")) ? ">" : "<");

      // list 데이터
      ArrayList<HashMap<String, Object>> todayList = new ArrayList<>();
      ArrayList<HashMap<String, Object>> yesterdayList = new ArrayList<>();
      ArrayList<HashMap<String, Object>> thisWeekList = new ArrayList<>();
      ArrayList<HashMap<String, Object>> lastWeekList = new ArrayList<>();

      if (key.equals("ship")) {
        todayList = dao.getShipData(paramMap, todayDt, todayDt);
        yesterdayList = dao.getShipData(paramMap, yesterdayDt, yesterdayDt);
        thisWeekList = dao.getShipData(paramMap, thisWeekStartDt, thisWeekEndDt);
        lastWeekList = dao.getShipData(paramMap, lastWeekStartDt, lastWeekEndDt);
      }
      else {
        todayList = dao.getInOutData(paramMap, todayDt, todayDt);
        yesterdayList = dao.getInOutData(paramMap, yesterdayDt, yesterdayDt);
        thisWeekList = dao.getInOutData(paramMap, thisWeekStartDt, thisWeekEndDt);
        lastWeekList = dao.getInOutData(paramMap, lastWeekStartDt, lastWeekEndDt);
      }

      for (
        ArrayList<HashMap<String, Object>> list :
        List.of(todayList, yesterdayList, thisWeekList, lastWeekList)
      ) {
        if (list != null) {
          list.removeIf(item -> item.get(paramMap.get("keyCd")) == null);
          for (HashMap<String, Object> map : list) {
            Object qtyObj = map.get("totalQty");
            String qtyResult = qtyObj != null ? (
              formatter.format(Integer.parseInt(String.valueOf(qtyObj)))
            ) : (
              "0"
            );
            map.put("totalQty", qtyResult);
          }
        }
      }

      // qty 데이터
      HashMap<String, Object> qty = new HashMap<>();
      String todayQty = "";
      String yesterdayQty = "";
      String thisWeekQty = "";
      String lastWeekQty = "";

      if (todayList != null && !todayList.isEmpty()) {
        Object qtyObj = todayList.get(0).get("totalQty");
        todayQty = (qtyObj != null) ? String.valueOf(qtyObj) : "0";
      }
      else {
        todayQty = "0";
      }
      if (yesterdayList != null && !yesterdayList.isEmpty()) {
        Object qtyObj = yesterdayList.get(0).get("totalQty");
        yesterdayQty = (qtyObj != null) ? String.valueOf(qtyObj) : "0";
      }
      else {
        yesterdayQty = "0";
      }
      if (thisWeekList != null && !thisWeekList.isEmpty()) {
        Object qtyObj = thisWeekList.get(0).get("totalQty");
        thisWeekQty = (qtyObj != null) ? String.valueOf(qtyObj).replaceAll(",", "") : "0";
      }
      else {
        thisWeekQty = "0";
      }
      if (lastWeekList != null && !lastWeekList.isEmpty()) {
        Object qtyObj = lastWeekList.get(0).get("totalQty");
        lastWeekQty = (qtyObj != null) ? String.valueOf(qtyObj).replaceAll(",", "") : "0";
      }
      else {
        lastWeekQty = "0";
      }

      qty.put("todayQty", todayQty);
      qty.put("yesterdayQty", yesterdayQty);
      qty.put("thisWeekQty", thisWeekQty);
      qty.put("lastWeekQty", lastWeekQty);

      // 퍼센트 데이터터
      HashMap<String, Object> dayPercent = calcPercent(todayQty, yesterdayQty);
      HashMap<String, Object> weekPercent = calcPercent(thisWeekQty, lastWeekQty);

      // 결과 데이터
      ArrayList<HashMap<String, Object>> listResult = new ArrayList<>();
      HashMap<String, Object> qtyMap = new HashMap<>();
      HashMap<String, Object> dayPercentMap = new HashMap<>();
      HashMap<String, Object> weekPercentMap = new HashMap<>();
      HashMap<String, Object> todayListMap = new HashMap<>();
      HashMap<String, Object> yesterdayListMap = new HashMap<>();
      HashMap<String, Object> thisWeekListMap = new HashMap<>();
      HashMap<String, Object> lastWeekListMap = new HashMap<>();

      qtyMap.put("qtyMap", qty);
      dayPercentMap.put("dayPercentMap", dayPercent);
      weekPercentMap.put("weekPercentMap", weekPercent);
      todayListMap.put("todayList", todayList);
      yesterdayListMap.put("yesterdayList", yesterdayList);
      thisWeekListMap.put("thisWeekList", thisWeekList);
      lastWeekListMap.put("lastWeekList", lastWeekList);

      listResult.add(qtyMap);
      listResult.add(dayPercentMap);
      listResult.add(weekPercentMap);
      listResult.add(todayListMap);
      listResult.add(yesterdayListMap);
      listResult.add(thisWeekListMap);
      listResult.add(lastWeekListMap);

      HashMap<String, Object> finalResult = new HashMap<>();
      finalResult.put((key + inOut + plan + date), listResult);

      return ResponseEntity.ok(finalResult);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/prodProtected", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> prodProtected () throws Exception {

    try {
      // 날짜 데이터
      HashMap<String, Object> dateMap = getRelatedDate();
      String todayDt = String.valueOf(dateMap.get("todayDt"));

      // 계산 변수
      String todayQty = "";
      String yesterdayQty = "";

      // 오늘 데이터
      ArrayList<HashMap<String, Object>> prodProtectedTodayList = dao.getProdProtected(
        todayDt
      );

      // prodProtectedTodayList 에 percentMap 추가
      HashMap<String, Object> percentMap = calcPercent(todayQty, yesterdayQty);

      // resultMap 에 값 넣기
      HashMap<String, Object> resultMap = new HashMap<>();
      resultMap.put("percentMap", percentMap);
      resultMap.put("prodProtectedTodayList", prodProtectedTodayList);

      return ResponseEntity.ok(resultMap);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/prodInChartWeek", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> prodInChartWeek () throws Exception {
    try {
      // 오늘 날짜
      Calendar todayDt = Calendar.getInstance();

      // 오늘 날짜를 기준으로 일주일
      Calendar weekAgoDt = Calendar.getInstance();
      weekAgoDt.add(Calendar.DATE, -6);

      // 어제 날짜
      Calendar yesterdayDt = Calendar.getInstance();
      yesterdayDt.add(Calendar.DATE, -1);

      // 날짜 포맷
      String weekAgoForm = simpleDateFormat.format(weekAgoDt.getTime());
      String todayForm = simpleDateFormat.format(todayDt.getTime());
      String yesterdayForm = simpleDateFormat.format(yesterdayDt.getTime());

      // Date
      Date weekAgo = simpleDateFormat.parse(weekAgoForm);
      Date today = simpleDateFormat.parse(todayForm);

      // Calendar
      Calendar calendar = Calendar.getInstance();
      calendar.setTime(weekAgo);

      // 기존 리스트
      ArrayList<HashMap<String, Object>> prodInChartWeekList = dao.getProdInChartWeek(
        weekAgoForm, todayForm
      );
      // 새로운 리스트
      ArrayList<HashMap<String, Object>> updatedProdInChartWeekList = new ArrayList<>();

      // 7일 중 날짜가 존재하지 않는 경우에 대한 처리 (totalQty 0으로 삽입)
      while (!calendar.getTime().after(today)) {

        String currentDateStr = simpleDateFormat.format(calendar.getTime());
        boolean inDateFound = false;

        for (HashMap<String, Object> dashMap : prodInChartWeekList) {
          if (currentDateStr.equals(dashMap.get("date"))) {
            updatedProdInChartWeekList.add(dashMap);
            inDateFound = true;
            break;
          }
        }
        if (!inDateFound) {
          HashMap<String, Object> dateData = new HashMap<>();
          dateData.put("date", currentDateStr);
          dateData.put("totalQty", 0);
          updatedProdInChartWeekList.add(dateData);
        }

        calendar.add(Calendar.DATE, 1);
      }

      // 오늘 날짜 데이터
      ArrayList<HashMap<String, Object>> prodInTodayList = dao.getProdInToday(
        todayForm
      );

      // 어제 날짜 데이터
      ArrayList<HashMap<String, Object>> prodInYesterdayList = dao.getProdInToday(
        yesterdayForm
      );

      // 오늘날짜 기준 어제날짜 대비 증감 계산 변수
      String todayQty = "";
      String yesterdayQty = "";

      try {
        if (prodInTodayList != null && !prodInTodayList.isEmpty()) {
          todayQty = formatter.format(Integer.parseInt(String.valueOf(prodInTodayList.get(0).get("totalQty"))));
        }
        else {
          todayQty = "0";
        }
      }
      catch (Exception e) {
        e.printStackTrace();
        todayQty = "0";
      }

      try {
        if (prodInYesterdayList != null && !prodInYesterdayList.isEmpty()) {
          yesterdayQty = formatter.format(Integer.parseInt(String.valueOf(prodInYesterdayList.get(0).get("totalQty"))));
        }
        else {
          yesterdayQty = "0";
        }
      }
      catch (Exception e) {
        e.printStackTrace();
        yesterdayQty = "0";
      }

      HashMap<String, Object> percentMap = calcPercent(todayQty, yesterdayQty);
      HashMap<String, Object> finalResult = new HashMap<>();
      finalResult.put("percentMap", percentMap);
      finalResult.put("prodInChartWeekList", updatedProdInChartWeekList);

      return ResponseEntity.ok(finalResult);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/prodOutChartWeek", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> prodOutChartWeek () throws Exception {
    try {
      // 오늘 날짜
      Calendar todayDt = Calendar.getInstance();

      // 오늘 날짜를 기준으로 일주일
      Calendar weekAgoDt = Calendar.getInstance();
      weekAgoDt.add(Calendar.DATE, -6);

      // 어제 날짜
      Calendar yesterdayDt = Calendar.getInstance();
      yesterdayDt.add(Calendar.DATE, -1);

      // 날짜 포맷
      String weekAgoForm = simpleDateFormat.format(weekAgoDt.getTime());
      String todayForm = simpleDateFormat.format(todayDt.getTime());
      String yesterdayForm = simpleDateFormat.format(yesterdayDt.getTime());

      // Date
      Date weekAgo = simpleDateFormat.parse(weekAgoForm);
      Date today = simpleDateFormat.parse(todayForm);

      // Calendar
      Calendar calendar = Calendar.getInstance();
      calendar.setTime(weekAgo);

      // 기존 리스트
      ArrayList<HashMap<String, Object>> prodOutChartWeekList = dao.getProdOutChartWeek(
        weekAgoForm, todayForm
      );
      // 새로운 리스트
      ArrayList<HashMap<String, Object>> updatedProdOutChartWeekList = new ArrayList<>();

      // 7일 중 날짜가 존재하지 않는 경우에 대한 처리 (totalQty 0으로 삽입)
      while (!calendar.getTime().after(today)) {

        String currentDateStr = simpleDateFormat.format(calendar.getTime());
        boolean outDateFound = false;

        for (HashMap<String, Object> dashMap : prodOutChartWeekList) {
          if (currentDateStr.equals(dashMap.get("date"))) {
            updatedProdOutChartWeekList.add(dashMap);
            outDateFound = true;
            break;
          }
        }
        if (!outDateFound) {
          HashMap<String, Object> dateData = new HashMap<>();
          dateData.put("date", currentDateStr);
          dateData.put("totalQty", 0);
          updatedProdOutChartWeekList.add(dateData);
        }

        calendar.add(Calendar.DATE, 1);
      }

      // 오늘 날짜 데이터
      ArrayList<HashMap<String, Object>> prodOutTodayList = dao.getProdOutToday(
        todayForm
      );

      // 어제 날짜 데이터
      ArrayList<HashMap<String, Object>> prodOutYesterdayList = dao.getProdOutToday(
        yesterdayForm
      );

      // 오늘날짜 기준 어제날짜 대비 증감 계산 변수
      String todayQty = "";
      String yesterdayQty = "";

      try {
        if (prodOutTodayList != null && !prodOutTodayList.isEmpty()) {
          todayQty = formatter.format(Integer.parseInt(String.valueOf(prodOutTodayList.get(0).get("totalQty"))));
        }
        else {
          todayQty = "0";
        }
      }
      catch (Exception e) {
        e.printStackTrace();
        todayQty = "0";
      }

      try {
        if (prodOutYesterdayList != null && !prodOutYesterdayList.isEmpty()) {
          yesterdayQty = formatter.format(Integer.parseInt(String.valueOf(prodOutYesterdayList.get(0).get("totalQty"))));
        }
        else {
          yesterdayQty = "0";
        }
      }
      catch (Exception e) {
        e.printStackTrace();
        yesterdayQty = "0";
      }

      HashMap<String, Object> percentMap = calcPercent(todayQty, yesterdayQty);
      HashMap<String, Object> finalResult = new HashMap<>();
      finalResult.put("percentMap", percentMap);
      finalResult.put("prodOutChartWeekList", updatedProdOutChartWeekList);

      return ResponseEntity.ok(finalResult);
    }
    catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }
}