import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

export class SNS {
  static client: SNSClient = new SNSClient();

  static async notify(topic: string, message: string) {
    return await this.client.send(
      new PublishCommand({
        TopicArn: topic,
        Message: message,
      }),
    );
  }
}
