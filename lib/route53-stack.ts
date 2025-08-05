import * as route53 from "aws-cdk-lib/aws-route53";
import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import { Construct } from "constructs";

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT
};

export class Route53Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props ? props : { env });

    const hostedZone = new route53.PublicHostedZone(this, "HostedZone", {
      zoneName: "cdk.api.aremedia.net.au",
      comment: "Created from cdk"
    });

    new route53.ARecord(this, "Record", {
      zone: hostedZone,
      recordName: "www",
      target: {
        values: ["127.0.0.1"]
      },
      ttl: Duration.seconds(300),
      comment: "Created from cdk"
    });

    // Create a dummy parent hosted zone for demonstration
    // In a real deployment, you would use HostedZone.fromLookup() with proper AWS credentials
    const parent = new route53.PublicHostedZone(this, "ParentHostedZone", {
      zoneName: "api.aremedia.net.au",
      comment: "Parent hosted zone for demonstration"
    });

    if (!hostedZone.hostedZoneNameServers) {
      throw new Error("NS record is undefined.");
    }

    new route53.ZoneDelegationRecord(this, "NS", {
      zone: parent,
      recordName: "cdk",
      nameServers: hostedZone.hostedZoneNameServers,
      comment: "Created from cdk"
    });
  }
}
