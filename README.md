# FlowStone

> **⚠️ Under Active Development**
> FlowStone is a work in progress. Features may be incomplete, unstable, or subject to breaking changes without notice. Use at your own discretion — not recommended for production vaults until a stable release is published.

FlowStone is an open-source [Obsidian](https://obsidian.md/) plugin that syncs and publishes your notes to [Atlassian Confluence](https://www.atlassian.com/software/confluence). It is a community-maintained fork of the original [obsidian-integration](https://github.com/markdown-confluence/obsidian-integration) plugin, with bug fixes and new features added.

---

## What's new in FlowStone

- **Bearer token auth** — supports Confluence Server and Data Center via Personal Access Token (PAT), in addition to the existing Confluence Cloud basic auth
- **Graceful load failures** — the plugin no longer hard-crashes if the Mermaid diagram renderer is unavailable; it shows a notice and continues loading
- Standalone build setup (no monorepo required)

---

## Features

- Publish Obsidian notes to Atlassian Confluence
- Supports both **Confluence Cloud** (email + API token) and **Confluence Server/Data Center** (Personal Access Token)
- Support for Obsidian markdown extensions
- Commands and ribbon icon for easy access
- Per-page publish control via YAML frontmatter

---

## Getting Started

### 1. Install

FlowStone is not yet listed in Obsidian's community plugins browser. To install manually:

1. Download the latest release from the [Releases](https://github.com/MrMeisterLabs/flowstone/releases) page
2. Copy `main.js` and `manifest.json` into your vault at `.obsidian/plugins/flowstone/`
3. Enable the plugin in Obsidian under **Settings → Community Plugins**

### 2. Configure

Open **Settings → FlowStone** and fill in the following:

| Field | Description |
|---|---|
| **Confluence Domain** | Base URL of your Confluence instance, e.g. `https://your-domain.atlassian.net` |
| **Authentication Type** | `Basic` for Confluence Cloud · `Bearer` for Server/Data Center |
| **Atlassian Username** | Your Atlassian account email *(Basic auth only)* |
| **API Token / PAT** | API token (Cloud) or Personal Access Token (Server/DC) |
| **Confluence Parent Page ID** | Page ID under which notes will be published as child pages |
| **Folder to Publish** | Obsidian folder containing notes to sync (default: `Confluence Pages`) |

**Generating credentials:**
- Confluence Cloud API token: [id.atlassian.com → Security → API tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
- Confluence Server/DC PAT: Profile → Personal Access Tokens

---

## Usage

### Ribbon Icon

Click the cloud icon in the ribbon to publish all notes from the configured folder to Confluence.

### Commands

Open the command palette (`Ctrl/Cmd + P`) and search for:

- **FlowStone: Publish All to Confluence** — publishes all notes in the configured folder
- **FlowStone: Publish Current File to Confluence** — publishes only the active note
- **FlowStone: Enable publishing to Confluence** — adds `connie-publish: true` to the current note's frontmatter
- **FlowStone: Disable publishing to Confluence** — excludes the current note from publishing

### Per-page control via frontmatter

To publish a note that lives outside your configured folder:

```yaml
---
connie-publish: true
---
```

To exclude a note that is inside your configured folder:

```yaml
---
connie-publish: false
---
```

---

## Contributing

Issues and pull requests are welcome at [github.com/MrMeisterLabs/flowstone](https://github.com/MrMeisterLabs/flowstone).

---

## License

Licensed under the [Apache License 2.0](./LICENSE).

> The Apache license applies to FlowStone itself, not to any third-party services it connects to (Atlassian Confluence, etc.). You are solely responsible for complying with the terms of those services. Do not commit passwords, credentials, or tokens to this repository.

---

*FlowStone is a community fork and is not affiliated with or endorsed by Atlassian or the original markdown-confluence project.*
