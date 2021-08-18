package com.iThingsFoundation.iThings.Login;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class MessageController {

	@Autowired
	private MessageService messageService;

	@PostMapping("/stream/message")
	public Message message(@RequestBody Message messageDatas) {

		return messageService.insertMessage(messageDatas);

	}
	@DeleteMapping("/stream/message")
	public Message message(@RequestBody Message messageDatas) {

		return messageService.deleteMessage(messageDatas);

	}

}
