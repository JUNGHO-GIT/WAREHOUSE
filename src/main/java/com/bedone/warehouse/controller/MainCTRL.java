package com.bedone.warehouse.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.bedone.warehouse.dao.FilesDAO;
import com.bedone.warehouse.dao.MainDAO;
import com.bedone.warehouse.util.Utils;
import com.google.gson.Gson;

// ------------------------------------------------------------------------------------------------>
@Controller
public class MainCTRL {

  @Value ("${conf.ex1}")
  private String gUserNm;

  @Value ("${file.dir}")
  private String gFileDir;

  @Value ("${war.dir}")
  private String gWarDir;

  @Autowired
  private SqlSession sqlSession;
  private Utils utils = new Utils();
  private Gson gson = new Gson();

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/warehouse/main", method= RequestMethod.GET, produces="text/html;charset=UTF-8")
  public String main (
    HttpServletRequest request,
    HttpSession session,
    Model model
  ) throws Exception {

    utils.info ("============================main================================");

    MainDAO mainDao = sqlSession.getMapper(MainDAO.class);
    List<HashMap<String, Object>> mainList = mainDao.listMain();

    // 첫 번째 회사 (해당 회사)의 로고
    FilesDAO filesDao = sqlSession.getMapper(FilesDAO.class);
    List<Map<String, Object>> logoFilesList = filesDao.showFiles("tblCompany", "1");

    // 첫 번째 로고 파일에서 `fileUrl` 값을 추출
    String fileUrl = "";
    if (!logoFilesList.isEmpty()) {
      Map<String, Object> logoFile = logoFilesList.get(0);
      fileUrl = (String) logoFile.get("fileUrl");
    }

    // 세션에 값 저장
    session.setAttribute("fileUrl", fileUrl);

    model.addAttribute("mainList", mainList);
    model.addAttribute("listMenu", gson.toJson(mainList));

    return "main";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/act/listSysMenu", method= RequestMethod.POST, produces="application/json;charset=UTF-8")
  public String listSysMenu (
    HttpServletRequest request,
    Model model
  ) throws Exception {

    utils.info ("==========================listSysMenu==============================");

    ArrayList<HashMap<String, Object>> checkList = new ArrayList<HashMap<String, Object>>();
    String config = request.getParameter("config");
    String[] data = config.split(",");

    MainDAO mainDao = sqlSession.getMapper(MainDAO.class);
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

    ArrayList<HashMap<String, Object>> listSysMenuList = mainDao.listSysMenu(pageNm);
    model.addAttribute("rsltJson", gson.toJson(listSysMenuList));

    utils.info("listSysMenuList : " + gson.toJson(listSysMenuList));

    return "jsonRs";
  }

  // ---------------------------------------------------------------------------------------------->
  @RequestMapping
  (value="/showVersion", method= RequestMethod.GET, produces="application/json;charset=UTF-8")
  public String showVersion (
    Model model
  ) throws Exception {

    File file = new File(gWarDir);
    long lastModifiedTime = file.lastModified();

    SimpleDateFormat simple = new SimpleDateFormat("yyyyMM-dd");
    String fmtDate = simple.format(new Date(lastModifiedTime));

    // 버전 번호를 관리하기 위한 Map
    Map<String, Integer> versionMap = new HashMap<>();

    // 현재 날짜에 해당하는 버전 번호 가져오기
    int versionNumber = versionMap.getOrDefault(fmtDate, 0);

    // 버전 번호 업데이트 및 저장
    versionMap.put(fmtDate, versionNumber + 1);

    // 버전 문자열 생성
    String versionString = "Ver. " + fmtDate + "." + versionNumber;

    model.addAttribute("rsltJson", gson.toJson(versionString));

    return "jsonRs";
  }

}
