import { DestinationsModule } from './destinations/destinations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { EditableConstantsModule } from './editableConstants/editableConstants.module';
import { EventsModule } from './events/events.module';
import { RequestsModule } from './requests/requests.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DestinationsModule,
    CommentsModule,
    EditableConstantsModule,
    EventsModule,
    RequestsModule,
    TripsModule,
  ],
})
export class EndpointsModule {}
