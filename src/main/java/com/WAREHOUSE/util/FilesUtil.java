package com.WAREHOUSE.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.WAREHOUSE.container.Files;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;

@Component
/* @RequiredArgsConstructor */
public class FilesUtil {

  @Value("${storage-path}")
  private String STORAGE_PATH;

  @Value("${bucket-main}")
  private String BUCKET_MAIN;

  @Value("${bucket-folder}")
  private String BUCKET_FOLDER;

  private StringBuilder strBuilder;
  private Logs logs;

  // -----------------------------------------------------------------------------------------------
  public void uploadFiles(
    @RequestParam(required = false) MultipartFile multipartFile,
    @RequestParam String tableNm,
    @ModelAttribute Files files
  ) throws Exception {

    // 변수 선언
    String existingFile = (String) files.getFileNm();
    String fileName = (String) files.getFileUrl();
    String newFile = "";
    String mergedFile = "";

    if (!multipartFile.isEmpty()) {
      return;
    }

    byte[] bytes = multipartFile.getBytes();

    // storage 객체 생성
    Storage storage = StorageOptions.getDefaultInstance().getService();

    // blobId 생성
    BlobId blobId = BlobId.of(
      BUCKET_MAIN,
      BUCKET_FOLDER+"/"+tableNm+"/"+fileName
    );

    BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
    .setContentType(multipartFile.getContentType())
    .setContentDisposition("inline; filename=\"" + fileName + "\"")
    .build();

    Blob blob = storage.create(blobInfo, bytes);
    blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

    // 업로드된 파일 이름을 newFile에 추가
    strBuilder.append(fileName);

    // 최종 newFile 설정
    newFile = strBuilder.toString().trim();

    // 이미지 URL 합치기
    if (existingFile != null && existingFile.length() > 0) {
      if (newFile != null && newFile.length() > 0) {
        mergedFile = existingFile + "," + newFile;
      }
      else {
        mergedFile = existingFile;
      }
    }
    else {
      mergedFile = newFile;
    }

    logs.info("FilesUtil.uploadFiles", mergedFile);
  }
};