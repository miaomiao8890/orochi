const { checkIsTitle } = require("orochi-seo")

module.exports = async function () {
    let result = {
        isTitle: false,
        isSuitableMeta: false,
        isLinkHasText: false,
        isRobotsTxt: false
    }
    // 检查title
    result.isTitle = await checkIsTitle()
    // 检查是否合理的meta

    // 检查链接是否有文字

    // 检查robots.txt


    return result
}
