"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exo4 = void 0;
function exo4() {
    // ## Exercice 4 - Les élections
    var _a;
    // ```typescript
    // const candidats = ["lepeigne", "melangeons", "macreau", "varousselle", "paicvaissrelle", "poutoutout", "hidalgogo"];
    // const votes = [];
    // ```
    // 1. Remplir le tableau de votes du premier tour avec 1000 votes aléatoires
    // Afficher le nombre de votes pour chaque candidat
    // Afficher le nom du candidat qui a le plus de votes
    // Afficher les noms des candidats qui passent au deuxième tour
    // 3. Simulez le deuxième tour avec 1000 votes aléatoires entre les deux premiers candidats
    // N'oubliez pas, paicvaissrelle peut acheter des voix aux electeurs de lepeigne s'il lui reste de l'argent.
    // Si lepeigne passe au deuxième tour avec paicvaissrelle, elle lui pique des voix.
    // Si lepeigne ne pas au deuxième tour, elle démarre avec, au maximum les voix de lepeigne au premier tour.
    // 4. Simulez les votes avec ce tableau de sondage :
    // ``` typescript
    // const sondage = [
    //     { candidat: "lepeigne", voix: 21 },
    //     { candidat: "melangeons", voix: 19 },
    //     { candidat: "macreau", voix: 21 },
    //     { candidat: "varousselle", voix: 3 },
    //     { candidat: "paicvaissrelle", voix: 1 },
    //     { candidat: "poutoutout", voix: 1 },
    //     { candidat: "hidalgogo", voix: 1 },
    // ];
    // ```
    // 1. ----------------------------------------------------------------------------------------
    const candidats = [
        "lepeigne",
        "melangeons",
        "macreau",
        "varousselle",
        "paicvaissrelle",
        "poutoutout",
        "hidalgogo"
    ];
    function getRandomCandidat() {
        return candidats[Math.floor(Math.random() * candidats.length)];
    }
    const votes = [];
    const NB_VOTES = 1000;
    for (let i = 0; i < NB_VOTES; i++) {
        votes.push(getRandomCandidat());
    }
    let results = candidats.map(() => 0);
    for (let i = 0; i < votes.length; i++) {
        const element = votes[i];
        const indexCandidat = candidats.findIndex(val => val === element);
        results[indexCandidat]++;
    }
    const votesByCandidates = results.map((val, i) => {
        return {
            nbVotes: val,
            candidat: candidats[i]
        };
    });
    votesByCandidates.sort((a, b) => b.nbVotes - a.nbVotes);
    console.log('results', votesByCandidates);
    const topCandidat = votesByCandidates[0].candidat;
    console.log('top candidate', topCandidat);
    let indexQualifiedToCompare = 2;
    while (indexQualifiedToCompare < candidats.length &&
        votesByCandidates[indexQualifiedToCompare].nbVotes === votesByCandidates[1].nbVotes) {
        indexQualifiedToCompare++;
    }
    const qualifiedCandidates = votesByCandidates.slice(0, indexQualifiedToCompare);
    console.log('qualifiedCandidates', qualifiedCandidates);
    // 2. ----------------------------------------------------------------------------
    // Nous ne sommes plus en démocratie, paicvaissrelle rachète des voix à lepeigne:
    // 10€ par voix, Elle a un budget de 1000€, combien de voix peut-elle acheter ?
    console.log('2. ------------------------------------------------------');
    const BUDGET_PAICVAISSRELLE = 1000;
    const PRIX_ACHAT_VOTE = 10;
    const nbVotesLePeigne = ((_a = votesByCandidates.find(e => e.candidat === "lepeigne")) === null || _a === void 0 ? void 0 : _a.nbVotes) || 0;
    const nbVotesLepeigneVersPaicvaissrelle = Math.min(Math.floor(BUDGET_PAICVAISSRELLE / PRIX_ACHAT_VOTE), nbVotesLePeigne);
    console.log(`Paicvessrelle peut acheter ${nbVotesLepeigneVersPaicvaissrelle} votes à lepeigne`);
    const resultsAfterCheating = votesByCandidates.map(e => {
        if (e.candidat === "lepeigne") {
            return Object.assign(Object.assign({}, e), { nbVotes: e.nbVotes - nbVotesLepeigneVersPaicvaissrelle });
        }
        else if (e.candidat === "paicvaissrelle") {
            return Object.assign(Object.assign({}, e), { nbVotes: e.nbVotes + nbVotesLepeigneVersPaicvaissrelle });
        }
        return e;
    });
    console.log('le nouveau resultat des élections est :', resultsAfterCheating);
    const newTopCandidat = resultsAfterCheating[0].candidat;
    console.log('top candidate', newTopCandidat);
    indexQualifiedToCompare = 2;
    while (indexQualifiedToCompare < candidats.length &&
        resultsAfterCheating[indexQualifiedToCompare].nbVotes === resultsAfterCheating[1].nbVotes) {
        indexQualifiedToCompare++;
    }
    const newQualifiedCandidates = resultsAfterCheating.slice(0, indexQualifiedToCompare);
    console.log('qualifiedCandidates', newQualifiedCandidates);
    // 3. ----------------------------------------------------------------------------
    // Simulez le deuxième tour avec 1000 votes aléatoires entre les deux premiers candidats
    // N'oubliez pas, paicvaissrelle peut acheter des voix aux electeurs de lepeigne s'il lui reste de l'argent.
    // Si lepeigne passe au deuxième tour avec paicvaissrelle, elle lui pique des voix.
    // Si lepeigne ne pas au deuxième tour, elle démarre avec, au maximum les voix de lepeigne au premier tour.
    console.log('3. ------------------------------------------------------');
    const nbVotesPossibles = Math.floor((BUDGET_PAICVAISSRELLE - nbVotesLepeigneVersPaicvaissrelle * PRIX_ACHAT_VOTE) / PRIX_ACHAT_VOTE);
    console.log("nb votes achetables encore :", nbVotesPossibles);
    const nbQualified = newQualifiedCandidates.length;
    const NB_VOTES_SECOND_TURN = NB_VOTES;
    let votesForSecondTurn = 0;
    const secondTurn = newQualifiedCandidates.map(e => (Object.assign(Object.assign({}, e), { nbVotes: 0 })));
    while (votesForSecondTurn < NB_VOTES_SECOND_TURN) {
        const indexVote = Math.floor(Math.random() * secondTurn.length);
        secondTurn[indexVote].nbVotes++;
        votesForSecondTurn++;
    }
    console.log("result second turn : ", secondTurn);
}
exports.exo4 = exo4;
