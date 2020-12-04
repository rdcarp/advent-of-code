import pathlib
import re

input_ = pathlib.Path(__file__).parent / "input.txt"

input_string = input_.read_text()

p = re.compile('(\d*)-(\d*) ([a-z])\: (.*)')

passwords = [p.match(x) for x in input_string.splitlines()]

answer = sum(
    1 if (
        p.groups()[3].count(p.groups()[2]) >= int(p.groups()[0])
        and p.groups()[3].count(p.groups()[2]) <= int(p.groups()[1])
    )
    else 0
    for p in passwords
)

print(answer)