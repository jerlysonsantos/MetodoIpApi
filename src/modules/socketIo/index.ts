import { Question } from "../../database/entity/question.entity";

import generator from 'generate-password';

class SocketIo {

	private io: any = {};
  private messages: any[] = [];

  private currentConfig: any = {
    tema: '',
    blockQuestion: true,
    blockChat: false,
  };

  private palestranteInfos: any = {
    name: 'Teste',
    instagram: '@teste',
  };

  private research: any = {};
  private quantVotes: number = 0;

	constructor (ioInstance: any) {
		this.io = ioInstance;

		this.chat();
    this.question();
    this.appConfig();
  }

// =================== FUNÇÕES ======================//
  private deleteMessage(data: any) {
    return new Promise((resolve) => {
      const newList = this.messages.map((item) => {
        if (item.messageId === data)
          item['deleted'] = true;
        return item;
      });
      this.messages = newList;
      resolve();
    })
  }

  private sleep(ms: number) {
    var unixtime_ms = new Date().getTime();
    while(new Date().getTime() < unixtime_ms + ms) {}
  }

  // ===============================================//

  // ================= ROTAS DO SOCKET.IO ============================//

	private chat(): void {
		this.io.of('/chat').on('connection', (socket: any) => {
      socket.on('getMessages', () => {
  			socket.emit('getAllMessages', this.messages);
      });

			socket.on('sendMessage', async (data: any) => {

				let message = {
          messageId: generator.generate({ length: 10, numbers: true }),
          deleted: false,
          date: new Date(),
					...data
				};

				socket.emit('myMessage', { ...message, title: 'Eu', position: 'right'});
				socket.broadcast.emit('reciveMessage', message);
        await new Promise((resolve) => { this.messages.push(message); resolve() });
      });

      socket.on('deleteMessage', async (data: any) => {
        socket.emit('deletedMessage', data);
        socket.broadcast.emit('deletedMessage', data);
        await this.deleteMessage(data);
      });

      socket.on('getCurrentResearch', async () => {
        if (this.research !== {})
          socket.emit('getResearch', this.research);
      });

      socket.on('launchResearch', async (data: any) => {
        //this.research = {};
        this.research = data;
        this.quantVotes = 0;
        socket.emit('getResearch', data);
        socket.broadcast.emit('getResearch', data);
      });

      socket.on('voteResearch', async (data:any) => {
        this.quantVotes ++;
        let camps: any[] = [];
        this.research.campos.map((item: any) => {
          if (item.campo === data.campo) {
            item['quantVotes'] = item.quantVotes + 1; 
          }
          item['percent'] = (item.quantVotes * 100) / this.quantVotes;
    
          camps.push(item)
        });

        socket.emit('onVoted', camps);
        socket.broadcast.emit('onVoted', camps);
      });
		});
	}

	private question(): void {
		this.io.of('/question').on('connection', async (socket: any) => {
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
  
  private appConfig(): void {
    this.io.of('/config').on('connection', (socket: any) => {

      socket.on('getConfig', () => {
        socket.emit('sendConfig', this.currentConfig);
      });

      socket.on('setConfig', (data: any) => {
        this.currentConfig = data;
        socket.broadcast.emit('sendConfig', this.currentConfig);
      });

      socket.on('getPalestrante', () => {
        socket.emit('sendPalestrante', this.palestranteInfos);
      });

      socket.on('setPalestrante', (data: any) => {
        this.palestranteInfos = data;
        socket.emit('sendPalestrante', this.palestranteInfos);
        socket.broadcast.emit('sendPalestrante', this.palestranteInfos);
      });

    });
  }
}

export default SocketIo;