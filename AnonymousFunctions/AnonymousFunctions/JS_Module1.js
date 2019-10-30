var myName = 'Natsu';

function myNameIs(Name) {
    var myString = 'Name = ' + Name;
    console.log(myString);
    return myString;
}
var NameEQmyName = myNameIs(myName);

module.exports.myName = myName;
module.exports.myNameIs = myNameIs;
module.exports.NameEQmyName = NameEQmyName;