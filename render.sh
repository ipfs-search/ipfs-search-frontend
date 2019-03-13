#!/bin/sh

if output=$(git status --porcelain) && [ -z "$output" ]; then
    # Working directory clean
    npm install
    rm -rf dist/*
    ember build --environment production
    git checkout v2_rendered
    cp -r dist/* .
    git add assets
    git commit -a -m 'Updated render'
    git push
    git reset --hard
    git checkout v2
else
    # Uncommitted changes
    echo 'Uncommitted changes. Cowardly refusing to operate'
    exit -1
fi

