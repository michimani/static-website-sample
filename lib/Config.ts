import yaml = require('js-yaml');
import fs = require('fs');

export interface commonConfig {
  region: string;
}

export interface Route53Config {
  zone: string;
  zone_id: string;
  sub_domain?: string;
}

export interface StackConfig {
  common: commonConfig,
  route53: Route53Config
}

const stackConfig: StackConfig = yaml.safeLoad(fs.readFileSync('stack-config.yml', {encoding: 'utf-8'}));

export class StackConfig {
  constructor() {
    const stackConfig = yaml.safeLoad(fs.readFileSync('stack-config.yml', {encoding: 'utf-8'}));

    return stackConfig;
  }
}
