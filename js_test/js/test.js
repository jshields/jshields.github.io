(function(){

function Animal(name){
	this.name = name;
	return this;
}
Animal.prototype = {
	exciteName: function(n){
		return this.name+='!';
	}
	// not working
	//printAnimals: function(){
	//	instanceOf(Animal());
	//}
}

var cat = new Animal('Kit');
var dog = new Animal('Dag');

document.getElementById('result').innerHTML = 'Cat name is: '+cat.name+'. Dog name is: '+dog.name+'.';
//working
//alert('Excite! '+cat.exciteName());
/*function argsCount(){
	alert('args: '+arguments.length);
}
argsCount(1, 2, 3, "mouse", cat);*/

}());