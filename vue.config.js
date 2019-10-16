module.exports = {
    lintOnSave: false,
    configureWebpack: config => {
        // Attempting to watch large node_modules can violate sysctl limits, causing
        // weird behaviours.
        config.watchOptions = {
            ignored: /node_modules/
        }
    }
}
