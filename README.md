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
- mobile friendly.
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

jos creator poistuu, niin serveri katoais.
ennenku joined tulee, niin char2 ei näy. jos joined lähtee, niin char2 häviää.
-> onlineCreator/Joined muuta bool -> timestampiksi?
muuta myös samalla full/open useEffecti.
offline.hero.waiting = joku blankki/pyörivä kysymysmerkki/tuulenpesä/

Joidenkin hahmojen varjot pitää piirrustella mirroriksi!

stateManagmentista VOIS olla hyötyä, kunhan performance ei heikkene..

zombie survival easter egg mode xD!

menu buttonit 3d moving

apple onClick events (a/button wrap div/inputs)

touchScreen ricochetissa bugi
