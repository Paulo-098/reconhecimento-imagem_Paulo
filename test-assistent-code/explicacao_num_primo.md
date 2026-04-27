# Explicação do código `eh_primo`

1. `def eh_primo(n):`
   - Define a função `eh_primo` que recebe um número inteiro `n`.
   - Essa função vai verificar se `n` é primo.

2. `    """Retorna True se n for primo, caso contrário False."""`
   - Documentação da função (docstring) explicando o que ela retorna.

3. `    if n <= 1:`
   - Verifica se `n` é menor ou igual a 1.
   - Números menores ou iguais a 1 não são considerados primos.

4. `        return False`
   - Retorna `False` imediatamente quando `n` não pode ser primo.

5. `    if n <= 3:`
   - Verifica se `n` é 2 ou 3, que são primos.

6. `        return True`
   - Retorna `True` nesses casos, porque 2 e 3 são primos.

7. `    if n % 2 == 0 or n % 3 == 0:`
   - Verifica se `n` é divisível por 2 ou por 3.
   - Se for, o número não pode ser primo (exceto 2 e 3, já tratados acima).

8. `        return False`
   - Retorna `False` quando `n` tem divisor 2 ou 3.

9. `    i = 5`
   - Inicializa a variável `i` com 5.
   - A partir daqui, a checagem de divisores usa os valores 5, 7, 11, 13, etc.

10. `    while i * i <= n:`
    - Executa o loop enquanto `i` for menor ou igual à raiz quadrada de `n`.
    - Se `n` não tiver divisor até a raiz quadrada, então é primo.

11. `        if n % i == 0 or n % (i + 2) == 0:`
    - Verifica se `n` é divisível por `i` ou por `i + 2`.
    - Isso testa pares de candidatos na forma `6k - 1` e `6k + 1`.

12. `            return False`
    - Retorna `False` se encontrar algum divisor.

13. `        i += 6`
    - Avança `i` de 6 em 6 para testar o próximo par de candidatos primos.

14. `    return True`
    - Se nenhum divisor for encontrado, retorna `True`.
    - Isso significa que `n` é primo.

15. `if __name__ == "__main__":`
    - Verifica se o script está sendo executado diretamente.
    - Esse bloco não roda se o arquivo for importado como módulo.

16. `    test_values = [1, 2, 3, 4, 17, 18, 19, 20, 97, 100]`
    - Define uma lista de números usados para testar a função.

17. `    for value in test_values:`
    - Percorre cada número da lista.

18. `        print(f"{value} -> {eh_primo(value)}")`
    - Imprime o número e o resultado da verificação de primo.
    - Exemplo de saída: `17 -> True` ou `18 -> False`.
