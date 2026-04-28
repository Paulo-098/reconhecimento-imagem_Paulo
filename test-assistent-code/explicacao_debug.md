# Erros Identificados e Correções no Código `debug.py`

## Erros Encontrados

1. **Linha 4: Falta de aspas na função `input`**
   - Código original: `item1 = float(input(Preço do item 1? ))`
   - Problema: A string dentro de `input` não está entre aspas, causando erro de sintaxe.
   - Correção: Adicionar aspas duplas: `item1 = float(input("Preço do item 1? "))`

2. **Linha 15: Tipo incorreto para `desconto_cupom`**
   - Código original: `desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`
   - Problema: `input` retorna uma string, mas o valor é usado como número em operações matemáticas.
   - Correção: Converter para `float`: `desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`

3. **Linha 16: Operação com tipos incompatíveis**
   - Código original: `desconto = subtotal * (desconto_cupom / 100)`
   - Problema: `desconto_cupom` é string, causando erro de tipo ao dividir.
   - Correção: Após converter `desconto_cupom` para `float`, a operação funciona corretamente.

4. **Linha 25: Falta de prefixo `f` na f-string**
   - Código original: `print(" Item 2:        R$ {total_item2:.2f}")`
   - Problema: Sem o prefixo `f`, a string não interpola as variáveis, imprimindo literalmente.
   - Correção: Adicionar `f`: `print(f" Item 2:        R$ {total_item2:.2f}")`

5. **Linha 28: Comparação de tipos incompatíveis**
   - Código original: `if desconto_cupom > 0:`
   - Problema: `desconto_cupom` é string, comparando com inteiro causa erro.
   - Correção: Após converter para `float`, a comparação funciona.

6. **Linha 29: Formatação com tipo incorreto**
   - Código original: `print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")`
   - Problema: `desconto_cupom` é string, `.0f` espera número.
   - Correção: Após converter para `float`, a formatação funciona.

7. **Linha 32: Uso desnecessário de `round`**
   - Código original: `print(f" TOTAL:         R$ {round(total, 2):.2f}")`
   - Problema: `round(total, 2)` arredonda, mas `.2f` já formata para 2 casas decimais, sendo redundante.
   - Correção: Simplificar para `print(f" TOTAL:         R$ {total:.2f}")`

## Resumo das Correções
- Corrigidos erros de sintaxe e tipos.
- Melhorada a consistência na formatação de saída.
- Código agora executa sem erros, calculando corretamente totais, impostos e descontos.