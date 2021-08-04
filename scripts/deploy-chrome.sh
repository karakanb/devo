#! /bin/bash
set -e

# check that the env variables are set
declare -a vars=(SOURCE_ZIP EXTENSION_ID CLIENT_ID CLIENT_SECRET REFRESH_TOKEN)
for var_name in "${vars[@]}"
do
  if [ -z "$(eval "echo \$$var_name")" ]; then
    echo "Missing environment variable $var_name"
    exit 1
  fi
done

# install the chrome uploader tool
npm install --silent --no-progress -g chrome-webstore-upload-cli

ls -lah
ls dist-zip

# upload and publish the extension
webstore upload \
    --source $SOURCE_ZIP \
    --extension-id $EXTENSION_ID \
    --client-id $CLIENT_ID \
    --client-secret $CLIENT_SECRET \
    --refresh-token $REFRESH_TOKEN
    --auto-publish

echo "Successfully published to chrome store"