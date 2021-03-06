#!/bin/sh
APP="CountScore"
APP_DESCR="Web App permettant de calculer des scores"
PORT="8086"
VERSION="1\.0\.0"
GITHUB="Flaykz\/CountScore"

sed -i "s/\"title\": \".*\"/\"title\": \"$APP\"/g" config.js
sed -i "s/\"PORT\": .*,/\"PORT\": $PORT,/g" config.js
sed -i "s/\"short_name\": \".*\",/\"short_name\": \"$APP\",/g" manifest.json
sed -i "s/\"name\": \".*\",/\"name\": \"$APP_DESCR\",/g" manifest.json
sed -i "s/# .* AppCache .*/# $APP AppCache v$VERSION/g" offline.appcache
sed -i "s/\"name\": \".*\",/\"name\": \"$APP\",/g" package.json
sed -i "s/\"version\": \".*\",/\"version\": \"$VERSION\",/g" package.json
sed -i "s/\"description\": \".*\",/\"description\": \"$APP_DESCR\",/g" package.json
sed -i "s/\"url\": \"git@github.com:.*\"/\"url\": \"git@github.com:$GITHUB\.git\"/g" package.json
sed -i "s/\"url\": \"https:\/\/github.com\/.*\"/\"url\": \"https:\/\/github.com\/$GITHUB\/issues\"/g" package.json
sed -i "s/\"homepage\": \"https:\/\/github.com\/.*\",/\"homepage\": \"https:\/\/github.com\/$GITHUB#readme\",/g" package.json
sed -i "s/var version = 'v.*';/var version = 'v$VERSION';/g" sw.js
sed -i "s/var CACHE_NAME = '.*-cache';/var CACHE_NAME = '$APP-cache';/g" sw.js