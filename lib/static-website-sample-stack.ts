import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import route53 = require('@aws-cdk/aws-route53');
import route53targets = require('@aws-cdk/aws-route53-targets');
import * as config from './Config';

export class StaticWebsiteSampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, stackConfig: config.StackConfig, props?: cdk.StackProps) {
    super(scope, id, props);

    const useSubDomain: boolean = (typeof stackConfig.route53.sub_domain !== 'undefined' && stackConfig.route53.sub_domain !== '' && stackConfig.route53.sub_domain !== null);

    // create a S3 bucket
    const bucketName: string = (useSubDomain === true) ? `${stackConfig.route53.sub_domain}.${stackConfig.route53.zone}` : stackConfig.route53.zone;
    const bucket: s3.Bucket = new s3.Bucket(this, 'StaticWebsiteSampleBucket', {
      bucketName,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Put sample html files
    const sampleHtmlPut = new s3deploy.BucketDeployment(this, 'SampleHtmlDeploy', {
      destinationBucket: bucket,
      sources: [s3deploy.Source.asset('./public')]
    });

    // create a record
    const myZone: route53.IHostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'MyZone', {
      zoneName: stackConfig.route53.zone,
      hostedZoneId: stackConfig.route53.zone_id
    });

    const record: route53.ARecordProps = {
      zone: myZone,
      target: route53.AddressRecordTarget.fromAlias(new route53targets.BucketWebsiteTarget(bucket)),
      recordName: (useSubDomain === true) ? stackConfig.route53.sub_domain : stackConfig.route53.zone
    }

    const hostRecord = new route53.ARecord(this, 'StaticWebsiteSampleRecord', record);
  }
}
