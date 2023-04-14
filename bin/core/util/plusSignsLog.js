export function plusSignsLog(numberOfSigns, msg) {
    const plusSigns = '+'.repeat(Math.min(numberOfSigns, 10));
    console.log('\x1b[33;1m%s\x1b[0m', `\n${msg} | ${numberOfSigns} ${plusSigns}`);
}
