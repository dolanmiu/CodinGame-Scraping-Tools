const members = new Set();
const elem = document.querySelector(
  "#content > div > div:nth-child(1) > div:nth-child(3) > div > div > div:nth-child(2)"
);
const parseMembers = () => {
  // ************************
  // Iterate over each member
  // ************************
  const currentContainer = elem.querySelector("div");
  for (const child of currentContainer.children) {
    const userField = child.querySelector("div > div > div > div > span > div");
    if (userField === null) {
      continue;
    }
    const user = userField.querySelector("span").innerHTML.trim();
    const hasNotAccepted = userField.querySelector("button") !== null;
    if (!hasNotAccepted) {
      const matches = user.match(/\((.+)\)/i);
      if (matches && matches[1]) {
        members.add(matches[1]);
        continue;
      }

      const emailOnlyMatch = user.match(/(.+@blackrock\.com)$/i);

      if (emailOnlyMatch && emailOnlyMatch[1]) {
        members.add(emailOnlyMatch[1]);
        continue;
      }
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
const intervalId = setInterval(() => {
  if (scrollPosition > elem.scrollHeight) {
    clearInterval(intervalId);
    downloadMembers();
  }
  parseMembers();
  scrollPosition += 200;
  scrollTo(scrollPosition);
}, 500);
