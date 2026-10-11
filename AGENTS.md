<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the Pragati prototype in a feature module with a pure scoring/data module and an interactive dashboard; this separates testable rules from presentation.
- Treat dashboard navigation as views within one workspace rather than public content pages; this preserves session-only prototype assignments across views.
- Keep illustrative cohort aggregate statistics distinct from the eight inspectable sample profiles; do not represent simulated data as institutional imports.
- MCP server uses @lovable.dev/mcp-js with tools in src/lib/mcp/tools; access is public and read-only over simulated data only, so never expose real or per-user data through it.
