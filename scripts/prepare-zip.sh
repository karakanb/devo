#! /bin/bash
set -e

rm -rf dist-zip
mkdir -p dist-zip

# Prepare the dist ZIP to be uploaded
zip -r -9 -X -qq dist-zip/dist.zip dist

# Prepare the source code ZIP
zip -r -9 -X -qq dist-zip/src.zip . -x "*dist/*" -x "*.git/*" -x "*.DS_Store" -x "*node_modules*" -x "*.github/*" -x "*docs/*"