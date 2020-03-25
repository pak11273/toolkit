// A base for other patterns

/* 
3 ways to create an object:
1) const Obj = Object.create(null)
2) const Obj = new Object()
3) const Obj = {}
*/

/* 
3 ways to assign properties to objects
1) dot => Obj.someprop = "some prop"
2) brackets => Obj["someprop"] = "some prop"
3) defineProperty => Object.defineProperty(Obj, "someKey", {value: "some value", writable: true, enumerable: true, configurable: true})

