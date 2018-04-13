#!/bin/bash

yarn
yarn build
rm -rf /var/www/prod/*
cp -r dist/* /var/www/prod/
cp favicon.png /var/www/prod/
