console.log('Start');

setImmediate(() => {
  console.log('setImmediate');
});

const timeout = setTimeout(() => {
  console.log('setTimeout');
}, 10000);
console.log (timeout);

process.nextTick(() => {
  console.log('nextTick');
});

console.log('End');