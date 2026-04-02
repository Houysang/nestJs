import { Module, forwardRef } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CoreModule } from 'src/core/core.module';
//import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [CoreModule],
  //imports: [forwardRef(() => OrdersModule)],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
