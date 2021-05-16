'use strict';


// array to store all products (objects)
let allProducts=[];

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

new Products('bag','images/bag.jpg',0);
new Products('banana','images/banana.jpg',0);
new Products('bathroom','images/bathroom.jpg',0);
new Products('boots','images/boots.jpg',0);
new Products('breakfast','images/breakfast.jpg',0);
new Products('bubblegum','images/bubblegum.jpg',0);
new Products('dog-duck','images/dog-duck.jpg',0);
new Products('dragon','images/dragon.jpg',0);
new Products('pen','images/pen.jpg',0);
new Products('pet-sweep','images/pet-sweep.jpg',0);
new Products('scissors','images/scissors.jpg',0);
new Products('tauntaun','images/tauntaun.jpg',0);
new Products('unicorn','images/unicorn.jpg',0);
new Products('water-can','images/water-can.jpg',0);
new Products('wine-glass','images/wine-glass.jpg',0);

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


leftImageElement.addEventListener('click',handleUserClick);
middleImageElement.addEventListener('click',handleUserClick);
rightImageElement.addEventListener('click',handleUserClick);

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
        leftImageElement.removeEventListener('click', handleUserClick);
        middleImageElement.removeEventListener('click', handleUserClick);
        rightImageElement.removeEventListener('click', handleUserClick);
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
