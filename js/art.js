/* ==========================================================================
   art.js — the drawn pictures at the top of each story.
   These stand in until real photos exist: set a project's `thumb` or `video`
   in data.js and the photo replaces the drawing. Each drawing is 480 x 270
   and crops to whatever shape its story gives it, so the subject sits in
   the middle band.
   ========================================================================== */

window.Art = (function () {
  function svg(label, body) {
    return (
      '<svg class="art__svg" viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + label + '">' +
        body +
      "</svg>"
    );
  }

  // A repeating wave: one period is 120 units, drawn wide enough to slide by one period
  function wave(y, amp, fill, cls) {
    var d = "M0 " + y + " q30 " + -amp + " 60 0";
    for (var i = 0; i < 9; i++) d += " t60 0";
    return '<path class="' + cls + '" d="' + d + ' V270 H0Z" fill="' + fill + '"/>';
  }

  /* ---- WetWare: an ESP32 with three probes in the water, and a dashboard -- */
  function wetware() {
    var pins = "";
    for (var i = 0; i < 12; i++) {
      pins += '<rect x="' + (170 + i * 12) + '" y="55" width="5" height="9" rx="1.5" fill="#d1d1d6"/>';
      pins += '<rect x="' + (170 + i * 12) + '" y="126" width="5" height="9" rx="1.5" fill="#d1d1d6"/>';
    }
    var probes = [["pH", 204, "#30d158"], ["TDS", 240, "#ffd60a"], ["°C", 276, "#ff6b5b"]]
      .map(function (p) {
        return (
          '<path d="M' + p[1] + ' 134 V194" stroke="#f5f5f7" stroke-width="3" stroke-linecap="round"/>' +
          '<rect x="' + (p[1] - 6) + '" y="188" width="12" height="28" rx="6" fill="' + p[2] + '"/>'
        );
      })
      .join("");
    var labels = [["pH", 204], ["TDS", 240], ["°C", 276]]
      .map(function (p) {
        return '<text x="' + p[1] + '" y="234" text-anchor="middle" font-size="13" font-weight="600" fill="#ffffff">' + p[0] + "</text>";
      })
      .join("");

    return svg("Illustration of WetWare: an ESP32 board with pH, TDS and temperature probes in water, sending readings to a dashboard",
      '<rect width="480" height="270" fill="var(--c-water)"/>' +
      // a drop of water, for scale and subject
      '<path d="M88 58 C88 58 64 88 64 104 a24 24 0 0 0 48 0 C112 88 88 58 88 58Z" fill="#5ac8fa"/>' +
      '<path d="M78 104 a10 10 0 0 0 10 10" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>' +
      '<g class="art__drift art__drift--slow">' + wave(180, 10, "#1c94d8", "") + "</g>" +
      probes +
      // the board
      pins +
      '<rect x="160" y="62" width="160" height="66" rx="9" fill="#1d1d1f"/>' +
      '<rect x="206" y="76" width="46" height="38" rx="4" fill="#3a3a3c"/>' +
      '<rect x="214" y="88" width="30" height="3" rx="1.5" fill="#8e8e93"/>' +
      '<rect x="214" y="96" width="20" height="3" rx="1.5" fill="#8e8e93"/>' +
      '<circle class="art__blink" cx="180" cy="80" r="4.5" fill="#30d158"/>' +
      '<path d="M290 74 h16 v9 h-12 v9 h12 v9 h-16" stroke="#ffd60a" stroke-width="3" fill="none" stroke-linejoin="round"/>' +
      // the reading travelling to the dashboard
      '<path d="M314 78 q18 -16 38 -4" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-dasharray="3 6" stroke-linecap="round"/>' +
      '<rect x="352" y="50" width="104" height="80" rx="12" fill="#ffffff"/>' +
      '<text x="364" y="70" font-size="11" font-weight="600" fill="#6e6e73">pH</text>' +
      '<text x="364" y="96" font-size="24" font-weight="700" fill="#1d1d1f">7.2</text>' +
      '<polyline points="364,118 380,110 394,114 410,104 424,108 444,98" fill="none" stroke="var(--c-water)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<g class="art__drift">' + wave(198, 8, "rgba(90, 200, 250, 0.55)", "") + "</g>" +
      labels);
  }

  /* ---- BraiLingo: a Braille cell device spelling READ, and the quiz app --- */
  // Dots are numbered as in Braille: 1-3 down the left column, 4-6 down the right
  var LETTERS = { R: [1, 2, 3, 5], E: [1, 5], A: [1], D: [1, 4, 5] };

  function cell(letter, c) {
    var up = LETTERS[letter];
    var out = "";
    for (var d = 1; d <= 6; d++) {
      var x = 76 + c * 56 + (d > 3 ? 22 : 0);
      var y = 108 + ((d - 1) % 3) * 22;
      out += up.indexOf(d) >= 0
        ? '<circle class="art__dot" style="--c:' + c + ";--k:" + d + '" cx="' + x + '" cy="' + y + '" r="7.5" fill="#1d1d1f"/>'
        : '<circle cx="' + x + '" cy="' + y + '" r="3.5" fill="#f2c98a"/>';
    }
    return out + '<text x="' + (87 + c * 56) + '" y="186" text-anchor="middle" font-size="13" font-weight="600" fill="#b36b00">' + letter + "</text>";
  }

  // The app's question: a Braille cell (the letter R) and three answers
  function quizCell() {
    var out = "";
    for (var d = 1; d <= 6; d++) {
      var x = 372 + (d > 3 ? 18 : 0);
      var y = 64 + ((d - 1) % 3) * 18;
      out += LETTERS.R.indexOf(d) >= 0
        ? '<circle cx="' + x + '" cy="' + y + '" r="6" fill="#1d1d1f"/>'
        : '<circle cx="' + x + '" cy="' + y + '" r="2.5" fill="#d1d1d6"/>';
    }
    return out;
  }

  function answer(letter, y, correct) {
    return (
      '<rect x="350" y="' + y + '" width="64" height="20" rx="10" fill="' + (correct ? "#34c759" : "#e5e5ea") + '"/>' +
      '<text x="382" y="' + (y + 14.5) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + (correct ? "#ffffff" : "#1d1d1f") + '">' + letter + "</text>"
    );
  }

  function brailingo() {
    return svg("Illustration of BraiLingo: a Braille device raising its dots to spell READ, beside the companion quiz app",
      '<rect width="480" height="270" fill="var(--c-orange)"/>' +
      '<rect x="40" y="92" width="256" height="118" rx="20" fill="#e38800"/>' +
      '<rect x="40" y="78" width="256" height="118" rx="20" fill="#fff7ea"/>' +
      ["R", "E", "A", "D"].map(cell).join("") +
      '<path d="M298 134 H330" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="3 6" stroke-linecap="round"/>' +
      '<rect x="332" y="40" width="100" height="190" rx="20" fill="#1d1d1f"/>' +
      '<rect x="338" y="46" width="88" height="178" rx="15" fill="#ffffff"/>' +
      quizCell() +
      answer("R", 136, true) + answer("D", 162, false) + answer("E", 188, false));
  }

  /* ---- Internship: a Linux kiosk and a spreadsheet being cleaned -------- */
  function kiosk() {
    var rows = "";
    for (var r = 0; r < 5; r++) {
      var y = 92 + r * 20;
      var fill = r === 2 ? "#fff4d6" : "#ffffff";
      rows += '<rect x="246" y="' + y + '" width="178" height="20" fill="' + fill + '"/>';
      rows += '<rect x="254" y="' + (y + 7) + '" width="28" height="6" rx="3" fill="#d1d1d6"/>';
      rows += '<rect x="304" y="' + (y + 7) + '" width="' + (20 + ((r * 13) % 22)) + '" height="6" rx="3" fill="#d1d1d6"/>';
      rows += '<rect x="364" y="' + (y + 7) + '" width="' + (26 + ((r * 7) % 18)) + '" height="6" rx="3" fill="#d1d1d6"/>';
    }
    return svg("Illustration of the internship: a Linux kiosk and a spreadsheet with a duplicate row being removed",
      '<rect width="480" height="270" fill="var(--c-green)"/>' +
      '<rect x="72" y="40" width="130" height="150" rx="14" fill="#1d1d1f"/>' +
      '<rect x="82" y="50" width="110" height="112" rx="6" fill="#0b0b0c"/>' +
      '<text x="92" y="74" font-size="13" font-weight="600" fill="#30d158" font-family="ui-monospace, Menlo, Consolas, monospace">$</text>' +
      '<rect x="104" y="66" width="60" height="6" rx="3" fill="#e5e5ea"/>' +
      '<rect x="92" y="86" width="80" height="6" rx="3" fill="#636366"/>' +
      '<rect x="92" y="100" width="54" height="6" rx="3" fill="#636366"/>' +
      '<text x="92" y="124" font-size="13" font-weight="600" fill="#30d158" font-family="ui-monospace, Menlo, Consolas, monospace">$</text>' +
      '<rect class="art__blink" x="104" y="116" width="8" height="10" rx="1" fill="#e5e5ea"/>' +
      '<circle cx="137" cy="176" r="4" fill="#3a3a3c"/>' +
      '<rect x="127" y="190" width="20" height="34" fill="#1d1d1f"/>' +
      '<rect x="97" y="222" width="80" height="12" rx="6" fill="#1d1d1f"/>' +
      '<rect x="238" y="48" width="194" height="160" rx="12" fill="#ffffff"/>' +
      '<rect x="238" y="48" width="194" height="24" rx="12" fill="#f2f2f7"/>' +
      '<rect x="238" y="60" width="194" height="12" fill="#f2f2f7"/>' +
      '<circle cx="252" cy="60" r="3.5" fill="#ff5f57"/><circle cx="264" cy="60" r="3.5" fill="#febc2e"/><circle cx="276" cy="60" r="3.5" fill="#28c840"/>' +
      '<rect x="246" y="76" width="178" height="14" rx="3" fill="#e8f7ed"/>' +
      rows +
      '<path d="M252 142 H418" stroke="#ff3b30" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M296 92 V192 M356 92 V192" stroke="#e5e5ea" stroke-width="1"/>');
  }

  /* ---- Degree: a mortarboard over a diploma ----------------------------- */
  function degree() {
    return svg("Illustration of the degree: a graduation cap over a rolled diploma",
      '<rect width="480" height="270" fill="var(--c-indigo)"/>' +
      '<rect x="92" y="190" width="296" height="40" rx="20" fill="#ffffff"/>' +
      '<rect x="226" y="190" width="28" height="40" fill="#ff453a"/>' +
      '<circle cx="112" cy="210" r="12" fill="#e5e5ea"/>' +
      '<path d="M178 112 V150 q62 30 124 0 V112 L240 136 Z" fill="#2c2c2e"/>' +
      '<polygon points="240,56 348,98 240,140 132,98" fill="#1d1d1f"/>' +
      '<path d="M240 98 L330 110 V150" stroke="#ffd60a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<rect x="323" y="148" width="14" height="24" rx="4" fill="#ffd60a"/>' +
      '<circle cx="240" cy="98" r="6" fill="#ffd60a"/>');
  }

  /* ---- Certificates: a certificate with its seal ------------------------ */
  function certificate() {
    return svg("Illustration of a certificate with a seal",
      '<rect width="480" height="270" fill="var(--c-yellow)"/>' +
      '<rect x="150" y="52" width="170" height="126" rx="10" fill="#ffffff" opacity=".6" transform="rotate(-7 235 115)"/>' +
      '<rect x="164" y="58" width="170" height="126" rx="10" fill="#ffffff"/>' +
      '<text x="249" y="88" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1d1f">Certificate</text>' +
      '<rect x="196" y="102" width="106" height="7" rx="3.5" fill="#e5e5ea"/>' +
      '<rect x="206" y="116" width="86" height="7" rx="3.5" fill="#e5e5ea"/>' +
      '<rect x="218" y="146" width="62" height="3" rx="1.5" fill="#d1d1d6"/>' +
      '<polygon points="298,178 292,208 304,200 312,210 314,182" fill="#ff3b30"/>' +
      '<polygon points="320,178 326,208 314,200 306,210 304,182" fill="#e0302a"/>' +
      '<circle cx="309" cy="166" r="24" fill="#ff9500"/>' +
      '<circle cx="309" cy="166" r="16" fill="none" stroke="#ffffff" stroke-width="2"/>' +
      '<path d="M301 166 l6 6 l11 -12" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>');
  }

  /* ---- Small glyphs for the skill groups (24px, stroked) ---------------- */
  var ICONS = {
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    chip: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    chart: '<path d="M5 20V12M11 20V5M17 20v-9M3 20h18"/>',
    chat: '<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9l3 3-3 3M13 15h4"/>'
  };

  function icon(name) {
    return ICONS[name]
      ? '<svg class="glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONS[name] + "</svg>"
      : "";
  }

  var DRAWINGS = { wetware: wetware, brailingo: brailingo, kiosk: kiosk, degree: degree, certificate: certificate };

  function draw(name) {
    return DRAWINGS[name] ? DRAWINGS[name]() : "";
  }

  return { draw: draw, icon: icon };
})();
