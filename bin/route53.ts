#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Route53Stack } from '../lib/route53-stack';

const app = new cdk.App();
new Route53Stack(app, 'Route53Stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
