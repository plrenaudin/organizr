#!/bin/bash

git stash
git pull --rebase
git stash pop
yarn
yarn build
rm -rf /var/www/prod/*
cp -r dist/* /var/www/prod/
cp favicon.png /var/www/prod/
