const kids = 3;

const proto = {
  parents: 2,
  play: () => 'played',
};

const obj = {};

obj['created'] = Object.create(proto);
obj['created_obj'] = Object.create(proto, {
  kids: { value: kids },
});
obj['assigned'] = Object.assign(proto, { kids });
obj['created_assigned'] = Object.assign(
  Object.create(proto),
  { kids }
);

[
  'created',
  'created_obj',
  'assigned',
  'created_assigned',
].forEach(key => {
  const o = obj[key];
  try {
    console.log(`================ ${key}`);
    console.log('__proto__:', o.__proto__);
    console.log(
      'hasOwnProperty(parents):',
      o.hasOwnProperty('parents')
    );
    console.log(
      'hasOwnProperty(play):',
      o.hasOwnProperty('play')
    );
    console.log(
      'hasOwnProperty(kids):',
      o.hasOwnProperty('kids')
    );
    console.log(
      'getPrototypeOf:',
      Object.getPrototypeOf(o)
    );
    console.log('(Object):', o);
    console.log('(play):', o.play());
    console.log('(kids):', o.kids);
    console.log('(parents):', o.parents);
  } catch (err) {
    console.error(err);
  }
});

/*
 * ================ created
 * __proto__: { parents: 2, play: [Function: play], kids: 3 }
 * hasOwnProperty(parents): false
 * hasOwnProperty(play): false
 * hasOwnProperty(kids): false
 * getPrototypeOf: { parents: 2, play: [Function: play], kids: 3 }
 * (Object): {}
 * ================ created_obj
 * __proto__: { parents: 2, play: [Function: play], kids: 3 }
 * hasOwnProperty(parents): false
 * hasOwnProperty(play): false
 * hasOwnProperty(kids): true
 * getPrototypeOf: { parents: 2, play: [Function: play], kids: 3 }
 * (Object): {}
 * ================ assigned
 * __proto__: [Object: null prototype] {}
 * hasOwnProperty(parents): true
 * hasOwnProperty(play): true
 * hasOwnProperty(kids): true
 * getPrototypeOf: [Object: null prototype] {}
 * (Object): { parents: 2, play: [Function: play], kids: 3 }
 * ================ created_assigned
 * __proto__: { parents: 2, play: [Function: play], kids: 3 }
 * hasOwnProperty(parents): false
 * hasOwnProperty(play): false
 * hasOwnProperty(kids): true
 * getPrototypeOf: { parents: 2, play: [Function: play], kids: 3 }
 * (Object): { kids: 3 }
 */
