import { clean, parse, lt, eq } from "semver";
import { execSync } from "node:child_process";

const config = {
  python: "*",
  nodejs: "*",
  // ruby: "minor",
  // elixir: "minor",
  // erlang: "minor",
};

const versionTokenFor = (language, version) => {
  const { major, minor } = parse(version);

  return config[language] === "minor" ? `${major}.${minor}` : major;
};

Object.keys(config).forEach((language) => {
  const installedVersions = execSync(`asdf list ${language}`, {
    encoding: "utf-8",
  })
    .split("\n")
    .map((version) => version.replace("*", ""))
    .map((version) => clean(version))
    .filter((version) => version !== null);

  const versionsToKeep = installedVersions.reduce(
    (toKeep, installedVersion) => {
      const { version } = parse(installedVersion);
      const versionToken = versionTokenFor(language, installedVersion);

      if (!toKeep.has(versionToken)) {
        toKeep.set(versionToken, version);
      }

      if (lt(toKeep.get(versionToken), version)) {
        toKeep.set(versionToken, version);
      }

      return toKeep;
    },
    new Map()
  );

  if (typeof process.env["DEBUG"] !== "undefined") {
    console.log({ language, installedVersions, versionsToKeep });
  }

  for (const installedVersion of installedVersions) {
    const versionToken = versionTokenFor(language, installedVersion);

    const versionToKeep = versionsToKeep.get(versionToken);

    if (!eq(installedVersion, versionToKeep)) {
      console.log(`Uninstalling ${language} ${installedVersion}`);
      execSync(`asdf uninstall ${language} ${installedVersion}`);
    } else {
      console.log(`Keeping ${language} ${installedVersion}`);
    }
  }
});
