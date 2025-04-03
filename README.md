# Connect Four Game in JavaScript

This is the Connect Four game implemented in TypeScript/Next.js with tests written in Jest.

The game provides a 6 x 7 grid. The goal of each player is to create a horizontal, vertical, or diagonal line of length 4. Turns alternate, so you have to both plan your strategy to win, as well as defend against your opponent.

![](GameScreenshot.png)

## Running the Game

```
npm run dev
```

To place a token, click on the top-most row in the column you want. The color of the top row will change based on whose turn it is. Black goes first.

In the previous implementation (HTML/CSS/JavaScript), the space in the top row would change color on hover based on the current turn. However, there isn't a straightforward way to do that in React, as the element's style cannot be set directly from the `onHover` event, as was previously done. The compromise is to set all of the spaces in the "drop" row to that color without hovering.

## Running the Unit Tests

```
npm test
```

## Supported Browsers

- Chrome
- Firefox
