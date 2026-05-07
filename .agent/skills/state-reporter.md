# STATE REPORTER

## The Automated PR Handoff (via GitHub MCP):

When the validation suite passes, do not wait for the user to push. Use your GitHub MCP tools to execute the following:

1. Commit the changes locally: `git commit -am "chore: Phase [ID] implementation complete"`.
2. Push the branch to the remote repository.
3. Execute `create_pull_request` targeting the working base branch (`codex-technical-tide-v2`).
4. For the PR body, read and inject the exact contents of `.github/pull_request_template.md`.
5. Confirm to the Architect that the PR is live and Jules has been triggered.
