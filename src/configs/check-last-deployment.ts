import { join } from "path";
import { readdir, mkdir } from "fs/promises";

export async function checkLastDeployment({
  outDir,
  deploymentId,
  absoluteInputRootDir,
}) {
  const packageJsonPath = join(absoluteInputRootDir, "package.json");
  let currentPackageJsonHash;

  try {
    const packageJsonContent = await Bun.file(packageJsonPath).text();
    currentPackageJsonHash = Bun.hash(packageJsonContent).toString(16);
  } catch (error) {
    console.error("Error reading package.json:", error);
    throw new Error("Failed to read package.json");
  }

  const deploymentsDir = join(outDir, "deployments");
  let existingDeployments = [];

  try {
    existingDeployments = await readdir(deploymentsDir);
  } catch (error) {
    // console.error("Error accessing deployments directory:", error);
    // Continue with an empty list of existing deployments
  }

  const versionRegex = new RegExp(`^${deploymentId}-v(\\d+)\\.json$`);
  const versions = existingDeployments
    .map((file) => {
      const match = file.match(versionRegex);
      return match ? parseInt(match[1]) : 0;
    })
    .filter((v) => v > 0);

  const latestVersion = Math.max(0, ...versions);

  let lastPackageJsonHash = null;
  if (latestVersion > 0) {
    const lastDeploymentPath = join(
      deploymentsDir,
      `${deploymentId}-v${latestVersion}.json`
    );
    try {
      const lastDeploymentContent = await Bun.file(lastDeploymentPath).json();
      lastPackageJsonHash = lastDeploymentContent.packageJsonHash;
    } catch (error) {
      console.error("Error reading last deployment file:", error);
      // Continue with null lastPackageJsonHash
    }
  }

  const newVersion = latestVersion + 1;
  const newDeploymentId = `${deploymentId}-v${newVersion}`;

  return {
    newDeploymentId,
    newVersion,
    currentPackageJsonHash,
    lastPackageJsonHash,
    packageJsonChanged: currentPackageJsonHash !== lastPackageJsonHash,
  };
}
