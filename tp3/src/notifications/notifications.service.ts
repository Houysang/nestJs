import { Injectable } from '@nestjs/common';
import { ok } from 'assert';

@Injectable()
export class NotificationsService {
    notify(event: string,payload: any){
        console.log(`[NOTIFY] ${event}`, payload);
        return{ok: true};
    }
}
