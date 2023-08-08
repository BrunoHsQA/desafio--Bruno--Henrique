import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['1,1']],
        ['credito', 'R$ 3,09', ['1,1']],
        ['debito', 'R$ 3,00', ['1,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 10,92', ['1,1', '5,1', '6,1']],
        ['credito', 'R$ 11,85', ['1,1', '5,1', '6,1']],
        ['debito', 'R$ 11,50', ['1,1', '5,1', '6,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

});