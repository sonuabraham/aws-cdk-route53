import { Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import { Route53Stack } from "../lib/route53-stack";

const env = {
  region: "ap-southeast-2",
  account: "391970746680"
};

test("Should create hosted zone for cdk.api.aremedia.net.au", () => {
  const app = new cdk.App();
  const stack = new Route53Stack(app, "MyTestStack", { env });
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Route53::HostedZone", {
    Name: "cdk.api.aremedia.net.au.",
    HostedZoneConfig: {
      Comment: "Created from cdk"
    }
  });
});

test("Should create A record for www subdomain with 127.0.0.1 in cdk.api.aremedia.net.au hosted zone", () => {
  const app = new cdk.App();
  const stack = new Route53Stack(app, "MyTestStack", { env });
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Route53::RecordSet", {
    Comment: "Created from cdk",
    HostedZoneId: {
      Ref: "HostedZoneDB99F866"
    },
    Name: "www.cdk.api.aremedia.net.au.",
    ResourceRecords: ["127.0.0.1"],
    TTL: "300",
    Type: "A"
  });
});

test("Should create NS record for cdk in api.aremedia.net.au hosted zone", () => {
  const app = new cdk.App();
  const stack = new Route53Stack(app, "MyTestStack", { env });
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Route53::RecordSet", {
    Name: "cdk.api.aremedia.net.au.",
    Type: "NS",
    Comment: "Created from cdk",
    HostedZoneId: {
      Ref: "ParentHostedZoneC2BD86E1"
    },
    ResourceRecords: {
      "Fn::GetAtt": ["HostedZoneDB99F866", "NameServers"]
    },
    TTL: "172800"
  });
});
