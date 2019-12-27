import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import configureStore from "./store";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";

const MOVIE_1 =
  '{"id":45317,"imdbId":"tt0964517","title":"Fighter","originalTitle":"The Fighter","imdbRating":"7.8","userRating":4,"synopsis":"Micky Ward est un jeune boxeur dont la carrière stagne. Il va rencontrer Charlene, une femme au caractère bien trempé, qui va l\'aider à s\'affranchir de l\'influence négative de sa mère, qui gère maladroitement sa carrière, et de ses sœurs envahissantes.Son demi-frère Dicky Eklund, lui, a connu la gloire sur le ring, il y a bien longtemps. C’était avant qu’il ne sombre dans la drogue, avant son séjour en prison.Entre le sportif en quête d’un second souffle et l’ex-toxico, il y a longtemps que le courant ne passe plus. Trop de non-dits, d’échecs et de souffrances. Pourtant, parfois, les hommes changent, et Micky et Dicky vont peut-être avoir ensemble, la chance de réussir ce qu’ils ont raté chacun de leur côté…","genres":[{"id":18,"name":"Drame"}],"backgroundSrc":"/43fnzmOMO5zOUFH3EzyuwSh87IS.jpg","posterSrc":"/ddoP1dqYCzw89Tno6UfYleetf5o.jpg","releaseYear":"2010","director":"David O. Russell","actors":"Mark Wahlberg, Christian Bale, Amy Adams, Melissa Leo","country":"USA","runtime":113}';
const MOVIE_2 =
  '{"id":329865,"imdbId":"tt2543164","title":"Premier contact","originalTitle":"Arrival","imdbRating":"7.9","userRating":5,"synopsis":"Lorsque de mystérieux vaisseaux venus du fond de l’espace surgissent un peu partout sur Terre, une équipe d’experts est rassemblée sous la direction de la linguiste Louise Banks afin de tenter de comprendre leurs intentions.  Face à l’énigme que constituent leur présence et leurs messages mystérieux, les réactions dans le monde sont extrêmes et l’humanité se retrouve bientôt au bord d’une guerre absolue. Louise Banks et son équipe n’ont que très peu de temps pour trouver des réponses. Pour les obtenir, la jeune femme va prendre un risque qui pourrait non seulement lui coûter la vie, mais détruire le genre humain…","genres":[{"id":18,"name":"Drame"},{"id":878,"name":"Science-Fiction"},{"id":9648,"name":"Mystère"}],"backgroundSrc":"/yIZ1xendyqKvY3FGeeUYUd5X9Mm.jpg","posterSrc":"/lDop5NcTYvNmWeDMKPzP9e2x1p4.jpg","releaseYear":"2016","director":"Denis Villeneuve","actors":"Amy Adams, Jeremy Renner, Forest Whitaker, Michael Stuhlbarg","country":"USA, Canada, India","runtime":117}';
const MOVIE_3 =
  '{"id":643236,"imdbId":"tt10537978","title":"Rendez-vous chez les Malawas","originalTitle":"Rendez-vous chez les Malawas","imdbRating":"N/A","userRating":2,"synopsis":"Pour la spéciale Noël de son émission phare « Rencontre au bout du bout du monde », Léo Poli emmène non pas un, mais quatre invités exceptionnels. Est-ce vraiment une bonne idée ? Nos stars partent à la rencontre des Malawas, une des tribus les plus isolées du monde. Une comédie sur la nature…humaine.","genres":[{"id":35,"name":"Comédie"}],"backgroundSrc":"/nZRzpGszZSbI5hTLFUtawwCZRHj.jpg","posterSrc":"/6RyXS6dXSlHiDEPJ749UMVSLU8O.jpg","releaseYear":"2019","director":"James Huth","actors":"Christian Clavier, Michaël Youn, Ramzy Bedia, Sylvie Testud","country":"France","runtime":93}';
const MOVIE_4 =
  '{"id":8844,"imdbId":"tt0113497","title":"Jumanji","originalTitle":"Jumanji","imdbRating":"7.0","userRating":4,"synopsis":"Lors d\'une partie de Jumanji, un jeu très ancien, le jeune Alan est propulsé sous les yeux de son amie d\'enfance, Sarah, dans un étrange pays. Il ne pourra s\'en échapper que lorsqu\'un autre joueur reprendra la partie et le libèrera sur un coup de dés. Vingt-six ans plus tard, il retrouve le monde réel par le coup de dés de deux autres jeunes joueurs.","genres":[{"id":12,"name":"Aventure"},{"id":14,"name":"Fantastique"},{"id":10751,"name":"Familial"}],"backgroundSrc":"/7k4zEgUZbzMHawDaMc9yIkmY1qR.jpg","posterSrc":"/nLXYV4WmYUF4i8pX0iE0H1rltmf.jpg","releaseYear":"1995","director":"Joe Johnston","actors":"Robin Williams, Jonathan Hyde, Kirsten Dunst, Bradley Pierce","country":"USA","runtime":104}';

const INITIAL_STATE = {
  watchedMovies: [
    JSON.parse(MOVIE_1),
    JSON.parse(MOVIE_2),
    JSON.parse(MOVIE_3),
    JSON.parse(MOVIE_4)
  ],
  moviesToWatch: [JSON.parse(MOVIE_4)]
};

ReactDOM.render(
  <Provider store={configureStore(INITIAL_STATE)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
