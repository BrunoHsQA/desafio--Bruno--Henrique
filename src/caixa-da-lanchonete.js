// A classe Cardapio se refere ao menu no README.md, junto com suas variáveis,descrição e preço;
// fazendo que nos testes sejam chamados, selecionados e escolhidos para executar o teste com eficiência.
// Por exemplo: Ao usar o método "constructor", ele faz com que a classe seja identificada quando chamada,
// o método "this" é uma forma de detalhar as propriedades dentro dela, sendo assim quando o teste chama
//o item "cafe", o "tihs" é como uma garra que pega algum alimento dentro do "itens", que podemos dizer
// que é uma caixa cheia de obejtos dentro.
//Por fim o método "getItem" é uma forma de ação, quando o usuário executa os testes e tem o item "suco",
//o "getItem" é o botão que é apertado e a garra "this" solta para ser reconhecido pelo usuário.

class Cardapio {
  constructor() {
    this.itens = {
      cafe: { descricao: 'Café', valor: 3.00 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
      suco: { descricao: 'Suco Natural', valor: 6.20 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    };
  }

  getItem(codigo) {
    return this.itens[codigo];
  }
}


//Os métodos dentro da classe "MetodoDePagamentos" são estáticos, sendo assim que podem ser chamados diretamente
//sem precisar criar um objeto.
class MetodoDePagamentos {
  static calcularTotalComDesconto(total) {
    return total * 0.95; // 5% de desconto
  }

  static calcularTotalComAcrescimo(total) {
    return total * 1.03; // 3% de acréscimo
  }
}

class CaixaDaLanchonete { 
  cardapio;

  constructor() {
    this.cardapio = new Cardapio();
  }
 
  calcularValorDaCompra(metodoDePagamento, itens) {
    let total = 0;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');
      const cardapioItem = this.cardapio.getItem(codigo);

      //As variáveis abaixo são uma forma de reconhecer os alimentos da classe "Cardapio".
      //cardapioItem é a variável que somente pode ser chamada com sucesso caso tenha o alimento no "itens"
      //por exemplo: se chamar o item "guaraná", a variável não será chamada com sucesso, retornado a mensagem:
      //"Item inválido!"

      if (!cardapioItem) {
        return "Item inválido!";
      }


      //Parecido com o anterior a variável "principalItem" reconhece apenas os alimentos principais, caso
      //um alimento extra seja pedido sem o principal, a mensagem "Item extra não pode ser pedido sem o principal"
      //aparece.
      if (codigo === 'chantily') {
        const principalItem = this.cardapio.getItem('cafe');
      
        if (!principalItem) {
          return "Item extra não pode ser pedido sem o principal";
        }
      
      
      } else if (codigo === 'queijo') {
        const principalItem = this.cardapio.getItem('sanduiche');
      
        if (!principalItem) {
          return "Item extra não pode ser pedido sem o principal";
        }
      

        //Este trecho do código calcula o valor multiplicado pela quantidade
        //o "parseInt" não permite que o item "sanduiche" seja escolhido em 2.4 por exemplo.
        total += cardapioItem.valor * parseInt(quantidade, 10);
      } else {
        if (quantidade <= 0) {
          return "Quantidade inválida!";
        }
      
        total += cardapioItem.valor * parseInt(quantidade, 10);
      }
    }


    //Neste trecho caso o programador executar o teste com nada no carrinho, ou nas "caixas", a mensagem
    // "Não há itens no carrinho de compra!" aparecerá.
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    //Neste trecho a classe "metodoDePagamento" procura saber se no teste em questão tem as seguintes palavras
    //abaixo depois do "===", que é uma forma de evitar discrepâncias, tanto o valor como o dado devem ser
    //estritamente iguais para passar.
    if (metodoDePagamento === 'dinheiro') {
      total = MetodoDePagamentos.calcularTotalComDesconto(total);

    } else if (metodoDePagamento === 'credito') {
      total = MetodoDePagamentos.calcularTotalComAcrescimo(total);

    } else if (metodoDePagamento !== 'debito') {
      return "Forma de pagamento inválida!";
    }


    //Neste trecho,O método toFixed(2) é usado para garantir que o valor tenha exatamente duas casas decimais.
    //O método replace('.', ',') garante que o "."(ponto) seja substituido pela ",", assim como o Real.
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
