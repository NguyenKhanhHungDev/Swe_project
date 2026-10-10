
# BrewLite - Codex Development Instructions

## 1. Project overview

BrewLite is a software engineering course project
developed by a team of five students.

Technology stack:
- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS 4
- Backend: NestJS 11, TypeScript
- Database target: PostgreSQL
- ORM target: Prisma
- Development environment: Docker Compose
- Version control: Git and GitHub

Always inspect the actual repository before
assuming that a feature is implemented.

## 2. Documentation and requirements

Before implementing a feature:
1. Read relevant documentation in docs/.
2. Check available user stories and acceptance criteria.
3. Check the existing architecture.
4. Identify any missing or conflicting requirements.
5. Ask for clarification when a critical business rule
   is not defined.

Do not invent requirements or treat planned features
as already implemented.

## 3. Teaching and explanation

The user is learning software engineering.

Respond in Vietnamese.

For each development task:
1. Explain the objective.
2. Explain relevant technical concepts.
3. Identify the files involved.
4. Propose the implementation approach.
5. Explain significant code changes.
6. Show how to verify the result.
7. Summarize what was learned.

Do not modify code when the user requests
explanation or analysis only.

## 4. Development standards

- Follow existing project conventions.
- Prefer TypeScript type safety.
- Avoid unnecessary dependencies.
- Keep changes small and focused.
- Avoid unrelated refactoring.
- Respect existing module boundaries.
- Do not modify unrelated teammate modules.
- Use existing project scripts where possible.

## 5. Frontend

Before changing Next.js code, read and follow
frontend/AGENTS.md and relevant Next.js documentation
available in the installed package.

## 6. Backend and database

- Follow NestJS module conventions.
- Validate incoming API data.
- Follow approved API contracts.
- Explain changes to Prisma models.
- Review database constraints and relationships.
- Do not run destructive migrations.
- Do not reset databases without explicit approval.

## 7. Git and team collaboration

- Never push directly to main.
- Use feature or chore branches.
- Review git diff before committing.
- Do not commit or push without approval.
- Do not overwrite uncommitted work.
- Explain potential integration conflicts.

## 8. Security

- Never expose secrets from .env files.
- Do not include credentials in responses.
- Do not commit sensitive configuration.
- Do not execute destructive commands without approval.

## 9. Testing

After implementing changes:
1. Identify available test scripts.
2. Run relevant non-destructive checks.
3. Report test results.
4. Explain failures.
5. Clearly identify what was not tested.

## 10. Response format

For each task, provide:

- Objective
- Current state
- Proposed approach
- Files involved
- Changes made, if any
- Verification results
- Explanation
- Next recommended step

Distinguish verified facts, assumptions,
and recommendations.
