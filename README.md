# Remove old versions from asdf

This is a tiny utility script that I use, since I often work in multiple projects
that have multiple node versions which I manage via the excellent [asdf](https://asdf-vm.com).
However, after some time it collects quite some cruft in terms of old versions of runtimes,
so I've decided to write this to delete old versions, but always keep the latest version per major or minor version.

So for example if you have Node `18.12.1` and Node `18.11.0` installed, this will keep `18.12.1`, but will uninstall `18.11.0`.
For others I keep the latest minor versions, for example for Ruby, if you have
`3.2.0`, `3.1.3` and `3.1.2` installed, it will keep `3.2.0` and `3.1.3`, but will uninstall
`3.1.2`.

This is a quick & dirty script and has no error handling whatsoever. It's just there
to keep my computer a bit cleaner and it might be of use for you too.

## Setup

1. Clone
2. npm install
3. `npm start`

Be happy.
