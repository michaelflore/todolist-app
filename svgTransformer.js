import path from "path";

export default  {
    process(sourceText, sourcePath) {
        return {
            code: `export default ${JSON.stringify(path.basename(sourcePath))}`
        }
    }
}