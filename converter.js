document.getElementById('convertButton').addEventListener('click', function () {
    // Obtém o texto do textarea
    const inputText = document.getElementById('inputText').value;

    // Divide o texto em linhas, ignorando linhas em branco
    const rows = inputText.trim().split('\n').filter(row => row.trim() !== '');

    // Converte cada linha em um array de células
    const data = rows.map(row => {
        let item = '', quantidade = '', preco = '';

        // Tenta dividir a linha em partes usando vírgulas
        const parts = row.split(',').map(part => part.trim());

        if (parts.length === 3) {
            [item, quantidade, preco] = parts;
        } else {
            // Se a linha não possui exatamente três partes, tenta extrair usando regex
            const regex = /^(.+?),\s*(.+?),\s*R?\$?\s*(.+)$/;
            const matches = row.match(regex);
            if (matches) {
                item = matches[1].trim();
                quantidade = matches[2].trim();
                preco = `R$ ${matches[3].trim()}`;
            }
        }

        return [item, quantidade, preco];
    });

    // Adiciona cabeçalhos à tabela
    data.unshift(['Item', 'Quantidade', 'Preço']);

    // Cria uma nova planilha do Excel
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Cria um novo workbook e adiciona a planilha
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Compras');

    // Gera um arquivo Excel
    XLSX.writeFile(workbook, 'compras.xlsx');
});
