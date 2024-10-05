document.addEventListener("DOMContentLoaded", function(){
    var userdetail= document.getElementsByClassName('userdetail');
    var myButton = document.getElementById("btn");
    var usernameid = document.getElementById('usernameid');
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    var metrics= document.getElementsByClassName("metrics")
    var cardStatsContainer = document.querySelector(".stats-cards");
     function validateUsername(username){
         if(username.trim() === ""){
            alert("Please enter your username");
            return false;
         }
         const regex = /^[a-zA-Z0-9_-]{1,15}$/;
         const v= regex.test(username);
         if(!v){
            alert("Username should be valid");
         }
         return  v;
     }
     
     async function fetchUserDetails(username){
        try{
            myButton.textContent = "Searching...";
            myButton.disabled = true;
            //statsContainer.classList.add("hidden");

            // const response = await fetch(url);
            const url = `https://leetcode-stats-api.herokuapp.com/${username}`

            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

            displayUserData(parsedData);
        }
        catch(error) {
            metrics.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            myButton.textContent = "Search";
            myButton.disabled = false;
        }
          
     }

     function displayUserData(data){
        const totaleasy = data.totalEasy;
        const easysolve= data.easySolved
        //console.log("total" +totaleasy +"  solved" + easysolve)
        const totalm = data.totalMedium;
        const mediumsolved= data.mediumSolved;
        const totalh = data.totalHard;
        const hardSolved = data.hardSolved;
       
        updateprogressincirecl(totaleasy, easysolve, easyLabel,easyProgressCircle);
        updateprogressincirecl(totalm,mediumsolved,mediumLabel,mediumProgressCircle);
        updateprogressincirecl(totalh,hardSolved,hardLabel,hardProgressCircle);


     
        const cardsData = [
            {label: "Ranking", value:data.ranking },
            {label: "Acceptance Rate", value:data.acceptanceRate },
            {label: "Contribution Points", value:data.contributionPoints },
            {label:"Reputation", value:data.reputation},
        ];
console.log(cardsData);
console.log("card ka data: " , cardsData);

cardStatsContainer.innerHTML = cardsData.map(
    dataa => 
            `<div class="card">
            <h4>${dataa.label}</h4>
            <p>${dataa.value}</p>
            </div>`
).join("")

     }
     function updateprogressincirecl(total, solved, label, progress){
            
        const percentage = (solved / total) * 100;
        label.textContent=`${solved} / ${total}`
      // cicrle.style.setProperty("--progress-degree", `${percentage}%`);
        progress.style.setProperty("--progress-degree", `${percentage}%`);

     }
    myButton.addEventListener("click",function(){

    
        let lname = usernameid.value;
        console.log(lname)
        if(validateUsername(lname)){
            fetchUserDetails(lname);
        }
    }
)

})