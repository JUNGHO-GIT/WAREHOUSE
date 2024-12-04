package com.warehouse.controller;

import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.TimeZone;
import javax.servlet.http.HttpServletRequest;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.warehouse.dao.DashDAO;

// -------------------------------------------------------------------------------------------------
@Controller
public class DashCTRL {

  @Autowired
  private SqlSession sqlSession;

  // -----------------------------------------------------------------------------------------------
  private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
  private static final NumberFormat formatter = NumberFormat.getInstance(Locale.KOREA);
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

    // 오늘 기준 이번주 토요일 - 한국 시간대
    Calendar thisWeekSatCal = Calendar.getInstance(koreaTimeZone);
    thisWeekSatCal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
    thisWeekSatCal.add(Calendar.WEEK_OF_YEAR, 1);
    thisWeekSatCal.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);

    // 오늘 기준 지난주 일요일 - 한국 시간대
    Calendar lastWeekSunCal = Calendar.getInstance(koreaTimeZone);
    lastWeekSunCal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
    lastWeekSunCal.add(Calendar.WEEK_OF_YEAR, -1);

    // 결과 맵 생성 및 반환
    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("todayDt", simpleDateFormat.format(todayCal.getTime()));
    resultMap.put("yesterdayDt", simpleDateFormat.format(yesterdayCal.getTime()));
    resultMap.put("weekAgoDt", simpleDateFormat.format(weekAgoCal.getTime()));
    resultMap.put("thisWeekSatDt", simpleDateFormat.format(thisWeekSatCal.getTime()));
    resultMap.put("lastWeekSunDt", simpleDateFormat.format(lastWeekSunCal.getTime()));

    return resultMap;
  }

  // -----------------------------------------------------------------------------------------------
  private HashMap<String, Object> calcPercent (
    String todayQtyParam,
    String yesterdayQtyParam
  ) throws Exception {

    HashMap<String, Object> percentMap = new HashMap<>();

    Integer todayQty = 0;
    if (todayQtyParam != null && !todayQtyParam.equals("")) {
      if (todayQtyParam.indexOf(",") != -1) {
        todayQty = Integer.parseInt(todayQtyParam.replaceAll(",", ""));
      }
      else {
        todayQty = Integer.parseInt(todayQtyParam);
      }
    }
    else {
      todayQty = 0;
    }

    Integer yesterdayQty = 0;
    if (yesterdayQtyParam != null && !yesterdayQtyParam.equals("")) {
      if (yesterdayQtyParam.indexOf(",") != -1) {
        yesterdayQty = Integer.parseInt(yesterdayQtyParam.replaceAll(",", ""));
      }
      else {
        yesterdayQty = Integer.parseInt(yesterdayQtyParam);
      }
    }
    else {
      yesterdayQty = 0;
    }

    Integer percent = 0;
    Integer count = todayQty - yesterdayQty;

    String sign = count >= 0 ? "+" : "-";
    String color = "text-danger";

    if (todayQty == 0 && yesterdayQty == 0) {
      percent = 0;
      count = 0;
      sign = "-";
      color = "text-theme";
    }
    else if (todayQty == 0) {
      percent = 0;
      count = -yesterdayQty;
      sign = "-";
      color = "text-theme";
    }
    else if (yesterdayQty == 0) {
      percent = 0;
      count = todayQty;
      sign = "+";
    }
    else {
      percent = (int) (((double) count / yesterdayQty) * 100);
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
  @RequestMapping
  (value="/dash", method=RequestMethod.GET, produces="text/plain;charset=UTF-8")
  public String dash () throws Exception {

    return "dash";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @RequestMapping
  (value="/act/dash", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public HashMap<String, Object> dash (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    // 날짜 데이터
    HashMap<String, Object> dateMap = getRelatedDate();
    String todayDt = (String) dateMap.get("todayDt");
    String yesterdayDt = (String) dateMap.get("yesterdayDt");
    String weekAgoDt = (String) dateMap.get("weekAgoDt");
    String thisWeekSatDt = (String) dateMap.get("thisWeekSatDt");
    String lastWeekSunDt = (String) dateMap.get("lastWeekSunDt");

    // 파라미터
    HashMap<String, Object> paramMap = new HashMap<>();
    String key = request.getParameter("key");
    String keyUp = Character.toUpperCase(key.charAt(0)) + key.substring(1);
    String keyCd = (key + "Cd");
    String keyNm = (key + "Nm");
    String inOut = request.getParameter("inOut");
    String plan = request.getParameter("plan");
    String date = request.getParameter("date");
    String tableNm = ("tblProductInOut");
    String planYN = (plan != null && !plan.isEmpty()) ? "Y" : "N";
    String sign = (inOut.equals("In")) ? ">" : "<";

    // paramMap 에 파라미터 추가
    paramMap.put("key", key);
    paramMap.put("keyUp", keyUp);
    paramMap.put("keyCd", keyCd);
    paramMap.put("keyNm", keyNm);
    paramMap.put("inOut", inOut);
    paramMap.put("plan", plan);
    paramMap.put("date", date);
    paramMap.put("tableNm", tableNm);
    paramMap.put("planYN", planYN);
    paramMap.put("sign", sign);

    // 오늘날짜 기준 어제날짜 대비 증감 계산 변수
    String totalQty = "";
    String todayQty = "";
    String yesterdayQty = "";

    // Dao
    DashDAO dashDao = sqlSession.getMapper(DashDAO.class);

    // 데이터 리스트
    ArrayList<HashMap<String, Object>> todayList = new ArrayList<>();
    ArrayList<HashMap<String, Object>> yesterdayList = new ArrayList<>();
    ArrayList<HashMap<String, Object>> weekList = new ArrayList<>();
    ArrayList<HashMap<String, Object>> sunToSatList = new ArrayList<>();

    if (key.equals("ship")) {
      // 오늘 데이터
      todayList = dashDao.getShipData(paramMap, todayDt, todayDt);

      // 어제 데이터
      yesterdayList = dashDao.getShipData(paramMap, yesterdayDt, yesterdayDt);

      // 일주일 데이터 (오늘기준 일주일)
      weekList = dashDao.getShipData(paramMap, weekAgoDt, todayDt);

      // 일주일 데이터 (일요일부터 토요일까지)
      sunToSatList = dashDao.getShipData(paramMap, lastWeekSunDt, thisWeekSatDt);
    }
    else {
      // 오늘 데이터
      todayList = dashDao.getInOutData(paramMap, todayDt, todayDt);

      // 어제 데이터
      yesterdayList = dashDao.getInOutData(paramMap, yesterdayDt, yesterdayDt);

      // 일주일 데이터 (오늘기준 일주일)
      weekList = dashDao.getInOutData(paramMap, weekAgoDt, todayDt);

      // 일주일 데이터 (일요일부터 토요일까지)
      sunToSatList = dashDao.getInOutData(paramMap, lastWeekSunDt, thisWeekSatDt);
    }

    // keyCd가 null인 항목이 있는지 확인
    for (HashMap<String, Object> item : todayList) {
      if (item.get(keyCd) == null) {
        todayList = new ArrayList<>();
      }
    }
    for (HashMap<String, Object> item : yesterdayList) {
      if (item.get(keyCd) == null) {
        yesterdayList = new ArrayList<>();
      }
    }
    for (HashMap<String, Object> item : weekList) {
      if (item.get(keyCd) == null) {
        weekList = new ArrayList<>();
      }
    }
    for (HashMap<String, Object> item : sunToSatList) {
      if (item.get(keyCd) == null) {
        sunToSatList = new ArrayList<>();
      }
    }

    // 오늘 리스트
    if (todayList != null && !todayList.isEmpty()) {
      Object totalQtyObj = todayList.get(0).get("totalQty");
      if (totalQtyObj != null) {
        totalQty = formatter.format(Integer.parseInt(totalQtyObj.toString()));
      }
      else {
        totalQty = "0";
      }
    }
    else {
      totalQty = "0";
    }

    // 어제 리스트
    if (yesterdayList != null && !yesterdayList.isEmpty()) {
      Object totalQtyObj = yesterdayList.get(0).get("totalQty");
      if (totalQtyObj != null) {
        yesterdayQty = formatter.format(Integer.parseInt(totalQtyObj.toString()));
      }
      else {
        yesterdayQty = "0";
      }
    }
    else {
      yesterdayQty = "0";
    }

    // 일주일 리스트 (오늘기준 일주일)
    if (weekList != null && !weekList.isEmpty()) {
      for (HashMap<String, Object> weekMap : weekList) {
        Object totalQtyObj = weekMap.get("totalQty");
        if (totalQtyObj != null) {
          weekMap.put("totalQty", formatter.format(Integer.parseInt(totalQtyObj.toString())));
        }
        else {
          weekMap.put("totalQty", "0");
        }
      }
    }
    else if (weekList != null) {
      HashMap<String, Object> weekMap = new HashMap<>();
      weekMap.put("totalQty", "0");
      weekList.add(weekMap);
    }

    // 일주일 리스트 (일요일부터 토요일까지)
    if (sunToSatList != null && !sunToSatList.isEmpty()) {
      for (HashMap<String, Object> sunToSatMap : sunToSatList) {
        Object totalQtyObj = sunToSatMap.get("totalQty");
        if (totalQtyObj != null) {
          sunToSatMap.put("totalQty", formatter.format(Integer.parseInt(totalQtyObj.toString())));
        }
        else {
          sunToSatMap.put("totalQty", "0");
        }
      }
    }
    else if (sunToSatList != null) {
      HashMap<String, Object> sunToSatMap = new HashMap<>();
      sunToSatMap.put("totalQty", "0");
      sunToSatList.add(sunToSatMap);
    }

    // dash 리스트 생성
    ArrayList<HashMap<String, Object>> dash = new ArrayList<>();

    // dash 에 percentMap 추가
    HashMap<String, Object> percentMap = calcPercent(todayQty, yesterdayQty);
    HashMap<String, Object> percentMapWrapper = new HashMap<>();
    percentMapWrapper.put("percentMap", percentMap);
    dash.add(percentMapWrapper);

    // dash 에 totalQty 추가
    HashMap<String, Object> totalQtyMap = new HashMap<>();
    totalQtyMap.put("totalQty", totalQty);
    dash.add(totalQtyMap);

    // dash 에 todayList 추가
    HashMap<String, Object> todayListMap = new HashMap<>();
    todayListMap.put("todayList", todayList);
    dash.add(todayListMap);

    // dash 에 yesterdayList 추가
    HashMap<String, Object> yesterdayListMap = new HashMap<>();
    yesterdayListMap.put("yesterdayList", yesterdayList);
    dash.add(yesterdayListMap);

    // dash 에 weekList 추가
    HashMap<String, Object> weekListMap = new HashMap<>();
    weekListMap.put("weekList", weekList);
    dash.add(weekListMap);

    // dash 에 sunToSatList 추가
    HashMap<String, Object> sunToSatListMap = new HashMap<>();
    sunToSatListMap.put("sunToSatList", sunToSatList);
    dash.add(sunToSatListMap);

    // 최종 반환
    HashMap<String, Object> result = new HashMap<>();
    String resultStr = (key + inOut + plan + date);

    result.put(resultStr, dash);

    return result;
  }

  // 4-1. 안전 재고 현황 (제품) --------------------------------------------------------------------
  @ResponseBody
  @RequestMapping
  (value="/act/prodProtected", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public HashMap<String, Object> prodProtected (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    // dao
    DashDAO dashDao = sqlSession.getMapper(DashDAO.class);

    // 날짜 데이터
    HashMap<String, Object> dateMap = getRelatedDate();
    String todayDt = (String) dateMap.get("todayDt");

    // 계산 변수
    String todayQty = "";
    String yesterdayQty = "";

    // 오늘 데이터
    ArrayList<HashMap<String, Object>> prodProtectedTodayList = dashDao.getProdProtected(
      todayDt
    );

    // prodProtectedTodayList 에 percentMap 추가
    HashMap<String, Object> percentMap = calcPercent(todayQty, yesterdayQty);

    // resultMap 에 값 넣기
    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("percentMap", percentMap);
    resultMap.put("prodProtectedTodayList", prodProtectedTodayList);

    return resultMap;
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @RequestMapping
  (value="/act/prodInChartWeek", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public HashMap<String, Object> prodInChartWeek (
    HttpServletRequest request,
    Model model
  ) throws Exception {

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
    DashDAO dashDao = sqlSession.getMapper(DashDAO.class);
    ArrayList<HashMap<String, Object>> prodInChartWeekList = dashDao.getProdInChartWeek(
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
    ArrayList<HashMap<String, Object>> prodInTodayList = dashDao.getProdInToday(
      todayForm
    );

    // 어제 날짜 데이터
    ArrayList<HashMap<String, Object>> prodInYesterdayList = dashDao.getProdInToday(
      yesterdayForm
    );

    // 오늘날짜 기준 어제날짜 대비 증감 계산 변수
    String todayQty = "";
    String yesterdayQty = "";

    try {
      if (prodInTodayList != null && !prodInTodayList.isEmpty()) {
        todayQty = formatter.format(Integer.parseInt(prodInTodayList.get(0).get("totalQty").toString()));
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
        yesterdayQty = formatter.format(Integer.parseInt(prodInYesterdayList.get(0).get("totalQty").toString()));
      }
      else {
        yesterdayQty = "0";
      }
    }
    catch (Exception e) {
      e.printStackTrace();
      yesterdayQty = "0";
    }

    // percentMap 에 값 넣기
    HashMap<String, Object> percentMap = calcPercent(todayQty, yesterdayQty);

    // resultMap 에 값 넣기
    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("percentMap", percentMap);
    resultMap.put("prodInChartWeekList", updatedProdInChartWeekList);

    return resultMap;
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @RequestMapping
  (value="/act/prodOutChartWeek", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  public HashMap<String, Object> prodOutChartWeek (
    HttpServletRequest request,
    Model model
  ) throws Exception {

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
    DashDAO dashDao = sqlSession.getMapper(DashDAO.class);
    ArrayList<HashMap<String, Object>> prodOutChartWeekList = dashDao.getProdOutChartWeek(
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
    ArrayList<HashMap<String, Object>> prodOutTodayList = dashDao.getProdOutToday(
      todayForm
    );

    // 어제 날짜 데이터
    ArrayList<HashMap<String, Object>> prodOutYesterdayList = dashDao.getProdOutToday(
      yesterdayForm
    );

    // 오늘날짜 기준 어제날짜 대비 증감 계산 변수
    String todayQty = "";
    String yesterdayQty = "";

    try {
      if (prodOutTodayList != null && !prodOutTodayList.isEmpty()) {
        todayQty = formatter.format(Integer.parseInt(prodOutTodayList.get(0).get("totalQty").toString()));
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
        yesterdayQty = formatter.format(Integer.parseInt(prodOutYesterdayList.get(0).get("totalQty").toString()));
      }
      else {
        yesterdayQty = "0";
      }
    }
    catch (Exception e) {
      e.printStackTrace();
      yesterdayQty = "0";
    }

    // percentMap 에 값 넣기
    HashMap<String, Object> percentMap = calcPercent(todayQty, yesterdayQty);

    // resultMap 에 값 넣기
    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("percentMap", percentMap);
    resultMap.put("prodOutChartWeekList", updatedProdOutChartWeekList);

    return resultMap;
  }
}