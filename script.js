import "./style.css";

const searchInput = document.querySelector("#search-input");
const houseFiltersEl = document.querySelector("#house-filters");
const cardsGridEl = document.querySelector("#cards-grid");

// Flatten all people across houses while keeping house info attached

const allCharacters = got.houses.flatMap((house) => {
  return house.people.map((person) => ({
    ...person,
    houseName: house.name,
    houseWikiLink: house.wikiLink,
  }));
});

let activeHouse = null;
let searchTerm = "";

function toHttps(url) {
  return url ? url.replace(/^http:\/\//i, "https://") : "#";
}

function createFallbackAvatar(name) {
  const letter = name ? name.trim().charAt(0).toUpperCase() : "?";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <rect width="96" height="96" fill="#bae6fd" />
        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#0f172a" font-family="Ubuntu, sans-serif" font-size="32" font-weight="700">${letter}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function renderHouseButtons() {
  houseFiltersEl.innerHTML = "";

  got.houses.forEach((house) => {
    const isSelected = activeHouse === house.name;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = house.name.toUpperCase();
    button.setAttribute("aria-pressed", String(isSelected));
    button.className = isSelected
      ? "cursor-pointer rounded border-2 border-zinc-900 bg-white px-3.5 py-1.5 text-xs font-bold tracking-wider text-zinc-900 uppercase transition"
      : "cursor-pointer rounded border-2 border-zinc-900 bg-zinc-900 px-3.5 py-1.5 text-xs font-bold tracking-wider text-white uppercase transition hover:-translate-y-0.5 hover:bg-zinc-800";
    button.addEventListener("click", () => {
      activeHouse = isSelected ? null : house.name;
      renderHouseButtons();
      renderCharacterCards();
    });

    houseFiltersEl.appendChild(button);
  });
}

function getFilteredPeople() {
  const query = searchTerm.trim().toLowerCase();

  return allCharacters.filter((person) => {
    const matchesHouse = !activeHouse || person.houseName === activeHouse;
    const matchesSearch =
      !query ||
      person.name.toLowerCase().includes(query) ||
      person.description.toLowerCase().includes(query) ||
      person.houseName.toLowerCase().includes(query);

    return matchesHouse && matchesSearch;
  });
}

function buildCharacterCard(person) {
  const card = document.createElement("article");
  card.className = "flex flex-col items-center rounded bg-sky-100 px-6 py-7 text-center shadow-sm transition hover:shadow-md";

  const img = document.createElement("img");
  img.src = person.image;
  img.alt = person.name;
  img.loading = "lazy";
  img.className = "mb-4 h-24 w-24 rounded-full bg-sky-200 object-cover object-top shadow-xs";
  img.addEventListener("error", () => {
          img.src = createFallbackAvatar(person.name);
  });

  const nameHeading = document.createElement("h2");
  nameHeading.textContent = person.name;
  nameHeading.className = "mb-2.5 text-lg font-bold text-slate-900"

  const descriptionText = document.createElement("h2");
  descriptionText.textContent = person.description;
  descriptionText.className = "mb-5 flex-1 text-sm leading-relaxed text-slate-700";

  const knowMoreLink = document.createElement("a");
  knowMoreLink.href = toHttps(person.wikiLink);
  knowMoreLink.target = "_blank";
  knowMoreLink.rel = "noopener noreferrer";
  knowMoreLink.textContent = "KNOW MORE";
  knowMoreLink.className =
    "inline-block rounded bg-zinc-900 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase transition hover:bg-slate-700";
  card.append(img, nameHeading, descriptionText, knowMoreLink);
  return card;

}

function renderCharacterCards() {
  const people = getFilteredPeople();
  cardsGridEl.innerHTML = "";

  if (people.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No matching characters found.";
    message.className = "col-span-full py-10 text-center text-base text-slate-500";
    cardsGridEl.appendChild(message);
    return;
  }

  const fragment = document.createDocumentFragment();
  people.forEach((person) => {
    fragment.appendChild(buildCharacterCard(person));
  });

  cardsGridEl.appendChild(fragment);
}

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderCharacterCards();
});

renderHouseButtons();
renderCharacterCards();
