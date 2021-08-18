package com.iThingsFoundation.iThings.Login;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.iThingsFoundation.iThings.Message.Message;

@Service
public class MessageService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public Message insertMessage(Message messageDetails) {
		
String messagesql="Insert into Message(user_id,message,created_on) values (?,?,?)";
			int insertmessage=jdbcTemplate.update(messagesql,uuid.toString(),message.getMessage(),timestamp.getTime());
		return message;
	}

public Message deleteMessage(Message messageDetails) {
		
String messagesql="Delete FROM Message WHERE user_id=?";
			int deleteMessage=jdbcTemplate.update(messagesql,userId);
		return message;
	}


}
