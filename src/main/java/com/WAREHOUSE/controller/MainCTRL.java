package com.WAREHOUSE.controller;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpSession;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.WAREHOUSE.dao.FilesDAO;
import com.WAREHOUSE.dao.MainDAO;
import com.WAREHOUSE.util.Json;
import com.WAREHOUSE.util.Logs;
import lombok.RequiredArgsConstructor;

// -------------------------------------------------------------------------------------------------
@Controller
@RequiredArgsConstructor
public class MainCTRL {

  private final MainDAO dao;
  private final FilesDAO filesDao;
  private final Logs logs;
  private final Json json;

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/main", produces="text/html;charset=UTF-8")
  public ModelAndView main (
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

    return new ModelAndView("main");
  }

  // -----------------------------------------------------------------------------------------------
  @PostMapping(value="/act/listSysMenu", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> listSysMenu (
    @RequestParam(value="config", required=false) String config
  ) throws Exception {

    String[] data = config.split(",");
    String pageNm = "";

    try {
      for (int i = 0; i < data.length; i++) {
        if (!data[i].equals("null")) {
          if (pageNm.equals("") == false) {
            pageNm += "','";
          }
          pageNm += data[i];
        }
      }
      pageNm = "'" + pageNm + "'";

      ArrayList<HashMap<String, Object>> listSysMenuList = dao.listSysMenu(pageNm);
      logs.info("listSysMenu", json.toJson(listSysMenuList));

      return ResponseEntity.ok(listSysMenuList);
    }
    catch (Exception e) {
      logs.error("listSysMenu", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // -----------------------------------------------------------------------------------------------
  @GetMapping(value="/showVersion", produces="application/json;charset=UTF-8")
  public ResponseEntity<?> showVersion () throws Exception {

    Map<String, Object> map = new HashMap<>();

    try {
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

      // 최신 버전과 날짜 추출 (리스트의 마지막 요소를 선택)
      String latestVersion = versionList.get(versionList.size() - 1);
      String latestDateTime = dateTimeList.get(dateTimeList.size() - 1);

      // JSON 객체로 응답 생성
      map.put("latestVersion", latestVersion);
      map.put("latestDateTime", latestDateTime);

      return ResponseEntity.ok(map);
    }
    catch (Exception e) {
      logs.error("showVersion", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}