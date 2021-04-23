import pathlib
import re

input_ = pathlib.Path(__file__).parent.parent / "input.txt"

input_string = input_.read_text()

p = re.compile('(\d*)-(\d*) ([a-z])\: (.*)')

passwords = [p.match(x) for x in input_string.splitlines()]

answer = sum(
    (
        (p.groups()[3][int(p.groups()[0])-1]).count(p.groups()[2])
        + (p.groups()[3][int(p.groups()[1])-1]).count(p.groups()[2])
    ) % 2
    for p in passwords
)

print(answer)