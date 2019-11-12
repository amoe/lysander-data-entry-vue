#! /bin/sh

set -eu

rm -rf dist
npm run build
rsync --bwlimit=128k -aPv --delete dist/ visarend.solasistim.net:/srv/http/lysander_old/
