import generator from 'generate-password';

class SocketIo {

	private io: any = {}
	private messages: any[] = []

	constructor (ioInstance: any) {
		this.io = ioInstance;

		this.chat();
	}

	private chat(): void {
		this.io.of('/chat').on('connect', (socket: any) => {
			socket.on('sendMessage', (data: any) => {

				let message = {
					messageId: generator.generate({ length: 10, numbers: true }),
					...data
				};

				this.messages.push(message);
				console.log(message)
				socket.broadcast.emit('reciveMessage', message);
			});
		});
	}

}

export default SocketIo;