#!/usr/bin/env bash

if [ -z $1 ] || [ -z $2 ]; then
  echo "Expected year and day arguments (npm run new -- 2021 01)"
  exit 1
fi

path=./src/$1/$2

if [ -d $path ]; then
  echo "Directory $path already exists"
  exit 1
fi

index=$path/index.ts
test=$path/test.ts
input=$path/input

mkdir -p $path

cp ./new/templates/* $path

sed -i "s/{{year}}/$1/" $test
sed -i "s/{{day}}/$2/" $test

nvim -p $index $test $input
