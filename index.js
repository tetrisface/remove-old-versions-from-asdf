import { clean, parse, major, lt, eq } from "semver";
import { execSync } from "node:child_process";

const installedVersions = execSync("asdf list nodejs", { encoding: "utf-8" })
  .split("\n")
  .map((version) => version.replace("*", ""))
  .map((version) => clean(version))
  .filter((version) => version !== null);

const versionsToKeep = installedVersions.reduce((toKeep, installedVersion) => {
  const { version, major } = parse(installedVersion);

  if (!toKeep.has(major)) {
    toKeep.set(major, version);
  }

  if (lt(toKeep.get(major), version)) {
    toKeep.set(major, version);
  }
  return toKeep;
}, new Map());

for (const version of installedVersions) {
  const majorVersion = major(version);
  const versionToKeep = versionsToKeep.get(majorVersion);

  if (!eq(version, versionToKeep)) {
    console.log(`Uninstalling ${version}`);
    execSync(`asdf uninstall nodejs ${version}`);
  }
}
