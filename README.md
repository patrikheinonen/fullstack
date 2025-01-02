# fullstack

Full stack studying, React.js, Node.js, Express.js, Typescript etc

npm create vite@latest part1 -- --template react
cd part1
npm install

npm run dev

'react/prop-types': 0

npm init

npm install --save-dev nodemon

npm install express

voi ajaa tämän alemman kun on kirjotettu alla oleva package.json scripteihi
"dev": "nodemon index.js",
npm run dev

Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

Olemme tällä kurssilla tehneet hieman radikaalinkin ratkaisun käyttää pelkästään hookeja ja näin ollen opetella heti alusta asti ohjelmoimaan modernia Reactia. Luokkasyntaksin hallitseminen on kuitenkin sikäli tärkeää, että vaikka funktiona määriteltävät komponentit ovat modernia Reactia, maailmassa on miljardeja rivejä vanhaa Reactia, jota kenties sinäkin joudut jonain päivänä ylläpitämään. Dokumentaation ja Internetistä löytyvien esimerkkien suhteen tilanne on sama; tulet törmäämään myös class-komponentteihin.import axios from "axios";

10.2.2024 klo 23:04: osasta 2 tehty nyt tehtävät 1-20
