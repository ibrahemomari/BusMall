'use strict';


// array to store all products (objects)
let allProducts=[];

// array have the name of products
let productsName=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];


// array to count how many unique image has shown
let imagesCounter=[];

// image variables 
let leftImage , middleImage, rightImage;

//get the element of img tags
let leftImageElement , middleImageElement, rightImageElement;
leftImageElement=document.getElementById('leftImage');
middleImageElement=document.getElementById('middleImage');
rightImageElement=document.getElementById('rightImage');

// get the button tag
let btnResult=document.getElementById('btnResults');

// get the result report container tag
let parent=document.getElementById('resultReport');

// maximum round number (25 round)
let maxRound=25;

// the user attempts
let userAttempts=0;

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


console.log(allProducts);

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
        
    }

    console.log(userAttempts);
    console.log(allProducts);
    renderProducts();


}

btnResult.addEventListener('click',showResults);

function showResults(event)
{
    
    let ul=document.createElement('ul');
    
    parent.appendChild(ul);
    for (let i = 0; i < allProducts.length; i++) {
        let li=document.createElement('li');
        ul.appendChild(li);
        li.textContent=`${allProducts[i].name} had ${allProducts[i].votes}, and was seen ${allProducts[i].TimeImageShown} times. `
        
    }
    
    

}
