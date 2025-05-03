//const { data } = require("autoprefixer");

const apiKey = "PEXELS_API_KEY";
const inputSearch = document.getElementById("inputSearch");
const inputMobileSearch = document.getElementById("inputMobileSearch");
const btn = document.getElementById("btn")
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

let allPhotos = [];  // Stocke toutes les photos récupérées
let currentIndex = 0; // Pour suivre combien ont été affichées
const step = 21;      // Combien afficher par clic

// function pour recupérer les données d'images et de gestion des erreurs
async function fetchImages(query) {
     gallery.innerHTML = "";
    loader.style.display = "flex"; // Afficher le loader
    currentIndex = 0; // Réinitialiser l’index si nouvelle recherche
    allPhotos = [];
    

    // const url = `http://localhost:3000/api/search?query=${query}&per_page=42`;
    const url = `https://projet-api-qx7d.onrender.com/api/search?query=${query}&per_page=100`;

    
    //`https://api.pexels.com/v1/search?query=${query}&per_page=42`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des images.");
        }

        const data = await response.json();
        console.log(data)
        allPhotos = data.photos; // Stocke toutes les images
        displayImages();     // Affiche les premières
        // displayImages(data.photos);
        
    } catch (error) {
        console.error("Erreur:", error);
    }
 finally {
    loader.style.display = "none"; // Cacher le loader après le chargement
}
}

// function searchImages(query) {
    // Recherche d'images en fonction de la requête de l'utilisateur
    // fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        // method: 'GET',
        // headers: {
            // 'Authorization': 'Bearer VOTRE_API_KEY'
        // }
    // })
    // .then(response => response.json())
    // .then(data => {
        // displayImages(data.photos);
    // });
// }


// Afficher les images sur la page
// function pour afficher les photos en créant une div pour chaque photo puis de l'auteur et le bouton de téléchargement
function displayImages() {
    // gallery.innerHTML = ''; // Nettoyer la galerie //non sinon les images précédentes seront éffacés à chaque click du bouton plus d'images
    const nextPhotos = allPhotos.slice(currentIndex, currentIndex + step);
    nextPhotos.forEach(photo => {

          // Création de la carte
        const card = document.createElement('div');
        card.className = "relative aspect-[3/4] rounded-lg shadow-md overflow-hidden hover:skew-12";

        //image
        const img = document.createElement('img');
        img.src = photo.src.original;
        img.alt = photo.alt || 'Image de Pexels';
        img.className = "w-full h-full object-cover rounded-md hover:scale-[1.2] transition-all duration-500";
        

         // Contenu de la carte
    const content = document.createElement('div');
    content.className = "absolute flex justify-between items-center bottom-[5px] left-0 right-0 p-2 text-md";

    // Nom du photographe
    const author = document.createElement('p');
    author.innerHTML = `Auteur : <strong>${photo.photographer}</strong>`;
    author.className = "flex gap-2 items-center text-white text-sm md:text-md";

    // Bouton de téléchargement
    const downloadBtn = document.createElement('a');
    downloadBtn.href = photo.src.original;
    downloadBtn.setAttribute('download', '');
    downloadBtn.innerHTML = `<i class="fas fa-download"></i>`;
    downloadBtn.className = "inline-block px-2 py-1 bg-green-600 text-white text-sm md:text-md lg:text-lg rounded-lg hover:bg-gray-900";


    // Assemblage
    content.appendChild(author);
    content.appendChild(downloadBtn);
    card.appendChild(img);
    card.appendChild(content);
    gallery.appendChild(card);
      
    });

    currentIndex += step;

    if (currentIndex >= allPhotos.length) {
        document.getElementById("load-more").style.display = "none";
    } else {
        document.getElementById("load-more").style.display = "block";
    }

}

document.getElementById("load-more").addEventListener("click", displayImages);


// Gérer l'événement du bouton de l'icon search
btn.addEventListener('click', () => {
    const query = inputSearch.value.trim();
    
    if (query) {
        fetchImages(query);
        localStorage.setItem("query", JSON.stringify(query));
        
    } else {
        const btnQuery = (localStorage.getItem("query")); 
       if (btnQuery) {
            if(gallery) {
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }

       }
    }
});

// Gérer l'événement du bouton
// btn.addEventListener('click', () => {
//     const query = inputSearch.value.trim();

//     if (query) {
//         fetchImages(query);
//         localStorage.setItem("query", JSON.stringify(query));
//     } else {
//         // Le champ de recherche est vide
//         const recherchePrecedenteJSON = localStorage.getItem("query");
//         if (recherchePrecedenteJSON) {
//             const recherchePrecedente = JSON.parse(recherchePrecedenteJSON);
//             fetchImages(recherchePrecedente); // Utiliser la recherche précédente

//             if (gallery) {
//                 gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
//             }
//         }
//         // Vous pourriez ajouter un else ici si aucune recherche précédente n'existe
//         // (par exemple, afficher un message à l'utilisateur)
//     }
// })

// Excécution de la requette lorsque le user taper enter si il se trouve dans l'input
inputSearch.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        const query = inputSearch.value.trim();
        if (query) {
            fetchImages(query);
            localStorage.setItem("query", JSON.stringify(query));
            
        } else {
        const btnQuery = (localStorage.getItem("query")); 
       if (btnQuery) {
            if(gallery) {
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }

       }
    }
    }
})


  // Bouton de recherche sur mobile 
  const btnMobile = document.getElementById("btnMobile");
const divBtnMobile = document.getElementById("divBtnMobile");
const divInputMobile = document.getElementById("divInputMobile");
const logo = document.getElementById("logo");
const gift = document.getElementById("gift");
const divBtnDelete = document.getElementById("divBtnDelete");
const nav = document.getElementById("nav");

// attribuer la même valeur dans l'input mobile et celle du search au milieu de la banière
inputMobileSearch.addEventListener("input", () => {
    if (inputSearch.value !== inputMobileSearch.value) {
      inputSearch.value = inputMobileSearch.value;
    }
  });

//   attribuer toujous la même valeur de l'input search sur la page et celle du mobile
  inputSearch.addEventListener("input", () => {
    if (inputMobileSearch.value !== inputSearch.value) {
      inputMobileSearch.value = inputSearch.value;
    }
  });

  // Excécution de la requette lorsque le user taper enter si il se trouve dans l'input sur mobile
inputMobileSearch.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        const query = inputMobileSearch.value.trim();
        if (query) {
            fetchImages(query);
            localStorage.setItem("query", JSON.stringify(query));
            
        } else {
        const btnQuery = (localStorage.getItem("query")); 
       if (btnQuery) {
            if(gallery) {
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }

       }
    }
    }
})

let searchVisible = false;

// Excécution de la requette avec le bouton de l'icon search sur mobile
btnMobile.addEventListener("click", () => {
  if (!searchVisible) {
    // Afficher la barre
    logo.classList.add("hidden");
    gift.classList.add("hidden");
    divBtnDelete.classList.remove("hidden");
    darkMode.classList.add("hidden");
    divBtnMobile.className = "md:hidden w-full flex gap-2 p-1 items-center border border-gray-900 dark:border-white rounded-lg justify-between bg-transparent dark:bg-transparent";
    divInputMobile.classList.remove("hidden");
    inputMobileSearch.focus();
    searchVisible = true;
  } else {
    // Effectuer la recherche
    const query = inputMobileSearch.value.trim();
    if (query) {
      fetchImages(query);
      localStorage.setItem("query", JSON.stringify(query));
    } else {
        if (query === "") {
            if(gallery) {
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
           }
    }
  }
});

// suprimer la barre de recherche sur mobile
divBtnDelete.addEventListener("click", () => {
  divBtnMobile.className = "bg-transparent";
  logo.classList.remove("hidden");
  gift.classList.remove("hidden");
  divInputMobile.classList.add("hidden");
  darkMode.classList.remove("hidden");
  divBtnDelete.classList.add("hidden");
  searchVisible = false;
});

  
// si le loaclstorage contient une valeur on éffectue la recherche de cette valeur au rechargement de la page sinon on fais la recherche avec la valeur nature et on l'affiche
window.onload = () => {

  if(window.innerWidth > 768) {
      const savedQuery = JSON.parse(localStorage.getItem('query'));
      if (savedQuery) {
        document.getElementById('inputSearch').value = savedQuery; // Remplir le champ avec la requête enregistrée
        fetchImages(savedQuery); // Afficher les résultats précédents
      // } else {
          // fetchDefaultImages();
      } else {
          fetchImages("nature")
      }
  } else {

      const savedMobileQuery = JSON.parse(localStorage.getItem('query'));
      if (savedMobileQuery) {
        document.getElementById('inputMobileSearch').value = savedMobileQuery; // Remplir le champ avec la requête enregistrée
        fetchImages(savedMobileQuery); // Afficher les résultats précédents
      // } else {
          // fetchDefaultImages();
      } else {
          fetchImages("nature")
      }
  }
};

// gestion du darkmode
const darkMode = document.getElementById("dark-mode");

darkMode.addEventListener("click", () => {

    document.getElementById("mode-light").classList.toggle("hidden");
    document.getElementById("mode-dark").classList.toggle("hidden");
    
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
    document.documentElement.classList.toggle("dark")
// Enregistre le mode dans le stockage local
if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
})

// gestion du localstorage du darkmode
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById("mode-light").classList.toggle("hidden");
    document.getElementById("mode-dark").classList.toggle("hidden");
  };
  

//   afficher la barre de recherche lorsque scroll vers le bas
window.onscroll = function() {

    const inputFixedSearch = document.getElementById("inputFixedSearch");
    const divBtn = document.getElementById("divBtn");
    const divDelete = document.getElementById("divDelete")
    const divMobile = document.getElementById("divMobile");
    const backToTopBtn = document.getElementById("backToTopBtn");
    const navItem = document.getElementById("nav-item");

    
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        navItem.classList.add("md:hidden");
        divBtn.className = "hidden md:flex w-max flex gap-2 p-1 items-center border border-white rounded-lg justify-between bg-transparent dark:bg-transparent";
        backToTopBtn.style.display = "block";

        inputFixedSearch.addEventListener("input", () => {
            if (inputSearch.value !== inputFixedSearch.value) {
              inputSearch.value = inputFixedSearch.value;
            }
          });
          
          inputSearch.addEventListener("input", () => {
            if (inputFixedSearch.value !== inputSearch.value) {
                inputFixedSearch.value = inputSearch.value;
            }
          });


          inputFixedSearch.addEventListener("keypress", function(event) {
            if(event.key === "Enter") {
                const query = inputFixedSearch.value.trim();
                if (query) {
                    fetchImages(query);
                    localStorage.setItem("query", JSON.stringify(query));
                    
                } else {
                const btnQuery = (localStorage.getItem("query")); 
               if (btnQuery) {
                    if(gallery) {
                        gallery.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
               }
            }
            }
        })



        divMobile.addEventListener("click", () => {
             const query = inputFixedSearch.value.trim();
            if (query) {
            fetchImages(query);
            localStorage.setItem("query", JSON.stringify(query));
            } else {
                if (query === "") {
                    if(gallery) {
                        gallery.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                }
            }
        })



        divDelete.addEventListener("click", () => {
           divBtn.className = "hidden"
            navItem.className = "flex"

          });

    } else {
        backToTopBtn.style.display = "none";
        navItem.classList.remove("md:hidden")
        divBtn.className = "hidden"
    }
  };
  
//  gestion bouton qui revient en haut de page
    document.getElementById("backToTopBtn").onclick = function()  {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };


/*
  const btnMobile = document.getElementById("btnMobile");
  const divBtnMobile = document.getElementById("divBtnMobile");
  const divInputMobile = document.getElementById("divInputMobile");
  const logo = document.getElementById("logo");
  const gift = document.getElementById("gift");
  const divBtnDelete = document.getElementById("divBtnDelete");
  const nav = document.getElementById("nav");
  btnMobile.addEventListener("click", ()=> {
    logo.classList.toggle("hidden");
    gift.classList.toggle("hidden");
    divBtnDelete.classList.toggle("hidden");
    darkMode.classList.toggle("hidden");
    divBtnMobile.className = "w-max flex gap-2 p-1 items-center border border-gray-900 dark:border-white rounded-lg justify-between bg-transparent dark:bg-transparent";
    divInputMobile.classList.toggle("hidden");
    
    btnMobile.addEventListener("click", ()=> {
        divBtnMobile.className = "bg-transparent";
        logo.classList.toggle("hidden");
        gift.classList.toggle("hidden");
        divBtnDelete.classList.toggle("hidden");
        darkMode.classList.toggle("hidden");
        divBtnMobile.className = "w-max flex gap-2 p-1 items-center border border-gray-900 dark:border-white rounded-lg justify-between bg-transparent dark:bg-transparent";
        divInputMobile.classList.toggle("hidden");
        const query = inputSearch.value.trim();
    if (query) {
        fetchImages(query);
        localStorage.setItem("query", JSON.stringify(query));
        
    } else {
        alert("Entrer un mot clé");
    }    
    })
  })

  divBtnDelete.addEventListener("click", ()=> {
    divBtnMobile.className = "bg-transparent";
    logo.classList.toggle("hidden");
    gift.classList.toggle("hidden");
    divInputMobile.classList.toggle("hidden");
    darkMode.classList.toggle("hidden");
    divBtnDelete.classList.toggle("hidden")
  })*/


// authentifiaction google non disponible
// DomContentLoaded permet de charger avant tous les elements de la page
    // document.addEventListener("DOMContentLoaded", () => {
    //     const savedQuery = localStorage.getItem("query");
      
    //     // faire la recherche de la valeur précédente enrégistrer dans le local storage sinon excécuter avec la valeur nature
    //     if (!savedQuery) {
    //       // Première fois : aucune recherche sauvegardée
    //       fetchImages("nature"); // ou un thème par défaut que tu veux
    //     } else {
    //       // Sinon, charger ce que l'utilisateur avait cherché
    //       const query = JSON.parse(savedQuery);
    //       fetchImages(query);
    //     }
    //   });
      
      console.log('Script chargé'); // pour tester

// // gestion de connexion google non disponible
//       window.addEventListener('DOMContentLoaded', async () => {
//         console.log('DOM chargé, script en cours...');
//         const accountGoogle = document.getElementById('accountGoogle');
      
//         try {
//           const res = await fetch('http://localhost:3000/api/user', {
//             credentials: 'include'
//           });
      
//           const data = await res.json();
      
//           if (data.isLoggedIn) {
//             accountGoogle.innerHTML = `
//               <div class="flex items-center gap-2 bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-3 py-1 rounded">
//                 <img src="${data.photo}" alt="Photo de profil" class="w-8 h-8 rounded-full shadow" />
//                 <span class="text-gray-800 font-semibold">${data.name}</span>
//                 <a href="http://localhost:3000/logout" class="ml-4 text-red-500 font-bold">Déconnexion</a>
                
//               </div>
//             `;

//               // Attacher l'écoute du bouton de déconnexion
//                 document.getElementById('logoutBtn').addEventListener('click', () => {
//                     fetch('http://localhost:3000/logout', {
//                     method: 'GET',
//                     credentials: 'include'
//                     }).then(() => {
//                     window.location.reload();
//                     });
//                 });
//             console.log('Utilisateur connecté :', data);

//           } else {
//             accountGoogle.innerHTML = `
//               <a href="http://localhost:3000/auth/google" class=" bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-3 py-1 rounded">
//                 <i class="fa-brands fa-google"></i> Connexion Google
//               </a>
//             `;
//             console.log('Utilisateur non connecté :', data)
//           }
      
//         } catch (err) {
        
//           console.error('Erreur lors de la vérification de la connexion', err);
//           accountGoogle.innerHTML = `
//             <a href="http://localhost:3000/auth/google" class=" bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-3 py-1 rounded">
//               Connexion Google
//             </a>
//           `;
//           console.log('Utilisateur erreur :', err)
//         }
//       });

//       window.addEventListener("DOMContentLoaded", () => {
//         const params = new URLSearchParams(window.location.search);
//         const userData = params.get("user");
        
//         if (userData) {
//           const user = JSON.parse(decodeURIComponent(userData));
//           document.getElementById("user-info").innerHTML = `
//             <h2>Bienvenue, ${user.name}</h2>
//             <p>Email : ${user.email}</p>
//             <img src="${user.picture}" width="20" height="20" style="border-radius: 50%;" />
//           `;
//           console.log("donné user", userData)
//         }
//         else {
//             console.log("donnéé failed", userData)
//         }
//       });

      
      // Envoie de commentaire dans la boite mail
      document.getElementById("sendMail").addEventListener("click", () => {
        const message = document.getElementById('exampleFormControlTextarea1').value;
        const email = "chicowebdev@gmail.com";
        const subject = "Message depuis le site";
      
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        
        window.location.href = mailtoLink;
      })
      

//     // Formulaire de commentaire
// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.getElementById("commentForm");
  
//     if (form) {
//       form.addEventListener("submit", async (e) => {
//         e.preventDefault();
  
//         const comment = document.getElementById("commentInput").value;
  
//         try {
//           const res = await fetch("http://localhost:3000/api/comment", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             credentials: "include",
//             body: JSON.stringify({ comment })
//           });
  
//           const result = await res.json();
  
//           if (result.success) {
//             alert("Commentaire envoyé !");
//           } else {
//             alert("Erreur : " + result.error);
//           }
//         } catch (err) {
//           console.error("Erreur envoi commentaire", err);
//         }
//       });
//     }
//   });
  