#! /bin/bash
set -e

MANIFEST_PATH='public/manifest.json'
VERSION=$(jq -r '.version' package.json)

jq --arg VERSION "$VERSION" '.version = $VERSION' $MANIFEST_PATH | sponge $MANIFEST_PATH
