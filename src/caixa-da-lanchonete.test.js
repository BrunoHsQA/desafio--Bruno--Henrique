import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    test.each([
        ['dinheiro', 'R$ 2,85', ['1,1']],
        ['credito', 'R$ 3,09', ['1,1']],
        ['debito', 'R$ 3,00', ['1,1']],
    ])('compra simples em %p deve resultar em %p', (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado).toBe(resultadoEsperado);
    });

    test.each([
        ['dinheiro', 'R$ 10,92', ['1,1', '5,1', '6,1']],
        ['credito', 'R$ 11,85', ['1,1', '5,1', '6,1']],
        ['debito', 'R$ 11,50', ['1,1', '5,1', '6,1']],
    ])('compra de dois itens em %p deve resultar em %p', (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado).toBe(resultadoEsperado);
    });

});