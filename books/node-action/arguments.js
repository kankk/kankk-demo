let args = {
    '-kan': showKanInfo
}

function showKanInfo() {
    console.log('This is Kan Info.');
}

if (process.argv.length > 0) {
    process.argv.forEach(function (arg, index) {
        if (args.hasOwnProperty(arg)) {
            args[arg].apply(this, process.argv.slice(index + 1));
        }
    });
}