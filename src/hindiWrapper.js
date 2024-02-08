function translateAndRunHindiCode(hindiCode, callback) {
    const translations = {
        "मुद्रित": "console.log",
        "प्रविष्टि": "prompt"
    };
    let translatedCode = hindiCode;
    for (const [hindi, js] of Object.entries(translations)) {
        const regex = new RegExp(hindi, 'g');
        translatedCode = translatedCode.replace(regex, js);
    }
    const originalConsoleLog = console.log;
    let output = '';
    console.log = (...args) => {
        output += args.join(' ') + '\n';
    };

    try {
        eval(translatedCode);
        callback(output);
    } catch (e) {
        console.error('Error executing translated code:', e);
        callback('Error: ' + e.toString());
    } finally {
        console.log = originalConsoleLog;
    }
}
