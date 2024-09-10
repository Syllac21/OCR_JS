let listchoix = listeMots
let listradio = document.querySelectorAll(".optionSource input")
let compteurMot = 0


initAddEventListenerPopup()

for(let index = 0; index < listradio.length; index++){
    listradio[index].addEventListener("change" , (event)=>{
        switch(event.target.id){
            case 'mots' :
                listchoix=listeMots
                break

            case 'phrases' :
                listchoix = listePhrases
                break
        }
        afficherProposition(listchoix[compteurMot])
    })
}

function validerNom(nom){
    if (nom.length < 2){
        throw new Error("le nom est trop court")
    }
}

function validerEmail(email){
    let regexEmail = new RegExp("[a-z0-9._-]+@[a-z-._]+\\.[a-z]+")
    if(!regexEmail.test(email)){
        throw new Error("l'email n'est pas valide")
    }
}

function afficherMessageErreur(message){
    let spanErrorMessage = document.getElementById("errorMessage")
    if(!spanErrorMessage){
        let popup = document.querySelector('.popup')
        spanErrorMessage = document.createElement("span")
        spanErrorMessage.id='errorMessage'
        popup.append(spanErrorMessage)
    }
    spanErrorMessage.innerText = message
    
}

function gererFormulaire(score){
    let baliseNom = document.getElementById("nom")
    let baliseEmail = document.getElementById('email')
    let email = baliseEmail.value
    let nom = baliseNom.value

    try{
        validerNom(nom)
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, score)
    } catch (error){
        afficherMessageErreur(error.message)
    }
    
    
}

/**
 * cette fonction permet d'afficher la proposition dans la div prévue à cet effet
 * @param {*} proposition 
 */
function afficherProposition(proposition){
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * cette fonction affiche le nombre de bonnes réponses / le nombre de questions
 * @param {*} score 
 * @param {*} nbQuestions 
 */
function afficherScore(score, nbQuestions){
    let spanZoneScore = document.querySelector(".zoneScore span")
    spanZoneScore.innerText = `${score} / ${nbQuestions}`
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */

function lancerJeu(){
    // initialisation
    score = 0
    let inputEcriture = document.getElementById("inputEcriture")
    inputEcriture.value = ""
    let boutonRadioMots = document.getElementById("mots")
    boutonRadioMots.checked = true
    let btnValiderMot = document.getElementById("btnValiderMot")
    let envoyerMail = document.querySelector(".popup form")

    afficherProposition(listchoix[compteurMot])
    afficherScore(score, compteurMot)

    btnValiderMot.addEventListener("click", () => {
        if(inputEcriture.value === listchoix[compteurMot]){
            score++
        }
        
        compteurMot++

        if(compteurMot>=listchoix.length){
            afficherProposition("fin du jeu")
            btnValiderMot.disabled = true
        }else{
            afficherProposition(listchoix[compteurMot])
        }

        afficherScore(score, compteurMot)   
        
        inputEcriture.value = ""
        if(compteurMot>listchoix.length){
            afficherProposition("fin du jeu")
            btnValiderMot.disabled = true
        }

        envoyerMail.addEventListener("submit" , (event)=>{
            event.preventDefault()
            gererFormulaire(score)
            
        })
        
    })
}






