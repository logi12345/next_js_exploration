import os
import argparse
from pathlib import Path
from typing import List


def rename_files(
    path: str,
    replace: str,
    word: str,
    exclusion_list: List[str] = [],
) -> None:
    path1 = Path(path)
    files = os.listdir(path)
    for file in files:
        if file not in exclusion_list:
            replacement = file.replace(replace, word)
            os.rename(path1.joinpath(file), path1.joinpath(replacement))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        "rename files takes:\n path as -p\n list of exclusions -el\n replace -r\n new word -n"
    )
    parser.add_argument("-p", "--path")
    parser.add_argument("-el", "--exclude")
    parser.add_argument("-r", "--replace")
    parser.add_argument("-w", "--word")
    args = parser.parse_args()
    print(args)
    rename_files(
        args.path,
        args.replace,
        args.word,
        args.exclude if args.exclude else [],
    )
