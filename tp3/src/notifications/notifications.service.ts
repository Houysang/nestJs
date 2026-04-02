import { Injectable, Inject, forwardRef } from '@nestjs/common';
//import { OrdersService } from 'src/orders/orders.service';
import { EVENT_PUBLISHER } from 'src/core/tokens';

@Injectable()
export class NotificationsService {
//   constructor(
//     @Inject(forwardRef(() => OrdersService))
//     private readonly ordersService: OrdersService,
//   ) {}

    constructor(
        @Inject(EVENT_PUBLISHER) private readonly eventPublisher: any,
    ) {}

  notify(event: string, payload: any) {
    //console.log(`[NOTIFY] ${event}`, payload);
    this.eventPublisher.publish(event, payload);
    return { ok: true };
  }
}