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

  local changelog_path="../changelog.md"

  # changelog.md 파일이 없으면 생성
  [ ! -f "$changelog_path" ] && {
    echo "# Changelog" > "$changelog_path"
    echo "" >> "$changelog_path"
    echo "### [ 1.0.0 ]" >> "$changelog_path"
    echo "" >> "$changelog_path"
    echo "- $(date +"%Y-%m-%d (%H:%M:%S)") - Initial version" >> "$changelog_path"
  }

  local current_date=$(date +"%Y-%m-%d")
  local current_time=$(date +"%H:%M:%S")
  local last_version=$(grep -oP '\d+\.\d+\.\d+' "$changelog_path" 2>/dev/null | tail -1)
  local new_version=${last_version:+$(echo $last_version | awk -F. -v OFS=. '{$NF += 1 ; print}')}
  new_version=${new_version:-"1.0.1"}

  echo -e "\n### [ $new_version ]\n\n- $current_date ($current_time)" >> "$changelog_path"
  echo "Changelog updated to version $new_version"
}

# changelog.md 파일 복사 ###########################################################################
copy_changelog() {
  echo "Copying changelog.md file..."

  local changelogFile="../changelog.md"
  local copyPath="../src/main/resources/static/changelog.md"
  local targetDir="../src/main/resources/static"

  # 디렉토리가 없으면 생성
  [ ! -d "$targetDir" ] && {
    mkdir -p "$targetDir"
    echo "Created directory: $targetDir"
  }

  [ -f "$changelogFile" ] && {
    cp "$changelogFile" "$copyPath"
    echo "changelog.md file copied."
  } || {
    echo "changelog.md file not found. Creating empty changelog in target location."
    echo "# Changelog" > "$copyPath"
    echo "" >> "$copyPath"
    echo "### [ 1.0.0 ]" >> "$copyPath"
    echo "" >> "$copyPath"
    echo "- $(date +"%Y-%m-%d (%H:%M:%S)") - Initial version" >> "$copyPath"
  }
}

# log4j2 수정 ######################################################################################
modify_log4j2() {
  echo "Modifying log4j2.xml file..."

  local log4jFile="../src/main/resources/log4j2.xml"

  [ -f "$log4jFile" ] && {
    sed -i 's/level="info"/level="error"/g' "$log4jFile"
    echo "log4j2.xml file modified."
  } || {
    echo "log4j2.xml file not found. Skipping log level modification."
    return 0
  }
}

# Git 푸시 (public) ################################################################################
git_push_public() {
  echo "Pushing changes to public repository..."

  cd .. || {
    echo "Failed to change directory. Aborting."
    exit 1
  }

  local ignoreFile=".gitignore"
  local ignorePublicFile=".gitignore.public"

  # public 파일 내용을 .gitignore로 복사 (기존 내용 삭제)
  [ -f "$ignorePublicFile" ] && {
    echo "" > "$ignoreFile"
    cat "$ignorePublicFile" > "$ignoreFile"
  }

  git rm -r --cached . 2>/dev/null || true
  git add .
  git commit -m "$(date +"%Y-%m-%d %H:%M:%S")" 2>/dev/null || {
    echo "Nothing to commit or commit failed."
  }

  git push --force origin master 2>/dev/null || {
    echo "Failed to push to public repository. Continuing..."
  }

  # .gitignore 파일 복구
  [ -f "$ignorePublicFile" ] && {
    echo "" > "$ignoreFile"
    cat "$ignorePublicFile" > "$ignoreFile"
  }

  cd .node || exit 1
  echo "Changes pushed to public repository."
}

# Git 푸시 (private) ###############################################################################
git_push_private() {
  echo "Pushing changes to private repository..."

  cd .. || {
    echo "Failed to change directory. Aborting."
    exit 1
  }

  local ignoreFile=".gitignore"
  local ignorePublicFile=".gitignore.public"
  local ignorePrivateFile=".gitignore.private"

  # private 파일 내용을 .gitignore로 복사 (기존 내용 삭제)
  [ -f "$ignorePrivateFile" ] && {
    echo "" > "$ignoreFile"
    cat "$ignorePrivateFile" > "$ignoreFile"
  }

  git rm -r --cached . 2>/dev/null || true
  git add .
  git commit -m "$(date +"%Y-%m-%d %H:%M:%S")" 2>/dev/null || {
    echo "Nothing to commit or commit failed."
  }

  git push --force private master 2>/dev/null || {
    echo "Failed to push to private repository. Continuing..."
  }

  # .gitignore 파일 복구
  [ -f "$ignorePublicFile" ] && {
    echo "" > "$ignoreFile"
    cat "$ignorePublicFile" > "$ignoreFile"
  }

  cd .node || exit 1
  echo "Changes pushed to private repository."
}

# 프로젝트 빌드 ####################################################################################
build_project() {
  echo "Project build started..."

  cd .. || {
    echo "Failed to change directory. Aborting."
    exit 1
  }

  mvn clean package && {
    echo "Project build completed successfully."
    cd .node
  } || {
    echo "Project build failed. Aborting upload."
    cd .node
    exit 1
  }
}

# gcloud에 업로드 ##################################################################################
upload_to_gcloud() {
  echo "Uploading file to gcloud..."

  gcloud storage cp ../target/WAREHOUSE.war gs://jungho-bucket/WAREHOUSE/SERVER/WAREHOUSE.war && {
    echo "File successfully uploaded to gcloud."
    run_remote_script
  } || {
    echo "File upload failed. Aborting remote execution."
    exit 1
  }
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

  local log4jFile="../src/main/resources/log4j2.xml"

  [ -f "$log4jFile" ] && {
    sed -i 's/level="error"/level="info"/g' "$log4jFile"
    echo "log4j2.xml file recovered."
  } || {
    echo "log4j2.xml file not found. Skipping log level recovery."
    return 0
  }
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