#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { StaticWebsiteSampleStack } from '../lib/static-website-sample-stack';
import * as Config from '../lib/Config';

const app = new cdk.App();

const stackConfig = new Config.StackConfig();
new StaticWebsiteSampleStack(app, 'StaticWebsiteSampleStack', stackConfig, {
  env: {
    region: stackConfig.common.region
  },
});
