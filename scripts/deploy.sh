#!/usr/bin/env sh

# abort on errors
set -e

# build
cd docs/ && yarn build

# navigate into the build output directory
cd build


git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://github.com/<USER>/<REPO>.git
git push -f https://github.com/fabienwnklr/drawer-doc.git master

cd -