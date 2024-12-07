# Memory in the Shell

We love the `shell`. [bash](#) or [zsh](#) or [fish](#) or [powershell](#) or name
your own. But the `shell` forgets, especially when we are across multiple
systems. It would be incredible if the `shell` could *safely* remember things for us,
across systems. So let us extend the `shell` to remember things for us.

## Problem

The overall system will probably have multiple components. It may also need to
handle some of the nuances of each shell. But we love to keep things simple.
So, let us first build a simple API that can store the typed commands.

### Requirements

1. The API should be able to store the commands typed by the user.
2. The API should be able to search the command history by keyword.

For example, the following command should store a `command`:

```bash
curl -X POST http://localhost:8080/api/v1/commands -d "command=ls -l"
```

Example command to search history:

```bash
curl -X GET http://localhost:8080/api/v1/commands?keyword=ls
```

> :warning: Should we enforce a minimum length for the command?

### Instructions

1. Feel free to use any programming language
2. Use a database, not just an in-memory list or map

> Note: Any database is fine. Even in-memory `sqlite`.

## Reviewer Experience

The reviewer should be able to run your application using
`docker-compose`. Additional steps are fine but should be documented.

## Submission

1. Create a [private fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) of this repository.
2. Commit your code to the forked repository `dev` branch
3. Create a pull request from your `dev` branch to your `main` branch
4. Invite [@abhisek](https://github.com/abhisek) to your private fork repository
5. Add `@abhisek` as a reviewer to the pull request

## Questions?

Create an [issue](https://github.com/safedep-hiring/swe-intern-problem-1/issues)
