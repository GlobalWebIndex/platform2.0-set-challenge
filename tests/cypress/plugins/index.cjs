// Open dev tools when running the tests with chrome or chromium
module.exports = (on) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
        if((browser.name === 'chromium' || browser.name === 'chrome') && !launchOptions.headless) {
            launchOptions.args.push('--auto-open-devtools-for-tabs');
            return launchOptions;
        }
    });
}
