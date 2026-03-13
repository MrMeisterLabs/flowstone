import { App, Setting, PluginSettingTab } from "obsidian";
import FlowStonePlugin from "./main";

export class ConfluenceSettingTab extends PluginSettingTab {
	plugin: FlowStonePlugin;

	constructor(app: App, plugin: FlowStonePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", {
			text: "FlowStone — Confluence Connection Settings",
		});

		new Setting(containerEl)
			.setName("Confluence Domain")
			.setDesc('Confluence Domain eg "https://mysite.atlassian.net"')
			.addText((text) =>
				text
					.setPlaceholder("https://mysite.atlassian.net")
					.setValue(this.plugin.settings.confluenceBaseUrl)
					.onChange(async (value) => {
						this.plugin.settings.confluenceBaseUrl = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Authentication Type")
			.setDesc(
				"Basic: Confluence Cloud (email + API token). Bearer: Confluence Server/Data Center (Personal Access Token).",
			)
			.addDropdown((dropdown) =>
				dropdown
					.addOptions({ basic: "Basic (Cloud)", bearer: "Bearer (Server / Data Center)" })
					.setValue(this.plugin.settings.authType)
					.onChange(async (value) => {
						this.plugin.settings.authType = value as "basic" | "bearer";
						await this.plugin.saveSettings();
						this.display();
					}),
			);

		if (this.plugin.settings.authType === "basic") {
			new Setting(containerEl)
				.setName("Atlassian Username")
				.setDesc('eg "username@domain.com"')
				.addText((text) =>
					text
						.setPlaceholder("username@domain.com")
						.setValue(this.plugin.settings.atlassianUserName)
						.onChange(async (value) => {
							this.plugin.settings.atlassianUserName = value;
							await this.plugin.saveSettings();
						}),
				);
		}

		new Setting(containerEl)
			.setName(
				this.plugin.settings.authType === "bearer"
					? "Personal Access Token"
					: "Atlassian API Token",
			)
			.setDesc(
				this.plugin.settings.authType === "bearer"
					? "Generate a PAT in Confluence under Profile → Personal Access Tokens."
					: "Generate an API token at id.atlassian.com/manage-profile/security/api-tokens.",
			)
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.atlassianApiToken)
					.onChange(async (value) => {
						this.plugin.settings.atlassianApiToken = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Confluence Parent Page ID")
			.setDesc("Page ID to publish files under")
			.addText((text) =>
				text
					.setPlaceholder("23232345645")
					.setValue(this.plugin.settings.confluenceParentId)
					.onChange(async (value) => {
						this.plugin.settings.confluenceParentId = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Folder to publish")
			.setDesc(
				"Publish all files except notes that are excluded using YAML Frontmatter",
			)
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.folderToPublish)
					.onChange(async (value) => {
						this.plugin.settings.folderToPublish = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("First Header Page Name")
			.setDesc("First header replaces file name as page title")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.firstHeadingPageTitle)
					.onChange(async (value) => {
						this.plugin.settings.firstHeadingPageTitle = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Mermaid Diagram Theme")
			.setDesc("Pick the theme to apply to mermaid diagrams")
			.addDropdown((dropdown) => {
				/* eslint-disable @typescript-eslint/naming-convention */
				dropdown
					.addOptions({
						"match-obsidian": "Match Obsidian",
						"light-obsidian": "Obsidian Theme - Light",
						"dark-obsidian": "Obsidian Theme - Dark",
						default: "Mermaid - Default",
						neutral: "Mermaid - Neutral",
						dark: "Mermaid - Dark",
						forest: "Mermaid - Forest",
					})
					.setValue(this.plugin.settings.mermaidTheme)
					.onChange(async (value) => {
						// @ts-expect-error
						this.plugin.settings.mermaidTheme = value;
						await this.plugin.saveSettings();
					});
				/* eslint-enable @typescript-eslint/naming-convention */
			});
	}
}
