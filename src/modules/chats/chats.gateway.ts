import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatsGateway {

  @SubscribeMessage('message')
  handleMessage(): string {
    return 'Hello world!';
  }
}
