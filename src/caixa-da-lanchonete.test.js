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

    test.each([
        ['dinheiro', 'R$ 33,73', ['1,4', '5,3', '6,2']],
        ['credito', 'R$ 36,57', ['1,4', '5,3', '6,2']],
        ['debito', 'R$ 35,50', ['1,4', '5,3', '6,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', [1,0]],
        ['com código zero', 'credito', 'Item inválido!', [0,1]],
        ['com código inexistente', 'debito', 'Item inválido!', [14,1]],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', [1,1]],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['2,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['6,1']],
        ['feijão', 'debito', 'Item extra não pode ser pedido sem o principal', ['9,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['5,1', '2,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['6,1', '8,1']],
        ['feijão com outro item', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['9,1', '1,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));
});
