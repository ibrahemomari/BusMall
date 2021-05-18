'use strict';


// array to store all products (objects)
let allProducts=[];

// array have the name of products
let productsName=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];


// array to count how many unique image has shown
let imagesCounter=[];

// image variables 
let leftImage , middleImage, rightImage;

// array to store first 3 image each round
let uniqueImages=['','',''];

//get the element of img tags
let leftImageElement , middleImageElement, rightImageElement;
leftImageElement=document.getElementById('leftImage');
middleImageElement=document.getElementById('middleImage');
rightImageElement=document.getElementById('rightImage');

// get the button tag
let btnResult=document.getElementById('btnResults');

// get the result report container tag
let parent=document.getElementById('resultReport1');

// maximum round number (25 round)
let maxRound=25;

// the user attempts
let userAttempts=0;

// for chart
let votesChart=[];
let shownImageChart=[];

// constructor for products
function Products (name,path,TimeImageShown)
{
    this.name=name;
    this.path=path;
    this.TimeImageShown=TimeImageShown;
    allProducts.push(this);
    this.votes=0;


}
for (let i = 0; i < productsName.length; i++) {
    if (productsName[i]==='sweep') {
        new Products(productsName[i],`images/${productsName[i]}.png`,0);
    }else
    {
        new Products(productsName[i],`images/${productsName[i]}.jpg`,0);

    }
 
}


// console.log(allProducts);

function randomizeProduct()
{
    return Math.floor(Math.random() * allProducts.length);
}

function renderProducts()
{
    leftImage=randomizeProduct();
    middleImage=randomizeProduct();
    rightImage=randomizeProduct();
   
    do
    {
        middleImage=randomizeProduct();
        rightImage=randomizeProduct();
    }while(leftImage===middleImage || middleImage===rightImage || leftImage===rightImage )

   if (uniqueImages.includes(allProducts[leftImage].name) || uniqueImages.includes(allProducts[middleImage].name) || uniqueImages.includes(allProducts[rightImage].name)) {
    renderProducts();
   }
   uniqueImages[0]=allProducts[leftImage].name;
   uniqueImages[1]=allProducts[middleImage].name;
   uniqueImages[2]=allProducts[rightImage].name;

    // console.log(leftImage);
    // console.log(middleImage);
    // console.log(rightImage);

    leftImageElement.src=allProducts[leftImage].path;
    middleImageElement.src=allProducts[middleImage].path;
    rightImageElement.src=allProducts[rightImage].path;
    
   
       allProducts[leftImage].TimeImageShown= allProducts[leftImage].TimeImageShown + 1;
       allProducts[middleImage].TimeImageShown= allProducts[middleImage].TimeImageShown + 1;
       allProducts[rightImage].TimeImageShown= allProducts[rightImage].TimeImageShown + 1;
        
    


}

renderProducts();

let imageContainer=document.getElementById('imageContianer');
imageContainer.addEventListener('click',handleUserClick);


let formContainer=document.getElementById('FormContainer');
let massege=document.getElementById('massege');
formContainer.addEventListener('submit',roundNumber);

function roundNumber(event)
{
    event.preventDefault();
    maxRound=event.target.round.value;

    massege.textContent='Round Number Saved Seccussfuly'


}

function handleUserClick(event) {

    // console.log(event.target.id);
    userAttempts++;
    if(userAttempts<maxRound)
    {
        
        if (event.target.id==='leftImage') {
            allProducts[leftImage].votes=allProducts[leftImage].votes + 1; 
        } 
        else if(event.target.id==='middleImage') {
            allProducts[middleImage].votes=allProducts[middleImage].votes + 1; 
        }
        else {
            allProducts[rightImage].votes=allProducts[rightImage].votes + 1; 
        }
    }else{
        imageContianer.removeEventListener('click', handleUserClick);
        btnResult.style.visibility = "visible";

        
    }

    // console.log(userAttempts);
    // console.log(allProducts);
    renderProducts();

    console.log(uniqueImages);
}

btnResult.addEventListener('click',showResults);

function showResults(event)
{
    
    for (let i = 0; i < allProducts.length; i++) {
        

        votesChart[i]=(allProducts[i].votes);
        shownImageChart[i]=(allProducts[i].TimeImageShown);
    }


    
    let ul=document.createElement('ul');
    
    parent.appendChild(ul);
    for (let i = 0; i < allProducts.length; i++) {
        let li=document.createElement('li');
        ul.appendChild(li);
        li.textContent=`${allProducts[i].name} had ${allProducts[i].votes}, and was seen ${allProducts[i].TimeImageShown} times. `
        
    }
    
    console.log(votesChart);
console.log(shownImageChart);

// chart 

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productsName,
        datasets: [{
            label: '# of Votes',
            data: votesChart,
            backgroundColor: [
              
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(49, 197, 246, 1)',
                'rgba(207, 49, 246, 1)',
                'rgba(246, 49, 82, 1)',
                'rgba(246, 191, 49, 1)',
                'rgba(246, 237, 49, 1)',
                'rgba(177, 246, 49, 1)',
                'rgba(69, 246, 49, 1)',
                'rgba(49, 246, 145, 1)',
                'rgba(49, 246, 220, 1)',
                'rgba(49, 223, 246, 1)',
                'rgba(92, 49, 246, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderColor: [
                'rgba(255, 255, 255, 1)'

                
            ],
            borderWidth: 1
        },
        {
            label: '# of Image has shown',
            data:shownImageChart,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(49, 197, 246, 0.5)',
                'rgba(207, 49, 246, 0.5)',
                'rgba(246, 49, 82, 0.5)',
                'rgba(246, 191, 49, 0.5)',
                'rgba(246, 237, 49, 0.5)',
                'rgba(177, 246, 49, 0.5)',
                'rgba(69, 246, 49, 0.5)',
                'rgba(49, 246, 145, 0.5)',
                'rgba(49, 246, 220, 0.5)',
                'rgba(49, 223, 246, 0.5)',
                'rgba(92, 49, 246, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)'



            ],
            borderColor: 
                'rgba(255, 255, 255, 1)'
            ,

        }
    ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}








console.log(uniqueImages);
