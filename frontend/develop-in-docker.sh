#!/usr/bin/env bash

yarn install --no-bin-links
ng serve --host 0.0.0.0 --port 80 --disableHostCheck=true --poll 100
