const letter_pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
let letter_quantity = 21

function update_counter() {
    console.log(`Attempted to update card counter.`);
    document.getElementById(`card_counter`).innerHTML = `In Pool: ${letter_quantity}`;
}

function pick_random(int) {
    return Math.floor(Math.random() * (int));
} 
// Based on example from www.w3schools.com js tutorials

function pick_letter() {

    console.log("Picking random letter from pool.");
    if (letter_quantity == 0) {
        console.log(`Pool has no letters.`);
        return "";
    }

    let index = pick_random(letter_pool.length);
    console.log(`Random letter "${letter_pool[index]}" picked.`);
    letter_quantity -= 1;
    return letter_pool[index];
}

function deal_letters() {
    for (let i = 0; i < 5; i++) {
        document.getElementById(`row_${i+1}`).innerHTML += pick_letter();
        console.log(`Attempted to write to row ${i+1}.`);
    }
    update_counter();
}

function stack_rule(stack) { 
    console.log(`function stack_rule(${stack}) ran`);
    console.log(`stack length: ${stack.length}`);
    for (let i = 0; i < stack.length - 1; i++) {
        console.log(`checking chars at ${i}, ${i+1}`);
        if (stack.charCodeAt(i) > stack.charCodeAt(i+1)) {
            console.log(`stack rule check failed; returning false`);
            return false;
        }
    }
    console.log(`stack rule check succesful; returning true`);
    return true;
}

function pick(r) {
    console.log(`function pick(${r}) ran`);
    let row = document.getElementById(`row_${r}`).innerHTML;
    let hand = document.getElementById(`hand`).innerHTML;
    if (row == "") {
        console.log(`row ${r} is empty, aborting function pick(${r})`);
        return false;
    }
    if (!(stack_rule(row.at(-1) + hand))) {
        console.log(`new hand does not meet chain rule, aborting function pick(${r})`);
        return false;
    }
    document.getElementById(`hand`).innerHTML = row.at(-1) + hand;
    document.getElementById(`row_${r}`).innerHTML = row.slice(0, row.length-1);
    return true;
}

function set(r) {
    console.log(`function set(${r}) ran`);
    let row = document.getElementById(`row_${r}`).innerHTML;
    let hand = document.getElementById(`hand`).innerHTML;

    if ( row.length == 0 ) {
        console.log(`row empty or username field, skipping rule check`);
        document.getElementById(`row_${r}`).innerHTML = hand;
        document.getElementById(`hand`).innerHTML = "";
        return true;
    }

    if ( !(stack_rule(row.at(-1) + hand.at(0))) && r != 6 ) {
        console.log(`placement does not meet chain rule, aborting function set(${r})`);
        return false;
    }

    console.log(`set(${r}) command successful`);
    document.getElementById(`row_${r}`).innerHTML += hand;
    document.getElementById(`hand`).innerHTML = "";
    return true;
}

function recycle() {
    let hand_stack = document.getElementById(`hand`).innerHTML.length;
    if (hand_stack < 5) {
        console.log(`Hand stack (${hand_stack}) is not long enough.`);
        return false;
    }
    console.log(`Attempted to recycle ${hand_stack} letters.`);
    letter_quantity += hand_stack;
    update_counter();
    document.getElementById(`hand`).innerHTML = "";
    return true;
}
