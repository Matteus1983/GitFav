class Person {
    constructor(name) {
        this.name = name
    }
}

let person = new Person('Pedro')

class Weight extends Person {
    constructor(weight){
        super(weight)
        this.weight = weight
    }
}

let kgs = new Weight(75)

console.log(`O ${person.name} tem ${kgs.weight}Kgs`)





// NodeList é bem similiar a uma estrutura de dados Array [] / ArrayLike

// princípio da imutabilidade, você quer um carro novo, então você vai comprar um, e não reformar oque já tem. Com o 'filter' você cria um novo array com os elementos selecionados, e não desfaz oque já havia sido criado.