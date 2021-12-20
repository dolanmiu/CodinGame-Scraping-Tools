const members = new Set();
const elem = document.body;
const parseMembers = () => {
  // ************************
  // Iterate over each member
  // ************************
  const currentContainer = document.querySelector(
    "#scrollable-container > div > div > table > tbody"
  );
  for (const child of currentContainer.children) {
    const placement = child.querySelector("td:nth-child(1) > div > span");
    const emailField = child.querySelector("td:nth-child(3) > div");
    if (emailField === null) {
      continue;
    }
    for (const players of emailField.children) {
      members.add(players.title);
    }
  }
};
const downloadMembers = () => {
  const csvContent = Array.from(members).join("\n");
  console.info(csvContent);
};
const scrollTo = (num) => {
  elem.scroll({ top: num });
};
let scrollPosition = 0;
scrollTo(0);
parseMembers();
downloadMembers();
