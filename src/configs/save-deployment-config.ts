import { join } from "path";

export async function saveDeploymentConfig({
  outDir,
  newDeploymentId,
  newVersion,
  currentPackageJsonHash,
  deployment,
  routeHandlers,
}) {
  const enhancedDeployment = {
    ...deployment,
    packageJsonHash: currentPackageJsonHash,
    version: newVersion,
    routeHandlers,
  };

  await Bun.write(
    join(outDir, "manifest.json"),
    JSON.stringify(enhancedDeployment, null, 2)
  );
}
