/** Javascript that allows the search bar to function, pairs
 * with each pages script to handle the search bar element accordingly
 */
(() => {
    // lists each animal page to add to the search function
    const animalPages = [
        { name: "Gray Wolf", path: "animals/Gray_Wolf.html" },
        { name: "White-Tailed Deer", path: "animals/White_Tailed_Deer.html" },
        { name: "Cotton Mouth Snake", path: "animals/Cotton_Mouth_Snake.html" },
        { name: "Bobcat", path: "animals/Bobcat.html" },
        { name: "Bluegill", path: "animals/Bluegill.html" },
        { name: "Hellbender Salamander", path: "animals/Hellbender_Salamander.html" },
        { name: "Northern Cardinal", path: "animals/Northern_Cardinal.html" }
    ];
    const siteRoot = new URL(".", document.currentScript.src);
    const form = document.querySelector(".search-bar form");
    const input = form.querySelector("#animal-search");
    const status = form.parentElement.querySelector(".search-status");
    const normalize = value => value.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");

    form.addEventListener("submit", event => {
        event.preventDefault();
        const query = normalize(input.value);
        // add the text to selecting the search bar, includes instructions
        if (!query) {
            status.textContent = "Enter an animal's name to search.";
            status.hidden = false;
            input.focus();
            return;
        }
        // checks to make sure the search filters an existing page to path to
        const matches = animalPages.filter(animal => normalize(animal.name).includes(query));
        if (matches.length === 1) {
            window.location.href = new URL(matches[0].path, siteRoot).href;
            return;
        }
        // adds error text to searches that don't apply to current pages
        status.textContent = matches.length
            ? "More than one animal matches. Try another name."
            : `No animal page found for "${input.value.trim()}". Check back later for the animal page or try another.`;
        status.hidden = false;
    });

    input.addEventListener("input", () => {
        status.textContent = "";
        status.hidden = true;
    });
})();
