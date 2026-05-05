# Teste de Assistente de Código

## Descrição

Este projeto é uma coleção de exemplos de código Python desenvolvidos para testar e demonstrar funcionalidades de assistentes de codificação. Inclui implementações de algoritmos básicos, scripts com bugs para depuração e exemplos de refatoração de código. Cada arquivo é acompanhado de explicações detalhadas em arquivos Markdown.

O objetivo é fornecer casos práticos para avaliar a capacidade de assistentes em gerar, corrigir e melhorar código, além de explicar lógicas e decisões tomadas.

## Estrutura do Projeto

- **`num_primos.py`**: Implementação de uma função eficiente para verificar se um número é primo, utilizando o algoritmo de verificação otimizado. Inclui testes com valores de exemplo.
- **`debug.py`**: Script de calculadora de carrinho de compras que calcula subtotais, impostos e descontos. Contém comentários inline explicando as decisões de lógica.
- **`refatoracao.py`**: Versão refatorada de uma função que calcula estatísticas básicas (soma, média, máximo e mínimo) de uma lista de números. Demonstra boas práticas de codificação.
- **`explicacao_num_primo.md`**: Explicação passo a passo da lógica da função `eh_primo` em `num_primos.py`.
- **`explicacao_debug.md`**: Documentação dos erros identificados e correções aplicadas no código original de `debug.py`.
- **`explicacao_refatoracao.md`**: Análise detalhada da implementação original da função de estatísticas, antes da refatoração.

## Como Executar

### Pré-requisitos
- Python 3.x instalado no sistema.

### Passos
1. Navegue até a pasta do projeto: `cd test-assistent-code`
2. Execute os scripts Python conforme necessário:
   - `python num_primos.py` - Executa testes da função de números primos.
   - `python debug.py` - Executa a calculadora de carrinho (requer entrada interativa do usuário).
   - `python refatoracao.py` - Calcula e exibe estatísticas de uma lista de números.

Os arquivos Markdown podem ser visualizados em qualquer editor de texto ou Markdown.

## Exemplos de Uso

### num_primos.py
```bash
python num_primos.py
```
Saída esperada:
```
1 -> False
2 -> True
3 -> True
...
```

### debug.py
```bash
python debug.py
```
O script solicita entradas como nome do cliente, quantidades e preços de itens, e percentual de desconto. Exibe um recibo formatado.

### refatoracao.py
```bash
python refatoracao.py
```
Saída:
```
total: 345
media: 34.5
maior: 89
menor: 2
```

## Contribuição

Este projeto é para fins educacionais e de teste. Sinta-se à vontade para modificar os códigos ou adicionar novos exemplos.

## Licença

Este projeto não possui licença específica. Use por conta própria.</content>
<parameter name="filePath">c:\Users\PAULOANTONIORODRIGUE\Documents\reconhecimento-imagem_Paulo\test-assistent-code\README.md