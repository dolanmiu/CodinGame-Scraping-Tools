const members = new Set();
const elem = document.querySelector("#scrollable-container");
const parseMembers = () => {
  // ************************
  // Iterate over each member
  // ************************
  const currentContainer = document.querySelector(
    "#scrollable-container > div:nth-child(2) > div > div > div:nth-child(3) > div > div:nth-child(3) > div"
  );
  for (const child of currentContainer.children) {
    const emailField = child.querySelector("div:nth-child(3)");
    if (emailField === null) {
      continue;
    }
    const user = emailField.innerHTML;
    members.add(user);
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
const intervalId = setInterval(() => {
  if (scrollPosition > elem.scrollHeight) {
    downloadMembers();
  }
  parseMembers();
  scrollPosition += 1000;
  scrollTo(scrollPosition);
}, 2000);
