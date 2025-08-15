function deal_letters() {
    for (let i = 0; i < 5; i++) {
        document.getElementById(`row_${i+1}`).innerHTML += "a";
        console.log(`Attempted to write to row ${i+1}.`)
    }
}

// TODO: Make dealer deal random letters or characters from some wider set
// TODO: Make playing functions (Picking up letters, setting down elsewhere)
// (Needs to contain some rules)
// Also probably design rules