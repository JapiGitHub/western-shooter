Western shooter: Shoot first & Die last
https://shoot-first-die-last.web.app/

Made with React (+ firebase backend)

- 3 different heroes.
- fatalities!
- difficulty levels set the threshold for fatalitities.
- leaderboard (in human vs human modes : keybVsMouse & network multiplayer).
- network multiplayer (google firebase backend).
- "3d feeling" transitions and clouds.
- stereo sound in singleplayer modes, so you hear the direction of shots, ricochets (too early false start), menu moving, etc.
- menu music & fullscreen.
- two different filters/themes.
- mobile & desktop friendly.
- portrait to landscape caution.
- pixelart is home made <3
- custom cursor.

Modes:

- keyboard vs mouse mode
- adjustable practice AI mode
- touchscreen mobile duel
- survival mode
- cross-paltfrom network multiplayer!

TODO:
homma paisuu kuin pullataikina, eli vähän jokapaikassa olis refactoringia.

multiplayer: server full/open pitää parannella varmempi toimisemmaksi.

kuolin/kaatumisäänet puuttuu vielä.

multiplayer lobbyyn vois säätää vielä, ettei softwareKeyboard (mobiilissa) muuttais ruudun kokoa. (=ota alussa ruudun koko muuttujiksi).

siivoa vanhoja turhia stateja&firebase fieldejä pois multip

Joidenkin hahmojen varjot pitää piirrustella mirroriksi!

stateManagmentista VOIS olla hyötyä, kunhan performance ei heikkene.. context vs redux

zombie survival easter egg mode xD!

apple onClick events (a/button wrap div/inputs) & (cursoer: pointer) -> ei toimi vieläkään ehkä, en oo päässy testaa minnekkää..

multipl: ampuminen socket.io:n kautta ja sit vasta tulokset firebase DBhen. lagi pienentyis huomattavasti.
TÄMÄ ON EHKÄ SE ISOIN JA TÄRKEIN! ^
