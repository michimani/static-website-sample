static-website-sample
===

This is a sample project for TypeScript development with CDK.  
You can create a static web site hosted on S3 using this project.

# Usase

0. prepare

    ```
    cdk bootstrap
    ```

1. create config file

    ```
    cp stack-config.yml.sample stack-config.yml
    ```

    Set environment variables in the following yaml format.

    ```
    common:
      region: <deploy-target-region> eg: ap-northeast-1

    route53:
      zone: <existed-hosted-zone-name> eg: example.com
      zone_id: <existed-hosted-zone-id> eg: ABCD123467890
      sub_domain: <hostname-of-sub-domain (optional)> eg: static-website-sample (if you want to host this site as "static-website-sample.example.com")
    ```

    You can check the values ​​of `route53.zone` and `route53.zone_id` in the Route 53 management console.

2. build

    ```
    cdk synth
    ```

3. deploy

    ```
    cdk deploy
    ```

4. check

    Access the domain you set up (rg: `static-website-sample.example.com`), and check if the web page is displayed correctly.
