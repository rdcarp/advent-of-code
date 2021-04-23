import pathlib


TREE = "#"
SPACE = "."
X_STEP = 3
Y_STEP = 1

input_ = pathlib.Path(__file__).parent / "input.txt"

input_string = input_.read_text()

map_ = [
    [c for c in x
] for x in input_string.splitlines()]

x_limit = len(map_[0])
y_limit = len(map_)

trees_hit = x = y = 0

while y < y_limit:
    trees_hit += 1 if map_[y][x % x_limit] == TREE else 0
    x += X_STEP
    y += Y_STEP

print(trees_hit)
