APP_NAME=banks
APP_FOLDER=$HOME/.cozy/storage/cozy.tools\:8080/.cozy_apps/$APP_NAME
SRC_FOLDER=$HOME/projects/cozy/$APP_NAME

cozy-stack --domain cozy.tools:8080 apps uninstall $APP_NAME

rm -rf $APP_FOLDER

cozy-stack --domain cozy.tools:8080 apps install $APP_NAME file://$SRC_FOLDER/build

APP_INSTALLED=$(ls $APP_FOLDER)
rm -rf $APP_FOLDER/$APP_INSTALLED
ln -s $SRC_FOLDER/build $APP_FOLDER/$APP_INSTALLED

yarn watch:browser
