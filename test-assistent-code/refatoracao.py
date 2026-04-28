def summarize_numbers(numbers):
    """Return summary statistics for a list of numbers."""
    total = sum(numbers)
    average = total / len(numbers)
    maximum = max(numbers)
    minimum = min(numbers)
    return total, average, maximum, minimum


def main():
    values = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    total, average, maximum, minimum = summarize_numbers(values)

    print("total:", total)
    print("media:", average)
    print("maior:", maximum)
    print("menor:", minimum)


if __name__ == "__main__":
    main()
