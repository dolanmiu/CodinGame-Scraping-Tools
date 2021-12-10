# CodinGame Scraping Tools

> Scripts to scrape data from CodinGame

> Developer Note:
> This uses `embedme` to embed the scripts in `src/` to the readme
> **Do not:** update the code in the README
> **Do:** edit the code in the `/src` folder, and then run `npx embedme README.md` in `Terminal`

## Ultimate Scripts to get all users not registered to an event

Run the two scripts to get player who registered, and get players in an event, and execute the diff manually in `Excel`

### Script to get all players who have registered in general

1. Go to the user page: https://www.codingame.com/work/dashboard/account/users
2. Run Script below:
   ```js
   // src/registered-users-in-organisation.js
   
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
   
   ```

### Script to get all players in an event

1. Go to the event player page: E.g. https://www.codingame.com/work/dashboard/team-building/events/683/configuration/players
2. Scroll a few inches down the page and inspect element on one of the row elements, the document.querySelector can't find #scrollable-container as it is inside an iframe. Clicking around for some reason allows Chrome to find it.
3. Alternatively, if you want a more reliable experience, navigate to the IFrame directly by running: `window.location.href = document.querySelector("iframe").src`
4. Run script below:
   ```js
   // src/registered-users-in-event.js
   
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
   
   ```

### Script to get all players in invalid teams

1. Go to the event player page: E.g. https://www.codingame.com/work/dashboard/team-building/events/683/configuration/players
2. Scroll a few inches down the page and inspect element on one of the row elements, the document.querySelector can't find #scrollable-container as it is inside an iframe. Clicking around for some reason allows Chrome to find it.
3. Alternatively, if you want a more reliable experience, navigate to the IFrame directly by running: `window.location.href = document.querySelector("iframe").src`
4. Run script below:
   ```js
   // src/invalid-users-in-event.js
   
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
       const hasError =
         [...child.classList]
           .map((a) => a.startsWith("teamError"))
           .filter((a) => !!a).length > 0;
   
       if (emailField === null || hasError === false) {
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
     if (scrollPosition >= elem.scrollHeight) {
       downloadMembers();
     }
     parseMembers();
     scrollPosition += 1000;
     scrollTo(scrollPosition);
   }, 2000);
   
   ```
