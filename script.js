// Ajouter button
var AjouterBtn = document.getElementById("AjouterBtn");
// recherche btn
var RechercheBtn = document.getElementById("RechercheBtn");
var RechercheInput = document.getElementById("RechercheInput");
// Tbody
var Tbody = document.querySelector("tbody");

// Ajouter Block
var AjouteBlock = document.getElementById("AjouteBlock");
var ValiderBtn = document.getElementById("ValiderBtn");

// supprimer tout buttno
var SupprimerToutBtn = document.getElementById('SupprimerToutBtn');

AjouterBtn.addEventListener("click", () => {
  AjouteBlock.classList.toggle("hidden");
});

if (localStorage.getItem("db") != null) {
  data = JSON.parse(localStorage.getItem("db"));
  AfficherTous();
} else {
  data = [];
}
// var data =[]

//les fonctions

// fonction qui permet d'ajouter un stagaire
function AjouterStd() {
  var numero = document.getElementById("numero");
  var prenom = document.getElementById("prenom");
  var nom = document.getElementById("nom");
  var filiere = document.getElementById("filiere");
  var note = document.getElementById("note");

  if (
    numero.value == "" ||
    prenom.value == "" ||
    nom.value == "" ||
    filiere.value == "" ||
    note.value == ""
  ) {
    alert("Veuillez entrer tous les éléments");
  } else {
    var std = {
      numero: numero.value,
      prenom: prenom.value,
      nom: nom.value,
      filiere: filiere.value,
      note: note.value,
    };
    data.push(std);
    localStorage.setItem("db", JSON.stringify(data));
    alert("ajouter avec success");
    BlockAjouter.classList.toggle("hidden");
    window.location.reload(true);
  }
}

// evenement d'ajouter un stagaire
ValiderBtn.addEventListener("click", () => {
  AjouterStd();
});

// fonction qui permet d'afficher tout les stagaires
function AfficherTous() {
  // let i =0
  // Tbody.innerHTML = '';
  // var ch = ''
  // data = JSON.parse(localStorage.getItem('db'));
  // data.forEach(element => {
  //     ch+= `
  //     <tr class="border-b text-gray-100 ">
  //         <td class="py-3 px-5">${i+1} </td>
  //         <td class="py-3 px-5">${element.prenom} </td>
  //         <td class="py-3 px-5">${element.nom}</td>
  //         <td class="py-3 px-5">${element.filiere}</td>
  //         <td class="py-3 px-5">${element.note}</td>
  //         <td class="py-3 px-5">
  //             <button class="bg-green-800 text-white py-1 px-3 rounded hover:bg-green-700" onclick='ModifierStd(${i})' >Modifier</button>
  //             <button class="bg-red-500 text-white py-1 px-3 rounded ml-2 hover:bg-red-700" onclick='SupprimerStd(${i})' >Supprimer</button>
  //         </td>
  //     </tr>
  //     `;
  //     i++;
  // });
  // Tbody.innerHTML = ch;

  Tbody.innerHTML = "";
  data = JSON.parse(localStorage.getItem("db"));

  let ch = data.reduce((acc, element, index) => {
    acc += `
    <tr class="border-b text-gray-100">
        <td class="py-3 px-5">${index + 1} </td>
        <td class="py-3 px-5">${element.prenom} </td>
        <td class="py-3 px-5">${element.nom}</td>
        <td class="py-3 px-5">${element.filiere}</td>
        <td class="py-3 px-5">${element.note}</td>
        <td class="py-3 px-5 flex items-center justify-center gap-5">
            <button class="text-gray-100  text-xl  hover:text-green-700   transition duration-30" onclick='ModifierStd(${index})'><i class="fa-solid fa-pen"></i></button>
            <button class="text-gray-100 text-xl  ml-2 hover:text-red-700 transition duration-30" onclick='SupprimerStd(${index})'><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>
    `;
    return acc;
  }, "");

  Tbody.innerHTML = ch;
}
// ch = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

// fontion qui permet de supprimer un stagaire
function SupprimerStd(i) {
  data.splice(i, 1);
  localStorage.setItem("db", JSON.stringify(data));
  window.location.reload(true);
}

// fonction qui ^permet de modifier un stagaire
function ModifierStd(i) {
  document.getElementById("ModifierBlock").classList.toggle("hidden");
  // ----------------------------------------
  document.getElementById("Nnumero").value = data[i].numero;
  document.getElementById("Nprenom").value = data[i].prenom;
  document.getElementById("Nnom").value = data[i].nom;
  document.getElementById("Nfiliere").value = data[i].filiere;
  document.getElementById("Nnote").value = data[i].note;
  // event
  document.getElementById("ModifierBtn").addEventListener("click", () => {
    data.splice(i, 1, {
      numero: document.getElementById("Nnumero").value,
      prenom: document.getElementById("Nprenom").value,
      nom: document.getElementById("Nnom").value,
      filiere: document.getElementById("Nfiliere").value,
      note: document.getElementById("Nnote").value,
    });
    localStorage.setItem("db", JSON.stringify(data));
    // alert("les informations sont modifier avec success");
    document.getElementById("ModifierBlock").classList.toggle("hidden");
    window.location.reload(true);
  });
}

// fonction recherche
// function Rechercher() {
//   document.getElementById("RechercheBtn").addEventListener("click", () => {
//     if (document.getElementById("RechercheInput").value != "") {
//       let FiliereRechercher = document.getElementById("RechercheInput");
//       data = JSON.parse(localStorage.getItem("db"));
//       let Fch = data.filter((element) => element.filiere == FiliereRechercher);
//       let ch = Fch.reduce((acc, element, index) => {
//         acc += `
//     <tr class="border-b text-gray-100">
//         <td class="py-3 px-5">${index + 1} </td>
//         <td class="py-3 px-5">${element.prenom} </td>
//         <td class="py-3 px-5">${element.nom}</td>
//         <td class="py-3 px-5">${element.filiere}</td>
//         <td class="py-3 px-5">${element.note}</td>
//         <td class="py-3 px-5">
//             <button class="bg-green-800 text-white py-1 px-3 rounded hover:bg-green-700" onclick='ModifierStd(${index})'>Modifier</button>
//             <button class="bg-red-500 text-white py-1 px-3 rounded ml-2 hover:bg-red-700" onclick='SupprimerStd(${index})'>Supprimer</button>
//         </td>
//     </tr>
//     `;
//         return acc;
//       }, '');
//     }
//   });
// }
// Rechercher();



function Rechercher() {
    RechercheBtn.addEventListener("click", () => {
      let FiliereRechercher = RechercheInput.value.toLowerCase().trim();
      
      if (FiliereRechercher != "") {
        // Récupérer la base de données stockée localement
        let dataOriginale = JSON.parse(localStorage.getItem("db"));
        
        // Filtrer les stagiaires dont la filière contient la chaîne recherchée
        let Fch = dataOriginale.filter((element) => 
          element.filiere.toLowerCase().includes(FiliereRechercher)
        );
  
        // Affichage des résultats filtrés
        let ch = Fch.reduce((acc, element, index) => {
          acc += `
            <tr class="border-b text-gray-100">
                <td class="py-3 px-5">${index + 1}</td>
                <td class="py-3 px-5">${element.prenom}</td>
                <td class="py-3 px-5">${element.nom}</td>
                <td class="py-3 px-5">${element.filiere}</td>
                <td class="py-3 px-5">${element.note}</td>
                <td class="py-3 px-5">
                    <button class="hover:text-green-800 text-white py-1 px-3 rounded " onclick='ModifierStd(${dataOriginale.indexOf(element)})'><i class="fa-solid fa-pen"></i></button>
                    <button class="hover:text-red-500 text-white py-1 px-3 rounded ml-2" onclick='SupprimerStd(${dataOriginale.indexOf(element)})'><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
          `;
          return acc;
        }, '');
  
        Tbody.innerHTML = ch;
        RechercheInput.value = '';
      } else {
        // Si le champ de recherche est vide, afficher tous les stagiaires
        AfficherTous();
      }
    });
  }
  Rechercher();
  


// supprimer tout fonction
function SupprimerTout(){
    localStorage.removeItem('db');
    window.location.reload(true);
}

SupprimerToutBtn.addEventListener('click' , ()=>{
  SupprimerTout();
})