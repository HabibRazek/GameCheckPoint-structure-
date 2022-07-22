// First check
document.querySelector(".control-bouttons span").onclick=function(){
    let yourName = prompt("Whats Your Name");
    if(yourName == "" || yourName == null){
        document.querySelector(".name span").innerHTML = "Guest";
    }
    else{
        document.querySelector(".name span").innerHTML = yourName;
};
    document.querySelector(".control-bouttons").remove();
};

let duration = 1000;
let MemoryGameBlocks = document.querySelector(".memory-game-blocks");
let blocks = Array.from(MemoryGameBlocks.children);
let OrderRange = [...Array(blocks.length).keys()];

// console.log(OrderRange);
machki(OrderRange);
// console.log(OrderRange);


/**
 * ! add order css propeerty to game blocks
 **/
blocks.forEach((block, index) => {
    block.style.order = OrderRange[index];
    // add click event
    block.addEventListener("click", () => {
        flipBlock(block);
    });
});



/**
* ! machki l carta 
**/
function machki(array){
    let current = array.length,
    temp,
    random;
    while (current>0) {
        random = Math.floor(Math.random()*current); // thrabneh fil current bech random number mayfoutech el range 
        // Decrease lenght
        current --;
        // Save current element 
        temp = array[current];
        // current element = random element
        array[current] = array[random];
        // swap array
        array[random] = temp;
    }
    return array;

}


function flipBlock(selectedBlock){
    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {

    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

}      
}

function stopClicking() {

    // Add Class No Clicking on Main Container
    MemoryGameBlocks.classList.add('no-clicking');
    // Wait Duration
    setTimeout(() => {
      // Remove Class No Clicking After The Duration
        MemoryGameBlocks.classList.remove('no-clicking');

    }, duration);

}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.anime === secondBlock.dataset.anime) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
    
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    
    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    
        setTimeout(() => {
    
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
    
        }, duration);
    
        document.getElementById('fail').play();
    
    }

}
