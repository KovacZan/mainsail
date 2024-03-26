import { inject, injectable } from "@mainsail/container";
import { Contracts, Identifiers } from "@mainsail/contracts";

import { ConfigManager, ConfigRepository } from "../services/config/index.js";

@injectable()
export class LoadConfiguration implements Contracts.Kernel.Bootstrapper {
	@inject(Identifiers.Application.Instance)
	private readonly app!: Contracts.Kernel.Application;

	public async bootstrap(): Promise<void> {
		await this.app
			.get<ConfigManager>(Identifiers.Services.Config.Manager)
			.driver(this.app.get<ConfigRepository>(Identifiers.Config.Repository).get<string>("configLoader", "local"))
			.loadConfiguration();
	}
}
