import { io, Socket } from 'socket.io-client';
import { Drawing } from '../types';

interface SocketOptions {
  token: string;
}

export class CollabSocket {
  private socket: Socket | null = null;

  connect(options: SocketOptions): Socket {
    this.socket = io('http://localhost:8080', {
      auth: { token: options.token },
      transports: ['websocket', 'polling'],
    });

    return this.socket;
  }

  onDrawing(callback: (drawing: Drawing) => void) {
    if (this.socket) {
      this.socket.on('drawing', callback);
    }
  }

  emitDrawing(drawing: Drawing) {
    if (this.socket) {
      this.socket.emit('drawing', drawing);
    }
  }

  emitClear() {
    if (this.socket) {
      this.socket.emit('clear');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default CollabSocket;
