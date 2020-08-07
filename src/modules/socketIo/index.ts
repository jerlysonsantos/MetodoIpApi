import { Question } from "../../database/entity/question.entity";

import generator from 'generate-password';

class SocketIo {

	private io: any = {}
	private messages: any[] = []

	private questionsRecived: any[] = []
	private selectToPablo: any[] = []
	private selected: any[] = []

	constructor (ioInstance: any) {
		this.io = ioInstance;

		this.chat();
		this.question();
	}

	private chat(): void {
		this.io.of('/chat').on('connect', (socket: any) => {

			socket.emit('getAllMessages', this.messages);

			socket.on('sendMessage', (data: any) => {

				let message = {
					messageId: generator.generate({ length: 10, numbers: true }),
					...data
				};

				this.messages.push(message);
				socket.broadcast.emit('reciveMessage', message);
			});

		});
	}

	private question(): void {
		this.io.of('/question').on('connect', (socket: any) => {

			socket.emit('listQuestion', this.questionsRecived);

			socket.on('doQuestion', async (data: any) => {

				let question = {
					clientId: socket.id,
					questionId: generator.generate({ length: 10, numbers: true }),
					...data
				}

				// data tem q contar um campo USER com todos os dados
				await Question.create({
	        text: data.question,
	        resposta: data.answer,
	        user: data.user
	      }).save();

				this.questionsRecived.push(question);
				socket.emit('listQuestion', this.questionsRecived);
			});

			socket.on('doAnswer', async (data: any) => {

				await Question.update(data.id, {
	        text: data.question,
	        resposta: data.answer,
	        user: data.user
	      });

				socket.to(data.clientId).emit('answeredQuestion', data);
			});

			socket.on('select', async (data: any) => {
				switch (data.selectToPablo) {
					case true:
					 	let result = await Question.update(data.id, { selectedToPablo: true });
						this.selectToPablo.push(result);
						socket.broadcast.emit('selectToPablo', result);
						break;
					default:
					 	let result = await Question.update(data.id, { selected: true });
						this.selected.push(result);
						socket.broadcast.emit('selected', result);
						break;
				}
			});
		});
	}
}

export default SocketIo;