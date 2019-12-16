import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import CdkStack = require('../lib/static-website-sample-stack');
import * as Config from '../lib/Config';

test('Not Empty Stack', () => {
    const app = new cdk.App();
    const stackConfig = new Config.StackConfig();
    const stack = new CdkStack.StaticWebsiteSampleStack(app, 'TestStack', stackConfig, {
      env: {
        region: stackConfig.common.region
      },
    });
    expectCDK(stack).notTo(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
