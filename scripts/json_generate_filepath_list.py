from pathlib import Path
import os
import json
import argparse


def write_json_file_path_list(path: str, file_name: str):
    path_w = Path(path)
    files = path_w.rglob("*")

    with open(path_w.parent.joinpath(f"JSON/{file_name}.JSON"), "w") as f:
        icon_list = {}
        for file in files:
            # print(file.parts)
            if len(file.parts) > 3:
                icon_list[str(Path(*file.parts[1:]))] = file.parts[2]
            # print(icon_list)
        f.write(json.dumps(icon_list))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--path")
    parser.add_argument("-f", "--filename")
    args = parser.parse_args()
    write_json_file_path_list(args.path, args.filename)
