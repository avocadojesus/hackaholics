#!/usr/bin/env bash

TMP_DIR="${pwd}/tmp"
ZIP_NAME="development.zip"
REPO="https://github.com/avocadojesus/hackaholics"
BRANCH="development"
REPO_ZIP = "${REPO}/zipball/${BRANCH}"
mkdir "$TMP_DIR"
echo "$TMP_DIR"
echo "$ZIP_NAME"
echo "$REPO_ZIP"
cd "$TMP_DIR" && wget -O "$ZIP_NAME" -q "$REPO_ZIP"

# Second, unzip it, if the zip file exists
#if [ -f /path/to/put/zip/file/projectmaster.zip ]; then
  # Unzip the zip file
#  unzip -q /path/to/put/zip/file/projectmaster.zip

  # Delete zip file
#  rm /path/to/put/zip/file/projectmaster.zip

  # Rename project directory to desired name
#  mv Project-master somesite.com

  # Delete current directory
#  rm -rf /var/www/somesite.com

  # Replace with new files
#  mv somesite.com /var/www/

  # Perhaps call any other scripts you need to rebuild assets here
  # or set owner/permissions
  # or confirm that the old site was replaced correctly
#fi
