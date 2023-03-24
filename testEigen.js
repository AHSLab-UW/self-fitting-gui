let gMatrix = [[], [], [], [], [], []]

// 30 x 6 number[]
console.log("gMatrix", gMatrix);

// get row 5-30
const gMatrix25 = gMatrix.slice(5);
console.log("gMatrix25", gMatrix25);

// convert to math.js matrix
const gMatrix25Matrix = math.matrix(gMatrix25);
console.log("gMatrix25Matrix", gMatrix25Matrix);

// take the average of the gMatrix row 5 - 30 axis 1
const gAvg = math.mean(gMatrix25Matrix, 0);
console.log("gAvg", gAvg);

setGAvg(gAvg);
sendG(gAvg);

// convert math.js matrix to javascript array
const g25Arr = gMatrix25Matrix.toArray()
console.log("g25Arr", g25Arr);

// use ml-pca to find the eigenvector
const pca = new PCA(g25Arr);

// get the eigenvector
const eigenvector = pca.getEigenvectors();
console.log("eigenvector", eigenvector);

// get the index of the row with the highest eigenvalue
const maxEigenIndex = pca
  .getEigenvalues()
  .indexOf(Math.max(...pca.getEigenvalues()));
console.log("maxEigenIndex", maxEigenIndex);

// get the eigenvector with the highest eigenvalue
const maxEigenVector = eigenvector.getRow(maxEigenIndex);
console.log("maxEigenVector", maxEigenVector);
