const outputs = [];

const k = 3;
const predictionPoint = 300;

function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);

}

function runAnalysis() {
 const testSetSize = 100;
  const [testSet, trainingSet] = splitData(outputs, testSetSize);

  let numberCorrect = 0;
  
  _.range(1, 50).forEach(k => {
	const accuracy = _.chain(testSet)
		.filter(testPoint => knn(trainingSet, testPoint[0], k) === testPoint[3])
		.size()
		.divide(testSetSize)
		.value();

		console.log('For k of', k, 'Accuracy: ', accuracy);
})
  
}

function knn(data, point, k) {
	return _.chain(data)
	.map(row => [distance(row[0], point), row[3]])
	.sortBy(row => row[0])
	.slice(0, k)
	.countBy(row => row[1])
	.toPairs()
	.sortBy(row => row[1])
	.last()
	.first()
  .toNumber()
	.value()
}

// Accuracy report
function splitData(data, testCount) {
	const shuffled = _.shuffle(data);

	const testSet = _.slice(shuffled, 0, testCount);
	const trainingSet =  _.slice(shuffled, testCount);

	return [testSet, trainingSet];
}

