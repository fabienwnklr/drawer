# Contributing to Drawer

First off, thanks for taking the time to contribute! ❤️

:::info For everybody
Don't forget it : Drawer is open source project, not my main project, so be respectful and understanding about the fact that sometimes i can’t respond to the request within a short time
:::

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

:::info For no contributors
And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
- Star the project
- Sponsor the project and/or individual contributors
- Tweet about it
- Refer this project in your project's readme
- Mention the project at local meetups and tell your friends/colleagues
:::

## Table of Contents

- [I have a question](#i-have-a-question)
- [Reporting bugs](#reporting-bugs)
- [I want to contribute](#i-want-to-contribute)
- [Commit Messages](#commit-messages)
- [Improving The Documentation](#improving-the-documentation)

## I have a question

there is no stupid question, only silly answers (but still check that the answer does not already exist...).

if you have any question, the [discussion](https://github.com/fabwcie/drawer/discussions) is here for that ! so don't hesitate.

## Reporting bugs

Please follow some step before report a bug

- Make sure that you are using the latest version.
- Determine if your bug is a bug and not an error. e.g., using incompatible environment components/versions (Make sure that you have read the documentation. If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in [the bug tracker](https://github.com/fabwcie/drawer/issues).
- Make sure to search the internet (including Stack Overflow) to see if users outside the GitHub community have discussed the issue.
- Collect information about the bug:
    - Stack trace (Traceback)
    - OS, Platform, and Version (Windows, Linux, macOS, x86, ARM)
    - Version of the interpreter, compiler, SDK, runtime environment, and package manager, depending on what seems relevant.
- Possibly your input and the output
- Can you reliably reproduce the issue?
    - Can you also reproduce it with older versions? Or have you updated to the latest version?

## I want to contribute

:::info Legal Notice

When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

:::

### Get repo

```bash
git clone https://github.com/fabwcie/drawer.git
```

### move to drawer folder

```bash
cd drawer
```

### Open in vscode

```
code ./
```

### Install dependencies

```bash
npm i
```

### Run debug mode

```bash
npm run dev
```

### Run docs website

```bash
cd docs && npm run start
```

:::info

Before all commit and build, pre-commit hook run for test and lint, if you won't you can disable it

for commit :

remove content of `.husky/pre-commit` __(DON'T COMMIT THIS CHANGE)__

for build:

remove `prebuild` script into `package.json` __(DON'T COMMIT THIS CHANGE)__

:::

## Commit Messages

Commit messages should be concise and descriptive and reference the issue they are addressing whenever possible. In addition, they should follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

## Improving The Documentation

If you are a new contributor and want to help improve the documentation, you can edit the documentation files in the `/docs` directory.

We actively seek additional help in building new examples or providing documentation translations.
