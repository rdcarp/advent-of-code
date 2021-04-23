from functools import reduce
import pathlib


TREE = "#"
SPACE = "."
routes = [
    # (1, 1),
    # (3, 1),
    # (5, 1),
    (7, 1),
    # (1, 2),
]
X_STEP = 3
Y_STEP = 1

input_ = pathlib.Path(__file__).parent.parent / "input.txt"

input_string = input_.read_text()

map_ = [
    [c for c in x
] for x in input_string.splitlines()]

x_limit = len(map_[0])
y_limit = len(map_)

x = y = 0
trees_hit = {r: 0 for r in routes}
route_coords = {r: (0, 0) for r in routes}

while routes_c := routes:
    print(routes_c)
    for r in routes_c:
        # print(y_limit)
        # print(route_coords[r])
        # print(r)
        if map_[route_coords[r][1]][route_coords[r][0] % x_limit] == TREE:
            trees_hit[r] += 1
        p = (
            route_coords[r][0] + r[0],
            route_coords[r][1] + r[1]
        )
        route_coords[r] = p

    for r in routes_c:
        if route_coords[r][1] >= y_limit - 1:
            print(r, route_coords[r])
            routes.remove(r)
            print(routes_c)

answer = reduce((lambda x, y: x * y), trees_hit.values())

print(f"Answer: {answer}")
