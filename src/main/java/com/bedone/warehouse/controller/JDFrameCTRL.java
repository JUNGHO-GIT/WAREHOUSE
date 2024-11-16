/* package com.bedone.warehouse.controller;


import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.Gson;
import com.jadesoft.JDFrame.JDFrame;
import com.bedone.warehouse.util.Utils;

@Controller
public class JDFrameCTRL {


	@Value("${conf.ex1}")
	String gApiHeader;
	@Value("${conf.xlsFile}")
	String gXlsFile;
	@Value("${conf.baseDoc}")
	String gBaseDoc;

	private Gson gson = new Gson();

	@Autowired
	private SqlSession sqlSession;

	public JdbcTemplate template;

	@Autowired
	public void setTemplate(JdbcTemplate template) {
		this.template = template;
		Constant.template = this.template;
	}

	Utils utils = new Utils();
	private static final Logger log = LoggerFactory.getLogger(JDFrameCTRL.class);
	@RequestMapping(value = "/jdf/config", method = RequestMethod.GET)
	public String JDFConfig(Locale locale, Model model) {

		JDFrame jdfr = new JDFrame();
		String xlsFile = gXlsFile;
//		String xlsFile = "C:\\Workspace\\JAVA_Project\\Jadestory4U_Work\\Jadestory4U\\170313_KiteMain_DB_Schema_.xls";
		String pageNm = "목록";
		String packageNm = this.getClass().getPackage().getName();
		packageNm = packageNm.replace(".controller", "");

		log.info("packageNm : " + packageNm);
		String baseDoc = gBaseDoc;

		ArrayList<HashMap<String, Object>> confMain = new ArrayList<HashMap<String, Object>>();
		ArrayList<HashMap<String, Object>> xlsMain = jdfr.xlsMain(xlsFile);

        Map msg = new HashMap<String, String>();
//		msg.put("apiKey",hashString);
        log.info(gson.toJson(xlsMain));

        int sheetSize = xlsMain.size();

        for(int d=0; d<sheetSize; d++) {
        	HashMap<String, Object> row = xlsMain.get(d);

        	String tableNm = (String) row.get("tableNm");
        	String method = tableNm.substring(3);
        	String packageDir = packageNm.replaceAll("\\.","/");
        	String srcDir = baseDoc + packageDir + "/";
        	String voFile = srcDir + "container/" + method + ".java";
        	String daoFile = srcDir + "dao/" +  method + "DAO.java";
        	String xmlFile =  srcDir + "dao/mapper/" + method + ".xml";
        	String voUse = "N";
        	String daoUse = "N";
        	String xmlUse = "N";
        	File isVoFile = new File(voFile);
        	if(isVoFile.exists() == true) voUse = "Y";
        	row.put("vo", voUse);
        	File isDaoFile = new File(daoFile);
        	if(isDaoFile.exists() == true) daoUse = "Y";
        	row.put("dao", daoUse);
        	File isXmlFile = new File(xmlFile);
        	if(isXmlFile.exists() == true) xmlUse = "Y";
        	row.put("xml", xmlUse);

        	confMain.add(row);
        }

        log.info(gson.toJson(confMain));
		model.addAttribute("rsltJson",gson.toJson(confMain));
		return "jsonRs";
	}


	@RequestMapping(value = "/_config", method = RequestMethod.GET)
	public String webConfig(Locale locale, Model model) {

		return "_config";
	}

	@RequestMapping(value = "/jdf/create", method = RequestMethod.GET)
	public String JDFCreate(Locale locale, Model model, HttpServletRequest request) {

		String pageNm = request.getParameter("pageNm");
		String createMode = request.getParameter("createMode");

        Map msg = new HashMap<String, String>();

		JDFrame jdfr = new JDFrame();

		String packageNm = this.getClass().getPackage().getName();
		packageNm = packageNm.replace(".controller", "");

		String[] params = {gXlsFile, pageNm, packageNm, gBaseDoc, createMode};

		log.info("pageNm : " + pageNm);
		log.info("createMode : " + createMode);
		String baseDoc = gBaseDoc;
		try {
			jdfr.main(params);
			msg.put("rslt","success");
		}
		catch (Exception e) {
			msg.put("rslt","fail");
			log.info("JDF create : "+e.getMessage());
		}

		model.addAttribute("rsltJson",gson.toJson(msg));
		return "jsonRs";
	}

}
 */