import { Question } from "../../database/entity/question.entity";

import generator from 'generate-password';

class SocketIo {

	private io: any = {}
  private messages: any[] = []
  
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
          deleted: false,
					...data
				};

        this.messages.push(message);
				socket.emit('myMessage', { ...message, author: 'Eu'});
				socket.broadcast.emit('reciveMessage', message);
			});

      socket.on('deleteMessage', (data: any) => {
        const newList = this.messages.map((item) => {
          if (item.messageId === data)
            item['deleted'] = true;
          return item;
        });
        this.messages = newList;
        socket.emit('deletedMessage', data);
        socket.broadcast.emit('deletedMessage', data);
      })
		});
	}

  sleep(ms: number) {
    var unixtime_ms = new Date().getTime();
    while(new Date().getTime() < unixtime_ms + ms) {}
  }

	private question(): void {
		this.io.of('/question').on('connect', async (socket: any) => {
      // O paramentro data precisa ser do tipo Question para que possa ser salvo no DB
			socket.on('doQuestion', async (data: Question) => {

        const { user, ...item } = data;

				const result = await Question.create({
          ...item,
          user
        }).save();

        this.sleep(3000);        
				socket.broadcast.emit('listQuestion', result);
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
        const { selectToPablo, ...item } = data;

				switch (selectToPablo) {
					case true:
					 	await Question.update(item.id, { selected: true, selectedToPablo: true });
						socket.broadcast.emit('selectToPablo', item);
						break;
					case false:
					 	await Question.update(data.id, { selected: true, selectedToPablo: false });
						socket.broadcast.emit('selected', item);
						break;
				}
			});
		});
	}
}

export default SocketIo;