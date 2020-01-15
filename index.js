const fs = require('fs');
const htmlPdf = require('html-pdf');
const MushtacheModule = require('mustache');
let { ementas } = require('./ementas');
var template = fs.readFileSync('templates/ementa.mustache', 'utf8');

const pivot = ementas.findIndex(ementa => ementa.codigo.length == 0)
ementas.splice(pivot, ementas.length - pivot)

for (const ementa of ementas) {
    console.log(ementa.codigo)

    const content = MushtacheModule.render(template, ementa);

    // Calculo de altura da pagina
    var lines = 0
    lines += ementa.objetivo.length / 120
    lines += ementa.ementa.length / 120
    for (const conteudo of ementa.conteudo_programatico) {
        lines += conteudo.conteudo.length / 40
    }
    for (const bibliografia of ementa.bibliografia_basica) {
        lines += bibliografia.length / 143
    }
    for (const bibliografia of ementa.bibliografia_complementar) {
        lines += bibliografia.length / 143
    }
    var options = { height: Number(0.40613 * lines + 37).toFixed() + 'cm', width: '25cm', base: "file://" + __dirname };
    console.log(options)

    htmlPdf.create(content, options).toFile("ementas/" + ementa.codigo + '.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
}




