export async function readThirdLine(filePath: string): Promise<string> {
  const file = Bun.file(filePath);
  const reader = file.stream().getReader();
  let lineCount = 0;
  let thirdLine = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = new TextDecoder().decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      lineCount++;
      if (lineCount === 3) {
        thirdLine = line;
        reader.releaseLock();
        return thirdLine;
      }
    }
  }

  throw new Error("File does not have a third line");
}
