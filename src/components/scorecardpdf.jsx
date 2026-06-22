import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function downloadScorecard({
    englandName,
    australiaName,
    isEngland,
    innings1Team,
    innings1Score,
    innings1Wickets,
    innings1Batters,
    innings1Bowlers,
    score,
    wickets,
    batterhistory,
    savebatter,
    strikerScore,
    strikerBalls,
    bowlerHistory
}) {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
    let y = height - 50;

    function writeLine(text, opts = {}) {
        const size = opts.size || 11;
        const bold = opts.bold || false;
        if (y < 50) {
            page = pdfDoc.addPage([595, 842]);
            y = height - 50;
        }
        page.drawText(text, {
            x: 50,
            y,
            size,
            font: bold ? fontBold : font,
            color: rgb(0.09, 0.13, 0.24)
        });
        y -= size + 8;
    }

    function writeInningsCard(teamName, finalScore, finalWickets, batters, bowlers) {
        writeLine(teamName + " Innings", { size: 16, bold: true });
        writeLine(finalScore + "/" + finalWickets, { size: 13 });
        y -= 6;

        writeLine("Batting", { size: 12, bold: true });
        writeLine("Name                          Runs   Balls   SR");
        batters.forEach(b => {
            const sr = b.balls > 0 ? ((b.runs / b.balls) * 100).toFixed(1) : "0.0";
            writeLine(b.name.padEnd(28, " ") + String(b.runs).padEnd(7) + String(b.balls).padEnd(8) + sr);
        });
        y -= 6;

        writeLine("Bowling", { size: 12, bold: true });
        writeLine("Name                          Overs  Runs   Wkts");
        bowlers.forEach(b => {
            const overs = Math.floor(b.balls / 6) + "." + (b.balls % 6);
            writeLine(b.name.padEnd(28, " ") + overs.padEnd(7) + String(b.runs).padEnd(7) + String(b.wickets));
        });
        y -= 16;
    }

    writeLine(englandName + " vs " + australiaName, { size: 18, bold: true });
    writeLine(isEngland ? englandName + " WINS" : australiaName + " WINS", { size: 14, bold: true });
    y -= 10;

    writeInningsCard(innings1Team, innings1Score, innings1Wickets, innings1Batters, innings1Bowlers);

    const currentTeam = isEngland ? englandName : australiaName;
    const finalBatters = [...batterhistory, { name: savebatter, runs: strikerScore, balls: strikerBalls }];
    writeInningsCard(currentTeam, score, wickets, finalBatters, bowlerHistory);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = englandName + "_vs_" + australiaName + "_scorecard.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}