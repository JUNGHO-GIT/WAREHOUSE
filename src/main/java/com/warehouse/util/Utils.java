package com.warehouse.util;

import com.warehouse.container.Company;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Row;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

// -------------------------------------------------------------------------------------------------
public class Utils {

  // -----------------------------------------------------------------------------------------------
  private static final Logger log = LoggerFactory.getLogger(Utils.class);
  // -----------------------------------------------------------------------------------------------
  public Map<String, String> listString2Map(
    List<Map<String, String>> list,
    String key,
    String val
  ) {

    Map<String, String> rsList = new HashMap<String, String>();
    for (int p = 0; p < list.size(); p++) {
      Map<String, String> row = (Map<String, String>) list.get(p);
      String keys = (String) row.get(key);
      String vals = (String) row.get(val);
      rsList.put(keys, vals);
    }

    return rsList;
  }

  // -----------------------------------------------------------------------------------------------
  public Map<String, Object> listObject2Map(
    List<Map<String, Object>> list,
    String key,
    String val
  ) {

    Map<String, Object> rsList = new HashMap<String, Object>();
    for (int p = 0; p < list.size(); p++) {
      Map<String, Object> row = (Map<String, Object>) list.get(p);
      String keys = (String) row.get(key);
      Object vals = row.get(val);
      rsList.put(keys, vals);
    }

    return rsList;
  }

  // -----------------------------------------------------------------------------------------------
  public static boolean isValinArr(String[] arr, String val) {

    for (String s : arr) {
      if (s.equals(val)) {

        return true;
      }
    }

    return false;
  }

  // -----------------------------------------------------------------------------------------------
  public List<Map<String, String>> setFullPlan(
    List<Map<String, String>> plan,
    String limit,
    String seatCd,
    String seatNm
  ) {

    List<Map<String, String>> fullPlan = new ArrayList<>();
    DateFormat dateFormat = new SimpleDateFormat("HH:mm");
    Date preEndTime = new Date();
    String curTm = dateFormat.format(new java.util.Date());
    String strPreEndTime = "";
    int length = plan.size();
    for (int k = 0; k < length; k++) {
      Map row = plan.get(k);
      Map newRow = new HashMap<String, String>();
      String startTm = (String) row.get("startTm");
      String endTm = (String) row.get("endTm");
      try {
        Date sTime = dateFormat.parse(startTm);
        Date eTime = dateFormat.parse(endTm);
        Date cTime = dateFormat.parse(curTm);
        if (k == 0) {
          log.info("compare : " + curTm.compareTo(startTm));
          log.info("compare2 : " + startTm + "/" + curTm);
          if (curTm.compareTo(startTm) < 0) {
            Map firstRow = new HashMap<String, String>();
            firstRow.put("seatCd", seatCd);
            firstRow.put("seatNm", seatNm);
            firstRow.put("startTm", minUp(curTm));
            firstRow.put("endTm", startTm);
            newRow.put("diffMin", 0);
            firstRow.put("status", "empty");
            fullPlan.add(firstRow);
          }
        }
        int diffTime = (int) (sTime.getTime() - preEndTime.getTime());
        log.info("시간차 : " + sTime.getTime() + "/" + preEndTime.getTime() + "/" + diffTime);
        if (diffTime > 3600000 && !strPreEndTime.equals("")) {
          long dfMin = 0;
          try {
            dfMin = diffMin(curTm, minUp(strPreEndTime));
          }

          catch(Exception e) {
            e.printStackTrace();
          }
          log.info("MinUp : " + minUp(strPreEndTime));
          newRow.put("seatCd", seatCd);
          newRow.put("seatNm", seatNm);
          newRow.put("startTm", minUp(strPreEndTime));
          newRow.put("endTm", startTm);
          newRow.put("diffMin", dfMin);
          newRow.put("status", "empty");
          fullPlan.add(newRow);
        }
        preEndTime = eTime;
        strPreEndTime = endTm;
        if (k == (length - 1)) {
          Map newLastRow = new HashMap<String, String>();
          Date lastTime = dateFormat.parse(limit);
          int lastDiff = (int) (lastTime.getTime() - eTime.getTime());
          log.info("시간차2 : " + lastDiff);
          if (lastDiff > 3600000) {
            log.info("lastDiff : " + lastDiff);
            long dfMin = 0;
            try {
              dfMin = diffMin(curTm, minUp(endTm));
            }

            catch(Exception e) {
              e.printStackTrace();
            }
            newLastRow.put("seatCd", seatCd);
            newLastRow.put("seatNm", seatNm);
            newLastRow.put("startTm", minUp(endTm));
            newLastRow.put("endTm", limit);
            newLastRow.put("diffMin", dfMin);
            newLastRow.put("status", "empty");
            fullPlan.add(newLastRow);
          }
        }
      }

      catch(ParseException e) {
        e.printStackTrace();
      }
    }

    return fullPlan;
  }

  // -----------------------------------------------------------------------------------------------
  public long diffMin(String tm1, String tm2) throws Exception {

    SimpleDateFormat f = new SimpleDateFormat("HH:mm:ss", Locale.KOREA);
    Date d1 = f.parse(tm1 + ":00");
    Date d2 = f.parse(tm2 + ":00");
    long diff = d2.getTime() - d1.getTime();
    long diffMin = diff / (60 * 1000);

    return diffMin;
  }

  // -----------------------------------------------------------------------------------------------
  public String addTime(String stTime, int addTime) {

    SimpleDateFormat sdformat = new SimpleDateFormat("HH:mm");
    Calendar cal = Calendar.getInstance();
    stTime = stTime.replace(" ", "T");
    Instant instant1 = Instant.parse(stTime + ":00.041Z").minusSeconds(60 * 60 * 9);
    Date sTime = Date.from(instant1);
    cal.setTime(sTime);
    cal.add(Calendar.MINUTE, addTime);
    String addedTm = sdformat.format(cal.getTime());

    return addedTm;
  }

  // -----------------------------------------------------------------------------------------------
  public String minUp(String tm) {

    log.info("Input Time : " + tm);
    String rsTm = "";
    String[] divTm = tm.split(":");
    double minD = Double.parseDouble(divTm[1]) / 10;
    int minI = (int) Math.ceil(minD);
    minI = minI * 10;
    String min = ":" + Integer.toString(minI);
    String hrs = divTm[0];
    String hr = divTm[0];
    if (minI == 60) {
      min = ":00";
      int hrI = Integer.parseInt(hrs) + 1;
      hr = Integer.toString(hrI);
      if (hrI < 10) {
        hr = "0" + hr;
      }
    }
    if (min.equals(":0")) {
      min += "0";
    }
    rsTm = hr + min;
    log.info("Output Time : " + rsTm);

    return rsTm;
  }

  // -----------------------------------------------------------------------------------------------
  public void info(String str) {

    SimpleDateFormat drFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss", Locale.KOREA);
    Calendar cal = Calendar.getInstance();
    String curTm = drFormat.format(cal.getTime());
    String displayStr = "";
    try {
      byte utf8Bytes[] = str.getBytes("UTF-8");
      displayStr = new String(utf8Bytes, "UTF-8");
    }

    catch(UnsupportedEncodingException e) {
      e.printStackTrace();
    }
    System.out.println("[" + curTm + "] " + displayStr);
  }

  // -----------------------------------------------------------------------------------------------
  public void info(String str, Object curClass) {

    SimpleDateFormat drFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss", Locale.KOREA);
    Calendar cal = Calendar.getInstance();
    String curTm = drFormat.format(cal.getTime());
    String displayStr = "";
    try {
      byte utf8Bytes[] = str.getBytes("UTF-8");
      displayStr = new String(utf8Bytes, "UTF-8");
    }

    catch(UnsupportedEncodingException e) {
      e.printStackTrace();
    }
    System.out.println("[" + curTm + "] [" + curClass.getClass().getName() + "] " + displayStr);
  }

  // -----------------------------------------------------------------------------------------------
  public String curTm() {

    DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    String curTm = dateFormat.format(new java.util.Date());

    return curTm;
  }

  // -----------------------------------------------------------------------------------------------
  public String curDt() {

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    String curDt = dateFormat.format(new java.util.Date());

    return curDt;
  }

  // -----------------------------------------------------------------------------------------------
  public String getRamdomPass(int len) {

    char[] charSet = new char[] {
      '0',
      '1',
      '2',
      '7',
      '8',
      '9',
      'A',
      'B',
      'p',
      'q',
      'r',
      's',
      'C',
      'D',
      '@',
      '#',
      '$',
      'E',
      'F',
      'G',
      'H',
      'c',
      'd',
      'm',
      'J',
      'K',
      'L',
      'M',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'N',
      'P',
      'Q',
      'R',
      '3',
      '4',
      '5',
      '6',
      'S',
      'T',
      'U',
      'V',
      'W',
      'v',
      'w',
      'X',
      'Y',
      'Z',
      '!',
      '%',
      '*',
      'a',
      'b',
      'n',
      'o',
      't',
      'u',
      'y',
      'x',
      'z',
    };
    int idx = 0;
    StringBuffer sb = new StringBuffer ();
    log.info("charSet.length :::: " + charSet.length);
    for (int i = 0; i < len; i++) {
      idx = (int) (charSet.length * Math.random());
      sb.append(charSet[idx]);
    }

    return sb.toString();
  }

  // -----------------------------------------------------------------------------------------------
  public void sendMail(String from, String to, String subject, String context) {

    final String host = "mail.coresinc.co.kr";
    final String accountId = "hooshim";
    final String accountPwd = "1212";
    final int port = 465;
    String receiver = to;
    String sender = from;
    Properties props = System.getProperties();
    props.put("mail.smtp.host", host);
    props.put("mail.smtp.port", port);
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.ssl.enable", "true");
    props.put("mail.smtp.ssl.trust", host);
    Session session = Session.getDefaultInstance(
      props,
      new javax.mail.Authenticator() {
        protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
          return new javax.mail.PasswordAuthentication(accountId, accountPwd);
        }
      }
    );
    session.setDebug(true);
    Message mimeMessage = new MimeMessage(session);
    try {
      mimeMessage.setFrom(new InternetAddress(sender));
      mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
      mimeMessage.setSubject(subject);
      mimeMessage.setContent(context, "text/html; charset=UTF-8");
      Transport.send(mimeMessage);
    }

    catch(AddressException e) {
      e.printStackTrace();
    }

    catch(MessagingException e) {
      e.printStackTrace();
    }
  }

  // -----------------------------------------------------------------------------------------------
  public void UDPSend(String msg, InetAddress ia, int port) {

    msg = msg.replace(" ", "");
    byte rsBuffer[] = hexStringToByteArray(msg);
    DatagramSocket ds = null;
    try {
      ds = new DatagramSocket(port);
    }

    catch(SocketException e) {
      e.printStackTrace();
    }
    DatagramPacket dp = new DatagramPacket(rsBuffer, rsBuffer.length, ia, port);
    try {
      ds.send(dp);
      ds.close();
    }

    catch(IOException e) {
      e.printStackTrace();
    }
  }

  // -----------------------------------------------------------------------------------------------
  public static byte[] hexStringToByteArray(String s) {

    int len = s.length();
    byte[] data = new byte[len / 2];
    for (int i = 0; i < len; i += 2) {
      data[i / 2] =
        (byte) ((Character.digit(s.charAt(i), 16) << 4) + Character.digit(s.charAt(i + 1), 16));
    }

    return data;
  }

  // -----------------------------------------------------------------------------------------------
  public static void fileUpload(MultipartFile fileData, String path, String fileName) {

    String originalFileName = fileData.getOriginalFilename();
    String contentType = fileData.getContentType();
    long fileSize = fileData.getSize();
    InputStream is = null;
    OutputStream out = null;
    try {
      if (fileSize > 0) {
        is = fileData.getInputStream();
        File realUploadDir = new File(path);
        if (!realUploadDir.exists()) {
          realUploadDir.mkdirs();
        }
        out = new FileOutputStream(path + "/" + fileName);
        int rslt = FileCopyUtils.copy(is, out);
        log.info(out.toString());
      }
      else {
      	new IOException("잘못된 파일을 업로드 하셨습니다.");
      }
    }

    catch(IOException e) {
      e.printStackTrace();
      log.info("IOExcept : " + e.getMessage());
      new IOException("파일 업로드에 실패하였습니다.");
    }

    finally{
      if (out != null) {
        try {
          out.close();
        }

        catch(IOException e) {
          e.printStackTrace();
        }
      }
      if (is != null) {
        try {
          is.close();
        }

        catch(IOException e) {
          e.printStackTrace();
        }
      }
    }
  }

  // -----------------------------------------------------------------------------------------------
  public String sendSMS(String apiKey, String apiSecret, String from, String to, String msg) {

    String resultMsg = "";
    net.nurigo.java_sdk.api.Message coolsms = new net.nurigo.java_sdk.api.Message(
      apiKey,
      apiSecret
    );
    HashMap<String, String> set = new HashMap<String, String>();
    set.put("to", to);
    set.put("from", from);
    set.put("text", msg);
    set.put("type", "sms");
    JSONObject result;
    try {
      result = (JSONObject) coolsms.send(set);
      log.info("SMS Result : " + result.toString());
    }

    catch(CoolsmsException e) {
      e.printStackTrace();
    }

    return resultMsg;
  }

  // -----------------------------------------------------------------------------------------------
  public void RESTpost(String message, String to) {

    String apiKey = "B05BCQVt0nfdfr81Y7ju";
    String bizMUserid = "story4you";
    String profileKey = "853ec1f5670c8a299fe97d7afca3c14e8b88deeb";
    String requestURL = "http://salimtalk-api.bizmsg.kr/v2/sender/send";
    String msg = jsonMsg(message, to);
    log.info(msg);
    try {
      HttpClient client = HttpClientBuilder.create().build();
      HttpPost postRequest = new HttpPost(requestURL);
      postRequest.setHeader("Accept", "application/json");
      postRequest.setHeader("Connection", "keep-alive");
      postRequest.setHeader("Content-Type", "application/json");
      postRequest.addHeader("userid", bizMUserid);
      postRequest.addHeader("x-api-key", apiKey);
      postRequest.setEntity(new StringEntity(msg, "UTF-8"));
      HttpResponse response = client.execute(postRequest);
      if (response.getStatusLine().getStatusCode() == 200) {
        ResponseHandler<String> handler = new BasicResponseHandler();
        String body = handler.handleResponse(response);
        log.info(body);
      }
      else {
      	log.info("response is error : " + response.getStatusLine().getStatusCode());
      }
    }

    catch(Exception e) {
      log.info(e.getMessage());
    }
  }

  // -----------------------------------------------------------------------------------------------
  public String jsonMsg(String msg, String to) {

    String cd = "";
    log.info("phone : " + to);
    String talkMsg = "[SChecker]\n" + msg;
    String smsMsg = talkMsg.replace("\\\n", " ");
    String jsonMsg = "[";
    String msgs = "";
    String[] divTo = to.split(",");
    for (int c = 0; c < divTo.length; c++) {
      String phone = divTo[c].substring(1, divTo[c].length());
      phone = phone.replace("-", "");
      phone = phone.replace(".", "");
      if (msgs.equals("") == false) {
        msgs += ",";
        msgs +=
          "	{" +
          "		\"message_type\": \"at\", \"phn\": \"82" +
          phone +
          "\"," +
          "		\"profile\": \"853ec1f5670c8a299fe97d7afca3c14e8b88deeb\"," +
          "		\"tmplId\": \"schainworks_event" +
          cd +
          "\"," +
          "		\"msg\": \"" +
          talkMsg +
          "\"," +
          "		\"msgSms\": \"" +
          smsMsg +
          "\"," +
          "		\"button1\": {\"name\": \"S.Chain Works\",\"type\": \"WL\", \"url_mobile\": \"http://schainworks.com\", \"url_pc\":\"http://schainworks.com\"}," +
          "		\"smsSender\": \"0312596172\"," +
          "		\"smsKind\": \"S\"," +
          "		\"reserveDt\": \"00000000000000\"" +
          "	}";
      }
    }
    jsonMsg += msgs + "	]";

    return jsonMsg;
  }

  // -----------------------------------------------------------------------------------------------
  public String jsonMsg(String devNm, String msg, String to) {

    String[] divMsg = msg.split("/");
    String cd = divMsg[0];
    log.info("phone : " + to);
    String message = divMsg[1];
    String talkMsg = "[에스체인웍스]\n" + devNm + " " + message;
    String smsMsg = talkMsg.replace("\\\n", " ");
    String jsonMsg = "[";
    String msgs = "";
    String[] divTo = to.split(",");
    for (int c = 0; c < divTo.length; c++) {
      String phone = divTo[c].substring(1, divTo[c].length());
      phone = phone.replace("-", "");
      phone = phone.replace(".", "");
      if (msgs.equals("") == false) {
        msgs += ",";
        msgs +=
          "	{" +
          "		\"message_type\": \"at\", \"phn\": \"82" +
          phone +
          "\"," +
          "		\"profile\": \"853ec1f5670c8a299fe97d7afca3c14e8b88deeb\"," +
          "		\"tmplId\": \"schainworks_event" +
          cd +
          "\"," +
          "		\"msg\": \"" +
          talkMsg +
          "\"," +
          "		\"msgSms\": \"" +
          smsMsg +
          "\"," +
          "		\"button1\": {\"name\": \"S.Chain Works\",\"type\": \"WL\", \"url_mobile\": \"http://schainworks.com\", \"url_pc\":\"http://schainworks.com\"}," +
          "		\"smsSender\": \"0312596172\"," +
          "		\"smsKind\": \"S\"," +
          "		\"reserveDt\": \"00000000000000\"" +
          "	}";
      }
    }
    jsonMsg += msgs + "	]";

    return jsonMsg;
  }

  // -----------------------------------------------------------------------------------------------
  public String deleteUploadFile(String fileDir) {

    File file = new File(fileDir);
    String msg;
    try {
      if (file.exists()) {
        if (file.delete()) {
          msg = "삭제 되었습니다.";
        }
        else {
        	msg = "파일 삭제가 실패하였습니다.";
        }
      }
      else {
      	msg = "파일이 존재하지 않습니다.";
      }
    }

    catch(Exception e) {
      e.printStackTrace();
      msg = "파일 삭제가 실패하였습니다.";
    }

    return msg;
  }

  // -----------------------------------------------------------------------------------------------
  public String decrypt(String str) {

    String rsStr = "";
    String divStr[] = str.split("#");
    HashMap<String, Object> arrStr = new HashMap<String, Object>();
    arrStr.put("A", 0);
    arrStr.put("d", 1);
    arrStr.put("E", 2);
    arrStr.put("B", 3);
    arrStr.put("x", 4);
    arrStr.put("Z", 5);
    arrStr.put("K", 6);
    arrStr.put("j", 7);
    arrStr.put("M", 8);
    arrStr.put("P", 9);
    arrStr.put("q", "-");
    int len = divStr[0].length();
    for (int k = 0; k < len; k++) {
      String chr = divStr[0].substring(k, (k + 1));
      rsStr += arrStr.get(chr);
    }

    return rsStr;
  }

  // -----------------------------------------------------------------------------------------------
  public void shipExcel(
    int shipCd,
    HashMap<String, Object> shipDetail,
    Company comp,
    ArrayList<HashMap<String, Object>> shippingList,
    HttpServletResponse response,
    Map<String, Object> map
  ) throws IOException, URISyntaxException {

    SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
    String now = format.format(new Date());
    URL urlExcel = getClass().getClassLoader().getResource("ship_Excel.xls");
    if (urlExcel == null) {
      throw new RuntimeException("ship_Excel.xls 리소스를 찾을 수 없습니다.");
    }
    String excelUrl = Paths.get(urlExcel.toURI()).toFile().getAbsolutePath();
    String fileUrl = map.get("fileUrl").toString();
    String gFileDir = map.get("fileDir").toString();
    URL urlNoLogo = getClass().getClassLoader().getResource("no-logo.png");
    System.out.println("excelUrl===================================\n" + excelUrl);
    System.out.println("fileUrl===================================\n" + fileUrl);
    System.out.println("gFileDir===================================\n" + gFileDir);
    byte[] imageBytes;
    if (fileUrl == null || fileUrl == "") {
      try (FileInputStream fis = new FileInputStream(Paths.get(urlNoLogo.toURI()).toFile())) {
        imageBytes = new byte[(int) fis.available()];
        fis.read(imageBytes);
      }
    }
    else {
    	try (FileInputStream fis = new FileInputStream(new File(gFileDir + fileUrl))) {
        imageBytes = new byte[(int) fis.available()];
        fis.read(imageBytes);
    }
    }

    // 이미지 형식 확인 후 올바른 타입 지정 (기본값으로 PNG 설정)
    int imageType = HSSFWorkbook.PICTURE_TYPE_PNG;
    String fileExtension = fileUrl.substring(fileUrl.lastIndexOf('.') + 1).toUpperCase();
    if (
      "jpg".equals(fileExtension) ||
      "JPG".equals(fileExtension) ||
      "jpeg".equals(fileExtension) ||
      "JPEG".equals(fileExtension)
    ) {
      imageType = HSSFWorkbook.PICTURE_TYPE_JPEG;
    }
    HSSFWorkbook xlsxWb;
    try (FileInputStream file = new FileInputStream(excelUrl)) {
      xlsxWb = new HSSFWorkbook(file);
    }
    HSSFSheet sheet1 = xlsxWb.getSheetAt(0);
    if (imageBytes.length > 0) {
      int pictureIdx = xlsxWb.addPicture(imageBytes, imageType);
      CreationHelper helper = xlsxWb.getCreationHelper();
      Drawing drawing = sheet1.createDrawingPatriarch();
      ClientAnchor anchor = helper.createClientAnchor();
      anchor.setCol1(0);
      anchor.setRow1(0);
      anchor.setCol2(2);
      anchor.setRow2(2);
      int widthInPixels = (int) (12 * 16.56);
      int heightInPixels = (int) (4 * 16.56);
      anchor.setDx1(1);
      anchor.setDy1(1);
      anchor.setDx2(widthInPixels);
      anchor.setDy2(heightInPixels);
      drawing.createPicture(anchor, pictureIdx);
    }
    POIExcelMaker exPOI = new POIExcelMaker();
    System.out.println("shipDetail===================================\n" + shipDetail);
    try {
      String compNm = Objects.toString(comp.getCompNm(), "");
      String compType = Objects.toString(comp.getCompType(), "");
      String address = Objects.toString(comp.getAddress(), "");
      String compPart = Objects.toString(comp.getCompPart(), "");
      String compNo = Objects.toString(comp.getCompNo(), "");
      String phone = Objects.toString(comp.getPhone(), "");
      String owner = Objects.toString(comp.getOwner(), "");
      String shipMajor = Objects.toString(shipDetail.get("shipMajor"), "");
      String account = Objects.toString(shipDetail.get("compNm"), "");
      String count = Objects.toString(shipDetail.get("cnt"), "");
      Integer cnt = Integer.parseInt(count.isEmpty() ? "0" : count);
      String detailed = "";
      if (shippingList.get(0).get("prodNm") != null) {
        detailed = shippingList.get(0).get("prodNm").toString() + " 외 " + cnt + " 건";
      }
      else {
      	detailed = "외 " + cnt + " 건";
      }
      int arraySize = shippingList.size();
      int startRow = 14;
      int rowNo = 200;
      Row row = null;
      Cell cell = null;
      exPOI.createCellBasic(11, 2, detailed, row, cell, sheet1);
      exPOI.createCellBasic(6, 0, shipMajor, row, cell, sheet1);
      exPOI.createCellBasic(9, 5, phone, row, cell, sheet1);
      exPOI.createCellBasic(6, 7, owner, row, cell, sheet1);
      exPOI.createCellBasic(5, 0, account, row, cell, sheet1);
      exPOI.createCellBasic(8, 5, compType, row, cell, sheet1);
      exPOI.createCellBasic(7, 5, address, row, cell, sheet1);
      exPOI.createCellBasic(8, 7, compPart, row, cell, sheet1);
      exPOI.createCellBasic(5, 5, compNo, row, cell, sheet1);
      exPOI.createCellBasic(6, 5, compNm, row, cell, sheet1);
      for (int k = 0; k < arraySize; k++) {
        HashMap<String, Object> detail = shippingList.get(k);
        String shipDt = Objects.toString(detail.get("shipDt"), "");
        String prodNm = Objects.toString(detail.get("prodNm"), "");
        String qty = Objects.toString(detail.get("qty"), "");
        String option1 = Objects.toString(detail.get("option1"), "");
        String option2 = Objects.toString(detail.get("option2"), "");
        exPOI.createCellBasic(8, 0, shipDt, row, cell, sheet1);
        exPOI.createCellBasic(startRow + k, 0, prodNm, row, cell, sheet1);
        exPOI.createCellBasic(startRow + k, 4, option2, row, cell, sheet1);
        exPOI.createCellBasic(startRow + k, 5, option1, row, cell, sheet1);
        exPOI.createCellBasic(startRow + k, 7, qty, row, cell, sheet1);
      }

      // 배열 크기에 따라서 엑셀 행 추가 및 삭제
      if (arraySize < rowNo) {
        for (int j = (rowNo - arraySize); j > 0; j--) {
          Row rowToRemove = sheet1.getRow(startRow + arraySize + j - 1);
          if (rowToRemove != null) {
            sheet1.removeRow(rowToRemove);
          }
        }
      }

      // 엑셀 파일 다운로드
      try {
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=shipExcel_" + now + ".xls");
        try (OutputStream fileOut = response.getOutputStream()) {
          xlsxWb.write(fileOut);
          fileOut.flush();
        }
      }

      catch(FileNotFoundException e) {
        e.printStackTrace();
      }

      catch(IOException e) {
        e.printStackTrace();
      }
    }

    catch(Exception e) {
      e.printStackTrace();
    }
  }
}
