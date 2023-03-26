class Formatter {
  textInParts = []

  constructor(text) {
    this.text = text
  }
  extractCodeBlocks() {
    const regex = /```[\s\S]*?```/g
    let codeBlocks = []
    let match

    while ((match = regex.exec(this.text)) !== null) {
      const codeBlock = match[0]
      const code = codeBlock.slice(3, -3).trim() // Remove the triple backticks
      codeBlocks.push(code)
    }
    console.log(codeBlocks)
    return codeBlocks
  }
  seperateText() {
    let textArr = this.text.split('```')
    this.textInParts = textArr.length > 2 ? textArr : this.text
  }
}
export default Formatter
