# Remove old NodeJS Versions from asdf

This is a tiny utility script that I use, since I work in multiple projects with multiple node versions which I manage
via the excellent [asdf](https://asdf-vm.com). However, after some time it collects quite some cruft in terms of old
node versions, so I've decided to write this to delete old versions, but always keep the latest version per major version.

So for example if you have Node 18.12.1 and Node 18.11.0 installed, this will keep 18.12.1, but will uninstall 18.11.0.

## Setup

1. Clone
2. npm install
3. `npm start`

Be happy.
