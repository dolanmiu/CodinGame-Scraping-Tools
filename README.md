# CodinGame Scraping Tools

> Scripts to scrape data from CodinGame

## Ultimate Scripts to get all users not registered to an event

Run the two scripts to get player who registered, and get players in an event, and execute the diff manually in `Excel`

### Script to get all players who have registered in general

1. Go to the user page: https://www.codingame.com/work/dashboard/account/users
2. Run Script below:
   ```js
   # src/registered-users-in-organisation.js
   ```

### Script to get all players in an event

1. Go to the event player page: E.g. https://www.codingame.com/work/dashboard/team-building/events/683/configuration/players
2. Scroll a few inches down the page and inspect element on one of the row elements, the document.querySelector can't find #scrollable-container as it is inside an iframe. Clicking around for some reason allows Chrome to find it.
3. Alternatively, if you want a more reliable experience, navigate to the IFrame directly by running: `window.location.href = document.querySelector("iframe").src`
4. Run script below:
   ```js
   # src/registered-users-in-event.js
   ```

### Script to get all players in invalid teams

1. Go to the event player page: E.g. https://www.codingame.com/work/dashboard/team-building/events/683/configuration/players
2. Scroll a few inches down the page and inspect element on one of the row elements, the document.querySelector can't find #scrollable-container as it is inside an iframe. Clicking around for some reason allows Chrome to find it.
3. Alternatively, if you want a more reliable experience, navigate to the IFrame directly by running: `window.location.href = document.querySelector("iframe").src`
4. Run script below:
   ```js
   # src/invalid-users-in-event.js
   ```
