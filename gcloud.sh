#!/bin/bash

# OS 확인 ##########################################################################################
if [[ "$OSTYPE" == "msys" ]]; then
  OS="win"
else
  OS="linux"
fi
echo "Activated OS is : $OS"

# 변경 로그 수정 ###################################################################################
modify_changelog() {

  echo "Modifying changelog.md file..."

  local current_date=$(date +"%Y-%m-%d")
  local current_time=$(date +"%H:%M:%S")
  local last_version=$(grep -oP '\d+\.\d+\.\d+' changelog.md | tail -1)
  local new_version=$(echo $last_version | awk -F. -v OFS=. '{$NF += 1 ; print}')
  echo -e "\n### \[ $new_version \]\n\n- $current_date ($current_time)" >> changelog.md

  echo "Changelog updated to version $new_version"
}

# changelog.md 파일 복사 ###########################################################################
copy_changelog() {

  echo "Copying changelog.md file..."

  local changelogFile="changelog.md"
  local copyPath="src/main/resources/static/changelog.md"

  if [ -f $changelogFile ]; then
    cp $changelogFile $copyPath
    echo "changelog.md file copied."
  else
    echo "changelog.md file not found. Aborting upload."
    exit 1
  fi
}

# log4j2 수정 ######################################################################################
modify_log4j2() {

  echo "Modifying log4j2.xml file..."

  # level="info" -> level="error"

  local log4jFile="src/main/resources/log4j2.xml"

  if [ -f $log4jFile ]; then
    sed -i 's/level="info"/level="error"/g' $log4jFile
    echo "log4j2.xml file modified."
  else
    echo "log4j2.xml file not found. Aborting upload."
    exit 1
  fi
}

# Git 푸시 (public) ################################################################################
git_push_public() {
  echo "Pushing changes to public repository..."

  local ignoreFile=".gitignore"
  local ignorePublicFile=".gitignore.public"

  # public 파일 내용을 .gitignore로 복사 (기존 내용 삭제)
  if [ -f $ignorePublicFile ]; then
    echo "" > $ignoreFile
    cat $ignorePublicFile > $ignoreFile
  fi

  git rm -r --cached .
  git add .
  git commit -m "$(date +"%Y-%m-%d %H:%M:%S")"
  git push origin master

  # .gitignore 파일 복구
  if [ -f $ignorePublicFile ]; then
    echo "" > $ignoreFile
    cat $ignorePublicFile > $ignoreFile
  fi

  echo "Changes pushed to public repository."
}

# Git 푸시 (private) ###############################################################################
git_push_private() {
  echo "Pushing changes to private repository..."

  local ignoreFile=".gitignore"
  local ignorePublicFile=".gitignore.public"
  local ignorePrivateFile=".gitignore.private"

  # private 파일 내용을 .gitignore로 복사 (기존 내용 삭제)
  if [ -f $ignorePrivateFile ]; then
    echo "" > $ignoreFile
    cat $ignorePrivateFile > $ignoreFile
  fi

  git rm -r --cached .
  git add .
  git commit -m "$(date +"%Y-%m-%d %H:%M:%S")"
  git push private master

  # .gitignore 파일 복구
  if [ -f $ignorePublicFile ]; then
    echo "" > $ignoreFile
    cat $ignorePublicFile > $ignoreFile
  fi

  echo "Changes pushed to private repository."
}

# 프로젝트 빌드 ####################################################################################
build_project() {
  echo "Project build started..."

  if mvn clean package; then
    echo "Project build completed successfully."
  else
    echo "Project build failed. Aborting upload."
    exit 1
  fi
}

# gcloud에 업로드 ##################################################################################
upload_to_gcloud() {
  echo "Uploading file to gcloud..."

  if gcloud storage cp target/WAREHOUSE.war gs://jungho-bucket/WAREHOUSE/SERVER/WAREHOUSE.war; then
    echo "File successfully uploaded to gcloud."
    run_remote_script
  else
    echo "File upload failed. Aborting remote execution."
    exit 1
  fi
}

# 원격 서버에서 작업 수행 ##########################################################################
run_remote_script() {

  echo "Running remote script..."

  local key_path="C:\\Users\\jungh\\.ssh\\JKEY"
  local ip_addr="104.196.212.101"
  local name="junghomun00"

  echo "Connecting to $name@$ip_addr with key $key_path"

  ssh -t -o StrictHostKeyChecking=no -i "$key_path" "$name@$ip_addr" << EOF
    cd /usr/share/tomcat9/webapps
    sudo rm -rf WAREHOUSE WAREHOUSE.war
    sudo gcloud storage cp gs://jungho-bucket/WAREHOUSE/SERVER/WAREHOUSE.war .
    sudo unzip WAREHOUSE.war -d WAREHOUSE
    sudo systemctl restart tomcat9
    exit
EOF

  echo "Remote server updated and application restarted."
}

# log4j2 복구 ######################################################################################
recover_log4j2() {

  echo "Recovering log4j2.xml file..."

  # level="error" -> level="info"

  local log4jFile="src/main/resources/log4j2.xml"

  if [ -f $log4jFile ]; then
    sed -i 's/level="error"/level="info"/g' $log4jFile
    echo "log4j2.xml file recovered."
  else
    echo "log4j2.xml file not found. Aborting upload."
    exit 1
  fi
}

# 실행 #############################################################################################
modify_changelog
copy_changelog
modify_log4j2
git_push_public
git_push_private
build_project
upload_to_gcloud
run_remote_script
recover_log4j2