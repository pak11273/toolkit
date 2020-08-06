## Returning T or F
return !!req.session.userId
// this is a technique that replaces this:
// if (req.session.userId) {
//   return true
// }
// return false
