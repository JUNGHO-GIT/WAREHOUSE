package com.WAREHOUSE.controller;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.WAREHOUSE.dao.FilesDAO;
import com.WAREHOUSE.dao.MainDAO;
import com.WAREHOUSE.util.Logs;
import com.google.gson.Gson;

// -------------------------------------------------------------------------------------------------
@Controller
public class MainCTRL {

  @Autowired
  private MainDAO dao;

  @Autowired
  private FilesDAO filesDao;

  private Logs logs = new Logs();
  private Gson gson = new Gson();

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/main", produces="text/html;charset=UTF-8")
  public String main (
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    // 첫 번째 회사 (해당 회사)의 로고
    List<Map<String, Object>> logoFilesList = filesDao.showFiles("tblCompany", "1");
    List<HashMap<String, Object>> mainList = dao.listMain();

    // 첫 번째 로고 파일에서 `fileUrl` 값을 추출
    String fileUrl = "";
    if (!logoFilesList.isEmpty()) {
      Map<String, Object> logoFile = logoFilesList.get(0);
      fileUrl = (String) logoFile.get("fileUrl");
    }

    // 세션에 값 저장
    session.setAttribute("fileUrl", fileUrl);
    model.addAttribute("mainList", mainList);

    return "main";
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/act/listSysMenu", produces="application/json;charset=UTF-8")
  public String listSysMenu (
    HttpServletRequest request
  ) throws Exception {

    ArrayList<HashMap<String, Object>> checkList = new ArrayList<HashMap<String, Object>>();
    String config = request.getParameter("config");
    String[] data = config.split(",");

    String pageNm = "";
    for (int i = 0; i < data.length; i++) {
      HashMap<String, Object> rsMap = new HashMap<String, Object>();
      if (!data[i].equals("null")) {
        if (pageNm.equals("") == false) {
          pageNm += "','";
        }
        pageNm += data[i];
        rsMap.put("pageNm", pageNm);
        checkList.add(rsMap);
      }
    }
    pageNm = "'" + pageNm + "'";

    ArrayList<HashMap<String, Object>> listSysMenuList = dao.listSysMenu(pageNm);
    logs.info("listSysMenu", gson.toJson(checkList));

    return gson.toJson(listSysMenuList);
  }

  // -----------------------------------------------------------------------------------------------
  @ResponseBody
  @PostMapping(value="/showVersion", produces="application/json;charset=UTF-8")
  public String showVersion(
    Model model
  ) throws Exception {

    // (resources/static/changelog.md) 파일 읽기
    ClassPathResource resource = new ClassPathResource("static/changelog.md");
    InputStream inputStream = resource.getInputStream();
    String changelogContent = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

    // 패턴 설정: 버전과 날짜 추출
    Pattern versionPattern = Pattern.compile("(\\s*)(\\d+[.]\\d+[.]\\d+)(\\s*)");
    Pattern dateTimePattern = Pattern.compile("\\d{4}-\\d{2}-\\d{2} \\(\\d{2}:\\d{2}:\\d{2}\\)");

    // 버전과 날짜 추출
    Matcher versionMatcher = versionPattern.matcher(changelogContent);
    Matcher dateTimeMatcher = dateTimePattern.matcher(changelogContent);

    List<String> versionList = new ArrayList<>();
    List<String> dateTimeList = new ArrayList<>();

    while (versionMatcher.find()) {
      versionList.add(versionMatcher.group(2));
    }

    while (dateTimeMatcher.find()) {
      dateTimeList.add(dateTimeMatcher.group());
    }

    if (versionList.isEmpty() || dateTimeList.isEmpty()) {
      throw new Exception("changelog.md 파일에서 데이터를 추출할 수 없습니다.");
    }

    // 최신 버전과 날짜 추출 (리스트의 마지막 요소를 선택)
    String latestVersion = versionList.get(versionList.size() - 1);
    String latestDateTime = dateTimeList.get(dateTimeList.size() - 1);

    // JSON 객체로 응답 생성
    Map<String, Object> map = new HashMap<>();
    map.put("latestVersion", latestVersion);
    map.put("latestDateTime", latestDateTime);

    // 로그 출력
    logs.info("showVersion", gson.toJson(map));

    return gson.toJson(map);
  }
}