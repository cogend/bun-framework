import { join } from "path";
import fs from "fs/promises";

const packagesToUpdate = {
  react: "19.0.0-rc-57fbe3ba37-20240520",
  "react-dom": "19.0.0-rc-57fbe3ba37-20240520",
  "@physis/react-server-dom-esm": "19.0.0-rc-cc0e491-20240519",
  "react-server-dom-webpack": "19.0.0-rc-57fbe3ba37-20240520",
  tailwindcss: "4.0.0-alpha.23",
};

export async function installDependencies(
  absoluteInputRootDir: string,
  packageJsonChanged: boolean
) {
  const packageJsonPath = join(absoluteInputRootDir, "package.json");

  try {
    // Read the existing package.json
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);

    // Merge dependencies and devDependencies
    const allDependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    // Update or add the specified packages
    for (const [pkg, version] of Object.entries(packagesToUpdate)) {
      allDependencies[pkg] = version;
    }

    // Update the package.json with the merged dependencies
    packageJson.dependencies = allDependencies;

    if (packageJson.devDependencies) {
      delete packageJson.devDependencies;
    }
    // Write the updated package.json
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("package.json updated with specified package versions.");

    // Install dependencies
    await Bun.$`cd ${absoluteInputRootDir} && bun install --ignore-scripts`;
    console.log("Dependencies installed successfully.");

    // this is needed or else the build wont detect the new dependencies
    await new Promise((resolve) => setTimeout(resolve, 100));
  } catch (error) {
    console.error(
      "Error updating package.json or installing dependencies:",
      error
    );
    throw error;
  }
}
