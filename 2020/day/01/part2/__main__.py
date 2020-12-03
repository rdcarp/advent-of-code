import random
import pathlib


input_ = pathlib.Path(__file__).parent.parent / "input.txt"

input_string = input_.read_text()

num_list = [int(x) for x in input_string.splitlines()]
num_list.sort(reverse=True)

def main():
    _1 = _2 = _3 = 0
    sum_ = lambda: num_list[_1] + num_list[_2] + num_list[_3]
    prod_ = lambda: num_list[_1] * num_list[_2] * num_list[_3]

    i = 0
    while s := sum_() != 2020:
        i += 1
        _1, _2, _3 = random.choices(range(0, len(num_list)), k=3)
    
    print(f"Found in {i} iterations")
    return prod_()

if __name__ == "__main__":
    answer = main()
    print(f"Answer: {answer}")
