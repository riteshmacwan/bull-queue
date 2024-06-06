import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Injectable()
@Processor('check')
export class AppService {
  constructor(@InjectQueue('check') private readonly checkQueue: Queue) {}
  getHello(): string {
    console.log('queue gets called');
    this.checkQueue.add(
      'check-queue',
      {
        data: 'no data to pass',
      },
      { delay: 5000 },
    );
    return 'Hello World!';
  }

  @Process('check-queue')
  async checkQueueProcess(job: Job) {
    console.log('queue called !!!!');
  }
}
