#!/usr/bin/env bash

node -e "const peers = Object.entries(require('./package.json').peerDependencies || {}).map(d => d.join('@')).join(' '); if (peers.length) process.stdout.write('yarn add -P --no-lockfile ' + String(peers));" | bash