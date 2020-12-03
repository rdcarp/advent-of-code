import pathlib


input_ = pathlib.Path(__file__).parent / "input.txt"

input_string = input_.read_text()

num_list = [int(x) for x in input_string.splitlines()]
num_list.sort(reverse=True)

def main():
    left = 0
    right = len(num_list) - 1

    sum_ = lambda: num_list[left] + num_list[right]
    prod_ = lambda: num_list[left] * num_list[right]

    while left < right:
        if (s := sum_()) == 2020:
            return prod_()
        elif s > 2020:
            left += 1
            right = len(num_list) - 1
        else:
            left+= 1
            right = 0

if __name__ == "__main__":
    answer = main()
    print(f"Answer: {answer}")
