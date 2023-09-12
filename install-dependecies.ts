import { execSync } from "child_process";

export default async (req: any, res: any) => {
  try {
    execSync("yarn --production", { stdio: "inherit" });
    res.status(200).json({ message: "Dependencies installed" });
  } catch (error) {
    console.error("Error installing dependencies", error);
    res.status(500).json({ message: "Failed to install dependencies" });
  }
};
