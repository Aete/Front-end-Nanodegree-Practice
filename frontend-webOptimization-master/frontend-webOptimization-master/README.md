# frontend-webOptimization

## Project 1 : Optimize PageSpeed Insights score for index.html
### A. pageSpeed Score
1. moble : 92
2. Desktop 95

### B. Optimization
1. Inline CSS Code 
2. async for scripts put the ‘scripts’ to end of the body
3. using optimizated image
4. Add media query for 'print'
5. minifying html, css, js


## Project 2 : Optimize Frames per Second in pizza.html
### A. Revising changePizzaSizes function 
1. delete determineDX function and put the Switch code inside of changePizzaSizes function
2. change measurement of pizza size from 'px' to '%'

### B. Revising updatePositions function 
1. change this by moving calculation of scrolltop outside of 'for' loop

### C. document.addEventListener('DOMContentLoaded', function() .........
1. calculate the number of pizzas of background and put this number to for loop
2. adding var movingpizzas by using getElementByid


## How to Run
0. Download or clone this repository
1. Click the index.html
2. In cam's pizzaria, you can change size of pizza by using scroll bar
